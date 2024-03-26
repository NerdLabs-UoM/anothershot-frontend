import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import Photographer from "../../../../page";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";

// import updateFeaturedPhotos from "./updateFeaturedPhotos";
import UploadFeaturePhoto from "./uploadFeaturePhoto";


export default function FeaturedPhoto() {
  const [FeaturedPhotos, setFeaturedPhotos] = useState({
    url: ""
  });
  const { userId } = useParams();
  const [featuredPhoto, setFeaturedPhoto] = useState<string[]>([]);
  const [clickFeatureBtn, setClickFeatureBtn] = useState(false);
  function setData() { }
  // console.log(featuredPhoto)


  // const saveFeaturedPhoto = async (photoUrl: string, index: number) => {
  //   try {
  //     console.log(userId,featuredPhoto);


  //     const res= await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/photographer/${userId}/featured`, {
  //      featured:featuredPhoto,
  //     });

  //     console.log(res);
  //   } catch (error) {
  //     console.error("Error saving photo:", error);
  //     toast.error("Error saving photo. Please try again."+error);
  //     return;
  //   }
  // };

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/photographer/featured/${userId}`
        );
        setFeaturedPhoto(res.data.featured);

      } catch (error) {
        // toast.error("Cannot fetch data. Please try again.");
      }
    };
    fetchFeatured();
  }, [userId]);

  const handleUpdateFeaturePhoto = async (index: number, newUrl: string) => {
    try {
      // const newUrl = prompt("Enter the new URL for the featured photo:");
      console.log("new url: " + newUrl);
      if (!newUrl) return;
      const updatedPhotos = [...featuredPhoto];
      updatedPhotos[index] = newUrl;
      console.log("updatedPhotos: " + updatedPhotos);
      setFeaturedPhoto(updatedPhotos);
      // await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/photographer/${userId}/featured`, {
      //   featured: updatedPhotos,
      // });
     
      toast.success("Featured photo updated successfully.");
    } catch (error) {
      console.error("Error updating featured photo:", error);
      toast.error("Error updating featured photo. Please try again.");
    }
  };
  return (
    <div>
      <div className="flex flex-direction:row sm:flex mt-6 ml-0 sm:ml-4 mb-6 sm:mb-10 mr-6 space-x-2 sm:space-x-6 md:-space-x-6 lg:-space-x-8 w-lg ">
        <div className="flex -space-x-4 sm:-space-x-14 ">
          <div className="relative mt-20">
            <Image
              src={"/images/man-with-camera 1.png"}
              alt="featured photo 1"
              className="w-96 sm:w-full h-28 sm:h-auto rounded-3xl sm:rounded-none mt-4"
              width={500}
              height={400}
            />
            <div className="mt-10 absolute top-0 left-0 w-full h-full mr-80 ml-4 ">
              <UploadFeaturePhoto userId={userId} index={1} handleUpdateFeaturePhoto={handleUpdateFeaturePhoto} />
            </div>
          </div>
          <div className="relative mt-10 -ml-2">
            <Image
              src={"/images/photographer-looking-camera-screen 1.png"}
              alt="featured photo 2"
              className="w-lg sm:w-full h-36 sm:h-full rounded-3xl sm:rounded-none"
              width={500}
              height={500}
            />
            <div className="absolute top-0 right-0 mt-4 mr-80 -ml-6 ">
              <UploadFeaturePhoto userId={userId} index={2} handleUpdateFeaturePhoto={handleUpdateFeaturePhoto} />
            </div>
          </div>

          <div className="flex justify-start ml-4 sm:ml-10 relative"></div>

        </div>
        <div className="flex -space-x-6 sm:-space-x-14 ">
          <div className="relative ml-16 mt-10">
            <Image
              src="/images/portrait-stylish-professional-photographer (1) 1.png"
              alt="featured photo 3"
              className="w-lg sm:w-full h-36 sm:h-full rounded-3xl sm:rounded-none "
              width={500}
              height={500}
            />
            <div className="absolute top-0 right-0 mt-4 -mr-2">
              <UploadFeaturePhoto userId={userId} index={3} handleUpdateFeaturePhoto={handleUpdateFeaturePhoto} />
            </div>
          </div>


          <div className="relative ml-10 mt-24">
            {/* <div className="ml-10 mt-24 -space-x-10"> */}
            <Image
              src={"/images/front-view-woman-holding-photo-camera 1.png"}
              alt="featured photo 4"
              className="w-96 sm:w-full h-28 sm:h-auto rounded-3xl sm:rounded-none"
              width={500}
              height={500}
            />
            {/* </div> */}
            <div className="absolute top-0 right-0 mt-2 ml-4 -mr-4">
              <UploadFeaturePhoto userId={userId} index={4} handleUpdateFeaturePhoto={handleUpdateFeaturePhoto} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
