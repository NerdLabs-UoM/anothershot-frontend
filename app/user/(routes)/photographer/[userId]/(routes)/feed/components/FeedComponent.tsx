"use client";

import React, { useEffect } from "react";
import { Heart, Bookmark, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import Image from 'next/image';
import { FeedImage } from "@/app/lib/types";
import axios from "axios";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";

const formatCount = (count: number) => {
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
  const sessionUserId = session?.user?.id ? session.user.id : '';
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLikingMap, setIsLikingMap] = React.useState<Record<string, boolean>>({});
  const [isSavingMap, setIsSavingMap] = React.useState<Record<string, boolean>>({});
  const [caption, setCaption] = React.useState<string>("");
  useEffect(() => {
    const fetchFeedImages = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/photographer/${userId}/feed`);
        setFeedImages(response.data);
      } catch (error: any) {
        toast.error('Error fetching feed images:', error);
      }
    };
    fetchFeedImages();
  }, [userId]);

  const handleLike = async (imageId: string, isLiked: boolean, photographerId: string) => {
    if (session === null) {
      toast.error('You must be logged in to like a feed image');
      return;
    }
    setIsLikingMap(prevMap => ({
      ...prevMap,
      [imageId]: true,
    }));
    try {
      const updatedFeedImages = [...feedImages];
      const index = updatedFeedImages.findIndex(image => image.id === imageId);
      if (index !== -1) {
        updatedFeedImages[index] = {
          ...updatedFeedImages[index],
          likeCount: isLiked ? updatedFeedImages[index].likeCount - 1 : updatedFeedImages[index].likeCount + 1,
          likedUserIds: isLiked
            ? updatedFeedImages[index].likedUserIds.filter(id => id !== session?.user.id)
            : [...updatedFeedImages[index].likedUserIds, session?.user.id],
        };
        setFeedImages(updatedFeedImages);
      }
      await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/api/photographer/${photographerId}/feed/like`, {
        feedId: imageId,
        userId: session?.user?.id,
        like: !isLiked
      });
      setIsLikingMap(prevMap => ({
        ...prevMap,
        [imageId]: false,
      }));
      toast('❤️')
    } catch (error: any) {
      toast.error('Error liking feed image:', error);
    }
  }

  const handleSave = async (imageId: string, isSaved: boolean, photographerId: string) => {
    if (session === null) {
      toast.error('You must be logged in to save a feed image');
      return;
    }
    setIsSavingMap(prevMap => ({
      ...prevMap,
      [imageId]: true,
    }));
    try {
      const index = feedImages.findIndex(image => image.id === imageId);
      if (index !== -1) {
        const updatedFeedImages = [...feedImages];
        updatedFeedImages[index] = {
          ...updatedFeedImages[index],
          saveCount: isSaved ? updatedFeedImages[index].saveCount - 1 : updatedFeedImages[index].saveCount + 1,
          savedUserIds: isSaved
            ? updatedFeedImages[index].savedUserIds.filter(id => id !== session.user.id)
            : [...updatedFeedImages[index].savedUserIds, session.user.id],
        };
        setFeedImages(updatedFeedImages);
      }
      await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/api/photographer/${photographerId}/feed/createSave`, {
        feedId: imageId,
        userId: session?.user?.id,
        save: !isSaved
      });
      setIsSavingMap(prevMap => ({
        ...prevMap,
        [imageId]: false,
      }));
      toast('📌')
    } catch (error: any) {
      toast.error('Error saving feed image:', error);
    }
  }

  const handleDelete = async (imageId: string, photographerId: string) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/photographer/${photographerId}/feed/delete`, {
        data: {
          feedId: imageId,
        },
      });
      setFeedImages(prevFeedImages => prevFeedImages.filter(image => image.id !== imageId));
    } catch (error: any) {
      toast.error('Error deleting feed image:', error);
    }
  };

  const addCaption = async (id: string, caption: string) => {
    try {
      await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/api/photographer/${userId}/feed/caption`, {
        feedId: id,
        caption: caption,
      });
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
      setIsOpen(false);
      setCaption("");
      toast.success('Caption added successfully');
    } catch (error: any) {
      toast.error('Error adding caption to feed image:', error);
    }
  }

  const renderOptions = () => {
    if (session?.user?.id === userId) {
      return (
        <Button
          variant={null}
          role="save"
          size="sm"
          className="flex items-center justify-center gap-2"
        >
          <MoreVertical size={32} color="#ffffff" className="sm:w-5 sm:h-5 lg:w-7 lg:h-7" />
        </Button>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-wrap justify-center md:mx-20 mb-10 mt-4">
      {feedImages.map(feedImage => (
        <div key={feedImage.id} >
          <div className="relative flex flex-col justify-end items-center overflow-hidden w-[350px] h-[350px] lg:h-[400px] lg:w-[400px] rounded-[40px] mx-2 md:mx-4 my-4">
            <Image
              src={feedImage.imageUrl}
              alt="Background Image"
              width={400}
              height={400}
              className=" rounded-[35px] h-[400px] w-[400px]"
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
                      onClick={() => handleLike(feedImage.id, feedImage.likedUserIds != null && feedImage.likedUserIds.includes(sessionUserId), feedImage.photographerId)}
                      disabled={isLikingMap[feedImage.id]}
                    >
                      {feedImage.likedUserIds != null && feedImage.likedUserIds.includes(sessionUserId) ? (
                        <Heart fill="#cb1a1a" strokeWidth={0} className="sm:w-5 sm:h-5 lg:w-6 lg:h-6 " />
                      ) : (
                        <Heart color="#ffffff" strokeWidth={2} className="sm:w-5 sm:h-5 lg:w-6 lg:h-6 " />
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
                      onClick={() => handleSave(feedImage.id, feedImage.savedUserIds != null && feedImage.savedUserIds.includes(sessionUserId), feedImage.photographerId)}
                      disabled={isSavingMap[feedImage.id]}
                    >
                      {feedImage.savedUserIds != null && feedImage.savedUserIds.includes(sessionUserId) ? (
                        <Bookmark fill="#ffffff" strokeWidth={0} className="sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                      ) : (
                        <Bookmark color="#ffffff" strokeWidth={2} className="sm:w-5 sm:h-5 lg:w-6 lg:h-6" /> 
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
                      {renderOptions()}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-20">
                      <DropdownMenuGroup>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button className="bg-transparent text-black font-normal hover:bg-slate-200 pr-14">Delete</Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the image.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(feedImage.id, feedImage.photographerId)}>Continue</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                        <Dialog open={isOpen} onOpenChange={setIsOpen}>
                          <DialogTrigger>
                            <Button className="bg-transparent text-black font-normal hover:bg-slate-200"> Add Caption</Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle className="mb-2">Add a Caption</DialogTitle>
                              <DialogDescription>
                                Add a caption to your image to give it more context.<br />
                                (Maximum 15 characters.)
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
                                    setCaption(newCaption);
                                  }
                                  }
                                  onKeyDown={(e) => {
                                    if (e.key === 'Backspace') {
                                      setCaption((prevCaption) => prevCaption.slice(0, -1));
                                    }
                                  }
                                  }
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
