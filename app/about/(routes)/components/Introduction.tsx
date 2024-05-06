"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const Introduction: React.FC = () => {
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        setShowContent(true);
    }, []);

    return (
        <div id="introduction" className={`flex justify-between items-center sm:min-h-screen min-h-full bg-black w-full transition-opacity duration-500 ease-in-out ${showContent ? 'opacity-100' : 'opacity-0'}`}>
            <h1 className='text-white lg:mx-10 md:mx-7 sm:mx-4 mx-0 lg:text-7xl md:text-3xl text-xl italic md:font-medium font-normal'>Welcome To AnotherShot</h1>
            <Image
                src='/images/camera.jpg'
                alt="Background Image"
                width={550}
                height={50}
                className='sm:h-screen h-[500px] w-1/3'
            />
        </div>
    );
};

export default Introduction;