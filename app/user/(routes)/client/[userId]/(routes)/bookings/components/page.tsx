"use client";

import { useEffect, useState } from "react";
import ProfileBio from "./ProfileBio";
import ClientBookings from "./ClientBookings";

const Bookings = () => {
    const [isClient, setIsClient] = useState(false);
  
    useEffect(() => {
      setIsClient(true);
    }, []);
  
    return (
      <div className="flex flex-col min-h-screen items-center lg:flex-row lg:items-start mt-4 sm:mt-12 lg:pt-20 lg:mx-16">
        {isClient && (
          <>
            <ProfileBio />
            <ClientBookings/>
          </>
        )}
      </div>
    );
  };
  
  export default Bookings;
  