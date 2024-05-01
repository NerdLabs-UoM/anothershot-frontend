"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, BellDot, Check } from "lucide-react";
import { Button } from "@/components/ui/button";


import Logo from "@/public/Logo";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { NotifySection } from "./notification/notifySection";



const Header = () => {
  const { data: session } = useSession()
  const [loggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [isClicked, setIsClicked] = useState<boolean>(false);

  useEffect(() => {
    if (session) {
      setIsLoggedIn(true)
    }
  }, [session])
  const router = useRouter();

  const handleNotifyClick = () => {
    setIsClicked(!isClicked);
  }

  return (
    <div>
      <div className="flex flex-row justify-between item-center h-24 px-5 sm:px-20 pt-10 " >
        <div onClick={() => router.push("/")} className="cursor-pointer">
          <Logo />
        </div>
        <div className="flex gap-4">
          {loggedIn && <Button variant="ghost" className="h-auto mb-7" onClick={() => signOut({
            callbackUrl: `${window.location.origin}/sign-in`
          })}>Sign Out</Button>}
          <Button variant="ghost" className="h-auto mb-8 hover:bg-white" onClick={() => { router.push(`/search`) }}><Search /></Button>
          <NotifySection logged={loggedIn} />            
        </div>
      </div>
      <div className="flex justify-center">
        <hr className="border-b-2 border-solid border-zinc-300 align-middle w-11/12" />
      </div>
    </div>
  );
};

export default Header;
