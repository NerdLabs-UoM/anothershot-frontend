"use client"
import { useEffect, useState } from "react";
import Hero from "@/app/photographer/profile/heroSection/Hero";

const PhotographerProfile = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-5">
      {isClient && (
        <>
        <Hero/>
        </>
      )}
    </div>
  );
};

export default PhotographerProfile;