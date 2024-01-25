import Image from "next/image";
import React from "react";

export default function FeaturedPhoto() {
  return (
    <div>
      <div className="flex flex-direction:row sm:flex mt-6 ml-0 sm:ml-4 mb-6 sm:mb-10 mr-6 space-x-2 sm:space-x-6 md:-space-x-6 lg:-space-x-8 w-lg ">
        <div className="flex -space-x-4 sm:-space-x-14 ">
          <div className="flex sm:mt-10 md:mt-12 lg:mt-12 md:mb-6 lg:mb-6 xl:mb-8">
            <Image
              src={"/images/man-with-camera 1.png"}
              alt="featured photo 1"
              className="w-96 sm:w-full h-28 sm:h-auto rounded-3xl sm:rounded-none mt-4 sm:mt-0"
              width={500}
              height={500}
            />
          </div>

          <div className="featured-photo-two flex relative rounded-full sm:rounded-none">
            <Image
              src={"/images/photographer-looking-camera-screen 1.png"}
              alt="featured photo 2"
              className="w-lg sm:w-full h-36 sm:h-full rounded-3xl sm:rounded-none  "
              width={500}
              height={500}
            />
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

          <div className="mt-6 sm:mt-16">
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
             
    </div>
  );
}
