// import { Message, UserData } from "@/app/data";
import React, { useEffect, useMemo } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Chat, Message } from "@/app/lib/types";
import ChatTopbar from "./chatTopBar";
import { ChatList } from "./chatList";
import { Socket } from "socket.io-client";
import { useSession } from "next-auth/react";

interface ChatProps {
    messages?: Message[];
    selectedChat: Chat;
    isMobile: boolean;
    socket: React.MutableRefObject<Socket | undefined>
    setSelectedChat: React.Dispatch<React.SetStateAction<Chat>>;
}

export function ChatView({ messages, selectedChat, isMobile, socket, setSelectedChat }: ChatProps) {

    const [tempSelectedChat, setTempSelectedChat] = React.useState<Chat>(selectedChat);
    const [messagesState, setMessages] = React.useState<Message[]>(
        messages ?? []
    );
    const { data: session } = useSession()

    useEffect(() => {
        setTempSelectedChat(selectedChat);
        setMessages(messages ?? []);
    }, [selectedChat, messages]);

    useEffect(() => {
        const currentSocket = socket.current;
        const handleReceiveMessage = (message: Message) => {
            if (selectedChat.id === message.chatId) {
                if (session?.user.id !== message.senderId) {
                    setSelectedChat((prev) => {
                        if (prev.id === message.chatId) {
                            return {
                                ...prev,
                                messages: [...prev.messages, message],
                            };
                        } else {
                            return prev;
                        }
                    });
                }
            }
        };
        currentSocket?.on("receive-msg", handleReceiveMessage);
        return () => {
            currentSocket?.off("receive-msg", handleReceiveMessage);
        };
    }, [socket, selectedChat, session, setSelectedChat]);

    const sendMessage = async (newMessage: Message) => {
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/api/chat/message/send`,
                {
                    senderId: newMessage.senderId,
                    receiverId: newMessage.receiverId,
                    message: newMessage.message,
                    chatId: tempSelectedChat.id,
                    attachments: newMessage.attachments,
                }
            );
            if (response.status === 201) {
                socket.current?.emit("send-message", {
                    senderId: newMessage.senderId,
                    receiverId: newMessage.receiverId,
                    message: newMessage.message,
                    chatId: tempSelectedChat.id,
                    attachments: newMessage.attachments,
                });
                setSelectedChat((prev) => {
                    if (prev.id === newMessage.chatId) {
                        return {
                            ...prev,
                            messages: [...prev.messages, newMessage],
                        };
                    } else {
                        return prev;
                    }
                });
            }
        } catch (error) {
            toast.error("Failed to send message");
        }
    };

    return (
        <div className="flex flex-col justify-between w-full h-full">
            <ChatTopbar selectedChat={tempSelectedChat} />
            <ChatList
                messages={messagesState}
                selectedChat={tempSelectedChat}
                sendMessage={sendMessage}
                isMobile={isMobile}
            />
        </div>
    );
}
