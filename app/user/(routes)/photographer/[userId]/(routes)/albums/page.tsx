"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import axios from "axios";
import toast from "react-hot-toast";
import { Album } from "@/app/lib/types";
import AlbumCard from "./[albumId]/components/albumCard";
import AlbumForm from "./[albumId]/components/albumForm";

const AlbumPage = () => {
    const [isPhotographer, setIsPhotographer] = useState<boolean>(false);
    const [album, setAlbum] = useState<Album[]>([]);
    const { data: session } = useSession();
    const { userId } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/api/photographer/${userId}/getalbums`
            );
            const albumsData = res.data.map((album: Album) => ({
                ...album,
            }));
            setAlbum(albumsData);
        };
        fetchData();
    }, [userId,album]);

    useEffect(() => {
        if (userId == session?.user.id) {
            setIsPhotographer(true);
        }
    }, [userId, session]);

    const handleDeleteAlbum = async (id: string) => {
        try {
            const res = await axios.delete(
                `${process.env.NEXT_PUBLIC_API_URL}/api/photographer/${id}/deletealbum`
            );
            setAlbum((prevAlbums) =>
                prevAlbums.filter((album) => album["id"] !== id)
            );
            toast.success("Album deleted successfully");
        } catch (error) {
            toast.error("Error deleting album");
        }
    }
    const handleAlbumSubmit = (album: Album) => setAlbum((prevAlbums) => [...prevAlbums, album])

    return (
        <div className="mb-[50px] mt-4">
            <AlbumForm userId={userId}  isPhotographer={isPhotographer} isCreateAlbum={true} onAlbumSubmit={handleAlbumSubmit}/>
            <div className="container mx-auto mt-6">
                <AlbumCard albumData={album} deleteAlbums={handleDeleteAlbum} isPhotographer={isPhotographer} /> 
            </div>
        </div>
    );
};

export default AlbumPage;

