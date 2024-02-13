import React from "react";
import Image from "next/image";
import EditButton from "../../contactSection/components/editButton";

export const Packages = () => {
  return (
    <div className="mt-10 mb-10 w-screen p-2 px-6">
      <div className="grid-rows-2 sm:grid-rows-2 mt-2 grid-cols-1 ">
        <div className="flex sm:flexflex-row-span gap-12 sm:gap-80 justify-between sm:justify-between px-0">
          <h1 className="text-2xl sm:text-5xl font-bold">We Are Covering ...</h1>

          <div className="">
            <EditButton />
          </div>
        </div>
        <div className="sm:px-72 md:px-72  mt-4 sm:mt-6 grid grid-row-span-1 grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-20 sm:gap-24 md:gap-24 p-4">
          <div className="grid col-span-1 grid-row-2 p-6 border-gray-800 border-4 rounded-3xl mb-0">
            <div className="col-span-1">
              <Image
                src={"/images/groom-putting-ring-bride-s-finger 1.png"}
                alt="image1"
                width={260}
                height={173}
                className="rounded-xl"
              />
            </div>
            <div className=" row-span-1 p-6">
              <h3 className="flex justify-center items-center font-bold mt-0">
                Weddings
              </h3>
              <span className=" flex items-center justify-center text-sm">Events Package Details list</span>
              <span className=" flex items-center justify-center text-sm">
                <ul className="list-disc text-sm grid items-center ml-4">
                  <li>1st level of puns: 5 gold c</li>
                  <li>2nd level of jokes: 10 gold </li>
                  <li>3rd level of one-liners : 20</li>
                </ul>
              </span>
            </div>
          </div>
          <div className="grid col-span-1 grid-row-2 p-6 border-gray-800 border-4 rounded-3xl ">
           
            
              <div className="grid col-span-1">
                <Image
                  src={
                    "/images/close-up-recording-video-with-smartphone-during-concert-toned-picture 1.png"
                  }
                  alt="image2"
                  width={260}
                  height={173}
                  className="rounded-xl"
                />
              </div>
              <div className=" row-span-1 p-6">
                <h3 className="flex justify-center items-center mt-0 font-bold ">
                  Events
                </h3>
                <span className=" flex items-center justify-center text-sm">Events Package Details list</span>
              <span className=" flex items-center justify-center text-sm">
                <ul className="list-disc text-sm grid items-center ml-4">
                  <li>1st level of puns: 5 gold c</li>
                  <li>2nd level of jokes: 10 gold </li>
                  <li>3rd level of one-liners : 20</li>
                </ul>
              </span>
              </div>
            
          </div>

          <div className="grid col-span-1 grid-row-2 p-6 border-gray-800 border-4 rounded-3xl ">
            
              <div className="grid col-span-1">
                <Image
                  src={
                    "/images/medium-shot-friends-posing-together-photobooth 1.png"
                  }
                  alt="image2"
                  width={260}
                  height={173}
                  className="rounded-xl"
                />
              </div>
              <div className=" row-span-1 p-6">
                <h3 className="flex justify-center items-center mt-0 font-bold">
                  Parties
                </h3>
                <span className=" flex items-center justify-center text-sm">Events Package Details list</span>
              <span className=" flex items-center justify-center text-sm">
                <ul className="list-disc text-sm grid items-center ml-4">
                  <li>1st level of puns: 5 gold c</li>
                  <li>2nd level of jokes: 10 gold </li>
                  <li>3rd level of one-liners : 20</li>
                </ul>
              </span>
              </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};
