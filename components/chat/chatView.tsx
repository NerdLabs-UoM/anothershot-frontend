// import { Message, UserData } from "@/app/data";
import React, { useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Chat, Message } from "@/app/lib/types";
import ChatTopbar from "./chatTopBar";
import { ChatList } from "./chatList";

interface ChatProps {
    messages?: Message[];
    selectedChat: Chat;
    isMobile: boolean;
}

export function ChatView({ messages, selectedChat, isMobile }: ChatProps) {

    const [tempSelectedChat, setTempSelectedChat] = React.useState<Chat>(selectedChat);
    const [messagesState, setMessages] = React.useState<Message[]>(
        messages ?? []
    );

    useEffect(() => {
        setTempSelectedChat(selectedChat);
        setMessages(messages ?? []);
    }, [selectedChat, messages]);

    //send to db
    const sendMessage = async (newMessage: Message) => {
        setMessages([...messagesState, newMessage]);
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
                //success
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
