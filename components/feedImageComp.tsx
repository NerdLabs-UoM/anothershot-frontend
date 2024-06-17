import React, { use, useEffect, useState } from 'react';
import Image from 'next/image';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Heart, MessageSquare, MoreVertical, Bookmark, EllipsisVertical } from "lucide-react";
import { FeedImage,Notification } from "@/app/lib/types";
import axios from 'axios';
import { useSession } from "next-auth/react";
import { toast } from 'react-hot-toast';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import { useRouter } from 'next/navigation';
import { set } from 'lodash';
import ReportPhoto from './Report/ReportPhoto/ReportPhoto';
import { NotificationService } from './notification/notification';
import  Loading  from "@/components/skeletonHome";

const formatCount = (count: number) => {
    if (count < 1000) {
        return count.toString();
    } else if (count < 1000000) {
        return (count / 1000).toFixed(1) + 'K';
    } else {
        return (count / 1000000).toFixed(1) + 'M';
    }
};

const FeedImageComp = () => {
    const [feedImages, setFeedImages] = useState<FeedImage[]>([]);
    const { data: session } = useSession();
    const router = useRouter();
    const [likeDisabled, setLikeDisabled] = useState<string>('');
    const [saveDisabled, setSaveDisabled] = useState<string>('');
    const [isLoading, setIsLoading] = React.useState(true);

    

    useEffect(() => {
        const fetchFeedImages = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/home/feed`);
                setFeedImages(response.data);
            } catch (error: any) {
                toast.error('Error fetching feed images:', error);
            }
            setIsLoading(false);
        };
        fetchFeedImages();
    }, []);

    const handleLike = async (feedImageId: string, photographerId: string, isLiked: boolean) => {
        if (session === null) {
            toast.error('You must be logged in to like a feed image');
            return;
        }
        try {
            setLikeDisabled(feedImageId);
            const updatedFeedImages = [...feedImages];
            const index = updatedFeedImages.findIndex(image => image.id === feedImageId);

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
            const res = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/api/photographer/${photographerId}/feed/like`, {
                feedId: feedImageId,
                userId: session?.user?.id,
                like: !isLiked
            });

            if (!isLiked){
                NotificationService({
                    senderId: session?.user?.id,
                    receiverId: photographerId,
                    type: "like",
                    title: "likes your photo",
                    description: ""
                  })
            }
            setLikeDisabled('');
            toast('❤️')
        } catch (error: any) {
            setLikeDisabled('');
            toast.error('Error liking feed image:', error);
        }
    }

    const handleSave = async (feedImageId: string, photographerId: string, isSaved: boolean) => {
        if (session === null) {
            toast.error('You must be logged in to save a feed image');
            return;
        }

        try {
            setSaveDisabled(feedImageId);
            const index = feedImages.findIndex(image => image.id === feedImageId);
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
                feedId: feedImageId,
                userId: session?.user?.id,
                save: !isSaved
            });
            setSaveDisabled('');
            toast('📌')
        } catch (error: any) {
            setSaveDisabled('');
            toast.error('Error saving feed image:', error);
        }
    };

    const handleRedirect = (photographerId: string) => {
        toast('Redirecting to photographer profile');
        router.push(`/user/photographer/${photographerId}/profile`)
    }

    const reportCreation =(id:string)=>{
        
            if(session?.user?.userRole=="PHOTOGRAPHER" || session?.user?.userRole=="CLIENT"){
                return( <ReportPhoto imageId={id} />)
            }else if(session==null){
                return (
                    <div onClick={()=>{
                        toast.error("You must be logged in to report a photo")
                    }}><EllipsisVertical/></div>
                )
            }
            
        
    }
    return (
        <div>
            {isLoading ? (
                <Loading />
            ) : (
        <ResponsiveMasonry
            columnsCountBreakPoints={{ 350: 1, 700: 2, 1050: 3, 1400: 4, 1750: 5, 2100: 6, 2450: 7, 2800: 8, 3150: 9, 3500: 10 }}
            className='mb-10'
        >
            <Masonry>
                {feedImages.map((feedImage: FeedImage) => (
                    <div key={feedImage.id} className="relative flex flex-col justify-end items-center overflow-hidden w-[345px] h-auto lg:h-auto lg:w-[345px] rounded-[40px] mx-auto my-4">
                    <Image
                        src={feedImage.imageUrl}
                        alt="Background Image"
                        width={345}
                        height={0}
                        quality={100}
                        style={{ height: 'auto', width: '345px' }}
                        className="rounded-[35px] hover:scale-110 transform transition duration-500"
                    /> 
                    <div className="absolute top-4 right-2 z-20 text-white hover:cursor-pointer">
                        {reportCreation(feedImage.id)}
                    </div>
                    <div className="absolute z-10 grid grid-cols-6 items-center justify-center w-full bg-gradient-to-t from-black to-transparent rounded-b-[40px]">
                        
                        <div className="col-span-4 flex flex-start items-center justify-start pl-4 cursor-pointer" onClick={() => handleRedirect(feedImage.photographerId)}>
                            <Avatar className="w-14 h-14 sm:w-10 sm:h-10 lg:w-14 lg:h-14 border-2 border-white mr-3 hover:scale-110 transform transition duration-500">
                                <AvatarImage src={feedImage.photographer.user.image ?? ''} alt="@shadcn" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col items-start justify-center">
                                <span className="text-white text-xs lg:text-md font-normal hover:scale-110 transform transition duration-500">{feedImage.photographer.name}</span>
                                <p className="text-xs italic font-medium text-slate-200">{feedImage.caption}</p>
                            </div>
                        </div>
                        <div className="cursor-pointer">
                            <div className="flex flex-start items-center justify-between">
                                <div className="pl-4">
                                    <Button
                                        variant={null}
                                        role="heart"
                                        size="sm"
                                        disabled={likeDisabled === feedImage.id}
                                        className="flex items-center justify-center gap-2 hover:scale-110 transform transition duration-500"
                                        onClick={() => handleLike(feedImage.id, feedImage.photographerId, feedImage.likedUserIds != null && session !== null && feedImage.likedUserIds.includes(session.user.id))}
                                    >
                                        {feedImage.likedUserIds != null && session && feedImage.likedUserIds.includes(session.user.id) ? (
                                            <Heart fill="#cb1a1a" strokeWidth={0} className="sm:w-5 sm:h-5 lg:w-6 lg:h-6 " />
                                        ) : (
                                            <Heart color="#ffffff" strokeWidth={2} className="sm:w-5 sm:h-5 lg:w-6 lg:h-6 " />
                                        )}
                                    </Button>
                                </div>
                                <span className="text-white text-sm sm:text-xs lg:text-sm">{formatCount(feedImage.likeCount)}</span>
                            </div>
                            <div className="flex flex-start items-center justify-between">
                                <div className="pl-4">
                                    <Button
                                        variant={null}
                                        role="save"
                                        size="sm"
                                        disabled={saveDisabled === feedImage.id}
                                        className="flex items-center justify-center gap-2 hover:scale-110 transform transition duration-500"
                                        onClick={() => handleSave(feedImage.id, feedImage.photographerId, feedImage.savedUserIds != null && session !== null && feedImage.savedUserIds.includes(session.user.id))}
                                    >
                                        {feedImage.savedUserIds != null && session && feedImage.savedUserIds.includes(session.user.id) ? (
                                            <Bookmark fill="#ffffff" strokeWidth={0} className="sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                                        ) : (
                                            <Bookmark color="#ffffff" strokeWidth={2} className="sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                                        )}
                                    </Button>
                                </div>
                                <span className="text-white text-sm sm:text-xs lg:text-sm">{formatCount(feedImage.saveCount)}</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                ))
                }
            </Masonry>
        </ResponsiveMasonry>
            )}
        </div>
    );
}

export default FeedImageComp;