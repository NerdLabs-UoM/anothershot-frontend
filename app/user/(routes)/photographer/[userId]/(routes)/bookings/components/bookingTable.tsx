"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";
import { Booking } from "@/app/lib/types";
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
import BookingCard from "./bookingCard";
import { RiMoreFill } from "react-icons/ri";

const BookingTable = () => {
    const { userId } = useParams();
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/photographer/${userId}/clientBookings`
                );
                const data = response.data;
                setBookings(data);
            } catch (error) {
                toast.error("Cannot fetch Bookings. Please try again.");
            }
        };
        fetchBookings();
    }, [userId]);

    const handleOpenDialog = (booking: Booking) => {
        setSelectedBooking(booking);
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setSelectedBooking(null);
        setIsDialogOpen(false);
    };

    return (
        <div className='p-6 sm:p-0'>
            <div className="border border-gray-300 rounded-lg shadow-lg p-4 mb-36 mt-20 px-8 pr-2 ">
                <div className="flex items-start pl-4 sm:pl-4 pt-4 text-xl font-bold text-black mb-4">Bookings</div>
                <div className="overflow-x-auto sm:overflow-hidden overflow-y-auto sm:overflow-y-auto w-full max-h-[400px]">
                    <Table className="w-1/2 sm:w-full min-w-[400px] mb-16 ">
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[80px] sm:w-[100px] text-center text-black font-medium hidden sm:table-cell">Client Name</TableHead>
                                <TableHead className="text-center text-black font-medium">Booking Title</TableHead>
                                <TableHead className='text-center text-black font-medium hidden sm:table-cell'>Start Date & Time</TableHead>
                                <TableHead className="text-center text-black font-medium hidden sm:table-cell">Payment Status</TableHead>
                                <TableHead className="text-center text-black font-medium">Offer</TableHead>
                                <TableHead className="text-center text-black font-medium">More</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {bookings.map((booking) => (
                                <TableRow key={booking.id}>
                                    <TableCell className="text-center text-xs hidden sm:table-cell">{booking.client.name}</TableCell>
                                    <TableCell className='text-center text-xs'>{booking.subject}</TableCell>
                                    <TableCell className='text-center text-xs hidden sm:table-cell'>{booking.start ? new Date(booking.start).toISOString() : ""}</TableCell>
                                    <TableCell className='text-center text-xs hidden sm:table-cell'>{booking.status}</TableCell>
                                    <TableCell className='text-center text-xs'>
                                        {booking.offer ? <div className="bg-blue-500 py-1 rounded-md bg-opacity-40">Offer exists</div> : <Offers bookingId={booking.id} clientId={booking.client.id} eventName={booking.category} />}
                                    </TableCell>
                                    <TableCell className='flex justify-center text-center text-xs'>
                                        <button className="flex items-center justify-center" onClick={() => handleOpenDialog(booking)}>
                                            <RiMoreFill />
                                        </button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
            <BookingCard
                booking={selectedBooking}
                isOpened={isDialogOpen}
                onClose={handleCloseDialog}
            />
        </div>
    );
};

export default BookingTable;
