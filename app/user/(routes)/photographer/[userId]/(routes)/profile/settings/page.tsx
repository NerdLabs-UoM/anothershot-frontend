"use client";

import React, { useState, useEffect } from "react";
import Earnings from "./components/earnings";
import AddCategory from "./components/add_category";
import BankDetails from "./components/bank_details";
import Report from "./components/report";
import Faq from "./components/faq";
import { Payment, columns } from "./components/paymentColumns";
import { DataTable } from "./components/data-table";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

const getData: Payment[] = [
    {
        clientName: "John Doe",
        invoiceId: "INV-1234",
        date: "Feb 2,2024",
        paymentStatus: "Paid",
        amount: 2500,
        type: "Album Payment",
    },
    {
        clientName: "Jane Doe",
        invoiceId: "INV-1235",
        date: "Jan 4,2024",
        paymentStatus: "UnPaid",
        amount: 1000,
        type: "Booking",
    },
    {
        clientName: "client name3",
        invoiceId: "INV-1485",
        date: "Jan 4,2024",
        paymentStatus: "Pending",
        amount: 1500,
        type: "Booking",
    },
];

export default function Settings() {
    const [filteredUsers, setFilteredUsers] = useState<Payment[]>([]);

    useEffect(() => {
        const fetchUsers = () => {
            const data = getData;
            setFilteredUsers(data);
        };
        fetchUsers();

    }, []);


    return (
        <div className="flex flex-col items-center justify-between min-h-screen p-5">
            <div className="relative flex flex-row items-end justify-end ml-[40%] lg:ml-[70%] gap-3">
                <Button
                    className="w-[120px] text-center bg-red-600"
                    type="submit"
                >
                    Delete Account
                </Button>
                <Button
                    onClick={() =>
                        signOut({
                            callbackUrl: `${window.location.origin}/sign-in`,
                        })
                    }
                >
                    Log Out
                </Button>
            </div>
            <div className="grid mb-4 md:flex md:justify-center lg:gap-[40px]">
                <div className="md:mb-0 md:mr-4">
                    <Earnings />
                </div>
                 <AddCategory />
            </div>
            <div className="lg:mx-[4%]">
                <BankDetails />
            </div>
            <DataTable columns={columns} data={filteredUsers} />
            <div className="grid sm:grid-flow-col mb-4 sm:justify-stretch lg:w-[920px]">
                <div className="md:mb-5">
                    <Report />
                </div>
                <Faq />
            </div>
        </div>
    );
}
