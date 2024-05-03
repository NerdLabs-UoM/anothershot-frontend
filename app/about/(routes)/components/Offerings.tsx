"use client";

import React from 'react';
import { Separator } from "@/components/ui/separator";

const Offers: React.FC = () => {
  return (
    <div id="mission" className="flex flex-col min-h-screen w-full justify-center items-center sm:gap-y-24 gap-y-16">
      <h2 className='lg:text-6xl md:text-3xl text-xl sm:font-medium font-semibold sm:mt-32 mt-20 text-center'>What We Offer</h2>
      <div className='grid grid-cols-1 text-center lg:mx-3 md:mx-8 mx-10'>
        <p className='text-sm sm:text-base text-slate-600'>
        Welcome to our dynamic platform, a haven where photographers can flourish and connect with potential clients. Here, photographers can effortlessly upload albums, opting for private or public visibility to best suit their needs. They can also market their services through personalized packages, catering to a variety of client requirements. With the ability to manage appointments directly on their profiles, our platform ensures a seamless booking experience.
        For our users, the journey to discover exceptional talent is just a click away. Explore an extensive collection of portfolios to find your ideal photographer. Book with confidence, knowing you can see real-time availability and secure your session directly through the photographer’s profile.
        We stand firm in our commitment to inclusivity, welcoming photographers irrespective of their financial status. Our platform is designed to be accessible and comprehensive, fostering connections that go beyond mere transactions. It’s more than a service; it’s a community where every click of the shutter opens doors to new possibilities and every captured moment builds a bridge to future memories.
        </p>
      </div>
      <div className="p-4">
        <p className="text-base italic font-medium text-center">
        Join us in this journey of capturing moments and creating memories. Because here, every snapshot tells a story.
        </p>
      </div>
      <Separator className='mt-10 h-0.5 w-11/12'/>
    </div>
  );
};

export default Offers;
