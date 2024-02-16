"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";

import {
  Home,
  Blocks,
  UserRound,
  Camera,
  LogIn,
  ListEnd,
  MessageSquareText,
  Image,
  Menu,
} from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";

interface sessionTypes {
  Photographer: boolean;
  client: boolean;
  loged: boolean;
}
const sessions: sessionTypes = {
  Photographer: true,
  client: false,
  loged: true,
};

const Navbar = () => {
  let navigationMenuContent;
  const pathname = usePathname();
  const isPathAdmin = pathname.startsWith('/admin');
  const router = useRouter();
  const {data:session} = useSession()
  
  const handleNavigation = () => {
    const path = `user/photographer/${session?.user.id}/profile`
    if(session?.user?.id && pathname!=="/"+ path){
      router.replace(path)
    }
  }
  
  const userId = session?.user.id


  if (sessions.loged && sessions.client) {
    navigationMenuContent = !isPathAdmin && (
      <NavigationMenu>
        <NavigationMenuList className="bg-black rounded-t-3xl sm:px-4 py-3 sm:gap-20">
          <NavigationMenuItem className="px-6 sm:px-10">
            <Link href="/Home" legacyBehavior passHref>
              <NavigationMenuLink
                className={
                  pathname == "/Home"
                    ? "flex flex-col items-center text-white"
                    : "flex flex-col items-center text-slate-500"
                }
              >
                <Home className="w-[20px]" />
                <span className="text-xs">Home</span>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem className="px-6 sm:px-10">
            <Link href="/Client-profile" legacyBehavior passHref>
              <NavigationMenuLink
                className={
                  pathname == "/Client-profile"
                    ? "flex flex-col items-center text-white"
                    : "flex flex-col items-center text-slate-500"
                }
              >
                <UserRound className="w-[20px]" />
                <span className="text-xs">Profile</span>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem className="px-6 sm:px-10 ">
            <Link href="/Client-bookings" legacyBehavior passHref>
              <NavigationMenuLink
                className={
                  pathname == "/Client-bookings"
                    ? "flex flex-col items-center text-white"
                    : "flex flex-col items-center text-slate-500"
                }
              >
                <ListEnd className="w-[20px]" />
                <span className="text-xs">Bookings</span>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem className="px-6 sm:px-10">
            <Link href="/inbox" legacyBehavior passHref>
              <NavigationMenuLink
                className={
                  pathname == "/inbox"
                    ? "flex flex-col items-center text-white"
                    : "flex flex-col items-center text-slate-500"
                }
              >
                <MessageSquareText className="w-[20px]" />
                <span className="text-xs">Inbox</span>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );
  } else if (sessions.loged && sessions.Photographer && pathname!="/admin") {
    navigationMenuContent = !isPathAdmin && (
      <NavigationMenu>
        <NavigationMenuList className="bg-black rounded-t-3xl sm: px-4 py-3 sm:gap-20">
          <NavigationMenuItem className="px-8 sm:px-6">
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink
                className={
                  pathname == "/"
                    ? "flex flex-col items-center shadow-lg text-white"
                    : "flex flex-col items-center text-white"
                }
              >
                <Home className="w-[20px]" />
                <span className="text-xs">Home</span>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          
          <NavigationMenuItem className="px-8 sm:px-6">
            
            <Button variant={null}  onClick={()=>{
              handleNavigation();
            }} >
              <NavigationMenuLink
                className={
                  pathname == "/photographer/profile"
                  ? "flex flex-col items-center shadow-lg"
                  : "flex flex-col items-center text-white"
                }
              >
                <UserRound className="w-[20px]" />
                <span className="text-xs">Profile</span>
              </NavigationMenuLink>
            </Button>
          </NavigationMenuItem>
          <NavigationMenuItem className="px-8 sm:px-6 hidden lg:flex">
            <Link href={`user/photographer/${session?.user.id}/feed`} legacyBehavior passHref>
              <NavigationMenuLink
                className={
                  pathname == "/Photographer-feed"
                  ? "flex flex-col items-center shadow-lg"
                  : "flex flex-col items-center text-white"
                }
              >
                <Blocks className="w-[20px]" />
                <span className="text-xs">Feed</span>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem className=" hidden lg:flex px-8 sm:px-6 ">
            <Link href={`user/photographer/${session?.user.id}/albums`} legacyBehavior passHref>
              <NavigationMenuLink
                className={
                  pathname == "/Phorographer-albums"
                  ? "flex flex-col items-center shadow-lg"
                  : "flex flex-col items-center text-white"
                }
              >
                <Image className="w-[20px]" />
                <span className="text-xs">Albums</span>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem className="px-8 sm:px-6 hidden lg:flex">
            <Link href={`user/photographer/${session?.user.id}/bookings`} legacyBehavior passHref>
              <NavigationMenuLink
                className={
                  pathname == "/Photographer-bookings"
                  ? "flex flex-col items-center shadow-lg"
                  : "flex flex-col items-center text-white"
                }
              >
                <ListEnd className="w-[20px]" />
                <span className="text-xs">Bookings</span>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem className="px-8 sm:px-6 :flex">
            <Link href={`user/photographer/${session?.user.id}/inbox`} legacyBehavior passHref>
              <NavigationMenuLink
                className={
                  pathname == "/inbox"
                  ? "flex flex-col items-center shadow-lg"
                  : "flex flex-col items-center text-white"
                }
              >
                <MessageSquareText className="w-[20px]" />
                <span className="text-xs">Inbox</span>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem className="flex lg:hidden px-8 sm:px-6">
            <NavigationMenuLink>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex flex-col items-center text-slate-500 active:text-white">
                  <Menu className="w-[20px]" />
                  <span className="text-xs">Menu</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <Link href="/photographer/bookings" legacyBehavior passHref>
                    <DropdownMenuItem
                      className={
                        pathname == "/Home"
                          ? "text-slate-500"
                          : "text-clipblack"
                      }
                    >
                      Bookings
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/phorographer/feed" legacyBehavior passHref>
                    <DropdownMenuItem
                      className={
                        pathname == "/Home"
                          ? "text-slate-500"
                          : "text-clipblack"
                      }
                    >
                      Feed
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/phorographer/albums" legacyBehavior passHref>
                    <DropdownMenuItem
                      className={
                        pathname == "/Home"
                          ? "text-slate-500"
                          : "text-clipblack"
                      }
                    >
                      Albums
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuContent>
              </DropdownMenu>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );
  } else if(pathname!="/admin"){
    navigationMenuContent =!isPathAdmin && (
      <NavigationMenu>
        <NavigationMenuList className="bg-black rounded-t-3xl sm: px-4 py-3 sm:gap-20">
          <NavigationMenuItem className="px-10">
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink
                className={
                  pathname == "/"
                    ? "flex flex-col items-center text-white"
                    : "flex flex-col items-center text-slate-500"
                }
              >
                <Home className="w-[20px]" />
                <span className="text-xs">Home</span>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem className="px-10">
            <Link href="/sign-up" legacyBehavior passHref>
              <NavigationMenuLink
                className={
                  pathname == "/sign-up"
                    ? "flex flex-col items-center text-white"
                    : "flex flex-col items-center text-slate-500"
                }
              >
                <LogIn className="w-[20px]" />

                <span className="text-xs">SignIn</span>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem className="px-10">
            <Link href="/About" legacyBehavior passHref>
              <NavigationMenuLink
                className={
                  pathname == "/About"
                    ? "flex flex-col items-center text-white"
                    : "flex flex-col items-center text-slate-500"
                }
              >
                <Camera className="w-[20px]" />
                <span className="text-xs">About</span>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );
  }

  return (
    <div className="fixed inset-x-0 bottom-0 w-full text-black z-50">
      <div className="flex justify-center">{navigationMenuContent}</div>
    </div>
  );
};

export default Navbar;
