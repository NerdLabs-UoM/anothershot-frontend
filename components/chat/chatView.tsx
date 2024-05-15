import React, { useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Chat, Message } from "@/lib/types";
import ChatTopbar from "./chatTopBar";
import { ChatList } from "./chatList";
import { useSession } from "next-auth/react";
import { useSocket } from "@/context/socketContext";

interface ChatProps {
    messages?: Message[];
    selectedChat: Chat;
    isMobile: boolean;
    setSelectedChat: React.Dispatch<React.SetStateAction<Chat | undefined>>;
}

export function ChatView({ messages, selectedChat, isMobile, setSelectedChat }: ChatProps) {

    const [tempSelectedChat, setTempSelectedChat] = React.useState<Chat>(selectedChat);
    const [messagesState, setMessages] = React.useState<Message[]>(messages ?? []);
    const { data: session } = useSession()
    const { socket } = useSocket()

    useEffect(() => {
        setTempSelectedChat(selectedChat);
        setMessages(messages ?? []);
    }, [selectedChat, messages]);

    useEffect(() => {
        const currentSocket = socket;
        const handleReceiveMessage = (message: Message) => {
            if (selectedChat.id === message.chatId) {
                if (session?.user.id !== message.senderId) {
                    setSelectedChat((prev) => {
                        if (prev && prev.id === message.chatId) {
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

    const cloudinaryOptions = {
        tags: ["attachments"],
        useAssetFolderAsPublicIdPrefix: true,
        singleUploadAutoClose: false,
        sources: ["local"],
        googleApiKey: "<image_search_google_api_key>",
        showAdvancedOptions: true,
        cropping: true,
        multiple: false,
        defaultSource: "local",
        resourceType: "image",
        folder: `anothershot/${session?.user.id}/inbox/${selectedChat.id}`,
        styles: {
            palette: {
                window: "#ffffff",
                sourceBg: "#f4f4f5",
                windowBorder: "#90a0b3",
                tabIcon: "#000000",
                inactiveTabIcon: "#555a5f",
                menuIcons: "#555a5f",
                link: "#000000",
                action: "#000000",
                inProgress: "#464646",
                complete: "#000000",
                error: "#cc0000",
                textDark: "#000000",
                textLight: "#fcfffd",
                theme: "white",
            },
        },
    }

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
                if (socket) {
                    socket.emit("send-message", {
                        senderId: newMessage.senderId,
                        receiverId: newMessage.receiverId,
                        message: newMessage.message,
                        chatId: tempSelectedChat.id,
                        attachments: newMessage.attachments,
                    });
                }
                setSelectedChat((prev) => {
                    if (prev && prev.id === newMessage.chatId) {
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
    }

    return (
        <div className="flex flex-col justify-between w-full h-full">
            <ChatTopbar selectedChat={tempSelectedChat} />
            <ChatList
                messages={messagesState}
                selectedChat={tempSelectedChat}
                sendMessage={sendMessage}
                isMobile={isMobile}
                cloudinaryOptions={cloudinaryOptions}
            />
        </div>
    );
}
