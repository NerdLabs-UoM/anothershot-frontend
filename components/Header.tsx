"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Search ,LogOut} from "lucide-react";
import { Button } from "@/components/ui/button";

import Logo from "@/public/Logo";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { NotifySection } from "./notification/notifySection";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Header = () => {
  const { data: session } = useSession();
  const [loggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    if (session) {
      setIsLoggedIn(true);
    }
  }, [session]);
  const router = useRouter();

  return (
    <div>
      <div className="flex flex-row justify-between item-center h-24 px-5 sm:px-20 pt-8 ">
        <div onClick={() => router.push("/")} className="cursor-pointer">
          <Logo />
        </div>
        <div className="flex gap-1">
          {loggedIn && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    className="h-auto mb-8 font-bold hover:bg-slate-50 rounded-3xl"
                    onClick={() =>
                      signOut({
                        callbackUrl: `${window.location.origin}/sign-in`,
                      })
                    }
                  >
                    <LogOut className="w-5 font-bold"/>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <div>Logout</div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-auto mb-8 hover:bg-white"
                  onClick={() => {
                    router.push(`/search`);
                  }}
                >
                  <Search />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <div>Search</div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="m-0 p-0 pt-1">
                  <NotifySection logged={loggedIn} />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <div>Notification</div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <div className="flex justify-center">
        <hr className="border-b-2 border-solid border-zinc-300 align-middle w-11/12" />
      </div>
    </div>
  );
};

export default Header;
