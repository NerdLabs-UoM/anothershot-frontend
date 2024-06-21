"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";
import { Booking, Package, ReportStatus } from "@/app/lib/types";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Offers from "@/components/offer/offers";

const BookingTable = () => {  
    const { userId } = useParams();
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [offerStatus,setOfferStatus] = useState<ReportStatus>('PENDING');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/photographer/${userId}/clientBookings`
        );
        const data = response.data;
        setBookings(data);
        setOfferStatus(response.data.offer.status)
      } catch (error) {
        toast.error("Cannot fetch Bookings.Please try again.");
      }
    };
    fetchBookings();
  }, [userId]);

  
    return (
        <div className='p-6 sm:p-0'>
            <div className="border border-gray-300 rounded-lg shadow-lg p-4 mb-36 mt-20 px-10">
                <div className="flex items-start pl-4 sm:pl-4 pt-4 text-xl font-bold text-black mb-4">Bookings</div>
                <div className="overflow-x-auto sm:overflow-hidden overflow-y-hidden sm:overflow-y-auto custom-scrollbar w-full max-h-[400px]">
                    <Table className="w-full sm:w-full min-w-[600px] mb-16 ">
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[80px] sm:w-[100px] text-center text-black font-medium">Client Name</TableHead>
                                <TableHead className="text-center text-black font-medium">Booking Title</TableHead>
                                <TableHead className='text-center text-black font-medium'>Start Date & Time</TableHead>
                                <TableHead className="text-center text-black font-medium">Payment Status</TableHead>
                                <TableHead className="text-center text-black font-medium">Offer</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {bookings.map((booking) => (
                                <TableRow key={booking.clientId}>
                                    <TableCell className="text-center text-xs">{booking.client.name}</TableCell>
                                    <TableCell className='text-center text-xs'>{booking.subject}</TableCell>
                                    <TableCell className='text-center text-xs'>{booking.start ? booking.start.toString() : ""}</TableCell>
                                    <TableCell className='text-center text-xs'>{booking.status}</TableCell>
                                    
                                    <TableCell className='text-center text-xs'>              
                                    <Offers bookingId={booking.id} clientId={booking.client.id} eventName={booking.category}/>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
};

export default BookingTable; 
