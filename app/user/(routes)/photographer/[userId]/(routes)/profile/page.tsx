"use client";

import { useEffect, useState, lazy } from "react";
import { delay } from "@/app/lib/delay";
import { useGetPhotographerProfile } from "@/hooks/photographer/profile/useGetPhotographerProfile";
import { useParams } from "next/navigation";

const Hero = lazy(() => delay(2000).then(() => import("./heroSection/Hero")));
const FeaturedPhotoSection = lazy(() => delay(2000).then(() => import("./featuredPhoto/featuredPhotoSection")));
const ContactSection = lazy(() => delay(2000).then(() => import("./contactSection/contactSection")));
const PackagesSection = lazy(() => delay(2000).then(() => import("./packagesSection/packagesSection")));
const TestMonialsSection = lazy(() => delay(2000).then(() => import("./testimonialSection/testimonialSection")));

const PhotographerProfile = () => {
  const [isClient, setIsClient] = useState(false);
  const { userId } = useParams();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { data, error, isLoading } = useGetPhotographerProfile(userId.toString());
  console.log(data);

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-5">
      {isClient && (
        <>
          <Hero />
          <FeaturedPhotoSection />
          <ContactSection />
          <PackagesSection />
          <TestMonialsSection />
        </>
      )}
    </div>
  );
};

export default PhotographerProfile;

