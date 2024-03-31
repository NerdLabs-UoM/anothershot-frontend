"use client";

import Navbar from "@/components/Navbar";
import ContactSection from "./contactSection/contactSection";
import FeaturedPhotoSection from "./featuredPhoto/featuredPhotoSection";
import Hero from "./heroSection/Hero";
import TestMonialsSection from "./testimonialSection/testimonialSection";
import { useEffect, useState } from "react";
import EditPhoto from "./featuredPhoto/components/editPhoto";
import PackagesSection from "./packagesSection/packagesSection";

const PhotographerProfile = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-5">
      {isClient && (
        <>
          <Hero />
          <FeaturedPhotoSection />
          <ContactSection />
          <PackagesSection/>
          <TestMonialsSection />
        
        </>
      )}
    </div>
  );
};

export default PhotographerProfile;

