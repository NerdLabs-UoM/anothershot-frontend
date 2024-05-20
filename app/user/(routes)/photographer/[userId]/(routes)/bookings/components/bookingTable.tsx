"use client";
import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";

import { Booking, Package } from "@/app/lib/types";
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

const bookingTable = () => {
    const { data: session } = useSession()
    const [isNew, setIsNew] = useState<boolean>(false)
    const { userId } = useParams();
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [packages, setPackages] = useState<Package[]>([]);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/photographer/${userId}/clientBookings`
                );
                const data = response.data;
                setBookings(data)
                console.log("Bookings", response.data);
            } catch (error) {
                toast.error("Cannot fetch Bookings.Please try again.");
            }
        };
        fetchBookings();
    }, [userId]);

    // useEffect(() => {
    //     const fetchPackages = async () => {
    //         try {
    //             const response = await axios.get(
    //                 `${process.env.NEXT_PUBLIC_API_URL}/api/photographer/packages/${userId}`
    //             );
    //             const data = response.data;
    //             setPackages(data);
    //         } catch (error) {
    //             toast.error("Cannot fetch packages. Please try again.");
    //         }
    //     };
    //     fetchPackages();
    // }, [userId]);

    return (
        <div className="border border-gray-300 rounded-lg shadow-lg p-4 mb-36 mt-20 px-10">
            <div className="flex items-start pl-4 sm:pl-4 pt-4 text-xl font-bold text-black mb-4">Bookings</div>
            <div className="overflow-x-auto sm:overflow-hidden w-full">
                <Table className="w-full sm:w-full min-w-[600px] mb-16 ">
                    <TableHeader className=''>
                        <TableRow>
                            <TableHead className="w-[80px] sm:w-[100px] text-center">ClientName</TableHead>
                            <TableHead className='text-center'>Booking Id</TableHead>
                            <TableHead className='text-center'>StartDate & Time </TableHead>
                            <TableHead className="text-center">Payment Status</TableHead>
                            <TableHead className="text-center">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {bookings.map((booking) => (
                            <TableRow key={booking.clientId}>
                                <TableCell className="text-center text-xs">{booking.client.name}</TableCell>
                                <TableCell className="text-center text-xs">{booking.id}</TableCell>
                                <TableCell className='text-center text-xs'>{booking.start ? booking.start.toString() : ""}</TableCell>
                                <TableCell className='text-center text-xs'>{booking.status}</TableCell>
                                <TableCell className='text-center text-xs'>{booking.packageId}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                </Table>
            </div>
        </div>
    )
}

export default bookingTable