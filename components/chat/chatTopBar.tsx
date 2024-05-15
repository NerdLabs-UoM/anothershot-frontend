import React, { useEffect } from 'react'
import { useSession } from 'next-auth/react';
import { Trash2, Info } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button';
import { Chat } from '@/app/lib/types';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface ChatTopbarProps {
    selectedChat: Chat;
}

export const TopbarIcons = [{ icon: Info }, { icon: Trash2 }];


export default function ChatTopbar({ selectedChat }: ChatTopbarProps) {

    const { data: session } = useSession()
    const [selectedUser, setSelectedUser] = React.useState(selectedChat?.users.find(user => user.id !== session?.user.id))

    useEffect(() => {
        setSelectedUser(selectedChat?.users.find(user => user.id !== session?.user.id))
    }, [selectedChat, session?.user.id])

    const handleDeleteChat = async () => {
        try {
            const userId = session?.user.id;
            const chatId = selectedChat.id;
            const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/chat/delete/${userId}/${chatId}`);
            toast.success('Chat deleted');
        } catch (error) {
            toast.error('Error deleting chat');
        }
    }

    return (
        <div className="w-full h-20 flex p-4 justify-between items-center border-b">
            <div className="flex items-center gap-2">
                <Avatar className="flex justify-center items-center">
                    <AvatarImage
                        src={selectedUser?.image}
                        alt={selectedUser?.userName}
                        width={6}
                        height={6}
                        className="w-10 h-10 "
                    />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <span className="font-medium">{selectedUser?.userName}</span>
                    {/* <span className="text-xs">Active 2 mins ago</span> */}
                </div>
            </div>

            <div>
                {/* {TopbarIcons.map((icon, index) => (
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
                ))} */}
                <AlertDialog>
                    <AlertDialogTrigger>
                        <Button
                            variant="destructive"
                            size="icon"
                            className="h-9 w-9"
                        >
                            <Trash2 size={20} className="text-white-foreground " />
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete your chat with {selectedUser?.userName}.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDeleteChat}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

            </div>
        </div>
    )
}
