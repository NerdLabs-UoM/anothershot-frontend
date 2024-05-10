
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
import Events from './components/events'
import axios from "axios";
import toast from "react-hot-toast";
import { DateTimePickerForm } from "@/components/DateTimePickers/date-time-picker-form";


const sampleEvents = [
  {
    id: '1',
    title: 'event 1',
    // date: '2024-05-03' ,
    // date: new Date(2024, 5, 3),
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
  // {
  //   id: '4',
  //   name: 'event 4',
  //   startDate: new Date(),
  //   endDate: new Date(),
  //   allDay: true,
  // },
]
interface EventData {
  startDate: string;
  endDate: string;
  id?: string;
  name?: string;
  bookingId?: string;
  description?: string;
  start?: string;
  end?: string;
}
const PhotographerBookingsPage = () => {

  const { userId } = useParams();
  const { data: session } = useSession();
  // const [events, setEvents] = useState<Event[]>(sampleEvents);
  const [eventList, setEventList] = useState<Event[]>([]);
  const [sampleDate, setSampleDate] = useState<Date>(new Date());


  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/photographer/${userId}/event/get`
        );
        const data = response.data.map((eventData: EventData) => ({
          // ...eventData,
          title: eventData.name,
          date: eventData.startDate.split('T')[0],
          // endDate: new Date(eventData.endDate)
        }));
        setEventList(data);
        console.log(data);
      } catch (error) {
        toast.error("Cannot fetch events. Please try again.");
      }
    };
    fetchEvents();
  }, [userId]);

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

