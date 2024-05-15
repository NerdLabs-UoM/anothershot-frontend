"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Offer, Payment } from "@/app/lib/types";
import axios from "axios";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import StatusForm from "./components/statusform";



const PaymentDetails=()=>{

  const [value, setValues] = useState<Payment|null>(null);
  const { data: session } = useSession();

  const param = useParams();
  
  const paymentId = param.paymentId;
  useEffect(() => {
    console.log(paymentId);
    const fetchOffers = async () => {
      try {
        const data = await axios.get<Payment>(
          `${process.env.NEXT_PUBLIC_API_URL}/api/payment/${paymentId}/get-payment`
        );
        console.log(data);
        setValues(data.data);
      } catch (err) {
        toast.error("Error fetching offers");
      }
    };
    fetchOffers();
  }, []);
  
  return (
    <div className="flex flex-col md:flex-row">
     
              <Card className="m-5 w-1/2">
                <CardHeader>
                  <CardTitle>{value?.photographer.user.userName}</CardTitle>
                  <CardDescription>{value?.status}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col justify-end ">
                  <p className = "pb-3 font-bold">{`${value?.amount}/=`}</p>
                </CardContent>
                <CardFooter>
                <StatusForm paymentId = {value?.id}/>
                </CardFooter>
              </Card>

              <Card className="m-5 w-1/2">
                <CardHeader>
                  <CardDescription>Bank Details</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col justify-end ">
                  <div className = "pb-3 ">Account Number :{value?.photographer.BankDetails?.accountNumber}</div>
                  <div className = "pb-3 ">Account Name :{value?.photographer.BankDetails?.accountName}</div>
                  <div className = "pb-3 ">Bank  :{value?.photographer.BankDetails?.bankName}</div>
                  <div className = "pb-3 ">Branch  :{value?.photographer.BankDetails?.accountBranch}</div>
                </CardContent>
                <CardFooter>
                    
                </CardFooter>
              </Card>
         
    </div>
  );
}

export default PaymentDetails;