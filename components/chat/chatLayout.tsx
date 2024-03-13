"use client";

import React, { use, useEffect, useRef, useState } from "react";
import axios from "axios";
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
import { Socket, io } from 'socket.io-client';
import toast from "react-hot-toast";

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

    const socket = useRef<Socket>()
    const { data: session } = useSession()
    const [chats, setChats] = useState<Chat[]>([])
    const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
    const [selectedChat, setSelectedChat] = React.useState<Chat>(chats[0]);
    const [selectedChatId, setSelectedChatId] = React.useState<string | undefined>(undefined);
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

    const fetchSelectedChat = async (chatId: string) => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/chat/selected/${chatId}`);
            setSelectedChat(res.data);
            setSelectedChatId(chatId);
        } catch (error) {
            toast.error('Error fetching chat');
        }
    }

    useEffect(() => {
        const fetchChats = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/chat/${session?.user.id}`);
                setChats(res.data);
                // setSelectedChat(res.data[0]);
            } catch (error) {
                toast.error('Error fetching chats');
            }
        }
        if (session?.user.id) {
            fetchChats();
            try {
                socket.current = io(`http://localhost:8001`)
                socket.current.emit('connect-user', session.user.id)
            } catch (error) {
                toast.error('Error connecting to server');
            }
        }

        return () => {
            if (socket.current) {
                socket.current.emit('disconnect-user', session?.user.id)
                socket.current.disconnect();
            }
        }
    }, [session?.user.id]);

    useEffect(() => {
        if (selectedChatId) {
            fetchSelectedChat(selectedChatId);
        }
    }, [selectedChatId, chats]);

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
                    isCollapsed && "min-w-[50px] md:min-w-[70px] transition-all duration-300 ease-in-out"
                )}
            >
                <ChatSidebar
                    isCollapsed={isCollapsed || isMobile}
                    links={chats.map((chat) => ({
                        id: chat.id,
                        name: chat.users.find((user) => user.id !== session?.user.id)?.userName || "Unknown User",
                        messages: chat.messages,
                        avatar: chat.users.find((user) => user.id !== session?.user.id)?.image || "",
                        variant: selectedChat?.users.find((user) => user.id !== session?.user.id)?.userName === chat.users.find((user) => user.id !== session?.user.id)?.userName ? "default" : "ghost",
                    }))}
                    setSelectedChatId={setSelectedChatId}
                    isMobile={isMobile}
                />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
                {selectedChat && <ChatView
                    socket={socket}
                    messages={selectedChat?.messages}
                    selectedChat={selectedChat}
                    setSelectedChat={setSelectedChat}
                    isMobile={isMobile}
                />}
                {!selectedChat && (
                    <div className="w-full h-full flex justify-center items-center">
                        <p className="text-zinc-300 text-lg">Click on a chat to start messaging</p>
                    </div>
                )}
            </ResizablePanel>
        </ResizablePanelGroup>
    );
}

