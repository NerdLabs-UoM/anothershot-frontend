
"use client"

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import Offers from "@/components/offer/offers";

// function BookingPage() {
//   const { data: session } = useSession();
//   const userId  = session?.user.id
//   return (
//     <div className = "flex flex-col justify-center">
//       <Offers/>
//     </div>
//   );
// }

// export default BookingPage;

import { Event } from "@/app/lib/types";
import FullCalendarComp from "@/components/fullCalendar";
import { useState } from "react";
import { useParams } from "next/navigation";
import Events from './components/events';
import axios from "axios";
import toast from "react-hot-toast";
import { DateTimePickerForm } from "@/components/DateTimePickers/date-time-picker-form";
import BookingTable from "./components/bookingTable";
import AddBooking from "./components/AddBooking";

interface EventData {
  id?: string;
  title?: string;
  bookingId?: string;
  description?: string;
  start?: string;
  end?: string;
}
const PhotographerBookingsPage = () => {

  const { userId } = useParams();
  const { data: session } = useSession();
  const [eventList, setEventList] = useState<Event[]>([]);
  const [sampleDate, setSampleDate] = useState<Date>(new Date());
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/photographer/${userId}/event/get`
        );
        const data = response.data
        setEventList(data);
      } catch (error) {
        toast.error("Cannot fetch events. Please try again.");
      }
    };
    fetchEvents();
  }, [userId]);

  return (
    <div className="flex-col" >
      {session?.user.userRole === 'CLIENT' && (
        <AddBooking />
      )}-
       
      <div className="w-full flex justify-center py-5" >
        <div className=" w-full sm:w-4/5 ">
          <div className="flex justify-center mb-6">
            {session && session.user && session.user.id === userId &&
              <Events eventItems={eventList} eventProp={setEventList} start={startDate} setStartDate={setStartDate} end={endDate} setEndDate={setEndDate} />}
          </div>
          <div className="overflow-x-auto p-6 sm:p-0">
            <FullCalendarComp events={eventList} />
          </div>
          <div className="mt-6 overflow-x-auto">
            {session && session.user && session.user.id === userId &&
              <BookingTable />}
          </div>
        </div>
      </div ></div>

  );
}

export default PhotographerBookingsPage;


