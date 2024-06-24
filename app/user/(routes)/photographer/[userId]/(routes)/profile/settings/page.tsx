"use client";

import React, { useState, useEffect } from "react";
import Earnings from "./components/earnings";
import AddCategorySection from "./components/add_category";
import BankDetailsSection from "./components/bank_details";
import FaqSection from "./components/faq";
import { useParams } from "next/navigation";
import { PaymentSummary, columns } from "./components/paymentColumns";
import { DataTable } from "./components/data-table";
import axios from "axios";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import toast from "react-hot-toast";
import SystemReportSection from "@/components/systemReport";
import Pagination from "@/components/pagination";

const Settings = () => {
  const [payments, setPayments] = useState<PaymentSummary[]>([]);
  const [page, setPage] = useState(1);
  const [last, setLast] = useState(1);
  const [filteredPay, setFilteredPay] = useState<PaymentSummary[]>([]);
  const { userId } = useParams();

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/photographer/${userId}/getpayments?page=${page}`
        );
        console.log("fetched data", res);
        setFilteredPay(res.data);
      } catch (e) {
        toast.error("Error fetching payment summary");
      }
    };
    fetchPayments();
  }, [page]);

  useEffect(() => {
    const fetchLast = async () => {
      try {
        const lastPage = await axios.get<number>(
          `${process.env.NEXT_PUBLIC_API_URL}/api/photographer/${userId}/getlastPaypage`
        );
        setLast(lastPage.data);
      } catch (error) {
        throw new Error("Error Fetching payment summary last page");
      }
    };
    fetchLast();
  }, []);

  const handlePrev = () => {
    if (page > 1) {
      setPage((prevState) => prevState - 1);
    }
  };

  const handleNext = () => {
    if (page < last) {
      setPage((prevState) => prevState + 1);
    }
  };

  const handleClick = (currentPage: number) => {
    setPage(currentPage);
  };

  return (
    <div className="flex flex-col w-full ">
      <div className="flex-1 space-y-4 p-4 pt-3">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-4xl font-bold tracking-tight">Settings</h2>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 lg:grid-cols-2 ">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="md:text-3xl font-large">
                    Earnings
                  </CardTitle>
                </CardHeader>
                <hr className="mx-4 mb-8" />
                <CardContent className="">
                  <Earnings userId={userId} />
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-col justify-between space-y-0 pb-2">
                  <CardTitle className="md:text-3xl font-large">
                    Add Category
                  </CardTitle>
                  <hr className="mx-1 mb-8" />
                  <CardDescription className="text-sm md:text-base">
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
                <CardTitle className="md:text-3xl font-large text-center md:text-left">
                  Bank Details
                </CardTitle>
                <hr className="mx-1 mb-8" />
              </CardHeader>
              <CardContent className="">
                <BankDetailsSection />
              </CardContent>
            </Card>
            <Card className="">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="md:text-3xl font-large">
                  Payment Summary
                </CardTitle>
              </CardHeader>
              <hr className="mx-4 mb-8" />
              <CardContent>
                <DataTable columns={columns} data={filteredPay} />
                <div>
                  <Pagination
                    lastPage={last}
                    currentPage={page}
                    handlePrev={handlePrev}
                    handleNext={handleNext}
                    handleClick={handleClick}
                  />
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4 lg:grid-cols-2">
              <Card className="">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="md:text-3xl font-large">Report</CardTitle>
                </CardHeader>
              <hr className="mx-4 mb-8" />

                <CardContent>
                  <SystemReportSection />
                </CardContent>
              </Card>

              <Card className="border-none">
                <CardHeader className="flex flex-col justify-between space-y-0 pb-2">
                  <CardTitle className="md:text-3xl font-large align-start">
                    FAQ
                  </CardTitle>
                </CardHeader>
                <hr className="mx-4 mb-2" />
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
};

export default Settings;
