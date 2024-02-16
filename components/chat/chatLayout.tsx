"use client";

import React, { useEffect, useState } from "react";
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

    useEffect(() => {
        const fetchChats = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/chat/${session?.user.id}`);
                setChats(res.data);
                setSelectedChat(res.data[0]);
            } catch (error) {
                console.error('Error fetching chats:', error);
            }
        };
    
        if (session?.user.id) {
            fetchChats();
        }
    }, [session?.user.id]);

    useEffect(() => {
        if (selectedChatId) {
            setSelectedChat(chats.find((chat) => chat.id === selectedChatId) as Chat);
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
                        name: chat.users.find((user) => user.id !== session?.user.id)?.name || "Unknown User",
                        messages: chat.messages,
                        avatar: chat.users.find((user) => user.id !== session?.user.id)?.image || "",
                        variant: selectedChat.users.find((user) => user.id !== session?.user.id)?.name === chat.users.find((user) => user.id !== session?.user.id)?.name ? "default" : "ghost",
                    }))}
                    setSelectedChatId={setSelectedChatId}
                    isMobile={isMobile}
                />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
                {selectedChat && <ChatView
                    messages={selectedChat.messages}
                    selectedChat={selectedChat}
                    isMobile={isMobile}
                />}
            </ResizablePanel>
        </ResizablePanelGroup>
    );
}
