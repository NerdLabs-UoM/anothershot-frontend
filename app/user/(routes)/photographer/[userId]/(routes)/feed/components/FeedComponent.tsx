"use client";
import React, { useEffect } from "react";
import { Heart, MessageSquare, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input"
import Image from 'next/image';
import { FeedImage } from "@/app/lib/types";
import axios from "axios";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";

const formatCount = (count : number) => {
  if (count < 1000) {
    return count.toString();
  } else if (count < 1000000) {
    return (count / 1000).toFixed(1) + 'K';
  } else {
    return (count / 1000000).toFixed(1) + 'M';
  }
};


const FeedComponent = () => {

  const [feedImages, setFeedImages] = React.useState<FeedImage[]>([]);
  const { userId } = useParams();
  const { data: session } = useSession();
  const clientId = session?.user?.id ? session.user.id : '';
  useEffect(() => {
    const fetchFeedImages = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/photographer/${userId}/feed`);
        console.log(response.data);
        setFeedImages(response.data);
      } catch (error: any) {
        toast.error('Error fetching feed images:', error);
      }
    };

    fetchFeedImages();
  }, [userId]);
  const [caption, setCaption] = React.useState<string>("");

  const handleLike = async (id: string, isLiked: boolean) => {
    try {
      const response = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/api/photographer/${userId}/feed/like`, {
        feedId: id,
        userId: session?.user?.id,
        like: !isLiked
      });
      console.log(response.data);
      setFeedImages((prevFeedImage) => {
        return prevFeedImage.map((image) => {
          if (image.id === id) {
            return {
              ...image,
              likeCount: isLiked ? image.likeCount - 1 : image.likeCount + 1,
              likedUserIds: isLiked ? image.likedUserIds.filter((id) => id !== clientId) : [...image.likedUserIds, clientId],
            };
          }
          return image;
        });
      });
    } catch (error: any) {
      toast.error('Error liking feed image:', error);
    }
  }
  const handleSave = async (id: string, isSaved: boolean) => {
    try {
      const response = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/api/photographer/${userId}/feed/createSave`, {
        feedId: id,
        userId: session?.user?.id,
        save: !isSaved
      });
      console.log(response.data);
      setFeedImages((prevFeedImage) => {
        return prevFeedImage.map((image) => {
          if (image.id === id) {
            return {
              ...image,
              saveCount: isSaved ? image.saveCount - 1 : image.saveCount + 1,
              savedUserIds: isSaved ? image.savedUserIds.filter((id) => id !== clientId) : [...image.savedUserIds, clientId],
            };
          }
          return image;
        });
      });
    } catch (error: any) {
      toast.error('Error saving feed image:', error);
    }
  }


  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/photographer/${userId}/feed/delete`, {
        data: {
          feedId: id,
        },
      });
      setFeedImages(prevFeedImages => prevFeedImages.filter(image => image.id !== id));
    } catch (error: any) {
      toast.error('Error deleting feed image:', error);
    }
  };
  const addCaption = async (id: string, caption: string) => {
    try {
      const response = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/api/photographer/${userId}/feed/caption`, {
        feedId: id,
        caption: caption,
      });
      console.log(response.data);
      setFeedImages((prevFeedImage) => {
        return prevFeedImage.map((image) => {
          if (image.id === id) {
            return {
              ...image,
              caption: caption,
            };
          }
          return image;
        });
      });
    } catch (error: any) {
      toast.error('Error adding caption to feed image:', error);
    }
  }
  const renderOptions = () => {
    if (session?.user?.id === userId) {
      return (
        <MoreVertical size={32} color="#ffffff" className="sm:w-5 sm:h-5 lg:w-7 lg:h-7" />
      );
    }
    return null;
  };

  return (
    <div className="flex flex-wrap justify-center md:mx-20 mb-10 mt-4">
      {feedImages.map(feedImage => (
        <div key={feedImage.id} >
          <div className="relative flex flex-col justify-end items-center overflow-hidden w-[350px] h-[500px] sm:w-[250px] sm:h-[400px] lg:h-[600px] lg:w-[400px] rounded-[40px] mx-2 md:mx-4 my-4">
            <Image
              src={feedImage.imageUrl}
              alt="Background Image"
              width={400}
              height={400}
              className=" rounded-[35px] h-[600px] w-[400px]"
            />
            <div className="absolute z-10 grid grid-cols-6 items-center justify-center w-full bg-gradient-to-t from-black to-transparent rounded-b-[40px]">
              <div className="col-span-4 flex flex-start items-center justify-start pl-4">
                <Avatar className="w-14 h-14 sm:w-10 sm:h-10 lg:w-14 lg:h-14 border-2 border-white mr-3">
                  <AvatarImage src={feedImage.photographer.user.image ?? ''} alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start justify-center">
                  <span className="text-white text-xs lg:text-lg font-normal">{feedImage.photographer.name}</span>
                  <p className="text-xs italic font-medium text-slate-200">{feedImage.caption}</p>
                </div>
              </div>
              <div className="">
                <div className="flex flex-start items-center justify-between">
                  <div className="pl-0">
                    <Button
                      variant={null}
                      role="heart"
                      size="sm"
                      className="flex items-center justify-center gap-2"
                      onClick={() => handleLike(feedImage.id, feedImage.likedUserIds != null && feedImage.likedUserIds.includes(clientId))}
                    >
                      {feedImage.likedUserIds != null && feedImage.likedUserIds.includes(clientId) ? (
                        <Heart fill="#cb1a1a" strokeWidth={0} className="sm:w-5 sm:h-5 lg:w-6 lg:h-6 " />
                      ) : (
                        <Heart color="#ffffff" strokeWidth={2} className="sm:w-5 sm:h-5 lg:w-6 lg:h-6 "/>
                      )}
                    </Button>
                  </div>
                  <span className="text-white text-sm sm:text-xs lg:text-sm">{formatCount(feedImage.likeCount)}</span>
                </div>
                <div className="flex flex-start items-center justify-between">
                  <div className="pl-0">
                    <Button
                      variant={null}
                      role="save"
                      size="sm"
                      className="flex items-center justify-center gap-2"
                      onClick={() => handleSave(feedImage.id, feedImage.savedUserIds != null && feedImage.savedUserIds.includes(clientId))}
                    >
                      {feedImage.savedUserIds != null && feedImage.savedUserIds.includes(clientId) ? (
                        <MessageSquare fill="#ffffff" strokeWidth={0} className="sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                      ) : (
                        <MessageSquare color="#ffffff" strokeWidth={2} className="sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                      )}
                    </Button>
                  </div>
                  <span className="text-white text-sm sm:text-xs lg:text-sm">{formatCount(feedImage.saveCount)}</span>
                </div>
              </div>
              <div className="ml-2 sm:ml-1 lg:ml-4 ">
                <div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant={null}
                        role="save"
                        size="sm"
                        className="flex items-center justify-center gap-2"
                      >
                        {renderOptions()}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-20">
                      <DropdownMenuGroup>
                        <DropdownMenuItem className="pl-4" onClick={() => handleDelete(feedImage.id)}>Delete</DropdownMenuItem>
                        <Dialog>
                          <DialogTrigger>
                            <Button className="bg-transparent text-black font-normal hover:bg-slate-200"> Add Caption</Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle className="mb-2">Add a Caption</DialogTitle>
                              <DialogDescription>
                                Add a caption to your image to give it more context.
                              </DialogDescription>
                              <div className="flex flex-wrap">
                                <Input
                                  type="text"
                                  placeholder="Add a caption"
                                  className="w-full mb-4"
                                  value={caption}
                                  onChange={(e) => {
                                    const maxLength = 15;
                                    let newCaption = e.target.value.slice(0, maxLength);
                                    if (e.target.value.length > maxLength) {
                                      newCaption += '...';
                                    }
                                    setCaption(newCaption);
                                  }}
                                />
                                <Button
                                  className="w-auto bg-black text-gray-200" onClick={() => addCaption(feedImage.id, caption)}>
                                  Save
                                </Button>
                              </div>
                            </DialogHeader>
                          </DialogContent>
                        </Dialog>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))
      }
    </div >
  );
};

export default FeedComponent;
