import { useSession } from "next-auth/react";
import React, { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ChatBottombar from "./chatBottomBar";
import { Chat, Message } from "@/app/lib/types";
import { cn } from "@/app/lib/utils";
import { CldImage } from "next-cloudinary";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "../ui/button";

interface ChatListProps {
  messages?: Message[];
  selectedChat: Chat;
  sendMessage: (newMessage: Message) => void;
  isMobile: boolean;
  cloudinaryOptions: any;
}

export function ChatList({
  messages,
  selectedChat,
  sendMessage,
  isMobile,
  cloudinaryOptions,
}: ChatListProps) {

  const { data: session } = useSession();
  const [selectedUser, setSelectedUser] = React.useState(selectedChat.users.find(user => user.id !== session?.user.id))
  const [sessionUser, setSessionUser] = React.useState(selectedChat.users.find(user => user.id === session?.user.id))
  const [clickAttachment, setClickAttachment] = React.useState(false)
  const [selectedAttachment, setSelectedAttachment] = React.useState('')
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const handleCloseDialog = () => {
    setClickAttachment(false);
    setSelectedAttachment('');
  };

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
                      src={selectedUser.image}
                      alt={selectedUser.image}
                      width={6}
                      height={6}
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                )}
                {message.message != '' && <span className={`bg-accent p-3 rounded-md max-w-xs ${message.senderId !== selectedUser?.id && 'bg-black text-white'}`}>
                  {message.message}
                </span>}
                {message.attachments?.length > 0 && (
                  <div className="flex flex-col gap-2">
                    {message.attachments.map((attachment, index) => (
                      <CldImage
                        key={index}
                        src={attachment.url}
                        width={150}
                        height={150}
                        crop="fill"
                        alt={'Attachment'}
                        className="rounded-md"
                        onClick={() => {
                          setSelectedAttachment(attachment.url);
                          setClickAttachment(true);
                        }}
                      />
                    ))}
                  </div>
                )}
                {message.senderId !== selectedUser?.id && (
                  <Avatar className="flex justify-center items-center">
                    <AvatarImage
                      src={sessionUser?.image}
                      alt={sessionUser?.userName}
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
      <Dialog
          open={clickAttachment}
          onOpenChange={handleCloseDialog}
        >
          <DialogTrigger></DialogTrigger>
          <DialogContent>
            <CldImage
              src={selectedAttachment}
              width={500}
              height={500}
              sizes="100vw"
              crop="fill"
              alt={'Attachment'}
              className="rounded-md"
            />
          </DialogContent>
        </Dialog>
      <ChatBottombar
        sendMessage={sendMessage}
        isMobile={isMobile}
        selectedChat={selectedChat}
        cloudinaryOptions={cloudinaryOptions}
      />
    </div >
  );
}
