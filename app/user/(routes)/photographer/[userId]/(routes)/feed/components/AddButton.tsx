"use client";
import React, { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { BiSolidPlusSquare } from "react-icons/bi";
import { CldUploadWidget, CldUploadWidgetInfo, CldUploadWidgetResults } from 'next-cloudinary';
import axios from 'axios';
import { useParams } from "next/navigation";
import { useSession } from 'next-auth/react';
import { Photographer } from "@/app/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from 'next/link';

const AddButton = () => {
    const { userId } = useParams();
    const { data: session } = useSession();
    const [photographer, setPhotographer] = React.useState<Photographer>();
    useEffect(() => {
        async function fetchPhotographer() {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/photographer/${userId}/feed/header`);
            setPhotographer(response.data);
        }
        fetchPhotographer();
    }, [userId]);
    const renderNavigateButton = () => {
        if (session?.user.id === userId) {
            return null;
        }
        else {
            return (
                <div className=' flex justify-center '>
                    <Link href={`/user/photographer/${userId}/profile`}>
                        <Button className='flex flex-row items-center justify-center py-7 bg-slate-300'>
                            <Avatar className="w-12 h-12 mr-3">
                                <AvatarImage src={photographer?.user.image ?? ''} alt="@shadcn" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <h1 className="text-lg font-medium text-black ">{photographer?.name}</h1>
                        </Button>
                    </Link>
                </div>
            )
        }
    }
    const renderAddButton = () => {
        if (session?.user.id === userId) {
            return (
                <CldUploadWidget
                uploadPreset='dymz9yfzv'
                onSuccess={(results: CldUploadWidgetResults) => {
                    const uploadedResult =
                        results.info as CldUploadWidgetInfo;
                    const FeedImageUrl = {
                        image: uploadedResult.secure_url,
                    };
                    async function handleUploadSuccess() {
                        await axios.post(
                            `${process.env.NEXT_PUBLIC_API_URL}/api/photographer/${userId}/feed/createFeed`, {
                            image: FeedImageUrl.image,
                            photographerId: userId,
                        }

                        );
                    }
                    handleUploadSuccess();
                }}
                options={{
                    sources: ["local"],
                    googleApiKey: "<image_search_google_api_key>",
                    showAdvancedOptions: false,
                    cropping: true,
                    multiple: false,
                    defaultSource: "local",
                    resourceType: "image",
                    folder: `${userId}/${photographer?.name}/feed`,
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
                            theme: "white",
                        },
                    },
                }}>
                {({ open }) => {
                    return (
                        <div className="flex justify-center ">
                            <Button variant="ghost" size="icon" onClick={() => {
                                open();
                            }}>
                                <BiSolidPlusSquare size={100} />
                            </Button>
                        </div>
                    );
                }}

            </CldUploadWidget>
            )
        }
        return null;
    }
    return (
        <div className='my-4'>
            {renderNavigateButton()}
            {renderAddButton()}
        </div>
    )

}

export default AddButton;