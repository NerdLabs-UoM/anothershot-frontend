import { BellRing, Check } from "lucide-react"

import { cn } from "@/app/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import React, { useEffect } from "react"
import axios from "axios"
import { set } from "lodash"

type CardProps = React.ComponentProps<typeof Card>

export function NotificationCard(
  { className,
    id,
    title,
    description,
    read,
    unreadCount,
    updateUnreadCount, ...props }: CardProps &
    {
      id?: string,
      title: string,
      description: string | undefined,
      read: boolean,
      unreadCount?: number,
      updateUnreadCount?: (count: number) => void;
    }) {
  const [isRead, setIsRead] = React.useState(read);
  const [unreadCount1, setUnreadCount1] = React.useState(unreadCount);

  useEffect(() => {
    setIsRead(read);
  }, [read])


  const handleClick = async () => {
    if (!isRead) {
      setIsRead(true);
      if (updateUnreadCount && unreadCount) {
        updateUnreadCount(unreadCount - 1)

      };

      try {
        // Update the read state in the database
        const res = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/api/notification/update`, { id, read: true });
        console.log("Update notification success:", res.data);
      } catch (error) {
        console.log("Error updating notification:", error);
      }
    }
  }
  return (
    <Card className={cn("h-20", className)} {...props}>
      <CardContent className="flex items-center gap-4 mt-1">

        {!isRead && <span className="flex h-2 w-2 rounded-full bg-sky-500" />}
        <div className="">
          <div>
            <p className="text-sm font-medium leading-none">{title}</p>
            <p className="text-xs text-gray-500">{description}</p>
          </div>
          <Button variant="ghost" className="m-0 p-0 text-blue-800 hover:bg-transparent" onClick={handleClick}>{isRead ? "Read" : "Mark as Read"} </Button>

        </div>
      </CardContent>

    </Card>
  )
}

