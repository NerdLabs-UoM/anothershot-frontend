"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

function page() {
  const session = useSession();
  const router = useRouter();
  const userId = session.data?.user?.id;
  const handleClick = () => {
    router.push(`/user/client/${userId}/bookings/checkout`);
  };
  return (
    <div className="grid text-center content-center h-full ">
      <div className="md:border rounded-[20px] md:p-10 min-w-[350px]">
        <h1 className="text-3xl font-bold m-4">Bookings</h1>
        <Button
          variant="default"
          className="w-1/2"
          onClick={() => handleClick()}
        >
          <span className="ml-2">Check Out</span>
        </Button>
      </div>
    </div>
  );
}

export default page;
