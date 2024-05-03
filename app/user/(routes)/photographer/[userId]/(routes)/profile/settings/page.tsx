"use client";

import React, { useState, useEffect } from "react";
import Earnings from "./components/earnings";
import AddCategorySection from "./components/add_category";
import BankDetailsSection from "./components/bank_details";
import ReportSection from "./components/report";
import FaqSection from "./components/faq";
import { useParams } from "next/navigation";
import { Payment, columns } from "./components/paymentColumns";
import { DataTable } from "./components/data-table";
import { Button } from "@/components/ui/button";
import axios from "axios";

const Settings = () => {
    const [payments,setPayments] = useState<Payment[]>([]);
    const { userId } = useParams();

    useEffect(() => {
        const fetchPayments = async() => {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/photographer/${userId}/getpayments`)
            setPayments(res.data);
            console.log("payment data",res.data);
        };
        fetchPayments();

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
            </div>
            <div className="grid md:flex md:justify-center lg:gap-[40px]">
                <div className="md:mb-0 md:mr-4">
                    <Earnings />
                </div>
                 <AddCategorySection />
            </div>
            <div>
                <BankDetailsSection />
                <DataTable columns={columns} data={payments} />
            </div>
            <div className="grid md:flex grid mb-4 md:flex md:justify-center lg:gap-[40px]">
                <ReportSection />
                <FaqSection />
            </div>
        </div>
    );
}

export default Settings;