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
    <NavigationMenu className={`w-full flex-col sm:flex-row justify-between bg-zinc-100 rounded-md ${isPathProfile ? "hidden" : ""}`}>
      <NavigationMenuItem className="list-none">
        <NavigationMenuLink
          onClick={() => handleDirection("dashboard")}
          className={`m-1  ${path("dashboard") ? 'bg-white hover:bg-white text-gray-900 shadow-sm' : 'bg-transparent'} ${navigationMenuTriggerStyle()} cursor-pointer `}
        >
          Dashboard
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem className="list-none">
        <NavigationMenuLink
          onClick={() => handleDirection("user-management")}
          className={`m-1  ${path("user-management") ? 'bg-white hover:bg-white text-gray-900 shadow-sm' : 'bg-transparent'} ${navigationMenuTriggerStyle()} cursor-pointer `}
        >
          User Management
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem className="list-none">
        <NavigationMenuLink
          onClick={() => handleDirection("report-handling")}
          className={`m-1  ${path("report-handling") ? 'bg-white hover:bg-white text-gray-900 shadow-sm' : 'bg-transparent'} ${navigationMenuTriggerStyle()} cursor-pointer `}
        >
          Report Handling
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem className="list-none">
        <NavigationMenuLink
          onClick={() => handleDirection("payment-handling")}
          className={`m-1  ${path("payment-handling") ? 'bg-white hover:bg-white text-gray-900 shadow-sm' : 'bg-transparent'} ${navigationMenuTriggerStyle()} cursor-pointer`}
        >
          Payment Handling
        </NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenu>
  );
}

export default AdminHeader;
