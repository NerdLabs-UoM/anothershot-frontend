"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import axios from "axios";
import { Offer } from "@/app/lib/types";
import toast from "react-hot-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface PaymentDetails {
    price: number | undefined,
    bookingId: string | undefined
}

function PayNow({price,bookingId}: PaymentDetails) {
  const params = useParams();
  const router = useRouter();
  const userId = params.userId;

  function redirectToExternalLink(link: string) {
    window.location.href = link;
  }

  const createCheckout = async (values: any) => {
    console.log(values);
    try {
      const url = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/payment/create-checkout-session`,
        {
          price: values.price,
          bookingId: values.bookingId,
        }
      );
      console.log(url);

      if (url.data) {
        redirectToExternalLink(url.data);
      } else {
        toast.error("Error creating checkout");
      }
    } catch (err) {
      console.log("error");
    }
  };

  function onSubmit(values: any) {
    console.log(values.price);
    toast.success(JSON.stringify(values.price));
    createCheckout(values);
  }

  return (
    <div className="grid text-center content-center h-full ">
      <Button
        onClick={() => {
          onSubmit({ price: price ,bookingId: bookingId});
        }}
        type="submit"
      >
        Pay Now
      </Button>
    </div>
  );
}

export default PayNow;
