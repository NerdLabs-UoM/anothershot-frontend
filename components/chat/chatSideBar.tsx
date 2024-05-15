"use client";

import Link from "next/link";
import { MoreHorizontal } from "lucide-react";
import { SetStateAction } from "react";
import { buttonVariants } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Message } from "@/lib/types";

interface SidebarProps {
    isCollapsed: boolean;
    links: {
        id: string;
        name: string | undefined;
        messages: Message[];
        avatar: string;
        variant: "default" | "ghost";
    }[];
    setSelectedChatId: React.Dispatch<SetStateAction<string | undefined>>;
    onClick?: () => void;
    isMobile: boolean;
}

export default function ChatSidebar({ links, isCollapsed, isMobile, setSelectedChatId }: SidebarProps) {
    return (
        <div
            data-collapsed={isCollapsed}
            className="relative group flex flex-col h-full gap-4 p-2 data-[collapsed=true]:p-2 "
        >
            {!isCollapsed && (
                <div className="flex justify-between p-2 items-center">
                    <div className="flex gap-2 items-center text-2xl">
                        <p className="font-bold">Inbox</p>
                        <span className="text-zinc-300">({links.length})</span>
                    </div>

                    <div>
                        <Link
                            href="#"
                            className={cn(
                                buttonVariants({ variant: "ghost", size: "icon" }),
                                "h-9 w-9"
                            )}
                        >
                            <MoreHorizontal size={20} />
                        </Link>
                    </div>
                </div>
            )}
            <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
                {links.map((link, index) =>
                    isCollapsed ? (
                        <TooltipProvider key={index}>
                            <Tooltip key={index} delayDuration={0}>
                                <TooltipTrigger asChild>
                                    <Link
                                        href="#"
                                        className={cn(
                                            buttonVariants({ variant: link.variant, size: "icon" }),
                                            "h-11 w-11 md:h-16 md:w-16",
                                            link.variant === "default" &&
                                            "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                                        )}
                                        onClick={() => setSelectedChatId(link.id)}
                                    >
                                        <Avatar className="flex justify-center items-center">
                                            <AvatarImage
                                                src={link.avatar}
                                                alt={link.avatar}
                                                width={6}
                                                height={6}
                                                className="w-10 h-10 "
                                            />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>{" "}
                                        <span className="sr-only">{link.name}</span>
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent
                                    side="right"
                                    className="flex items-center gap-4"
                                >
                                    {link.name}
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    ) : (
                        <Link
                            key={index}
                            href="#"
                            className={cn(
                                buttonVariants({ variant: link.variant, size: "lg" }),
                                link.variant === "default" &&
                                "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white shrink",
                                "justify-start gap-4"
                            )}
                            onClick={() => setSelectedChatId(link.id)}
                        >
                            <Avatar className="flex justify-center items-center">
                                <AvatarImage
                                    src={link.avatar}
                                    alt={link.avatar}
                                    width={6}
                                    height={6}
                                    className="w-10 h-10"
                                />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col max-w-28">
                                <span>{link.name}</span>
                                {link.messages.length > 0 && (
                                    <span className="text-zinc-300 text-xs truncate ">
                                        {link.messages[link.messages.length - 1].message.split(" ")[0]}...
                                    </span>
                                )}
                            </div>
                        </Link>
                    )
                )}
            </nav>
        </div>
    );
}
