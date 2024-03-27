"use client";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { link } from "fs";
import { useSession } from "next-auth/react";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { handleClientScriptLoad } from "next/script";
import React from "react";

function AdminHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const isPathProfile = pathname.endsWith("/profile");

  const path = (path: string) => {
    const isPathName = pathname.endsWith("/" + path);
    return isPathName;
  }

  const handleDirection = (dir: string) => {
    if (pathname == `/user/admin/${session?.user.id}`) {
      router.push(`${session?.user.id}/${dir}`);
    } else {
      router.push(`${dir}`);
    }
  };
  return (
    <NavigationMenu className={`w-full flex-col sm:flex-row justify-between ${isPathProfile ? "hidden" : ""}`}>
      <NavigationMenuItem className="list-none">
        <NavigationMenuLink
          onClick={() => handleDirection("dashboard")}
          className={`${path("dashboard") ? 'bg-slate-100 text-gray-900' : ''} ${navigationMenuTriggerStyle()} cursor-pointer `}
        >
          Dashboard
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem className="list-none">
        <NavigationMenuLink
          onClick={() => handleDirection("user-management")}
          className={`${path("user-management") ? 'bg-slate-100 text-gray-900' : ''} ${navigationMenuTriggerStyle()} cursor-pointer `}
        >
          User Management
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem className="list-none">
        <NavigationMenuLink
          onClick={() => handleDirection("report-handling")}
          className={`${path("report-handling") ? 'bg-slate-100 text-gray-900' : ''} ${navigationMenuTriggerStyle()} cursor-pointer `}
        >
          Report Handling
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem className="list-none">
        <NavigationMenuLink
          onClick={() => handleDirection("payment-handling")}
          className={`${path("payment-handling") ? 'bg-slate-100 text-gray-900' : ''} ${navigationMenuTriggerStyle()} cursor-pointer`}
        >
          Payment Handling
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem className="list-none">
        <NavigationMenuLink
          onClick={() => handleDirection("inbox")}
          className={`${path("inbox") ? 'bg-slate-100 text-gray-900' : ''} ${navigationMenuTriggerStyle()} cursor-pointer `}
        >
          Inbox
        </NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenu>
  );
}

export default AdminHeader;
