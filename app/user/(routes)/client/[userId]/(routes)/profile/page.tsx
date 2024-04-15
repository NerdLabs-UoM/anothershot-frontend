"use client";

import { useEffect, useState } from "react";
import ProfileBio from "./components/ProfileBio";
import ProfileGallery from "./components/ProfileGallery";

const ClientProfile = () => {
    const [isClient, setIsClient] = useState(false);
  
    useEffect(() => {
      setIsClient(true);
    }, []);
  
    return (
      <div className="flex flex-col lg:flex-row items-center mt-4 sm:mt-12 lg:mt-5 lg:mx-16">
        {isClient && (
          <>
            <ProfileBio />
            <ProfileGallery />
          </>
        )}
      </div>
    );
  };
  
  export default ClientProfile;
  
  

