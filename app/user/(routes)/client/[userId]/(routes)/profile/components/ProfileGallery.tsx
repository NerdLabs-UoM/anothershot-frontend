"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { User } from "@/app/lib/types";
import toast from "react-hot-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import SystemReportSection from "@/components/systemReport";
import {ProfileSkeleton}  from "./skeletons";


const ProfileGallery = () => {
  const [savedImages, setSavedImages] = useState<User[]>([]);
  const [likedImages, setLikedImages] = useState<User[]>([]);
  const { userId } = useParams();
  const router = useRouter();
  const [isLoadingSaved, setIsLoadingSaved] = useState(true);
  const [isLoadingLiked, setIsLoadingLiked] = useState(true);

  useEffect(() => {
    const getSavedImages = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/client/${userId}/savedImages`
        );
        setSavedImages(response.data);
      } catch (error: any) {
        toast.error("Error fetching saved images:", error.message);
      } finally {
        setIsLoadingSaved(false);
      }
    };
    getSavedImages();
  }, [userId]);

  useEffect(() => {
    const getLikedImages = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/client/${userId}/likeImages`
        );
        setLikedImages(response.data);
      } catch (error: any) {
        toast.error("Error fetching liked images:", error.message);
      } finally {
        setIsLoadingLiked(false);
      }
    };
    getLikedImages();
  }, [userId]);

  const handleRedirect = (photographerId: string) => {
    toast('Redirecting to photographer feed');
    router.push(`/user/photographer/${photographerId}/feed`)
  }

  return (
    <Tabs defaultValue="like" className="flex flex-col items-center w-11/12 lg:w-2/3 h-screen lg:h-[550px]">
        <TabsList className="my-5 bg-slate-100">
          <TabsTrigger value="save" className="text-xs md:text-sm">
            Saved Photos
          </TabsTrigger>
          <TabsTrigger value="like" className="text-xs md:text-sm">
            Liked Photos
          </TabsTrigger>
          <TabsTrigger value="report" className="text-xs md:text-sm">
            Report
          </TabsTrigger>
        </TabsList>
        <Separator className="mb-2 h-0.5" />
      <TabsContent value="save" className="lg:w-2/3 w-auto min-w-full">
        {isLoadingSaved ? (
          <div className="flex justify-center items-center h-[512px] lg:h-[450px]">
            <h1>Loading.....</h1>
          </div>
        ) : (
          <ScrollArea className="h-[512px] lg:h-[450px] p-4">
            <div className="grid grid-cols-3 gap-4">
              {savedImages.length === 0 ? (
                <div className="col-span-3">
                  <p className="text-gray-500 flex w-full items-start justify-center">No saved photos yet.</p>
                </div>
              ) : (
                savedImages.map((image) =>
                  image.savedFeedImages.map((savedImage) => (
                    <div
                      key={savedImage.id}
                      className="relative w-full"
                      style={{ paddingBottom: '100%' }}
                    >
                      <Image
                        src={savedImage.imageUrl}
                        alt="Saved Image"
                        layout="fill"
                        objectFit="cover"
                        className="absolute inset-0 rounded-md transform transition duration-500 hover:scale-105"
                        onClick={() => handleRedirect(savedImage.photographerId)}
                      />
                    </div>
                  ))
                )
              )}
            </div>
          </ScrollArea>
        )}
      </TabsContent>
      <TabsContent value="like" className="w-2/3 min-w-full">
        {isLoadingLiked ? (
          <div className="flex justify-center items-center h-[512px] lg:h-[450px]">
            <ProfileSkeleton/>
          </div>
        ) : (
          <ScrollArea className="h-[512px] lg:h-[450px] p-4">
            <div className="grid grid-cols-3 gap-4">
              {likedImages.length === 0 ? (
                <div className="col-span-3">
                  <p className="text-gray-500 flex w-full items-start justify-center">No liked photos yet.</p>
                </div>
              ) : (
                likedImages.map((image) =>
                  image.likedFeedImages.map((likedImage) => (
                    <div
                      key={likedImage.id}
                      className="relative w-full"
                      style={{ paddingBottom: '100%' }}
                    >
                      <Image
                        src={likedImage.imageUrl}
                        alt="Liked Image"
                        layout="fill"
                        objectFit="cover"
                        className="absolute inset-0 rounded-md transform transition duration-500 hover:scale-105"
                        onClick={() => handleRedirect(likedImage.photographerId)}
                      />
                    </div>
                  ))
                )
              )}
            </div>
          </ScrollArea>
        )}
      </TabsContent>
      <TabsContent value="report" className="w-2/3 min-w-full">
          <div className="grid grid-cols-1 gap-4">
            <Card className="border-none">
              <CardHeader >
                <CardTitle>System Report</CardTitle>
                <CardDescription>You can report your system issues from here. We prioritize you.</CardDescription>
                <CardContent>
                <SystemReportSection />
                </CardContent>
              </CardHeader>
            </Card>
          </div>
      </TabsContent>
    </Tabs>
  );
};

export default ProfileGallery;
