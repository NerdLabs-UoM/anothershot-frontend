"use client";

import { useEffect, useState } from "react";
import ProfileBio from "./ProfileBio";
import ClientBookings from "./ClientBookings";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const Bookings = () => {
  const [isClient, setIsClient] = useState(false);
  const { userId } = useParams();
  const { data: Session } = useSession();
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const ClientProfile = () => {
    if (Session && Session?.user?.id === userId) {
      return (
      <div className="flex flex-col min-h-screen items-center lg:flex-row lg:items-start mt-4 sm:mt-12 lg:pt-20 lg:mx-16">
        {isClient && (
          <>
            <ProfileBio />
            <ClientBookings />
          </>
        )}
      </div>
      );
    }else{
      router.push('/page-not-found');
    } 
    ;
  };

  return (
    <div>
        { ClientProfile() }
    </div>
  );
};

export default Bookings;
