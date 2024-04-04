"use client";
import React from "react";
import { useState } from "react";
import Image from "next/image";
import AddCoverPhotos from "./addCoverPhotos";

interface CardProps {
  src: string;
  name: string;
  description: string;
  price: string;
  packageId:string;
}
export const PackageCard = ({ src, name, description, price,packageId }: CardProps) => {

    const [coverPhoto, setCoverPhoto]= useState({        //update the cover photo without reload the page
      url:""
    })
  return (
    <div className="mt-2 mb-0 px-4 sm:ml-8">
      <div className=" w-80 sm:w-96 grid-rows-2 sm:grid-rows-2 sm:grid-cols-1 mt-0 ">
        <div className="mt-4 mb-2 px-0 sm:px-16 md:px-10 sm:mt-4 grid grid-row-span-1 grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-2 sm:gap-24 md:gap-24 ">
          <div className=" grid col-span-1 grid-row-2 p-2 border-4 rounded-3xl mb-0 w-80 shadow-lg shadow-purple-600 h-96">
            <div className="flex items-end justify-end pr-0 pl-12">
              <AddCoverPhotos packageId={packageId}  setCoverPhoto={setCoverPhoto}/>  
            </div>
            <div className="col-span-1 flex justify-center mt-1">
              <Image
                src={coverPhoto.url?coverPhoto.url:src}
                alt={name}
                width={180}
                height={150}
                className="rounded-xl"
              />
            </div>
            <div className=" row-span-1 p-6">
              <h3 className="flex justify-center items-center font-bold text-xl mt-0">
                {name}
              </h3>
              <span className=" flex items-center text-sm">{description}</span>
              <span className=" flex items-center justify-center text-sm">
                <h4 className="grid items-center mt-4 font-bold text-md">LKR {price}</h4>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
