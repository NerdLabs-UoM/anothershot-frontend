import { BellRing, Check, CircleX } from "lucide-react"

import { cn } from "@/app/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import React, { useEffect } from "react"


type CardProps = React.ComponentProps<typeof Card>

export function NotificationCard(
  { className,
    id,
    title,
    description,
    read,
    unreadCount,
    updateUnreadCount,
    time,
    receiverId,
    onUpdateDelete,
    onUpdateRead, ...props }: CardProps &
    {
      id?: string,
      title: string,
      description: string | undefined,
      read: boolean,
      unreadCount?: number,
      updateUnreadCount?: (count: number) => void;
      time?: Date;
      receiverId?: string;
      onUpdateDelete?: (id: string) => void;
      onUpdateRead?: (id: string) => void;
    }) {
  const [isRead, setIsRead] = React.useState(read);

  useEffect(() => {
    setIsRead(read);
  }, [read])

  const handleRead = async () => {
    onUpdateRead && onUpdateRead(id ?? '');
    if (!isRead) {
      setIsRead(true);
      if (updateUnreadCount && unreadCount) {
        updateUnreadCount(unreadCount - 1)

      };
     
    }
  }

  const handleDelete = async () => {
    onUpdateDelete && onUpdateDelete(id ?? '');
    if (!isRead) {
      if (updateUnreadCount && unreadCount) {
        updateUnreadCount(unreadCount - 1)

      };
     
    }
  
  }

  function formatDate(date: Date) {
    const currentDate = new Date();
    const timestamp = currentDate.getTime();

    const notificationDate = new Date(date);
    const notifyTimeStamp = notificationDate.getTime(); 

    const diffTime = timestamp - notifyTimeStamp;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));


    if (diffDays >= 2) {
      return notificationDate.toDateString();
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else {
      const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
      if (diffHours > 0) {
        return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
      }
      const diffMinutes = Math.floor(diffTime / (1000 * 60));
      if (diffMinutes > 0) {
        return `${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''} ago`;
      }else{
        return `Just now`;
      }
      
    }
  }
  
  
  return (
    <Card className={cn("shadow-md mb-1 p-2", className)} {...props}>
      {!isRead && <span className="flex h-2 w-2 rounded-full bg-sky-500" />}
      <CardContent className="relative ">
        <div className="static grid grid grid-col-2 grid-flow-col ">
          <div className="flex flex-col">
            <div className="text-m leading-none h-auto" >{title}</div>
            <div className="text-sm text-gray-500">{description}</div>
            <div className="text-xs ml-32">{time?formatDate(time):""}</div>
            <div ><Button variant="ghost" className="m-0 p-0 text-blue-800 hover:bg-transparent" onClick={handleRead}>{isRead ? "Read" : "Mark as Read"} </Button></div>
          </div>
        </div>
        <CircleX className="absolute text-gray-500 border-none bg-white size-5 absolute top-0 ml-[265px] hover:cursor-pointer" strokeWidth={0.75} onClick={handleDelete} />
      </CardContent>

    </Card>
  )
}

