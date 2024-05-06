"use client";

import React from 'react';
import Image from 'next/image';

const Team: React.FC = () => {
  return (
    <div id="mission" className="flex flex-col min-h-screen w-full justify-center items-center sm:gap-y-24">
      <h2 className='lg:text-6xl md:text-3xl text-xl sm:font-medium font-semibold text-center my-6 sm:my-0'>Developed By</h2>
      <div className='flex flex-col sm:grid sm:grid-cols-5 lg:gap-10 sm:gap-1'>
        <div className='flex flex-col mb-4 items-center'>
          <Image src='/images/kalhara.jpg' width={200} height={200} alt="Developer 1" className='lg:h-40 lg:w-40 md:w-28 md:h-28 sm:w-24 sm:h-24 w-20 h-20 rounded-full border-2 mb-3'/>
          <p className='italic text-xs sm:text-base flex flex-col text-center'>Kavindu Kalhara</p>
        </div>
        <div className='flex flex-col mb-4 items-center'>
          <Image src='/images/kavidu.jpg' width={200} height={200}  alt="Developer 2" className='lg:h-40 lg:w-40 md:w-28 md:h-28 sm:w-24 sm:h-24 w-20 h-20 rounded-full border-2 mb-3'/>
          <p className='italic text-xs sm:text-base flex flex-col text-center'>Kavindu Prabasara</p>
        </div>
        <div className='flex flex-col mb-4 items-center'>
          <Image src='/images/risni.jpg' width={200} height={200}  alt="Developer 3" className='lg:h-40 lg:w-40 md:w-28 md:h-28 sm:w-24 sm:h-24 w-20 h-20 rounded-full border-2 mb-3'/>
          <p className='italic text-xs sm:text-base flex flex-col text-center'>Risni Dheerasekra</p>
        </div>
        <div className='flex flex-col mb-4 items-center'>
          <Image src='/images/lahiruni.jpg' width={200} height={200}  alt="Developer 4" className='lg:h-40 lg:w-40 md:w-28 md:h-28 sm:w-24 sm:h-24 w-20 h-20 rounded-full border-2 mb-3'/>
          <p className='italic text-xs sm:text-base flex flex-col text-center'>Lahiruni Malshika</p>
        </div>
        <div className='flex flex-col mb-4 items-center'>
          <Image src='/images/Pawani.jpg' width={200} height={200}  alt="Developer 5" className='lg:h-40 lg:w-40 md:w-28 md:h-28 sm:w-24 sm:h-24 w-20 h-20 rounded-full border-2 mb-3'/>
          <p className='italic text-xs sm:text-base flex flex-col text-center'>Pawani Gimhani</p>
        </div>
      </div>
    </div>
  );
};

export default Team;
