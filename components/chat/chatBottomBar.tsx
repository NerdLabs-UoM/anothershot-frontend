"use client";

import { Paperclip, SendHorizontal, ThumbsUp } from "lucide-react";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { CldUploadWidget, CldUploadWidgetResults } from "next-cloudinary";
import { AnimatePresence, motion } from "framer-motion";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/app/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { EmojiPicker } from "./emojiPicker";
import { Attachment, Chat, Message } from "@/app/lib/types";

interface ChatBottombarProps {
  sendMessage: (newMessage: Message) => void;
  selectedChat: Chat;
  isMobile: boolean;
  cloudinaryOptions: any;
}

export const BottombarIcons = [{ icon: Paperclip }];

export default function ChatBottombar({
  sendMessage,
  isMobile,
  selectedChat,
  cloudinaryOptions,
}: ChatBottombarProps) {
  const { data: session } = useSession();
  const [selectedUser, setSelectedUser] = React.useState(
    selectedChat.users.find((user) => user.id !== session?.user.id)
  );
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  const handleThumbsUp = () => {
    if (session && selectedUser) {
      const newMessage: any = {
        message: "👍",
        senderId: session.user.id,
        receiverId: selectedUser.id,
        chatId: selectedChat.id,
        attachments: [],
      };
      sendMessage(newMessage);
      setMessage("");
    }
  };

  const handleAttachmentSend = (url: string) => {
    const newAttachment: Attachment = {
      url: url,
      type: "image",
    };
    if (session && selectedUser) {
      const newMessage: any = {
        chatId: selectedChat.id,
        message: message.trim(),
        senderId: session.user.id,
        receiverId: selectedUser.id,
        attachments: [newAttachment],
      };
      sendMessage(newMessage);
      setMessage("");
    }
  };

  const handleSend = () => {
    if (message.trim()) {
      if (session && selectedUser) {
        const newMessage: any = {
          chatId: selectedChat.id,
          message: message.trim(),
          senderId: session.user.id,
          receiverId: selectedUser.id,
          attachments: [],
        };
        sendMessage(newMessage);
        setMessage("");
      }
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }

    if (event.key === "Enter" && event.shiftKey) {
      event.preventDefault();
      setMessage((prev) => prev + "\n");
    }
  };

  return (
    <div className="p-2 flex justify-between w-full items-center gap-2">
      <div className="flex">
        <CldUploadWidget
          onOpen={() => {}}
          onPublicId={(result) => {}}
          onSuccess={(results: CldUploadWidgetResults) => {
            handleAttachmentSend((results.info as any).secure_url);
          }}
          options={cloudinaryOptions}
          uploadPreset={`${process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}`}
        >
          {({ open }) => {
            return (
              <Button
                onClick={() => {
                  open();
                }}
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                )}
              >
                <Paperclip size={20} />
              </Button>
            );
          }}
        </CldUploadWidget>
      </div>
      <AnimatePresence initial={false}>
        <motion.div
          key="input"
          className="w-full relative"
          layout
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1 }}
          transition={{
            opacity: { duration: 0.05 },
            layout: {
              type: "spring",
              bounce: 0.15,
            },
          }}
        >
          <Textarea
            autoComplete="off"
            value={message}
            ref={inputRef}
            onKeyDown={handleKeyPress}
            onChange={handleInputChange}
            name="message"
            placeholder="Aa"
            style={{
              minHeight: "30px",
            }}
            className=" w-full border rounded-full flex items-center h-9 resize-none overflow-hidden bg-background"
          ></Textarea>
          <div className="absolute right-2 bottom-0.5  ">
            <EmojiPicker
              onChange={(value) => {
                setMessage(message + value);
                if (inputRef.current) {
                  inputRef.current.focus();
                }
              }}
            />
          </div>
        </motion.div>

        {message.trim() ? (
          <Link
            href="#"
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "h-9 w-9",
              "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white shrink-0"
            )}
            onClick={handleSend}
          >
            <SendHorizontal size={20} className="text-muted-foreground" />
          </Link>
        ) : (
          <Link
            href="#"
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "h-9 w-9",
              "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white shrink-0"
            )}
            onClick={handleThumbsUp}
          >
            <ThumbsUp size={20} className="text-muted-foreground" />
          </Link>
        )}
      </AnimatePresence>
    </div>
  );
}
