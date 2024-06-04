"use client";

import { loadStripe } from "@stripe/stripe-js/pure";
import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import { StripeElementsOptionsClientSecret } from "@stripe/stripe-js";
import axios from "axios";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

interface options {
  clientSecret: string;
  appearance: {
    theme: string;
  };
}

interface CheckoutFormOptions{
  items:string;
  amount:string;
  currency:string;
}
const Checkout = () => {

  const [clientSecret, setClientSecret] = useState<string>("");

  useEffect(() => {
    const stripe = async () => {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/payment/create-payment-intent`,
        {
          items: "Wedding",
          amount: "30000",
          currency: "lkr",
        }
      );
      setClientSecret(response.data.clientSecret);
    };
    stripe();
  }, []);

  const appearance = {
    theme: "stripe",
  };

  const options: StripeElementsOptionsClientSecret = {
    clientSecret,
    appearance: {
      theme: "stripe",
    },
  };

  console.log(clientSecret);
  return (
    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};

export default Checkout;