import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Photographer from "../../../../page";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";
import UploadFeaturePhoto from "./uploadFeaturePhoto";
import { useSession } from "next-auth/react";
import { Link } from "lucide-react";

export default function FeaturedPhoto() {
  const { userId } = useParams();
  const [featuredPhoto, setFeaturedPhoto] = useState<string[]>([]);
  const [clickFeatureBtn, setClickFeatureBtn] = useState(false);
  const { data: session } = useSession();



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
  const renderFeedButton = () => {
    if (session?.user?.id === null) {
      return (
        <div>
          <Link href={`/user/photographer/${userId}/feed`}>
            <Button
              variant="default"
              className="rounded-md bg-black-600 text-white-300 flex justify-center items-center">
              View Feed

            </Button>
          </Link>
        </div>
      );
    }
    return null;
  };
  const defaultImage = "https://res.cloudinary.com/dcyqrcuf3/image/upload/v1711975294/defaultImages/fearuredDefault_snh844.avif"


  return (
    <div>
      <div className="flex flex-direction:row sm:flex mt-6 ml-0 sm:ml-4 mb-6 sm:mb-10  space-x-2 sm:space-x-6 md:-space-x-6 lg:-space-x-8 w-lg gap-5">
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
        <div className="flex -space-x-4 xl:-space-x-14 md:-space-x-64">
          <div className="relative flex mt-10 sm:mt-20 md:mt-20 lg:mt-20 sm:mb-14">
            <Image
              key={0}
              src={featuredPhoto[0]!=null?featuredPhoto[0]:defaultImage}
              alt="featured photo 1"
              className="w-[220px] sm:w-[340px] h-[160px] sm:h-[500px] rounded-3xl sm:rounded-3xl mt-8"
              width={340}
              height={50}
            />
            <div className="mt-10 absolute top-0 left-0 sm:top-0 sm:right-0 w-full h-full mr-80 ml-4 ">
              {/* <UploadFeaturePhoto userId={userId} index={0} handleUpdateFeaturePhoto={handleUpdateFeaturePhoto} /> */}
              {renderUploadFeaturePhotoOne()}
            </div>
          </div>
          <div className=" flex relative mt-10 -ml-2 md:mr-10">
            <Image
              key={1}
              src={featuredPhoto[1]!=null? featuredPhoto[1]: defaultImage}
              alt={"featured photo 2"}
              className="w-[250px] md:w-[456px] h-[200px] md:h-[600px] rounded-3xl sm:rounded-3xl"
              width={456}
              height={600}
            />
            <div className="absolute top-0 left-0 sm:top-0 sm:right-0 mt-4 mr-80 ml-6 ">
              {/* <UploadFeaturePhoto userId={userId} index={1} handleUpdateFeaturePhoto={handleUpdateFeaturePhoto} /> */}
              {renderUploadFeaturePhotoTwo()}
            </div>
          </div>

          <div className="flex justify-start ml-4 sm:ml-10 relative"></div>

        </div>
        <div className="flex retalive -space-x-10 xl:-space-x-14 md:-space-x-64">
          <div className="relative ml-0 sm:ml-14 mt-10 flex pl-0 sm:pl-4 md:pl-10 lg:pl-12 xl:pl-12">
            <Image
              key={2}
              src={featuredPhoto[2]!=null ? featuredPhoto[2]:defaultImage}
              alt={"featured photo 3"}
              className="w-[300px] lg:w-[456px] h-[200px] sm:h-[600px] rounded-3xl sm:rounded-2xl "
              width={456}
              height={600}
            />
            <div className="absolute top-0 sm:right-0 mt-4 -mr-2">
              {/* <UploadFeaturePhoto userId={userId} index={2} handleUpdateFeaturePhoto={handleUpdateFeaturePhoto} /> */}
              {renderUploadFeaturePhotoThree()}
            </div>
          </div>


          <div className="ml-36 sm:ml-48 md:mb-0 xl:mb-0">
            <Image
              key={3}
              src={featuredPhoto[3]!=null ? featuredPhoto[3]:defaultImage}
              alt="featured photo 4"
              className="w-[220px] sm:w-[340px] h-[160px] sm:h-[500px] rounded-3xl sm:rounded-2xl mt-20 sm:mt-24 md:mt-24 lg:mt-24 xl:mt-24 pb-3"
              width={340}
              height={500}
            />
            <div className="relative -top-36 left-12 sm:left-0 sm:-top-full sm:-mb-40 sm:mt-96 sm:ml-64 mr-2">
              {/* <UploadFeaturePhoto userId={userId} index={3} handleUpdateFeaturePhoto={handleUpdateFeaturePhoto} /> */}
              {renderUploadFeaturePhotoFour()}
            </div>
          </div>

        </div>
      </div>
      <div className="flex justify-center">
        {renderFeedButton()}
      </div>
    </div>
  );
}
