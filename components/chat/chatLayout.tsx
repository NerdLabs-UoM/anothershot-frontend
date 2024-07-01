"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { cn } from "@/app/lib/utils";
import ChatSidebar from "./chatSideBar";
import { ChatView } from "./chatView";
import { Chat } from "@/app/lib/types";
import { useSocket } from "@/context/socketContext";
import {
  fetchChatsService,
  fetchSelectedChatService,
} from "@/services/chat/api";

interface ChatLayoutProps {
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
}

export function ChatLayout({
  defaultLayout = [320, 480],
  defaultCollapsed = false,
  navCollapsedSize,
}: ChatLayoutProps) {
  const { socket } = useSocket();
  const router = useRouter();
  const { data: session } = useSession();
  const [chats, setChats] = useState<Chat[]>([]);
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
  const [selectedChat, setSelectedChat] = React.useState<Chat | undefined>(
    undefined
  );
  const [selectedChatId, setSelectedChatId] = React.useState<
    string | undefined
  >(undefined);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenWidth = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkScreenWidth();
    window.addEventListener("resize", checkScreenWidth);
    return () => {
      window.removeEventListener("resize", checkScreenWidth);
    };
  }, []);

  useEffect(() => {
    const currentSocket = socket;
    const handleReceiveNewChat = (chat: Chat) => {
      if (chat.users.find((user) => user.id === session?.user.id)) {
        setChats((prev) => [...prev, chat]);
      }
    };
    const handleDeleteChat = (chatId: string) => {
      if (chatId === selectedChatId) {
        toast.error(
          "Someone has deleted this chat. Redirecting to another chat"
        );
        setSelectedChat(undefined);
        setSelectedChatId(undefined);
        setTimeout(() => {
          router.refresh();
        }, 5000);
      }
      setChats((prev) => prev.filter((chat) => chat.id !== chatId));
    };
    currentSocket?.on("new-chat", handleReceiveNewChat);
    currentSocket?.on("delete-chat", handleDeleteChat);
    return () => {
      currentSocket?.off("new-chat", handleReceiveNewChat);
      currentSocket?.off("delete-chat", handleDeleteChat);
    };
  }),
    [socket, session];

  const fetchSelectedChat = async (chatId: string) => {
    try {
      const res = await fetchSelectedChatService(chatId);
      setSelectedChat(res.data);
      setSelectedChatId(chatId);
    } catch (error) {
      toast.error("Error fetching chat");
    }
  };

  useEffect(() => {
    const fetchChats = async () => {
      try {
        if (session?.user?.id) {
          const res = await fetchChatsService(session.user.id);
          setChats(res.data);
        }
      } catch (error) {
        toast.error("Error fetching chats");
      }
    };
    if (session?.user.id) fetchChats();
  }, [session?.user.id]);

  useEffect(() => {
    if (selectedChatId) {
      fetchSelectedChat(selectedChatId);
    }
  }, [selectedChatId]);

  return (
    <ResizablePanelGroup
      direction="horizontal"
      onLayout={(sizes: number[]) => {
        document.cookie = `react-resizable-panels:layout=${JSON.stringify(
          sizes
        )}`;
      }}
      className="h-full items-stretch"
    >
      <ResizablePanel
        defaultSize={defaultLayout[0]}
        collapsedSize={navCollapsedSize}
        collapsible={true}
        minSize={isMobile ? 0 : 24}
        maxSize={isMobile ? 8 : 30}
        onCollapse={() => {
          setIsCollapsed(true);
          document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
            true
          )}`;
        }}
        onExpand={() => {
          setIsCollapsed(false);
          document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
            false
          )}`;
        }}
        className={cn(
          isCollapsed &&
            "min-w-[50px] md:min-w-[70px] transition-all duration-300 ease-in-out"
        )}
      >
        <ChatSidebar
          isCollapsed={isCollapsed || isMobile}
          links={chats.map((chat) => ({
            id: chat.id,
            name:
              chat.users.find((user) => user.id !== session?.user.id)
                ?.userName || "Unknown User",
            messages: chat.messages,
            avatar:
              chat.users.find((user) => user.id !== session?.user.id)?.image ||
              "",
            variant:
              selectedChat?.users.find((user) => user.id !== session?.user.id)
                ?.userName ===
              chat.users.find((user) => user.id !== session?.user.id)?.userName
                ? "default"
                : "ghost",
          }))}
          setSelectedChatId={setSelectedChatId}
          isMobile={isMobile}
        />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
        {selectedChat && (
          <ChatView
            messages={selectedChat?.messages}
            selectedChat={selectedChat}
            setSelectedChat={setSelectedChat}
            isMobile={isMobile}
          />
        )}
        {!selectedChat && (
          <div className="w-full h-full flex justify-center items-center">
            <p className="text-zinc-300 text-lg">
              Click on a chat to start messaging
            </p>
          </div>
        )}
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
