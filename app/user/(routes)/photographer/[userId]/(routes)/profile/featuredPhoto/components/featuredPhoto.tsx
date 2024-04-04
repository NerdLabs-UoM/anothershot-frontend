import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";
import UploadFeaturePhoto from "./uploadFeaturePhoto";
import { Link } from "lucide-react";

export default function FeaturedPhoto() {
  const { userId } = useParams();
  const [featuredPhoto, setFeaturedPhoto] = useState<string[]>([]);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/photographer/featured/${userId}`
        );
        setFeaturedPhoto(res.data.featured);
      } catch (error) {
        toast.error("Cannot fetch data. Please try again.");
      }
    };
    fetchFeatured();
  }, [userId]);
  const handleUpdateFeaturePhoto = async (index: number, newUrl: string) => {
    try {
      if (!newUrl) return;
      setFeaturedPhoto((array) => {
        const updatePhoto = [...array];
        updatePhoto[index] = newUrl;
        async function savePhoto() {

          await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/photographer/${userId}/featured`, {
            featured: updatePhoto,
          });
        }
        savePhoto();
        return [...updatePhoto];
      })
     
      toast.success("Featured photo updated successfully.");
    } catch (error) {
      toast.error("Error updating featured photo. Please try again.");
    }
  };

  const renderUploadFeaturePhotoOne = () => {
    if (session?.user?.id === userId) {
      return (
        <UploadFeaturePhoto
          userId={userId}
          index={0}
          handleUpdateFeaturePhoto={handleUpdateFeaturePhoto}
        />
      );
    }
    return null;
  };

  const renderUploadFeaturePhotoTwo = () => {
    if (session?.user?.id === userId) {
      return (
        <UploadFeaturePhoto
          userId={userId}
          index={1}
          handleUpdateFeaturePhoto={handleUpdateFeaturePhoto}
        />
      );
    }
    return null;
  };

  const renderUploadFeaturePhotoThree = () => {
    if (session?.user?.id === userId) {
      return (
        <UploadFeaturePhoto
          userId={userId}
          index={2}
          handleUpdateFeaturePhoto={handleUpdateFeaturePhoto}
        />
      );
    }
    return null;
  };

  const renderUploadFeaturePhotoFour = () => {
    if (session?.user?.id === userId) {
      return (
        <UploadFeaturePhoto
          userId={userId}
          index={3}
          handleUpdateFeaturePhoto={handleUpdateFeaturePhoto}
        />
      );
    }
    return null;
  };
  
  return (
    <div>
      <div className="flex flex-direction:row sm:flex mt-6 ml-0 sm:ml-4 mb-6 sm:mb-10 mr-6 space-x-2 sm:space-x-6 md:-space-x-6 lg:-space-x-8 w-lg ">
          <div className="flex -space-x-4 sm:-space-x-14 ">
          <div className="relative flex mt-10 sm:mt-20 md:mt-20 lg:mt-20 sm:mb-14">
            <Image
              key={0}
              src={featuredPhoto[0]}
              alt="featured photo 1"
              className="w-[220px] sm:w-[340px] h-[160px] sm:h-[500px] rounded-3xl sm:rounded-3xl mt-8"
              width={340}
              height={500}
            />
            <div className="mt-10 absolute top-0 left-0 sm:top-0 sm:right-0 w-full h-full mr-80 ml-4 ">
              {renderUploadFeaturePhotoOne()}
            </div>
          </div>
          <div className=" flex relative mt-10 -ml-2 ">
            <Image
              key={1}
              src={featuredPhoto[1]}
              alt={"featured photo 2"}
              className="w-[250px] sm:w-[456px] h-[200px] sm:h-[600px] rounded-3xl sm:rounded-3xl"
              width={456}
              height={600}
            />
            <div className="absolute top-0 left-0 sm:top-0 sm:right-0 mt-4 mr-80 ml-6 ">
              {renderUploadFeaturePhotoTwo()}
            </div>
          </div>
          <div className="flex justify-start ml-4 sm:ml-10 relative"></div>
        </div>
        <div className="flex -space-x-10 sm:-space-x-14 ">
          <div className="relative ml-6 sm:ml-14 mt-10 flex pl-0 sm:pl-4 md:pl-10 lg:pl-12 xl:pl-12">
            <Image
              key={2}
              src={featuredPhoto[2]}
              alt={"featured photo 3"}
              className="w-[280px] sm:w-[456px] h-[200px] sm:h-[600px] rounded-3xl sm:rounded-2xl "
              width={456}
              height={600}
            />
            <div className="absolute top-0 sm:right-0 mt-4 -mr-2">
              {renderUploadFeaturePhotoThree()}
            </div>
          </div>
          <div className="ml-36 sm:ml-48 md:mb-0 lg:mb-0 xl:mb-0">
            <Image
              key={3}
              src={featuredPhoto[3]}
              alt="featured photo 4"
              className="w-[220px] sm:w-[340px] h-[160px] sm:h-[500px] rounded-3xl sm:rounded-2xl mt-20 sm:mt-24 md:mt-24 lg:mt-24 xl:mt-24 "
              width={340}
              height={500}
            />
            <div className="relative -top-36 left-12 sm:left-0 sm:-top-full sm:-mb-40 sm:mt-96 sm:ml-64 mr-2">
              {renderUploadFeaturePhotoFour()}
            </div>
          </div>
        </div>
      </div>
      </div>
  );
}
