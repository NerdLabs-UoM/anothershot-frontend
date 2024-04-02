"use client";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import {
    CldUploadWidgetResults,
    CldUploadWidgetInfo,
    CldUploadWidget,
} from "next-cloudinary";
import { useParams, useRouter } from "next/navigation";
import { Photographer } from "@/app/lib/types";
import { PlusSquare } from "lucide-react";

const formSchema = z.object({
    packageId: z.string(),
    coverPhoto: z.string()
});
interface PackageEditFormProps {
    packageId: string;
    setCoverPhoto: React.Dispatch<  //update the cover photo state
    React.SetStateAction<{
        url: string;
    }>> 
}
const AddCoverPhotos: React.FC<PackageEditFormProps> = ({ packageId ,setCoverPhoto}) => {
    const [photographer, setPhotographer] = useState<Photographer>();
    const { userId } = useParams();
    const { data: session } = useSession();
    const [isPhotographer, setIsPhotographer] = useState(true);
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [coverImageURL, setCoverImageURL] = useState("https://res.cloudinary.com/image/upload/v1707855067/hlnolejsok99gjupmfbi.jpg");

    const [values, setValues] = useState({
        coverPhoto: "",
    });
    const [coverPhotos, setCoverPhotos] = useState<string[]>([]);  //update the cover photo state
 
     const [imageKey, setImageKey] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const handleRefresh = () => {
        router.refresh();
    };
    useEffect(() => {
        const fetchData = async () => {
           
            try{
                const res = await axios.get<Photographer>(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/photographer/packages/${userId}`
                );
                setPhotographer(res.data);

            }
            catch (err) {
                toast.error("at package Cannot fetch data. Please try again.")

            }
                 
        };
        fetchData();
    },[]);
    useEffect(() => {
        if (userId == session?.user.id) {
            setIsPhotographer(true);
        }
    }, [userId, session]);
    useEffect(() => {
        if (session) {
            setSessionId(session?.user.id);
        }
    }, [session]);
    useEffect(() => {
        if (photographer) {
            setValues({
                coverPhoto: photographer?.coverPhoto ?? "",
            });
        }
    }, [photographer]);

   
    return (
        <main>
            <div className="w-full pr-10">
                {isPhotographer && (
                    <CldUploadWidget
                        onOpen={() => { }}
                        onSuccess={(results: CldUploadWidgetResults) => {
                            const uploadedResult = results.info as CldUploadWidgetInfo;
                            const packageImageURL = {
                                image: uploadedResult.secure_url,
                            };
                           
                            const tags = uploadedResult.tags;
                            setCoverImageURL(packageImageURL.image);
                                                    
                            async function Update() {
                                const data = {
                                    coverPhotos: [packageImageURL.image]
                                };
                                setCoverPhotos([packageImageURL.image])  //set the coverPhoto url
                               
                                setCoverPhoto({url:packageImageURL.image})  //update the cover photo state           
                              try{
                                await axios.put(
                                    `${process.env.NEXT_PUBLIC_API_URL}/api/photographer/${packageId}/coverphotos`, data
                                );
                              }
                              catch (error) {
                                toast.error("An error occured. Please try again.")
                              }
                                
                            }
                            Update();
                            handleRefresh();
                        }}
                        options={{
                            tags: ["cover image", `${session?.user.id}`],
                            sources: ["local"],
                            googleApiKey: "<image_search_google_api_key>",
                            showAdvancedOptions: false,
                            cropping: true,
                            croppingCoordinatesMode: "custom",
                            croppingAspectRatio: 1,
                            multiple: false,
                            defaultSource: "local",
                            resourceType: "image",
                            folder: `${photographer?.userId}/${photographer?.name}/coverphotos`,
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
                        uploadPreset={`${process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}`}
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
export default AddCoverPhotos;
