"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, BellDot } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import Logo from "@/public/Logo";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";

interface Notifications {
  id: any;
  title: string;
  description: string;
  time: string;
  button: boolean;
}

const NotificationData: Notifications[] = [
  {
    id: 1,
    title: "Mark",
    description: "This is a notification",
    time: "2 minutes ago",
    button: true,
  },
  {
    id: 2,
    title: "Shared",
    description: "This is a notification",
    time: "2 minutes ago",
    button: false,
  },
  {
    id: 3,
    title: "Liked",
    description: "This is a notification",
    time: "2 minutes ago",
    button: true,
  },
  {
    id: 4,
    title: "Notification",
    description: "This is a notification",
    time: "2 minutes ago",
    button: false,
  },
];

const Header = () => {
  const {data:session} = useSession()
  const[loggedIn,setIsLoggedIn] = useState<boolean>(false)
  useEffect(() =>{
    if(session){
      setIsLoggedIn(true)
    }
  },[session])
  const router = useRouter();
  return (
    <div>
      <div className="flex flex-row justify-between item-center h-24 px-5 sm:px-20 pt-10 ">
        <Logo />
        <div className="flex gap-4">
       {loggedIn&&<Button variant="ghost" className ="h-auto mb-7" onClick={() => signOut({
                    callbackUrl: `${window.location.origin}/sign-in`
                })}>Sign Out</Button>}
          <Button  variant="ghost" className ="h-auto mb-8 hover:bg-white" onClick={()=>{router.push(`/search`)}}><Search /></Button>
          <Sheet>
            <SheetTrigger>
              <BellDot className="fill-black mb-8"  />
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Notification</SheetTitle>
                {NotificationData.map((Notification) => {
                  return (
                    <div
                      key={Notification.id}
                      className="flex flex-col justify-start border-b py-2"
                    >
                      <div className="flex flex-row justify-between">
                        <div className="font-bold">{Notification.title}</div>
                        <div className="text-sm">{Notification.time}</div>
                      </div>
                      <div className="flex flex-row justify-between">
                        <div className="text-sm">
                          {Notification.description}
                        </div>
                        {Notification.button ? (
                          <Button
                            variant="default"
                            className="w-3/12 h-7 sm:w-2/12"
                            onClick={() => router.push("/")}
                          >
                            view
                          </Button>
                        ) : null}
                      </div>
                    </div>
                  );
                })}
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <div className="flex justify-center">
        <hr className="border-b-2 border-solid border-zinc-300 align-middle w-11/12" />
      </div>
    </div>
  );
};

export default Header;
