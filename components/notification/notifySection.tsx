"use client"

import axios from "axios";
import React, { useState, useEffect } from "react";
import { BellDot, Check, Bell } from 'lucide-react';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area"
import { useParams } from "next/navigation";
import { NotificationCard } from "./notifyCard";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";
import { defaultNotify } from "@/app/data/defaultNotify";
import { Notification } from "@/lib/types";
import toast from "react-hot-toast";
import { useSocket } from "@/context/socketContext";

interface NotifyProps {
    logged: boolean
}

export const NotifySection: React.FC<NotifyProps> = ({ logged }) => {
    const { data: session } = useSession();
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [isReadAll, setIsReadAll] = useState<boolean>(false);
    const [count, setCount] = useState<number>(0);
    const { socket } = useSocket();

    useEffect(() => {
        const fetchNotify = async () => {
            if (session?.user?.id === undefined) return;
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/notification/${session?.user?.id}`);
                setNotifications(res.data.reverse());
                const unread = res.data.filter((notification: Notification) => !notification.read);
                setCount(unread.length);
                setIsReadAll(unread.length === 0);
            } catch (e) {
                toast.error("Failed to display notifications");
            }
        }
        fetchNotify();
    }, [session?.user?.id])

    useEffect(() => {
        
        const handleReceiveNotification = (notification: Notification) => {
            if (notification.receiverId === session?.user?.id) {
                setNotifications(prev => [notification, ...prev]);
                if (!notification.read) {
                    setCount(prev => prev + 1);
                }
            }
        }
        socket?.on("receive-notify", handleReceiveNotification);
        return () => {
            socket?.off("receive-notify", handleReceiveNotification);
        };
    }, [socket, session?.user?.id]);

    const updateUnreadCount = (newCount: number) => {
        setCount(newCount);
        setIsReadAll(newCount === 0);
    };

    return (
        <Sheet>
            <SheetTrigger>
                {isReadAll ? <Bell className="fill-black mb-8" /> : <BellDot className="fill-black mb-8" />}
            </SheetTrigger>
            <SheetContent>
                <SheetTitle>Notifications</SheetTitle>
                <SheetDescription>{isReadAll ? "You have no unread messages" : `You have ${count} unread messages.`}</SheetDescription>

                <ScrollArea className="h-[600px]">
                    <div className="flex flex-col gap-3 mt-5">
                        {logged ? (notifications.map((notification, index) => (
                            <NotificationCard
                                key={index}
                                id={notification.id}
                                title={notification.title}
                                description={notification.description}
                                read={notification.read}
                                unreadCount={count}
                                updateUnreadCount={updateUnreadCount} />

                        ))) : (defaultNotify.map((notification, index) => (
                            <NotificationCard
                                key={index}
                                title={notification.title}
                                description={notification.description}
                                read={notification.read} />

                        )))}
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    )
}