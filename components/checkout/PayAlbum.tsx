"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

interface PaymentDetails {
  price: number | undefined;
  albumId: string | undefined;
  name: string | undefined;
}

function PayNow({ price, albumId, name }: PaymentDetails) {
  const { data: session } = useSession();
  const clientId = session?.user.id;

  function redirectToExternalLink(link: string) {
    window.location.href = link;
  }

  const createCheckout = async (values: any) => {
    console.log(values, clientId);
    try {
      const url = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/payment/create-checkout-session-album`,
        {
          price: values.price,
          currency: "usd",
          name: values.name,
          albumId: values.albumId,
          clientId: clientId,
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
    if(session?.user?.id === undefined) {
      toast.error("Please login to continue");
      return;
    }
    toast.success(JSON.stringify(values.price));
    createCheckout(values);
  }

  return (
    <Button
      variant="ghost"
      className="flex justify-start p-0 h-6 font-normal w-full "
      onClick={() => {
        onSubmit({ price: price, albumId: albumId, name: name });
      }}
      type="submit"
    >
      Pay Now
    </Button>
  );
}

export default PayNow;
