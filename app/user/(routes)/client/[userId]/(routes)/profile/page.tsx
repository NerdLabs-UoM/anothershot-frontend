"use client";

import { useEffect, useState } from "react";
import ProfileBio from "./components/ProfileBio";
import ProfileGallery from "./components/ProfileGallery";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const ClientProfile = () => {
  const [isClient, setIsClient] = useState(false);
  const { userId } = useParams();
  const { data: Session } = useSession();
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const RenderClientProfile = () => {
    if (Session && Session.user.id === userId) {
    return (
      <div className="flex flex-col min-h-screen items-center lg:flex-row lg:items-start mt-4 sm:mt-12 lg:pt-20 lg:mx-16">
        {isClient && (
          <>
            <ProfileBio />
            <ProfileGallery />
          </>
        )}
      </div>
    );
  }else{
    router.push('/page-not-found');
  }
};

  return (
    <div>
      {RenderClientProfile()}
    </div>
  );
};

export default ClientProfile;



