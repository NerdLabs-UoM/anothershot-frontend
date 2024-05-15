"use client";

import React, { useEffect, useState } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Client } from "@/app/lib/types";
import axios from "axios";
import { useParams } from "next/navigation";
import { toast } from "react-hot-toast";

const ProfileBio = () => {

  const [client, setClient] = useState<Client>();
  const [values, setValues] = useState({
    name: "",
    bio: "",
  });
  const [profileImage, setProfileImage] = useState("");
  const { userId } = useParams();

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/client/${userId}/clientDetails`);
        setClient(response.data);
      } catch (error: any) {
        toast.error("Error fetching details",error);
      }
    };
    fetchClients();
  }, [userId]);
  useEffect(() => {
    if (client) {
      setValues({
        name: client.name,
        bio: client.bio || "",
      });
      setProfileImage(client.user.image ?? "https://res.cloudinary.com/dcyqrcuf3/image/upload/v1711878461/defaultImages/default-profile-image_grcgcd.png");
    }
  }, [client]);

  return (
    <div className=" rounded-lg bg-slate-100 drop-shadow-xl w-11/12 lg:w-1/3 h-auto p-3 lg:mr-5">
      <div className="flex justify-between">
        <Avatar className="w-20 h-20">
          <AvatarImage
            src={profileImage}
            alt="@shadcn"
            className="absolute"
          />
        </Avatar>
      </div>
      <div className="flex flex-col">
        <h1 className="texl-xl lg:text-2xl font-bold">{values.name}</h1>
        <p className="text-gray-700 font-normal text-xs lg:text-base leading-4">@{client?.user.userName}</p>
        <p className="text-xs lg:text-sm pt-3">{values.bio}</p>
      </div>
    </div>
  );
};

export default ProfileBio;