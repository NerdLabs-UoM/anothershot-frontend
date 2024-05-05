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
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import toast from "react-hot-toast";
const Settings = () => {
    const [payments, setPayments] = useState<Payment[]>([]);
    const { userId } = useParams();

    useEffect(() => {
        const fetchPayments = async () => {
            try{
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/photographer/${userId}/getpayments`)
            setPayments(res.data);
            }catch(e){
                toast.error("Error fetching payments");
            }
        };
        fetchPayments();

    }, []);


    return (
        <div className="flex flex-col w-full">
            <div className="flex-1 space-y-4 p-4 pt-3">
                <div className="flex items-center justify-between space-y-2">
                    <h2 className="text-4xl font-bold tracking-tight">Settings</h2>
                </div>
                <Tabs defaultValue="overview" className="space-y-4">
                    <TabsContent value="overview" className="space-y-4">
                        <div className="grid gap-4 lg:grid-cols-2 ">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-3xl font-large">
                                        Earnings
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="">
                                    <Earnings userId={userId} />
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-col justify-between space-y-0 pb-2">
                                    <CardTitle className="text-3xl font-large">
                                        Add Category
                                    </CardTitle>
                                    <CardDescription>
                                        Select the photography categories you are familiar with
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="pr-2">
                                    <AddCategorySection />
                                </CardContent>
                            </Card>
                        </div>

                        <Card className="">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-3xl font-large">Bank Details</CardTitle>
                            </CardHeader>
                            <CardContent className="">
                                <BankDetailsSection />
                            </CardContent>
                        </Card>
                        <Card className="">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-3xl font-large">Payment Summary</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <DataTable columns={columns} data={payments} />
                            </CardContent>
                        </Card>

                        <div className="grid gap-4 lg:grid-cols-2">
                            <Card className="">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-3xl font-large">
                                        Report
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ReportSection />
                                </CardContent>
                            </Card>

                            <Card className="border-none">
                                <CardHeader className="flex flex-col justify-between space-y-0 pb-2">
                                    <CardTitle className="text-3xl font-large align-start">
                                        FAQ
                                    </CardTitle>

                                </CardHeader>
                                <CardContent className="">
                                    <FaqSection />

                                </CardContent>
                            </Card>
                        </div>


                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}

export default Settings;