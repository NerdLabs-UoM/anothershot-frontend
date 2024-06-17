"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import axios from "axios";
import toast from "react-hot-toast";
import { Album } from "@/app/lib/types";
import { delay } from "@/app/lib/delay";

const AlbumForm = React.lazy(() =>
  delay(3000).then(() => import("./[albumId]/components/albumForm"))
);
const AlbumCard = React.lazy(() =>
  delay(3000).then(() => import("./[albumId]/components/albumCard"))
);

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
  }, [userId]);

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
  };
  const handleAlbumSubmit = (album: Album) =>
    setAlbum((prevAlbums) => [...prevAlbums, album]);

  return (
    <div className="mb-[50px] mt-4">
      <AlbumForm
        userId={userId}
        isPhotographer={isPhotographer}
        isCreateAlbum={true}
        onAlbumSubmit={handleAlbumSubmit}
      />
      <div className="mt-6 w-full container max-w-full">
        <AlbumCard
          albumData={album}
          deleteAlbums={handleDeleteAlbum}
          isPhotographer={isPhotographer}
        />
      </div>
    </div>
  );
};

export default AlbumPage;
