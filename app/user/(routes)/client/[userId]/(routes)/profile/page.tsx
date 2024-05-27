"use client";

import { useEffect, useState, lazy } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { delay } from "@/app/lib/delay";

const ProfileBio = lazy(() => delay(4000).then(() => import("./components/ProfileBio")));
const ProfileGallery = lazy(() => delay(4000).then(() => import("./components/ProfileGallery")));


const ClientProfile = () => {
  const [isClient, setIsClient] = useState(false);
  const { userId } = useParams();
  const { data: Session } = useSession();

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
  };
};

  return (
    <div>
      {RenderClientProfile()}
    </div>
  );
};

export default ClientProfile;



