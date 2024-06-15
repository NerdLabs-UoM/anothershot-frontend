"use client";
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
import { NotificationService } from "@/components/notification/notification";

interface PackageEditFormProps {
    packageId: string;
    setCoverPhoto: React.Dispatch<
        React.SetStateAction<{
            url: string;
        }>>
}
const AddCoverPhotos: React.FC<PackageEditFormProps> = ({ packageId, setCoverPhoto }) => {
    const [photographer, setPhotographer] = useState<Photographer>();
    const { userId } = useParams();
    const { data: session } = useSession();
    const [isPhotographer, setIsPhotographer] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
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
    }, []);

    useEffect(() => {
        if (userId !== session?.user.id) {
            setIsPhotographer(false);
        } else {
            setIsPhotographer(true);
        }
    }, [photographer, session]);

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
                            async function update() {
                                const data = {
                                    coverPhotos: [packageImageURL.image]
                                };
                                try {
                                    await axios.put(
                                        `${process.env.NEXT_PUBLIC_API_URL}/api/photographer/${packageId}/coverphotos`, data
                                    );
                                    NotificationService({
                                        senderId: session?.user?.id, 
                                        receiverId: session?.user.id,
                                        type: 'contact_updated',
                                        title: 'contact Updated',
                                        description: '',
                                      });
                                }
                                catch (error) {
                                    toast.error("An error occured. Please try again.")
                                }
                            }

                            update()
                            setCoverPhoto({ url: uploadedResult.secure_url });

                        }}
                        options={{
                            tags: ["cover image", `${session?.user.id}`],
                            sources: ["local"],
                            googleApiKey: "<image_search_google_api_key>",
                            showAdvancedOptions: false,
                            cropping: true,
                            singleUploadAutoClose:true,
                            croppingCoordinatesMode: "custom",
                            croppingAspectRatio: 1,
                            multiple: false,
                            defaultSource: "local",
                            resourceType: "image",
                            folder: `anothershot/${photographer?.userId}/packages/coverphotos`,
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