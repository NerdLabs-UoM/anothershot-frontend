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

function CLientBookings() {
  const { data: session } = useSession();
  const params = useParams();
  const router = useRouter();
  const [values, setValues] = useState<Offer[]>();
  const userId = params.userId;
  const handleClick = () => {
    router.push(`/user/client/${userId}/bookings/checkout`);
  };

  useEffect(() => {
    console.log(userId);
    const fetchOffers = async () => {
      try {
        const data = await axios.get<Offer[]>(
          `${process.env.NEXT_PUBLIC_API_URL}/api/offer/${userId}/client/offers`
        );
        setValues(data.data);
      } catch (err) {
        toast.error("Error fetching offers");
      }
      if (values?.length == 0) {
        toast.error("No offers found");
      }
    };
    fetchOffers();
  }, []);

  return (
    <div className="grid text-center content-center h-full ">
      <div className="md:border rounded-[20px] md:p-10 min-w-[350px]">
        <h1 className="text-3xl font-bold m-4">Bookings</h1>
      </div>
      <div className="flex">
        {values?.map((value: Offer) => {
          return (
            <Card key={value.id} className="w-1/2 m-5">
              <CardHeader>
                <CardTitle>{value?.clientName}</CardTitle>
                <CardDescription>{value?.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-row justify-end">
                <p>{value?.price}/=</p>
              </CardContent>
              <CardFooter>
                <p>{session?.user.name}</p>
                <Button
                  variant="default"
                  className="w-1/2"
                  onClick={() => handleClick()}
                >
                  <span className="ml-2">Check Out</span>
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default CLientBookings;
