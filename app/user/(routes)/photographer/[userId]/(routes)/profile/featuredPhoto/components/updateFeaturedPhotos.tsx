"use client";
import { CldUploadWidget, CldUploadWidgetInfo, CldUploadWidgetResults } from 'next-cloudinary';
import React, { useState } from 'react'
import toast from "react-hot-toast";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { PlusSquare } from "lucide-react";
import { useSession } from 'next-auth/react';
import { Photographer } from '@/app/lib/types';

interface FeaturedProps{
    userId: string;
    setFeaturedPhoto: React.Dispatch<  //update the cover photo state
    React.SetStateAction<{
        url: string;
    }>> 
}
const updateFeaturedPhotos: React.FC<FeaturedProps> = ({setFeaturedPhoto,userId}) => {
    const { data: session } = useSession();
    const [isPhotographer, setIsPhotographer] = useState(true);
    const [photographer, setPhotographer] = useState<Photographer>();
    const[featuredPhotoURL, setFeaturedPhotoURL] = useState("https://res.cloudinary.com/dts2l2pnj/image/upload/v1707855067/hlnolejsok99gjupmfbi.jpg");
    

    return (
        <main>
            <div className="w-full pr-10">
                {isPhotographer && (
                    <CldUploadWidget
                        onOpen={() => { }}
                        onSuccess={(results: CldUploadWidgetResults) => {
                            const uploadedResult = results.info as CldUploadWidgetInfo;
                            const FeaturedURL = {
                                image: uploadedResult.secure_url,
                            };
                           
                            const tags = uploadedResult.tags;
                            setFeaturedPhotoURL(FeaturedURL.image);
                                                    
                            async function Update() {
                                const data = {
                                    coverPhotos: [FeaturedURL.image]
                                };
                                // setFeaturedPhotoURL([FeaturedURL.image])  //set the coverPhoto url
                               
                                setFeaturedPhoto({url:FeaturedURL.image})  //update the cover photo state           
                              try{
                                await axios.put(
                                    `${process.env.NEXT_PUBLIC_API_URL}/api/photographer/${userId}/featured`, data
                                );
                              }
                              catch (error) {
                                toast.error("An error occured. Please try again.")
                              }
                                
                            }
                            Update();
                           
                        }}
                        options={{
                            tags: ["cover image", `${session?.user.id}`],
                            sources: ["local"],
                            googleApiKey: "<image_search_google_api_key>",
                            showAdvancedOptions: false,
                            cropping: true,
                            croppingCoordinatesMode: "custom",
                            croppingAspectRatio: 2,
                            multiple: false,
                            defaultSource: "local",
                            resourceType: "image",
                            folder: `${photographer?.userId}/${photographer?.name}/featured`,
                            styles: {
                                palette: {
                                    window: "#ffffff",
                                    sourceBg: "#f4f4f5",
                                    windowBorder: "#90a0b3",
                                    tabIcon: "#000000",
                                    inactiveTabIcon: "#555a5f",
                                    menuIcons: "#555a5f",
                                    link: "#000000",
                                    action: "#000000",
                                    inProgress: "#464646",
                                    complete: "#000000",
                                    error: "#cc0000",
                                    textDark: "#000000",
                                    textLight: "#fcfffd",
                                },
                            },
                        }}
                        uploadPreset="crca4igr"
                    >
                        {({ open }) => {
                            return (
                                <Button
                                variant="default"
                                className="rounded-md mt-2 ml-2 bg-transparent"
                                onClick={() => {
                                    open();
                                }}
                            >
                                <PlusSquare style={{ color: 'black' }} />
                            </Button>
                            );
                        }}
                    </CldUploadWidget>
                )}
            </div >
        </main >
    );
}

export default updateFeaturedPhotos