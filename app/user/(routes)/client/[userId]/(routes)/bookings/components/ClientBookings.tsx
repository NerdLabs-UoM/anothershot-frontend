"use client";

import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { View, Check } from "lucide-react";
import { Booking } from "@/app/lib/types";

// interface Booking {
//   id: string;
//   subject: string;
//   category: string;
//   startdate: string;
//   status: string;
//   location: string | null;
//   client: {
//     name: string;
//   };
//   photographer: {
//     name: string;
//   };
//   offer: {
//     price: number;
//   };
//   package: {
//     name: string;
//   };
// }

// const bookingsData: Booking[] = [
//   {
//     id: "1",
//     subject: "Family Photoshoot",
//     category: "PHOTOSHOOT",
//     startdate: "2024-04-25T10:00:00.000Z",
//     status: "CONFIRMED",
//     location: "Central Park",
//     client: {
//       name: "John Doe",
//     },
//     photographer: {
//       name: "Jane Smith",
//     },
//     offer: {
//       price: 200,
//     },
//     package: {
//       name: "Premium Package",
//     },
//   },
//   {
//     id: "2",
//     subject: "Product Launch Event",
//     category: "MARKETING",
//     startdate: "2024-05-10T14:30:00.000Z",
//     status: "PENDING",
//     location: "Convention Center",
//     client: {
//       name: "Alice Johnson",
//     },
//     photographer: {
//       name: "Michael Brown",
//     },
//     offer: {
//       price: 500,
//     },
//     package: {
//       name: "Gold Package",
//     },
//   },
//   {
//     id: "3",
//     subject: "Wedding Ceremony",
//     category: "WEDDING",
//     startdate: "2024-06-15T12:00:00.000Z",
//     status: "CANCELLED",
//     location: "Beach Resort",
//     client: {
//       name: "Emily Wilson",
//     },
//     photographer: {
//       name: "David Miller",
//     },
//     offer: {
//       price: 800,
//     },
//     package: {
//       name: "Silver Package",
//     },
//   },
//   {
//     id: "4",
//     subject: "Birthday Party",
//     category: "EVENT",
//     startdate: "2024-07-20T16:00:00.000Z",
//     status: "COMPLETED",
//     location: "Community Center",
//     client: {
//       name: "Robert Brown",
//     },
//     photographer: {
//       name: "Sarah Johnson",
//     },
//     offer: {
//       price: 300,
//     },
//     package: {
//       name: "Basic Package",
//     },
//   },
// ];
const ClientBookings = () => {
  const { userId } = useParams();
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isOpened, setIsOpened] = useState(false);
  const [openedBookingId, setOpenedBookingId] = useState<string | null>(null);

  const formatDate = (isoDate: string | null): string => {
    if (!isoDate) return '';
    const date = new Date(isoDate);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

  const formatCategory = (category: string): string => {
    return category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
  };

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/client/${userId}/clientBookings`);
        setBookings(response.data);
        console.log(response.data);
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
              <Card key={booking.id} className="m-2 px-2 bg-slate-50 border-0 drop-shadow-md">
                <CardHeader>
                  <CardTitle className="flex justify-between text-base sm:text-lg">{booking.subject}
                    <Dialog open={isOpened} onOpenChange={setIsOpened}>
                      <DialogTrigger onClick={() => {
                        setOpenedBookingId(booking.id);
                        setIsOpened(true);
                      }}>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger><View className="w-4 h-4 sm:w-5 sm:h-5" /></TooltipTrigger>
                            <TooltipContent>
                              <p>View</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </DialogTrigger>
                      {openedBookingId && (
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Booking Details</DialogTitle>
                            <DialogDescription>
                              View details of the booking you made.
                            </DialogDescription>
                          </DialogHeader>
                          {bookings.map((booking) => (
                            booking.id === openedBookingId && (
                              <div key={booking.id} className="flex flex-col py-3 text-sm sm:text-base">
                                <p><b>Event Name:</b> {booking.subject}</p>
                                <p><b>Photographer:</b> {booking.photographer.name}</p>
                                <p><b>Location:</b> {booking.location}</p>
                                <p><b>Package:</b> {booking.package.name}</p>
                              </div>
                            )
                          ))}
                          <DialogFooter>
                            <Button onClick={() => setIsOpened(false)}>Close</Button>
                          </DialogFooter>
                        </DialogContent>
                      )}
                    </Dialog>
                  </CardTitle>
                  <CardDescription className="text-xs sm:text-base">{formatCategory(booking.category)}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between">
                    <div className="flex flex-col text-xs sm:text-sm">
                      <p>Date: {booking.startdate ? formatDate(booking.startdate) : ''}</p>
                      {booking.status === "CONFIRMED" || booking.status === "COMPLETED" ? (
                        <p className="font-semibold text-slate-600">Total cost: {booking.offer?.price} Rs</p>
                      ) : booking.status === "CANCELLED" ? (
                        <p className="font-medium text-red-500">Booking has been cancelled</p>
                      ) : (
                        <p className="font-medium text-red-500">! In review</p>
                      )}
                    </div>
                    <div className="grid grid-cols-1">
                      {booking.status === "CONFIRMED" ? (
                        <Button className="text-xs sm:text-sm h-[30px] sm:h-auto">Pay Now</Button>
                      ) : booking.status === "COMPLETED" ? (
                        <Button disabled className="text-xs sm:text-sm h-[30px] sm:h-auto"><Check className="w-3 h-3" strokeWidth={3} />Paid</Button>
                      ) : <Button disabled className="text-xs sm:text-sm h-[30px] sm:h-auto">Pay</Button>}
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
};

export default ClientBookings;