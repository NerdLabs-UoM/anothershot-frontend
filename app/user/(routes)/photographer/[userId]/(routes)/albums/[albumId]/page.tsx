"use client";

import {Button} from "@/components/ui/button";
import {signOut, useSession} from "next-auth/react";
import {useParams, useSearchParams, useRouter} from "next/navigation";
import {LucideArrowLeft} from 'lucide-react';
import {Check, Pencil} from "lucide-react";
import {useEffect, useState} from "react";
import {AlbumImage, Photographer} from "@/app/lib/types";
import {Masonrygrid} from "./components/masonrygrid";
import ImageUpload from "./components/imageUpload";
import axios from "axios";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import toast from "react-hot-toast";

const AlbumPage = () => {
    const {albumId} = useParams();
    const searchParams = useSearchParams();
    const view = searchParams.get("view");
    const albumName = searchParams.get("albumName") ?? "Album Name";
    const albumDescription = searchParams.get("albumDescription") ?? "Album Description";
    const [toggleTextEdit, setToggleTextEdit] = useState<boolean>(false);
    const [toggleIcon, setToggleIcon] = useState<boolean>(true);
    const [viewPage, setViewPage] = useState<boolean>(true);
    const [images, setImages] = useState<AlbumImage[]>([]);
    const {data: session} = useSession();
    const [newAlbumName, setNewAlbumName] = useState({albumName: albumName, albumDescription: albumDescription});
    const router = useRouter();

    // if (view === "false") {
    //     setViewPage(false);
    // }
    // console.log("view true da nadda", newAlbumName.albumName,newAlbumName.albumDescription);

    useEffect(() => {
        async function fetchImages() {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/photographer/${albumId}/getimages`
                );
                setImages(response.data);

            } catch (e) {
                console.error(e);
            }
        }

        if (view === "false") {
            setViewPage(false);
            fetchImages();
        }
    }, []);

    const imageUpload = (newImages: AlbumImage[]) => {
        setImages(newImages);
    };

    // useEffect(() => {
    //     if (albumId == session?.user.image) {
    //         setIsPhotographer(true);
    //     }
    // }, [albumId, session]);

    const handleClick = () => {
        setToggleTextEdit((prevState) => !prevState);
        if (toggleTextEdit) {
            handleAlbumEdit();
        }
    };

    const handleAlbumNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewAlbumName({albumName: event.target.value, albumDescription: newAlbumName.albumDescription});
    };

    const handleAlbumDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewAlbumName({albumName: newAlbumName.albumName, albumDescription: event.target.value});
    };

    const handleAlbumEdit = async () => {
        try {
            const res = await axios.put(
                `${process.env.NEXT_PUBLIC_API_URL}/api/photographer/660610c4c22861850552b644/editalbum`,
                {albumId: albumId, name: newAlbumName.albumName, description: newAlbumName.albumDescription}
            );
            console.log("Submit wuna album name and desc", res);
            toast.success("Album edited successfully");
        } catch (e) {
            toast.error("Error editing album");
        }
        // console.log("me tiyenne new description val eka ", newAlbumName.albumDescription);
        // console.log()
    }

    return (
        <div className="container">
            <div className="mt-5">
                <LucideArrowLeft onClick={() => {
                    router.back();
                }}/>
            </div>
            <div className="flex justify-between pt-4">

                <div className="flex gap-3">
                    {toggleTextEdit ? (
                        <div className="flex flex-col gap-2">
                            <Input
                                value={newAlbumName.albumName}
                                type="text"
                                className="p-2 border-2 border-gray-300 rounded-md"
                                onChange={handleAlbumNameChange}
                            />
                            <Textarea
                                value={newAlbumName.albumDescription}
                                className="p-2 border-2 border-gray-300 rounded-md"
                                onChange={handleAlbumDescriptionChange}
                            />
                        </div>
                    ) : (
                        <div className="flex-col">
                            <h1 className="text-2xl font-bold">{newAlbumName.albumName}</h1>
                            <p>{newAlbumName.albumDescription}</p>
                        </div>

                    )}
                    {viewPage && (
                        !toggleTextEdit ? (
                            <Pencil color="black" size={15} onClick={handleClick} className="mt-2"/>
                        ) : (
                            <Check size={20} onClick={handleClick} className="mt-2"/>
                        )
                    )}
                </div>

                {viewPage && (
                    <ImageUpload
                        albumId={albumId}
                        onImageUpdate={imageUpload}
                    />
                )}
            </div>
            <Masonrygrid images={images}/>
        </div>
    );
};

export default AlbumPage;
