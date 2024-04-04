
"use client"

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


// import { Event } from "@/app/lib/types";
// import FullCalendarComp from "@/components/fullCalendar";
// import { useState } from "react";

// const sampleEvents: Event[] = [
//     {
//         id: '1',
//         title: 'event 1',
//         start: new Date(2024, 2, 1, 19, 30,),
//         end: new Date(2024, 2, 1, 21, 30),
//         allDay: false,
//     },
//     {
//         id: '2',
//         title: 'event 2',
//         start: new Date(2024, 2, 2, 17, 30,),
//         end: new Date(2024, 2, 2, 19, 30),
//         allDay: false,
//     },
//     {
//         id: '3',
//         title: 'event 3',
//         start: new Date(2024, 2, 2, 19, 30,),
//         end: new Date(2024, 2, 2, 21, 30),
//         allDay: false,
//     },
//     {
//         id: '4',
//         title: 'event 4',
//         start: new Date(),
//         end: new Date(),
//         allDay: true,
//     },
// ]


// const PhotographerBookingsPage = () => {
//     const [events, setEvents] = useState<Event[]>(sampleEvents)

//     return (
//         <div className="w-full flex justify-center py-5" >
//             <div className="lg:w-3/5 ">
//                 <FullCalendarComp
//                     events={events}
//                 />
//             </div>
//         </div >
//     );
// }

// export default PhotographerBookingsPage;

