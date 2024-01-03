"use client";
import ContactForm from "./contactSection/components/contactForm";
import ContactSection from "./contactSection/contactSection";
import FeaturedPhotoSection from "./featuredPhoto/featuredPhotoSection";
import { useEffect, useState } from "react";

const PhotographerProfile = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-5">
      {isClient && (
        <>
          <FeaturedPhotoSection />
          <ContactSection />
          <ContactForm />
        </>
      )}
    </div>
  );
};

export default PhotographerProfile;
