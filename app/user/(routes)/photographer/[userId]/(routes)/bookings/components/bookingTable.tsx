"use client";
import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";

import { Booking, Event } from "@/app/lib/types";

const bookingTable = () => {
    const { data: session } = useSession()
    const [isNew, setIsNew] = useState<boolean>(false)
    const { userId } = useParams();
    const [bookings, setBookings] = useState<Booking[]>([]);
    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/photographer/${userId}/clientBookings`
                );
                const data = response.data;
                setBookings(data)
                console.log("Bookings",response.data);
            } catch (error) {
                toast.error("Cannot fetch Bookings.Please try again.");
            }
        };
        fetchBookings();
    }, []);

    return (
        <div>
            
        </div>
    )
}

export default bookingTable