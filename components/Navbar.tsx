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
  const router = useRouter();
  const { data: session } = useSession();
 const userId = session?.user.id;
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
      router.push(`${dir}`);
  };

  const handleHome=()=>{
    if(session?.user.userRole ==="PHOTOGRAPHER")
    {router.push(`/user/photographer/${session?.user.id}`);}
    else if(session?.user.userRole ==="CLIENT"){
      router.push(`/user/client/${session?.user.id}`);
    }
    
  }

  const handleDirectionClient = (dir: string) => {
      router.push(`${dir}`);
  };

  if (isClient) {
    navigationMenuContent = !isAdmin && (
      <NavigationMenu>
        <NavigationMenuList className="px-4 py-3 bg-black border-t shadow-lg rounded-t-3xl sm: sm:gap-20">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <NavigationMenuItem className="px-8 sm:px-6">
                  
                    <NavigationMenuLink
                    onClick={() => {
                      handleDirection('/')
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
                      handleDirectionClient(`/user/client/${userId}/profile`);
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
                <NavigationMenuItem className="px-8 sm:px-6 lg:flex">
                  <NavigationMenuLink
                    onClick={() => {
                      handleDirectionClient(`/user/client/${userId}/bookings`);
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
                      handleDirectionClient(`/user/client/${userId}/inbox`);
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
    navigationMenuContent = !isAdmin && (
      <NavigationMenu>
        <NavigationMenuList className="px-4 py-3 bg-black border-t shadow-lg rounded-t-3xl sm:gap-20">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <NavigationMenuItem className="px-8 sm:px-6">
                  
                    <NavigationMenuLink
                    onClick={() => {
                      handleDirection('/')
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
                      handleDirection(`/user/photographer/${userId}/profile`);
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
                <NavigationMenuItem className="hidden px-8 sm:px-6 lg:flex">
                  <NavigationMenuLink
                    onClick={() => {
                      handleDirection(`/user/photographer/${userId}/feed`);
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
                <NavigationMenuItem className="hidden px-8 lg:flex sm:px-6">
                  <NavigationMenuLink
                    onClick={() => {
                      handleDirection(`/user/photographer/${userId}/albums`);
                    }}
                    className={
                      pathname == "/Photographer-albums"
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
                <NavigationMenuItem className="hidden px-8 sm:px-6 lg:flex">
                  <NavigationMenuLink
                    onClick={() => {
                      handleDirection(`/user/photographer/${userId}/bookings`);
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
                      handleDirection(`/user/photographer/${userId}/inbox`);
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

          <NavigationMenuItem className="flex px-8 lg:hidden sm:px-6">
            <NavigationMenuLink>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex flex-col items-center text-slate-500 active:text-white">
                  <Menu className="w-[20px]" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
            
                    <DropdownMenuItem
                     onClick={() => {
                      handleDirection(`/user/photographer/${userId}/bookings`);
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
                      handleDirection(`/user/photographer/${userId}/feed`);
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
                      handleDirection(`/user/photographer/${userId}/albums`);
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
  } else if(isAdmin){
    navigationMenuContent = (
      <NavigationMenu>
        <NavigationMenuList className="px-4 py-3 bg-black rounded-t-3xl sm: sm:gap-20">
          <NavigationMenuItem className="px-10">
            <Link href={`/user/admin/${userId}`}  legacyBehavior passHref>
              <NavigationMenuLink
                className={
                  pathname == `/user/admin/${userId}` 
                    ? "flex flex-col items-center text-white ease-in"
                    : "flex flex-col items-center text-slate-500"
                }
              >
                Dashboard
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );

  }else  {
    navigationMenuContent = !isAdmin && (
      <NavigationMenu>
        <NavigationMenuList className="px-4 py-3 bg-black rounded-t-3xl sm: sm:gap-20">
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
            <Link href="/sign-in" legacyBehavior passHref>
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
    <div className="fixed inset-x-0 bottom-0 z-50 w-full text-black">
      <div className="flex justify-center">{navigationMenuContent}</div>
    </div>
  );
};

export default Navbar;
