"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter} from "next/navigation";
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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";



const Navbar = () => {

const [isPhotographer,setIsPhotographer] = useState <boolean>(false);
const [isClient,setIsClient] = useState<boolean>(false);
const [isAdmin,setIsAdmin] = useState<boolean>(false);
const [isLogged,setIsLogged] = useState<boolean>(true);

  let navigationMenuContent;
  const pathname = usePathname();
  const isPathAdmin = pathname.startsWith("/admin");
  const router = useRouter();
  const { data: session } = useSession();
 
  useEffect(() =>{
  if(session?.user.userRole =="PHOTOGRAPHER"){
    console.log(isPhotographer)
    setIsPhotographer(true);
  }else if(session?.user.userRole =="CLIENT"){
    setIsClient(true)
  }else if(session?.user.userRole =="ADMIN"){
    setIsAdmin(true)
  }else if(session?.expires){
    setIsLogged(false);
  }

 },[session])
 
  const handleDirection = (dir: string) => {
   if(pathname == `/user/photographer/${session?.user.id}`) {
      router.push(`${session?.user.id}/${dir}`);
    } 
    else {
      router.push(`${dir}`);
    }
  };

  const handleHome=()=>{
    if(session?.user.userRole ==="PHOTOGRAPHER")
    {router.push(`/user/photographer/${session?.user.id}`);}
    else if(session?.user.userRole ==="CLIENT"){
      router.push(`/user/client/${session?.user.id}`);
    }
    
  }

  const handleDirectionClient = (dir: string) => {
    if(pathname == `/user/client/${session?.user.id}`) {
      router.push(`${session?.user.id}/${dir}`);
    } 
    else {
      router.push(`${dir}`);
    }
  };

  if (isClient) {
    navigationMenuContent = !isPathAdmin && (
      <NavigationMenu>
        <NavigationMenuList className="bg-black sm:rounded-t-3xl sm: px-4 py-3  sm:gap-20 shadow-lg border-t">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <NavigationMenuItem className="px-8 sm:px-6">
                  
                    <NavigationMenuLink
                    onClick={() => {
                      handleHome();
                    }}
                      className={
                        pathname == "/"
                          ? "flex flex-col items-center shadow-lg text-white"
                          : "flex flex-col items-center text-white"
                      }
                    >
                      <Home className="w-[20px]" />
                    </NavigationMenuLink>
                  
                </NavigationMenuItem>
              </TooltipTrigger>
              <TooltipContent>
                <div>Home</div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <NavigationMenuItem className="px-8 sm:px-6">
                  <NavigationMenuLink
                    onClick={() => {
                      handleDirectionClient("profile");
                    }}
                    className={
                      pathname == "/photographer/profile"
                        ? "flex flex-col items-center shadow-lg"
                        : "flex flex-col items-center text-white"
                    }
                  >
                    <UserRound className="w-[20px]" />
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </TooltipTrigger>
              <TooltipContent>
                <div>Profile</div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <NavigationMenuItem className="px-8 sm:px-6 hidden lg:flex">
                  <NavigationMenuLink
                    onClick={() => {
                      handleDirectionClient("bookings");
                    }}
                    className={
                      pathname == "/Photographer-bookings"
                        ? "flex flex-col items-center shadow-lg"
                        : "flex flex-col items-center text-white"
                    }
                  >
                    <ListEnd className="w-[20px]" />
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </TooltipTrigger>
              <TooltipContent>
                <p>Bookings</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <NavigationMenuItem className="px-8 sm:px-6 :flex">
                  <NavigationMenuLink
                    onClick={() => {
                      handleDirectionClient("inbox");
                    }}
                    className={
                      pathname == "/inbox"
                        ? "flex flex-col items-center shadow-lg"
                        : "flex flex-col items-center text-white"
                    }
                  >
                    <MessageSquareText className="w-[20px]" />
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </TooltipTrigger>
              <TooltipContent>
                <p>Inbox</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </NavigationMenuList>
      </NavigationMenu>
    );
  } else if (isPhotographer && pathname != "/admin") {
    navigationMenuContent = !isPathAdmin && (
      <NavigationMenu>
        <NavigationMenuList className="bg-black sm:rounded-t-3xl sm: px-4 py-3  sm:gap-20 shadow-lg border-t">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <NavigationMenuItem className="px-8 sm:px-6">
                  
                    <NavigationMenuLink
                    onClick={() => {
                      handleHome()
                    }}
                      className={
                        pathname == "/"
                          ? "flex flex-col items-center shadow-lg text-white"
                          : "flex flex-col items-center text-white"
                      }
                    >
                      <Home className="w-[20px]" />
                    </NavigationMenuLink>
                  
                </NavigationMenuItem>
              </TooltipTrigger>
              <TooltipContent>
                <div>Home</div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <NavigationMenuItem className="px-8 sm:px-6">
                  <NavigationMenuLink
                    onClick={() => {
                      handleDirection("profile");
                    }}
                    className={
                      pathname == "/photographer/profile"
                        ? "flex flex-col items-center shadow-lg"
                        : "flex flex-col items-center text-white"
                    }
                  >
                    <UserRound className="w-[20px]" />
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </TooltipTrigger>
              <TooltipContent>
                <div>Profile</div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <NavigationMenuItem className="px-8 sm:px-6 hidden lg:flex">
                  <NavigationMenuLink
                    onClick={() => {
                      handleDirection("feed");
                    }}
                    className={
                      pathname == "/Photographer-feed"
                        ? "flex flex-col items-center shadow-lg"
                        : "flex flex-col items-center text-white"
                    }
                  >
                    <Blocks className="w-[20px]" />
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </TooltipTrigger>
              <TooltipContent>
                <div>Feed</div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <NavigationMenuItem className=" hidden lg:flex px-8 sm:px-6 ">
                  <NavigationMenuLink
                    onClick={() => {
                      handleDirection("albums");
                    }}
                    className={
                      pathname == "/Phorographer-albums"
                        ? "flex flex-col items-center shadow-lg"
                        : "flex flex-col items-center text-white"
                    }
                  >
                    <Image className="w-[20px]" />
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </TooltipTrigger>
              <TooltipContent>
                <div>Albums</div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <NavigationMenuItem className="px-8 sm:px-6 hidden lg:flex">
                  <NavigationMenuLink
                    onClick={() => {
                      handleDirection("bookings");
                    }}
                    className={
                      pathname == "/Photographer-bookings"
                        ? "flex flex-col items-center shadow-lg"
                        : "flex flex-col items-center text-white"
                    }
                  >
                    <ListEnd className="w-[20px]" />
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </TooltipTrigger>
              <TooltipContent>
                <p>Bookings</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <NavigationMenuItem className="px-8 sm:px-6 :flex">
                  <NavigationMenuLink
                    onClick={() => {
                      handleDirection("inbox");
                    }}
                    className={
                      pathname == "/inbox"
                        ? "flex flex-col items-center shadow-lg"
                        : "flex flex-col items-center text-white"
                    }
                  >
                    <MessageSquareText className="w-[20px]" />
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </TooltipTrigger>
              <TooltipContent>
                <p>Inbox</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <NavigationMenuItem className="flex lg:hidden px-8 sm:px-6">
            <NavigationMenuLink>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex flex-col items-center text-slate-500 active:text-white">
                  <Menu className="w-[20px]" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
            
                    <DropdownMenuItem
                     onClick={() => {
                      handleDirection("bookings");
                    }}
                      className={
                        pathname == "/Home"
                          ? "text-slate-500"
                          : "text-clipblack"
                      }
                    >
                      Bookings
                    </DropdownMenuItem>

                    <DropdownMenuItem
                    onClick={() => {
                      handleDirection("feed");
                    }}
                      className={
                        pathname == "/Home"
                          ? "text-slate-500"
                          : "text-clipblack"
                      }
                    >
                      Feed
                    </DropdownMenuItem>

                    <DropdownMenuItem
                    onClick={() => {
                      handleDirection("albums");
                    }}
                      className={
                        pathname == "/Home"
                          ? "text-slate-500"
                          : "text-clipblack"
                      }
                    >
                      Albums
                    </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );
  } else if (!isLogged) {
    navigationMenuContent = !isPathAdmin && (
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
