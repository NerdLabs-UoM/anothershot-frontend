// import { Message, UserData } from "@/app/data";
import { useSession } from "next-auth/react";
import React, { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ChatBottombar from "./chatBottomBar";
import { Chat, Message } from "@/app/lib/types";
import { cn } from "@/app/lib/utils";

interface ChatListProps {
  messages?: Message[];
  selectedChat: Chat;
  sendMessage: (newMessage: Message) => void;
  isMobile: boolean;
}

export function ChatList({
  messages,
  selectedChat,
  sendMessage,
  isMobile
}: ChatListProps) {

  const { data: session } = useSession();
  const [selectedUser, setSelectedUser] = React.useState(selectedChat.users.find(user => user.id !== session?.user.id))
  const [sessionUser, setSessionUser] = React.useState(selectedChat.users.find(user => user.id === session?.user.id))

  const messagesContainerRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="w-full overflow-y-auto overflow-x-hidden h-full flex flex-col">
      <div
        ref={messagesContainerRef}
        className="w-full overflow-y-auto overflow-x-hidden h-full flex flex-col"
      >
        <AnimatePresence>
          {messages?.map((message, index) => (
            <motion.div
              key={index}
              layout
              initial={{ opacity: 0, scale: 1, y: 50, x: 0 }}
              animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, scale: 1, y: 1, x: 0 }}
              transition={{
                opacity: { duration: 0.1 },
                layout: {
                  type: "spring",
                  bounce: 0.3,
                  duration: messages.indexOf(message) * 0.05 + 0.2,
                },
              }}
              style={{
                originX: 0.5,
                originY: 0.5,
              }}
              className={cn(
                "flex flex-col gap-2 p-4 whitespace-pre-wrap",
                message.senderId !== selectedUser?.id ? "items-end" : "items-start"
              )}
            >
              <div className="flex gap-3 items-center">
                {message.senderId === selectedUser?.id && (
                  <Avatar className="flex justify-center items-center">
                    <AvatarImage
                      src={message.sender.image}
                      alt={message.sender.name}
                      width={6}
                      height={6}
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                )}
                <span className={`bg-accent p-3 rounded-md max-w-xs ${message.senderId !== selectedUser?.id && 'bg-black text-white'}`}>
                  {message.message}
                </span>
                {message.senderId !== selectedUser?.id && (
                  <Avatar className="flex justify-center items-center">
                    <AvatarImage
                      src={sessionUser?.image}
                      alt={sessionUser?.name}
                      width={6}
                      height={6}
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <ChatBottombar sendMessage={sendMessage} isMobile={isMobile} selectedChat={selectedChat} />
    </div >
  );
}
