import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import Photographer from "../../../../page";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";

// import EditPhoto from './editPhoto';
import updateFeaturedPhotos from "./updateFeaturedPhotos";


export default function FeaturedPhoto() {
  const [FeaturedPhotos, setFeaturedPhotos] = useState({        //update the cover photo without reload the page
    url: ""
  })
  const {userId} = useParams();
  const [featuredPhoto, setFeaturedPhoto] = useState<string[]>([]);
  //handleUpdateFeaturePhoto("index:number")
  const handleUpdateFeaturePhoto = async (index:number) => {
    try {
      // Prompt the user to input the new URL for the featured photo
      const newUrl = prompt("Enter the new URL for the featured photo:");
      if (!newUrl) return; // If the user cancels or inputs an empty URL, do nothing
      
      // Update the state with the new photo URL at the specified index
      const updatedPhotos = [...featuredPhoto];
      updatedPhotos[index] = newUrl;
      setFeaturedPhoto(updatedPhotos);

      // Call the saveFeaturedPhoto function to save the updated photo URL to the database
      await saveFeaturedPhoto(newUrl, index);

      toast.success("Featured photo updated successfully.");
    } catch (error) {
      console.error('Error updating featured photo:', error);
      toast.error("Error updating featured photo. Please try again.");
    }
  };
  //
  //async function img url db save photographer features.[0]
  const saveFeaturedPhoto = async (photoUrl: string, index: number) => {
    try {
      // Send a POST request to save the photo URL
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/photographer/featured`, {
        userId: userId,
        imageUrl: photoUrl,
        index: index
      });
      // Log success or perform any additional actions
      console.log(`Photo at index ${index} saved successfully.`);
    } catch (error) {
      // Handle errors
      console.error('Error saving photo:', error);
      toast.error("Error saving photo. Please try again.");
    }
  };
  // async function saveFeaturedPhotos()

  //get all featured photos from db //
  useEffect(() => {
    const fetchFeatured = async () => {
      
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/photographer/featured/${userId}`
        );
       
        setFeaturedPhoto(res.data);
        // console.log(res.data);
      } catch (error) {
        toast.error("Cannot fetch data. Please try again.")

      }};
      fetchFeatured();
    },[userId]);
      //useEffect and set urls to featuredPhoto Sttate..

      return (
        <div>

          <div className="flex flex-direction:row sm:flex mt-6 ml-0 sm:ml-4 mb-6 sm:mb-10 mr-6 space-x-2 sm:space-x-6 md:-space-x-6 lg:-space-x-8 w-lg ">

            <div className="flex -space-x-4 sm:-space-x-14 ">
              <div >
                {/* <updateFeaturedPhotos setFeaturedPhoto={setFeaturedPhoto}/> */}

                <div className="flex sm:mt-8 md:mt-6 lg:mt-4 sm:mb-14">
                  <Image
                    src={"/images/man-with-camera 1.png"}
                    alt="featured photo 1"
                    className="w-96 sm:w-full h-28 sm:h-auto rounded-3xl sm:rounded-none mt-4 "
                    width={500}
                    height={400}

                  />
                  <div className="flex justify-start ml-0"> </div>

                </div>
              </div>

              <div className="flex relative">
                <Image
                  src={"/images/photographer-looking-camera-screen 1.png"}
                  alt="featured photo 2"
                  className="w-lg sm:w-full h-36 sm:h-full rounded-3xl sm:rounded-none  "
                  width={500}
                  height={500}
                />
              </div>
              <div className="flex justify-start ml-8 relative">
                {/* <EditPhoto />  */}
                </div>

            </div>
            <div className="flex -space-x-6 sm:-space-x-14 ">
              <div className="mt-0 flex relative pl-0 sm:pl-4 md:pl-10 lg:pl-12 xl:pl-12">
                <Image
                  src="/images/portrait-stylish-professional-photographer (1) 1.png"
                  alt="featured photo 3"
                  className="w-lg sm:w-full h-36 sm:h-full rounded-3xl sm:rounded-none "
                  width={500}
                  height={500}
                />
              </div>

              <div className="mt-6 sm:mt-8 md:mt-10 lg:mt-8 xl:mt-10 md:mb-0 lg:mb-0 xl:mb-0 ">
                <Image
                  src={"/images/front-view-woman-holding-photo-camera 1.png"}
                  alt="featured photo 4"
                  className="w-96 sm:w-full h-28 sm:h-auto rounded-3xl sm:rounded-none"
                  width={500}
                  height={500}
                />
              </div>
            </div>
          </div>
          <div>
          {featuredPhoto.map((photoUrl:string, index:number) => (
        <div key={index}>
          <Image src={photoUrl} alt={`Featured Photo ${index}`} width={500} height={500} />
          <Button onClick={() => saveFeaturedPhoto(photoUrl, index)}>Save </Button>
        </div>
      ))}
          </div>
        </div>

      );
    
      }