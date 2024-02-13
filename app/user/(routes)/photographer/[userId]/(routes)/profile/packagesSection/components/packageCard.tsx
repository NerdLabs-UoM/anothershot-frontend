import React from "react";
import Image from "next/image";


interface CardProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  title1 : string;
 title2 : string;
 content1 : string;
 content2 : string;
 content3 : string;
 
}



export const PackageCard = ({src , alt ,width ,height ,title1 , title2 , content1 , content2 , content3}:CardProps) => {
  return (
    // <div className="mt-2 mb-2 p-8 px-6">
      <div className=" w-96 grid-rows-2 sm:grid-rows-2 sm:grid-cols-1 mt-10 ">
        
        <div className="mt-4 mb-2 px-6 sm:px-10 md:px-12 sm:mt-6 grid grid-row-span-1 grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-2 sm:gap-24 md:gap-24">
          <div className="grid col-span-1 grid-row-2 p-6 border-gray-800 border-4 rounded-3xl mb-0 w-80">
            <div className="col-span-1">
              <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                className="rounded-xl"
              />
            </div>
            <div className=" row-span-1 p-6">
              <h3 className="flex justify-center items-center font-bold mt-0">
                {title1}
              </h3>
              <span className=" flex items-center justify-center text-sm">{title2}</span>
              <span className=" flex items-center justify-center text-sm">
                <ul className="list-disc text-sm grid items-center ml-4">
                  <li>{content1}</li>
                  <li>{content2} </li>
                  <li>{content3}</li>
                </ul>
              </span>
            </div>
          </div>
          
        </div>
      </div>
    // </div>
  );
};
