"use client";

import { useEffect, useState, lazy, Suspense } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { delay } from "@/app/lib/delay";

const ProfileBio = lazy(() => delay(2000).then(() => import("./ProfileBio")));
const ClientBookings = lazy(() => delay(2000).then(() => import("./ClientBookings")));

const Bookings = () => {
  const [isClient, setIsClient] = useState(false);
  const { userId } = useParams();
  const { data: Session } = useSession();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const ClientProfile = () => {
    if (Session && Session?.user?.id === userId) {
      return (
        <div className="flex flex-col min-h-screen items-center lg:flex-row lg:items-start mt-4 sm:mt-12 lg:mt-10 lg:mx-16">
          {isClient && (
            <>
              <ProfileBio />
              <ClientBookings />
            </>
          )}
        </div>
      );
    };
  };

  return (
    <div>
      {ClientProfile()}
    </div>
  );
};

export default Bookings;
