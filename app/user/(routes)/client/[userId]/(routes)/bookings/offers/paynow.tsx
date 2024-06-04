"use client";

import { Button } from "@/components/ui/button";
import React from "react"
import axios from "axios";
import toast from "react-hot-toast";
import { Currency } from "lucide-react";

interface PaymentDetails {
    price: number | undefined,
    bookingId: string | undefined,
    name:string | undefined,
}

function PayNow({price,bookingId,name}: PaymentDetails) {

  function redirectToExternalLink(link: string) {
    window.location.href = link;
  }

  const createCheckout = async (values: any) => {

    try {
      const url = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/payment/create-checkout-session`,
        {
          price: values.price,
          currency:'usd',
          name: values.name,
          bookingId: values.bookingId,
        }
      );


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
    toast.success(JSON.stringify(values.price));
    createCheckout(values);
  }

  return (
    <div className="grid text-center content-center h-full ">
      <Button
        onClick={() => {
          onSubmit({ price: price ,bookingId: bookingId ,name:name});
        }}
        type="submit"
      >
        Pay Now
      </Button>
    </div>
  );
}

export default PayNow;
