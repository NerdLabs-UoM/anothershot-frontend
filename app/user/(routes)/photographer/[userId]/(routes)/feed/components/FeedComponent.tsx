"use client";
import React,{useEffect} from "react";
import { Heart, MessageSquare, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
const FeedComponent = () => {
  // interface UseData {
  //   name: string;
  //   image: string;
  // }
  // const data: UseData[] = [
  //   {
  //     name: "Alexandro Vargas",
  //     image: "/images/avatar.png",
  //   },
  // ];
  const [isLiked, setIsLiked] = React.useState(false);
  const [likes, setLikes] = React.useState(103);
  const [saves, setSaves] = React.useState(99);
  const [isSaved, setIsSaved] = React.useState(false);
  const[isDeleted,setIsDeleted]=React.useState(false);

  useEffect(() => {
    console.log("Likes:", likes);
  }, [likes]);
  useEffect(() => {
    console.log("Saves:", saves);
  }, [saves]);
  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };
  const handleSave = () => {
    setIsSaved(!isSaved);
    setSaves(isSaved ? saves - 1 : saves + 1);
  };
  const handleDelete = () => {
    setIsDeleted(!isDeleted);
  };
  
  if(isDeleted){  
    return null;
  }
  return (
    <div className="relative flex flex-col justify-end items-center overflow-hidden h-auto w-1/4 rounded-[40px] mx-40 mb-40">
      <img
        className="bg-cover bg-no-repeat w-full h-full rounded-[35px]"
        src="/images/animal.png"
        alt="Background Image"
      />
      <div className="absolute z-10 grid grid-cols-6 items-center justify-center w-full h-[120px] bg-gradient-to-t from-black to-transparent rounded-b-[40px]">
        <div className="col-span-4 flex flex-start items-center justify-start pl-4">
          <Avatar className="w-[60px] h-[60px] border-2 border-white mx-3">
            <AvatarImage src="/images/avatar.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span className="text-white text-base font-normal">Alexandro Vargas</span>
        </div>
        <div>
          <div className="flex flex-start items-center justify-between">
            <div className="pl-0">
            <Button
              variant="default"
              role="heart"
              size="sm"
              className="flex items-center justify-center gap-2"
              onClick={handleLike}
            >
              {isLiked ? (
                <Heart fill="#cb1a1a" strokeWidth={0}/>
              ) : (
                <Heart color="#ffffff" strokeWidth={2} />
              )}
            </Button>
            </div>
            
            <span className="text-white text-sm">{likes}</span>
          </div>
          <div className="flex flex-start items-center justify-between">
            <div className="pl-0">
            <Button
              variant="default"
              role="save"
              size="sm"
              className="flex items-center justify-center gap-2"
              onClick={handleSave}
            >
              {isSaved ? (
                <MessageSquare fill="#ffffff" strokeWidth={0} />
              ) : (
                <MessageSquare color="#ffffff" strokeWidth={2} />
              )}
            </Button>
            </div>
            <span className="text-white text-sm">{saves}</span>
          </div>
        </div>
        <div className="ml-2">
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="default"
                    role="save"
                    size="sm"
                    className="flex items-center justify-center gap-2"
                  >
                    <MoreVertical size={32} color="#ffffff" strokeWidth={2.5} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuGroup>
                    <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger>Edit Tags</DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                          <DropdownMenuItem>Email</DropdownMenuItem>
                          <DropdownMenuItem>Message</DropdownMenuItem>
                        </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                    </DropdownMenuSub>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
      </div>
    </div>
  );
};

export default FeedComponent;
