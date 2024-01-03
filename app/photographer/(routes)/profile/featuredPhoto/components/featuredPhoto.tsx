import Image from "next/image";
import React from "react";

export default function FeaturedPhoto() {
  return (
    <div>
      <div className="featured-photo flex flex-direction:row sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4  ml-6  mr-6 mr-0 sm:-space-x-6 md:-space-x-10 lg:-space-x-12  sm:rounded-xl  sm:w-full md:w-full lg:w-full ">
        <div className="featured-photo-one flex sm:mt-10  md:mt-12 lg:mt-12  xl:mb-8 2xl:mb-16  w-28 sm:w-full md:w-1/2 lg:w-auto xl:w-1/4 h-28 sm:h-1/3 md:h-1/3 lg:h-full xl:h-1/2 2xl:h-1/2">
          <img
            src={"/images/man-with-camera 1.png"}
            alt="featured photo 1"
            className="w-full h-auto"
          />
        </div>

        <div className="featured-spacing-two  mt-4 flex  sm:space-x-16  md:space-x-6 lg:space-x-6  gap:-1 ">
          <div className="featured-photo-two flex relative w-full sm:w-full md:w-full lg:w-full xl:w-auto  h-full sm:h-full md:h-full lg:h-full xl:h-auto">
            <img
              src={"/images/photographer-looking-camera-screen 1.png"}
              alt="featured photo 2"
              className="w-full h-auto"
            />
          </div>
          <div className="featured-photo-three mt-0  flex relative w-full sm:w-full md:w-full lg:w-full xl:w-auto   h-full sm:h-full md:h-full lg:h-full xl:h-auto">
            <img
              src="/images/portrait-stylish-professional-photographer (1) 1.png"
              alt="featured photo 3"
              className="w-full h-auto"
            />
          </div>
        </div>

        <div className="featured-photo-four  mt-16 w-full sm:w-16 md:w-1/2 lg:w-auto  h-full sm:h-full md:h-full lg:h-full xl:h-1/2">
          <img
            src={"/images/front-view-woman-holding-photo-camera 1.png"}
            alt="featured photo 4"
            className="w-full h-auto"
          />
        </div>
      </div>
     
    </div>
  );
}
