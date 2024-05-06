
"use client"

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import AddBooking from "./components/AddBooking";
// import { useParams } from "next/navigation";
import FetchBookings from "./components/fetchBookings";

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
import { title } from "process";
import { DateTimePickerForm } from "@/components/DateTimePickers/date-time-picker-form";

// const sampleEvents: Event[] = [
//   {
//     id: '1',
//     title: 'event 1',
//     start: new Date(2024, 2, 1, 19, 30,),
//     end: new Date(2024, 2, 1, 21, 30),
//     allDay: false,
//   },
//   {
//     id: '2',
//     title: 'event 2',
//     start: new Date(2024, 2, 2, 17, 30,),
//     end: new Date(2024, 2, 2, 19, 30),
//     allDay: false,
//   },
//   {
//     id: '3',
//     title: 'event 3',
//     start: new Date(2024, 2, 2, 19, 30,),
//     end: new Date(2024, 2, 2, 21, 30),
//     allDay: false,
//   },
//   {
//     id: '4',
//     title: 'event 4',
//     start: new Date(),
//     end: new Date(),
//     allDay: true,
//   },
// ]

const PhotographerBookingsPage = () => {

  const { userId } = useParams();
  const { data: session } = useSession();
  const [events, setEvents] = useState<Event[]>([]);
  const [eventList, setEventList] = useState<Event[]>([]);
  const [sampleDate, setSampleDate] = useState<Date>(new Date());

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/photographer/${userId}/event/get`
        );
        const data = response.data.map((event: any) => ({
          ...event,
          start: event.startDate ? new Date(event.startDate) : new Date(),
          end: event.endDate ? new Date(event.endDate) : new Date(),
          title: event.name,
        }));
        setEventList(data);
        console.log("Event List", data);
      } catch (error) {
        toast.error("Cannot fetch events. Please try again.");
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="w-full flex justify-center py-5" >
      <div className=" pl-4 lg:w-3/5 ">
        <DateTimePickerForm
          setDate={setSampleDate}
          date={sampleDate}
        />
        <FullCalendarComp
          events={eventList}
        />
      </div>
      <div className=" pr-6">
        {session && session.user && session.user.id === userId &&
          <Events eventItems={eventList} eventProp={setEventList} />}
      </div>
      {/* <div className="flex flex-wrap">
        {eventList.length > 0 ? (
          <>
            <div className="flex flex-wrap">
              {eventList.map((eventItem) => (
                <Events
                  key={eventItem.id}
                  eventItems={eventList}
                  eventProp={setEventList}
                  id={eventItem.id}
                  name={eventItem.name}
                  description={eventItem.description}
                  startDate="2024-03-01T19:30:00"
                  endDate="2024-03-01T21:30:00"
                />
              ))}
            </div>
          </>
        ) : (
          <></>
        )}
      </div> */}
    </div >
  );
}

export default PhotographerBookingsPage;

// function BookingPage() {
//   const { data: session } = useSession();
//   const  ParamuserId  = useParams();
//   const userId  = session?.user.id
//   console.log(ParamuserId);
//   console.log(userId);
//   return (
//     <div className = "flex flex-col justify-center items-center">
//       {ParamuserId.userId ==userId?<FetchBookings/>:<AddBooking/>}
//     </div>
//   );
// }

// export default BookingPage;

