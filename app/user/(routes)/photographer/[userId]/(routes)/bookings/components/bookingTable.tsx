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
    }, []);

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
        <div className='border-collapse border-gray-200 mb-6'>
            <div className='flex items-start pl-4 sm:pl-4 text-xl font-bold text-black'>Bookings</div>
            <Table>
                <TableHeader className=''>
                    <TableRow>
                        <TableHead className="w-[100px]">Client Name</TableHead>
                        <TableHead>Booking Id</TableHead>
                        <TableHead>Start </TableHead>
                        <TableHead className="text-right">Payment Status</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {bookings.map((booking) => (
                        <TableRow key={booking.clientId}>
                            <TableCell className="font-medium">{booking.clientId}</TableCell>
                            <TableCell className="font-medium">{booking.id}</TableCell>
                            <TableCell>{booking.status}</TableCell>
                            <TableCell>{booking.status}</TableCell>
                            <TableCell className="text-right">{booking.packageId}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>

            </Table>
        </div>
    )
}

export default bookingTable