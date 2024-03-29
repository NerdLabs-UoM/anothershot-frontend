"use client"

import {Button} from "@/components/ui/button";
import {signOut, useSession} from "next-auth/react";
import {useParams, useSearchParams} from "next/navigation";
import { useRouter } from 'next/router';
import {Check, Pencil, Upload} from 'lucide-react';
import {useEffect, useState} from "react";
import {AlbumImage, Photographer} from "@/app/lib/types";
import Masonry from "react-masonry-css";
import {Masonrygrid} from "./components/masonrygrid";
import ImageUpload from "./components/imageUpload";
import axios from "axios";

const AlbumPage = () => {
    const {albumId} = useParams();
    // use search params
    const searchParams = useSearchParams();
    const view = searchParams.get("view");
    // const albumName = searchParams.get("albumName");
    const [toggleTextEdit, setToggleTextEdit] = useState<boolean>(false);
    const [toggleIcon, setToggleIcon] = useState<boolean>(true);
    const [viewPage, setViewPage] = useState<boolean>(true);
    const [photographer, setPhotographer] = useState<Photographer>();
    const [images, setImages] = useState<AlbumImage[]>([]);
    const [isPhotographer, setIsPhotographer] = useState(false);
    const {data: session} = useSession();
    const router = useRouter();

    // if (view === "false") {
    //     setViewPage(false);
    // }

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

    // useEffect(() => {
    //     if(router.query) {
    //         const {albumName} = router.query;
    //         if (albumName) {
    //             console.log("this is the album name", albumName);
    //         }
    //     }
    // }, [router.query]);

    const handleImageUpload = (newImages: AlbumImage[]) => {
        setImages(newImages);
    }

    // useEffect(() => {
    //     if (albumId == session?.user.image) {
    //         setIsPhotographer(true);
    //     }
    // }, [albumId, session]);

    const handleClick = () => {
        setToggleTextEdit(prevState => !prevState)
        setToggleIcon(prevState => !prevState)
        console.log("working %%%%%%%%%%%%%%%%")
    }

    return (
        <div className="container">
            <div className="flex justify-between pt-4">
                <div className="flex gap-3">
                    {toggleTextEdit ? <input type="text" className="border-2 border-gray-300 rounded-md p-2"/> :
                        <h1 className="text-2xl font-bold">Album</h1>}
                    {toggleIcon ?
                        <Button
                            variant={"outline"}
                            onClick={handleClick} className="rounded-md p-2">
                            <Pencil color="black" size={15}/>
                        </Button> :
                        <Button
                            variant={"outline"}
                            onClick={handleClick} className="bg-gray-300 rounded-md p-2">
                            <Check
                            size={20}/></Button>}
                </div>

                {viewPage && <ImageUpload albumId={albumId} onImageUpdate={handleImageUpload}/>}
            </div>
            <Masonrygrid images={images}/>

        </div>
    );
}

export default AlbumPage;

