'use client'

import React from "react";
import { useSession } from "next-auth/react";
import Offers from "@/components/offer/offers";

function BookingPage() {
  const { data: session } = useSession();
  const userId  = session?.user.id
  return (
    <div className = "flex flex-col justify-center">
      <Offers/>
    </div>
  );
}

export default BookingPage;
