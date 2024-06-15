"use client";

import { useParams, useSearchParams, useRouter } from "next/navigation";
import { LucideArrowLeft } from 'lucide-react';
import { useEffect, useState } from "react";
import { AlbumImage, Album } from "@/app/lib/types";
import { useSession } from "next-auth/react";
import axios from "axios";
import { Masonrygrid } from "./components/masonrygrid";
import ImageUpload from "./components/imageUpload";
import AlbumForm from "./components/albumForm";

const AlbumPage = () => {
    const { albumId } = useParams();
    const { userId } = useParams();
    const searchParams = useSearchParams();
    const view = searchParams.get("view");
    const [album, setAlbum] = useState<Album>();
    const [viewPage, setViewPage] = useState<boolean>(true);
    const [images, setImages] = useState<AlbumImage[]>([]);
    const [isPhotographer, setIsPhotographer] = useState<boolean>(false);
    const router = useRouter();
    const { data: session } = useSession();



    useEffect(() => {
        const getAlbum = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/photographer/${albumId}/getalbum`);
                if (res.data.length > 0) {
                    setAlbum(res.data[0]);
                }
            } catch (e) {
                throw new Error("Error fetching Album data");
            }
        }
        getAlbum();
    }, [])

    useEffect(() => {
        if (userId == session?.user.id) {
            setIsPhotographer(true);
        }
    }, [userId, session]);

    useEffect(() => {
        async function fetchImages() {
            try {
                const res = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/photographer/${albumId}/getimages`
                );
                setImages(res.data);

            } catch (e) {
                throw new Error("Error fetching images");
            }
        }

        fetchImages();
        if (view === "false") {
            setViewPage(false);
        }

    }, [albumId, view]);

    const imageUpload = (newImages: AlbumImage[]) => {
        setImages(newImages);
    };

    const handleAlbumEdit = (newAlbum: Album) => {
        if (album) {
            setAlbum({
                ...album,
                name: newAlbum.name,
                description: newAlbum.description,
                visibility: newAlbum.visibility,
                price:newAlbum.price
            });
        }
    }

    return (
        <div className="container">
            <div className="mt-5">
                <LucideArrowLeft onClick={() => {
                    router.push(`/user/photographer/${userId}/albums`);
                }} className="cursor-pointer"/>

            </div>
            <div className="flex justify-between pt-4">
                <div className="flex gap-3">
                    <div className="flex-col">
                        <div className="flex gap-4">
                        <h1 className="text-2xl font-bold">{album?.name}</h1>
                        <div className="relative">
                            {viewPage &&
                                <AlbumForm userId={userId} albumId={albumId} isPhotographer={isPhotographer} album={album} onAlbumEdit={handleAlbumEdit} />
                            }
                        </div>
                        </div>
                        <p className="w-auto">{album?.description}</p>
                    </div>

                </div>

                {viewPage && (
                    <ImageUpload
                        albumId={albumId}
                        onImageUpdate={imageUpload}
                    />
                )}
            </div>
            <Masonrygrid images={images} albumData={album} canView={viewPage} isPhotographer={isPhotographer} viewerId={session?.user.id} />
        </div>
    );
};

export default AlbumPage;