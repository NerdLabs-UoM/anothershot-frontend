"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { set, useForm } from "react-hook-form";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SubmitForm from "../../testimonialSection/components/SubmitForm";
import { Package } from "@/app/lib/types";
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



const formSchema = z.object({
    packageId: z.string(),
    coverPhoto: z.string()
});
interface PackageEditFormProps {
    packageId: string;
}


const AddCoverPhotos: React.FC<PackageEditFormProps> = ({ packageId }) => {
    const [photographer, setPhotographer] = useState<Photographer>();
    const { userId } = useParams();
    const { data: session } = useSession();
    const [isPhotographer, setIsPhotographer] = useState(true);
    const [packageImage, setPackageImageURL] = useState(
        "");
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [coverImageURL, setCoverImageURL] = useState("https://res.cloudinary.com/image/upload/v1707855067/hlnolejsok99gjupmfbi.jpg");

    const [values, setValues] = useState({
        coverPhoto: "",
    });
    const [coverPhotos, setCoverPhotos] = useState<string[]>([]);
 
     const [imageKey, setImageKey] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const handleRefresh = () => {
        router.refresh();
    };
    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get<Photographer>(
                `${process.env.NEXT_PUBLIC_API_URL}/api/photographer/packages/${userId}`
            );
            setPhotographer(res.data);
            
            // setCoverPhotos(res.data.coverPhotos);
            // console.log(res.data.coverPhotos);
         
        };
        fetchData();
    });
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

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        setIsOpen(false);
        setValues({ coverPhoto: values.coverPhoto });
        async function Update() {
            await axios.put(
                `${process.env.NEXT_PUBLIC_API_URL}/api/packages/${userId}`,
                values
            );
        }
        Update();
        handleRefresh();
    };
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
                            console.log(tags);
                            setCoverImageURL(packageImageURL.image);
                            console.log(coverImageURL);
                          
                            async function Update() {
                                const data = {
                                    coverPhotos: [packageImageURL.image]
                                };
                                // setCoverPhotos(prevCoverPhotos => [...prevCoverPhotos, packageImageURL.image]);
                                setCoverPhotos([packageImageURL.image])           
                                                   
                                console.log(data);
                                console.log(packageId);
                                await axios.put(
                                    `${process.env.NEXT_PUBLIC_API_URL}/api/photographer/${packageId}/coverphotos`, data
                                );
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
                        uploadPreset="crca4igr"
                    >
                        {({ open }) => {
                            return (
                                <Button
                                    variant="default"
                                    className="rounded-md mt-5 ml-5"
                                    onClick={() => {
                                        open();
                                    }}
                                >
                                    Upload
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
