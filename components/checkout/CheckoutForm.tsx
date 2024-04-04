'use client'

import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { Button } from "../ui/button";
import { StripePaymentElementOptions } from "@stripe/stripe-js";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const CheckoutForm = () => {
  const [clientSecret,setClientSecret] = useState<string>('');
  const router = useRouter()
  const stripe = useStripe();
  const elements = useElements();
  const session = useSession()
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }
    

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      console.log(paymentIntent?.status)
      if (paymentIntent) {
        switch (paymentIntent.status) {
          case "succeeded":
            toast.success('Payment succeeded!')
            setMessage("Payment succeeded!");
            break;
          case "processing":
            toast.loading("Your payment is processing.")
            setMessage("Your payment is processing.");
            break;
          case "requires_payment_method":
            toast.error("Your payment was not successful, please try again.")
            setMessage("Your payment was not successful, please try again.");
            break;
          default:
            toast.error("Something went wrong.")
            setMessage("Something went wrong.");
            break;
        }
      }
    });
  }, [stripe]);

  const handleSubmit = async (e:any) => {
    
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);
    const userId = session.data?.user.id
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${process.env.NEXT_PUBLIC_HOST}/user/client/${userId}/bookings/checkout/success`,
      },
    }); 
    toast.error('Payment Declined!')

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message as string);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
    toast.success('Payment succeeded!')
  };

  const paymentElementOptions:StripePaymentElementOptions = {
    layout: "tabs"
  }

  return (
    <div className="flex items-center justify-center pt-30">
    <div className="">
    <form id="payment-form" onSubmit={handleSubmit} className="md:border rounded-[20px] md:p-10 min-w-[350px]">

      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <Button disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </Button>
    </form>
    </div>
    </div>
  );
};

export default CheckoutForm;