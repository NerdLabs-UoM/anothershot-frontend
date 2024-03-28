import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Photographer from "../../../../page";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";

// import updateFeaturedPhotos from "./updateFeaturedPhotos";
import UploadFeaturePhoto from "./uploadFeaturePhoto";

export default function FeaturedPhoto() {
  const { userId } = useParams();
  const [featuredPhoto, setFeaturedPhoto] = useState<string[]>([]);
  const [clickFeatureBtn, setClickFeatureBtn] = useState(false);
  function setData() { }


  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/photographer/featured/${userId}`
        );
        console.log(res.data.featured);
        setFeaturedPhoto(res.data.featured);
      } catch (error) {
        toast.error("Cannot fetch data. Please try again.");
      }
    };
    fetchFeatured();
  }, [userId]);
  const handleUpdateFeaturePhoto = async (index: number, newUrl: string) => {
    try {
      console.log("new url: " + newUrl);
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
      console.log(featuredPhoto);
      // const updatedPhotos = [...featuredPhoto];
      // console.log(updatedPhotos);
      // updatedPhotos[index] = newUrl;
      // console.log("updatedPhotos: " + updatedPhotos);
      // setFeaturedPhoto(updatedPhotos);
      toast.success("Featured photo updated successfully.");
    } catch (error) {
      console.error("Error updating featured photo:", error);
      toast.error("Error updating featured photo. Please try again.");
    }

    // function renderFeaturedPhoto(){

    //   featuredPhoto.map((photo, index) =>{
    //     if(index===0){
    //       return(
    //         <div className="relative mt-20">
    //         <Image
    //           src={"/images/man-with-camera 1.png"}
    //           alt="featured photo 1"
    //           className="w-96 sm:w-full h-28 sm:h-auto rounded-3xl sm:rounded-none mt-4"
    //           width={500}
    //           height={400}
    //         />
    //         <div className="mt-10 absolute top-0 left-0 w-full h-full mr-80 ml-4 ">
    //           <UploadFeaturePhoto userId={userId} index={1} handleUpdateFeaturePhoto={handleUpdateFeaturePhoto} />
    //         </div>
    //       </div>
    //       )
    //     }

    //     if(index===1){
    //       return(
    //         <div className="relative mt-10 -ml-2">
    //           <Image
    //             src={"/images/photographer-looking-camera-screen 1.png"}
    //             alt="featured photo 2"
    //             className="w-lg sm:w-full h-36 sm:h-full rounded-3xl sm:rounded-none"
    //             width={500}
    //             height={500}
    //           />
    //           <div className="absolute top-0 right-0 mt-4 mr-80 -ml-6 ">
    //             <UploadFeaturePhoto userId={userId} index={2} handleUpdateFeaturePhoto={handleUpdateFeaturePhoto} />
    //           </div>
    //         </div>


    //       )
    //     }
    //   })


    // }
  };
  return (
    <div>
      <div className="flex flex-direction:row sm:flex mt-6 ml-0 sm:ml-4 mb-6 sm:mb-10 mr-6 space-x-2 sm:space-x-6 md:-space-x-6 lg:-space-x-8 w-lg ">
        {/* {featuredPhoto.map((photo, index) => {
          return (
            <div className={`relative mt-20 rounded-3xl`}>
              <Image
                src={photo}
                alt="featured photo 1"
                className="w-96 sm:w-full h-28 sm:h-auto rounded-3xl sm:rounded-none mt-4"
                width={500}
                height={400}
              />
              <div className="mt-10 absolute top-0 left-0 w-full h-full mr-80 ml-4 ">
                <UploadFeaturePhoto userId={userId} index={index} handleUpdateFeaturePhoto={handleUpdateFeaturePhoto} />
              </div>
            </div>
          )
        })} */}
        <div className="flex -space-x-4 sm:-space-x-14 ">
          <div className="relative mt-20">
            <Image
              key={0}
              src={featuredPhoto[0]}
              alt="featured photo 1"
              className="w-96 sm:w-full h-28 sm:h-auto rounded-3xl sm:rounded-3xl mt-4"
              width={500}
              height={400}
            />
            <div className="mt-10 absolute top-0 left-0 w-full h-full mr-80 ml-4 ">
              <UploadFeaturePhoto userId={userId} index={0} handleUpdateFeaturePhoto={handleUpdateFeaturePhoto} />
            </div>
          </div>
          <div className="relative mt-10 -ml-2">
            <Image
              key={1}
              src={featuredPhoto[1]}
              alt={"featured photo 2"}
              className="w-lg sm:w-full h-36 sm:h-full rounded-3xl sm:rounded-3xl"
              width={500}
              height={500}
            />
            <div className="absolute top-0 right-0 mt-4 mr-80 -ml-6 ">
              <UploadFeaturePhoto userId={userId} index={1} handleUpdateFeaturePhoto={handleUpdateFeaturePhoto} />
            </div>
          </div>

          <div className="flex justify-start ml-4 sm:ml-10 relative"></div>

        </div>
        <div className="flex -space-x-6 sm:-space-x-14 ">
          <div className="relative ml-16 mt-10">
            <Image
              key={2}
              src={featuredPhoto[2]}
              alt={"featured photo 3"}
              className="w-lg sm:w-full h-36 sm:h-full rounded-3xl sm:rounded-2xl "
              width={500}
              height={500}
            />
            <div className="absolute top-0 right-0 mt-4 -mr-2">
              <UploadFeaturePhoto userId={userId} index={2} handleUpdateFeaturePhoto={handleUpdateFeaturePhoto} />
            </div>
          </div>


          <div className="relative ml-10 mt-24">
            <Image
              key={3}
              src={featuredPhoto[3]}
              alt="featured photo 4"
              className="w-96 sm:w-full h-28 sm:h-auto rounded-3xl sm:rounded-2xl"
              width={500}
              height={500}
            />
            <div className="absolute top-0 right-0 mt-2 ml-4 -mr-4">
              <UploadFeaturePhoto userId={userId} index={3} handleUpdateFeaturePhoto={handleUpdateFeaturePhoto} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
