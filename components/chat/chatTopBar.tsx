import React, { useEffect } from 'react'
import { useSession } from 'next-auth/react';
import { Info } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/app/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { buttonVariants } from '@/components/ui/button';
import { Chat } from '@/app/lib/types';

interface ChatTopbarProps {
    selectedChat: Chat;
}

export const TopbarIcons = [{ icon: Info }];


export default function ChatTopbar({ selectedChat }: ChatTopbarProps) {

    const { data: session } = useSession()
    const [selectedUser, setSelectedUser] = React.useState(selectedChat.users.find(user => user.id !== session?.user.id))

    useEffect(() => {
        setSelectedUser(selectedChat.users.find(user => user.id !== session?.user.id))
    }, [selectedChat, session?.user.id])

    return (
        <div className="w-full h-20 flex p-4 justify-between items-center border-b">
            <div className="flex items-center gap-2">
                <Avatar className="flex justify-center items-center">
                    <AvatarImage
                        src={selectedUser?.image}
                        alt={selectedUser?.name}
                        width={6}
                        height={6}
                        className="w-10 h-10 "
                    />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <span className="font-medium">{selectedUser?.name}</span>
                    {/* <span className="text-xs">Active 2 mins ago</span> */}
                </div>
            </div>

            <div>
                {TopbarIcons.map((icon, index) => (
                    <Link
                        key={index}
                        href="#"
                        className={cn(
                            buttonVariants({ variant: "ghost", size: "icon" }),
                            "h-9 w-9",
                            "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                        )}
                    >
                        <icon.icon size={20} className="text-muted-foreground" />
                    </Link>
                ))}
            </div>
        </div>
    )
}
