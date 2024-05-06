import { Booking } from "@/app/lib/types";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Offers from "@/components/offer/offers";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

function FetchBookings() {
  const { userId } = useParams();
  const [bookings, setBookings] = useState<Booking[]>([]);

  const formatCategory = (category: string): string => {
    return category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
  };

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/offer/${userId}/photographerBookings`
        );

        const bookingsWithDateObjects = response.data.map(
          (booking: Booking) => {
            if (booking.startdate) {
              const startDate = new Date(booking.startdate);
              const startDateString = startDate.toISOString().split("T")[0];
              return {
                ...booking,
                startdate: startDateString,
              };
            } else {
              return booking;
            }
          }
        );
        setBookings(bookingsWithDateObjects);
      } catch (error: any) {
        toast.error("Error fetching bookings", error);
      }
    };
    fetchBookings();
  }, [userId]);

  return (
    <div className="flex flex-col items-center w-11/12 lg:w-2/3 h-screen lg:h-[550px]">
      <div className="my-5 bg-slate-100 w-1/3 flex justify-center py-2 rounded-md">
        <h3 className="font-semibold text-sm sm:text-base">Bookings</h3>
      </div>
      <Separator className="mb-2 h-0.5" />
      {bookings.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <p>No bookings made yet.</p>
        </div>
      ) : (
        <div className="lg:w-2/3 w-auto min-w-full">
          <ScrollArea className="h-[512px] lg:h-[450px] p-4">
            <div className="grid grid-cols-1 mx-0 md:mx-12 xl:mx-24">
              {bookings.map((booking) => (
                <Card
                  key={booking.id}
                  className="m-2 px-2 bg-slate-50 border-0 drop-shadow-md"
                >
                  <CardHeader>
                    <CardTitle className="flex justify-between text-base sm:text-lg">
                      {booking.subject}
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-base">
                      {formatCategory(booking.category)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between">
                      <div className="flex flex-col text-xs sm:text-sm">
                        <p>
                          Date:{" "}
                          {booking.startdate
                            ? booking.startdate.toLocaleString()
                            : ""}
                        </p>
                        {booking.status === "CONFIRMED" ||
                        booking.status === "COMPLETED" ? (
                          <p className="font-semibold text-slate-600">
                            Total cost: {booking.offer?.price} Rs
                          </p>
                        ) : booking.status === "CANCELLED" ? (
                          <p className="font-medium text-red-500">
                            Booking has been cancelled
                          </p>
                        ) : (
                          <p className="font-medium text-red-500">
                            ! In review
                          </p>
                        )}
                      </div>
                      <div className="grid grid-cols-1">
                        {booking.status === "CONFIRMED" ? (
                          <Button
                            disabled
                            className="text-xs sm:text-sm h-[30px] sm:h-auto bg-green-500"
                          >
                            <Check className="w-3 h-3" strokeWidth={3} />
                            Offer given
                          </Button>
                        ) : booking.status === "COMPLETED" ? (
                          <Button
                            disabled
                            className="text-xs sm:text-sm h-[30px] sm:h-auto bg-green-500"
                          >
                            <Check className="w-3 h-3" strokeWidth={3} />
                            Completed
                          </Button>
                        ) : (
                          <Button className="text-xs sm:text-sm h-[30px] sm:h-auto ">
                            <Offers bookingId={booking.id} />
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  );
}

export default FetchBookings;
