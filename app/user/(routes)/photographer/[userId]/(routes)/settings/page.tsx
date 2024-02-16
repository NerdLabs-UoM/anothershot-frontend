"use client"

import React,{useState,useEffect} from "react";
import Earnings from "./components/earnings";
import AddCategory from "./components/add_category";
import BankDetails from "./components/bank_details";
import Report from "./components/report";
import Faq from "./components/faq";
import { Payment, columns } from "./components/paymentColumns"
import { DataTable } from "./components/data-table";
// import { CalendarDemo } from "./components/calender";
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

export default function Settings(){
    // const [isMobile, setIsMobile] = React.useState(false);
    const  [filteredUsers, setFilteredUsers] = useState<Payment[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const data = getData;
            setFilteredUsers(data);
        };
        fetchUsers();
    }, []);

    // useEffect(() => {
    //     getData().then(data => {
    //         setFilteredUsers(data);
    //     });
    // }, []);


    return (
        <div className="items-center h-[100%] mb-[100px] mx-[10%]">
            <div className="flex justify-end gap-3 mt-3">
                <Button className="w-[120px] text-center bg-red-600" type="submit">Delete Account</Button>
                <Button onClick={() => signOut({
                    callbackUrl: `${window.location.origin}/sign-in`
                })}>Log Out</Button>
            </div>
            <div className="grid md:grid-flow-col sm:gap-[20px] justify-stretch mb-4">
                <div className="ml-6"><Earnings/></div>
                <div className="items-center "><AddCategory/></div>
            </div>
            <div className="mb-4"><BankDetails/></div>
            <DataTable columns={columns} data={filteredUsers} />
            <div className="grid md:grid-flow-col justify-stretch">
                <Report/>
                <Faq/>
            </div>

        </div>

    );
}
