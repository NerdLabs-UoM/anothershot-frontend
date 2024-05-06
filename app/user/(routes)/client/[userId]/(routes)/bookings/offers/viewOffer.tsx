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
import { Offer } from "@/app/lib/types";
import axios from "axios";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

import PayNow from "./paynow"
import { values } from "lodash";

interface bookingDetails{
    bookingId:string;
}

const ViewOffer=({bookingId}:bookingDetails)=>{

  const [value, setValues] = useState<Offer|null>(null);
  const { data: session } = useSession();

  

  useEffect(() => {
    console.log(bookingId);
    const fetchOffers = async () => {
      try {
        const data = await axios.get<Offer>(
          `${process.env.NEXT_PUBLIC_API_URL}/api/offer/${bookingId}`
        );
        console.log(data.data);
        setValues(data.data);
      } catch (err) {
        toast.error("Error fetching offers");
      }
    };
    fetchOffers();
  }, []);
  
  return (
    <div>
      <Dialog>
        <DialogTrigger className="inline-flex items-center px-4 py-2 border border-transparent rounded-md font-semibold text-sm text-white bg-black hover:bg-slate-700 focus:outline-none disabled:opacity-25 transition ease-in-out duration-150">
          View Offer
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Offer</DialogTitle>
            <DialogDescription>
              {value?.price?<Card className="m-5">
                <CardHeader>
                  <CardTitle>{value?.clientName}</CardTitle>
                  <CardDescription>{value?.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col justify-end ">
                  <p className = "pb-3 font-bold">{value?.price}/=</p>
                  <PayNow price ={value?.price} bookingId={bookingId}/>
                </CardContent>
                <CardFooter>
                  <p>{session?.user.name}</p>
                </CardFooter>
              </Card>:<p>No offers yet</p>}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ViewOffer;
