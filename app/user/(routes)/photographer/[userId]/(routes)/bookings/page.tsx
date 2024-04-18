
"use client"

import React from "react";
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

const sampleEvents: Event[] = [
  {
    id: '1',
    name: 'event 1',
    startDate: new Date(2024, 2, 1, 19, 30,),
    endDate: new Date(2024, 2, 1, 21, 30),
    allDay: false,
  },
  {
    id: '2',
    name: 'event 2',
    startDate: new Date(2024, 2, 2, 17, 30,),
    endDate: new Date(2024, 2, 2, 19, 30),
    allDay: false,
  },
  {
    id: '3',
    name: 'event 3',
    startDate: new Date(2024, 2, 2, 19, 30,),
    endDate: new Date(2024, 2, 2, 21, 30),
    allDay: false,
  },
  {
    id: '4',
    name: 'event 4',
    startDate: new Date(),
    endDate: new Date(),
    allDay: true,
  },
]

const PhotographerBookingsPage = () => {

  const { userId } = useParams();
  const { data: session } = useSession();
  const [events, setEvents] = useState<Event[]>(sampleEvents)

  return (
    <div className="w-full flex justify-center py-5" >
      <div className=" pl-4 lg:w-3/5 ">
        <FullCalendarComp
          events={events}
        />
      </div>
      <div className="flex pr-6">
        {session && session.user && session.user.id === userId &&
          <Events />}
      </div>
    </div >
  );
}

export default PhotographerBookingsPage;

