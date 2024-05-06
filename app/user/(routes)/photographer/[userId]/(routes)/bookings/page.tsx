
"use client"

import React from "react";
import { useSession } from "next-auth/react";
import AddBooking from "./components/AddBooking";
import { useParams } from "next/navigation";
import FetchBookings from "./components/fetchBookings";

function BookingPage() {
  const { data: session } = useSession();
  const  ParamuserId  = useParams();
  const userId  = session?.user.id
  console.log(ParamuserId);
  console.log(userId);
  return (
    <div className = "flex flex-col justify-center items-center">
      {ParamuserId.userId ==userId?<FetchBookings/>:<AddBooking/>}
    </div>
  );
}

export default BookingPage;

