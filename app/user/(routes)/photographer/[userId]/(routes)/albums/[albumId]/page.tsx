"use client"

import {Button} from "@/components/ui/button";
import {signOut, useSession} from "next-auth/react";
import {useParams, useRouter} from "next/navigation";
import {Upload} from 'lucide-react';
import {useEffect, useState} from "react";
import {Photographer} from "@/app/lib/types";
import Masonry from "react-masonry-css";
import { Masonrygrid } from "./components/masonrygrid";

import ImageUpload from "./components/imageUpload";

const Album = () => {
    const {albumId} = useParams();
    const [photographer, setPhotographer] = useState<Photographer>();
    const [images,setImages] = useState<string[]>([]);
    const [isPhotographer, setIsPhotographer] = useState(false);
    const { data: session } = useSession();
    const router = useRouter();
    

    const handleImageUpload = (newImages:string[]) => {
        setImages(newImages);
    }

    // useEffect(() => {
    //     if (albumId == session?.user.image) {
    //         setIsPhotographer(true);
    //     }
    // }, [albumId, session]);
    return (
        <div className="container">
            <div className=" flex justify-between pt-4">
                <h1 className="text-3xl font-extrabold">Album </h1>

                <ImageUpload albumId={albumId} onImageUpdate={handleImageUpload}/>

            </div>
            <Masonrygrid images={images}/>

        </div>
    );
}

export default Album;

