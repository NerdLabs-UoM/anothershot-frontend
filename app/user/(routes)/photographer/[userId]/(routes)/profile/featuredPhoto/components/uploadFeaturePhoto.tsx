import React, { useState } from 'react'
import { CldUploadWidget, CldUploadWidgetInfo, CldUploadWidgetResults } from 'next-cloudinary';
import { Photographer } from '@/app/lib/types';
import toast from "react-hot-toast";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { PlusSquare } from "lucide-react";


interface UploadFeaturePhoto {
    userId: string | string[];
    index: number;
    handleUpdateFeaturePhoto: (index: number, newUrl: string) => Promise<void>;
}

const UploadFeaturePhoto = ({ userId, index, handleUpdateFeaturePhoto }: UploadFeaturePhoto) => {

    const [coverImageURL, setCoverImageURL] = useState("https://res.cloudinary.com/image/upload/v1707855067/hlnolejsok99gjupmfbi.jpg");
    const [coverPhotos, setCoverPhotos] = useState<string[]>([]);
    console.log("index and image: " + index);
    // const { data: session } = useSession();
    const [isPhotographer, setIsPhotographer] = useState(true);
    const [photographer, setPhotographer] = useState<Photographer>();
    const [featuredPhotoURL, setFeaturedPhotoURL] = useState("https://res.cloudinary.com/dts2l2pnj/image/upload/v1707855067/hlnolejsok99gjupmfbi.jpg");
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
                            handleUpdateFeaturePhoto(index, uploadedResult.secure_url)
                            async function Update() {
                            const data = {
                                featured: [],
                            };
                            console.log("index and image: " + index, uploadedResult.secure_url);
                            setFeaturedPhotoURL(FeaturedURL.image)  //set the coverPhoto url
                            // setFeaturedPhoto({url:FeaturedURL.image})  //update the cover photo state   
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
                            tags: ["featured"],
                            sources: ["local"],
                            googleApiKey: "<image_search_google_api_key>",
                            showAdvancedOptions: false,
                            cropping: true,
                            croppingCoordinatesMode: "custom",
                            croppingAspectRatio: 0.5,
                            multiple: false,
                            defaultSource: "local",
                            resourceType: "image",
                            folder: `featured`,
                            //   folder: `${photographer?.userId}/${photographer?.name}/featured`,
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
    )
}

export default UploadFeaturePhoto;