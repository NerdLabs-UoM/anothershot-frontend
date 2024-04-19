"use client";

import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";

interface Booking {
  id: string;
  subject: string;
  category: string;
  startdate: string;
  status: string;
  location: string | null;
  client: {
    name: string;
  };
  photographer: {
    name: string;
  };
  offer: {
    price: number;
  };
  package: {
    name: string;
  };
}

const bookingsData: Booking[] = [
  {
    id: "1",
    subject: "Family Photoshoot",
    category: "PHOTOSHOOT",
    startdate: "2024-04-25T10:00:00.000Z",
    status: "CONFIRMED",
    location: "Central Park",
    client: {
      name: "John Doe",
    },
    photographer: {
      name: "Jane Smith",
    },
    offer: {
      price: 200,
    },
    package: {
      name: "Premium Package",
    },
  },
  {
    id: "2",
    subject: "Product Launch Event",
    category: "MARKETING",
    startdate: "2024-05-10T14:30:00.000Z",
    status: "PENDING",
    location: "Convention Center",
    client: {
      name: "Alice Johnson",
    },
    photographer: {
      name: "Michael Brown",
    },
    offer: {
      price: 500,
    },
    package: {
      name: "Gold Package",
    },
  },
  {
    id: "3",
    subject: "Wedding Ceremony",
    category: "WEDDING",
    startdate: "2024-06-15T12:00:00.000Z",
    status: "CANCELLED",
    location: "Beach Resort",
    client: {
      name: "Emily Wilson",
    },
    photographer: {
      name: "David Miller",
    },
    offer: {
      price: 800,
    },
    package: {
      name: "Silver Package",
    },
  },
  {
    id: "4",
    subject: "Birthday Party",
    category: "EVENT",
    startdate: "2024-07-20T16:00:00.000Z",
    status: "COMPLETED",
    location: "Community Center",
    client: {
      name: "Robert Brown",
    },
    photographer: {
      name: "Sarah Johnson",
    },
    offer: {
      price: 300,
    },
    package: {
      name: "Basic Package",
    },
  },
];
const ClientBookings = () => {
  const { userId } = useParams();
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>(bookingsData);
  const[isOpened, setIsOpened] = useState(false);

  const formatDate = (isoDate: string): string => {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

  const formatCategory = (category: string): string => {
    return category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
  };

  return (

    <div className="flex flex-col items-center w-11/12 lg:w-2/3 h-screen lg:h-[550px]">
      <div className="my-5 text-xs md:text-sm bg-slate-300 w-1/3 flex justify-center">
        <p>Bookings</p>
      </div>
      <Separator className="mb-2 h-0.5" />
      <div className="lg:w-2/3 w-auto min-w-full">
        <ScrollArea className="h-[512px] lg:h-[450px] p-4">
          <div className="grid grid-cols-1">
            {bookings.map((booking) => (
              <Card key={booking.id} className="m-2">
                <CardHeader>
                  <CardTitle>{booking.subject}</CardTitle>
                  <CardDescription>{formatCategory(booking.category)}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col">
                    <p>Date: {formatDate(booking.startdate)}</p>
                    {booking.status === "CONFIRMED" || booking.status === "COMPLETED" ? (
                      <p>Total cost: {booking.offer.price} Rs</p>
                    ) : booking.status === "CANCELLED" ? (
                      <p className="text-red-500">Booking has been cancelled</p>
                    ) : (
                      <p className="text-red-500">! In review</p>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="grid grid-cols-6 col-span-4  ">
                  <Dialog open={isOpened} onOpenChange={setIsOpened}>
                    <DialogTrigger className="w-full">
                      <Button>Details</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Booking Details</DialogTitle>
                        <DialogDescription>
                          View details of the booking you made.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex flex-col">
                        <p><b>Event Name:</b> {booking.subject}</p>
                        <p><b>Photographer:</b> {booking.photographer.name}</p>
                        <p><b>Location:</b> {booking.location}</p>
                        <p><b>Package:</b> {booking.package.name}</p>
                      </div>
                      <DialogFooter>
                        <Button onClick={() => setIsOpened(false)}>Close</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  {booking.status === "CONFIRMED" ? (
                    <Button>Pay</Button>
                  ) : booking.status === "CANCELLED" ? (
                    <p>Cancelled</p>
                  ) : booking.status === "COMPLETED" ? (
                    <Button disabled>Paid</Button>
                  ) : <Button disabled>Pay</Button>}
                </CardFooter>
              </Card>
            ))}


          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default ClientBookings;