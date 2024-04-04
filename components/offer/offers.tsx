import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Offer } from "@/app/lib/types";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import OfferForm from "./OfferFrom";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const items = [
  {
    id: "1",
    name: "item 1",
    price: 100,
    currency: "usd",
    quantity: 1,
  },
  {
    id: "2",
    name: "item 2",
    price: 200,
    currency: "usd",
    quantity: 1,
  },
];

function Offers() {
  const {data:session} = useSession();
  const [values, setValues] = useState<Offer[]>();
  
  const params = useParams(); 
  console.log(params)
  const userId = params.userId;

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const data = await axios.get<Offer[]>(
          `${process.env.NEXT_PUBLIC_API_URL}/api/offer/${userId}/photographer/offers`
        );
        setValues(data.data);
      } catch (err) {
        toast.error("Error fetching offers");
      }
      if(values?.length==0) {
        toast.error("No offers found");
      }
    };
    fetchOffers();
  }, []);


  return (
    <>
      <div className="flex flex-col">
        <Dialog>
          <DialogTrigger className="">Create Offer</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Make an Offer</DialogTitle>
              <DialogDescription>
                <OfferForm />
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        {values?.map((value:Offer)=>{
          return (
            <Card key={value.id} className="w-1/2 m-5">
              <CardHeader>
                <CardTitle>{value?.clientName}</CardTitle>
                <CardDescription>{value?.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-row justify-end">
                <p>{value?.price}/=</p>
              </CardContent>
              <CardFooter >
                <p>{session?.user.name}</p>
              </CardFooter>
            </Card>
          )
        })}
      </div>
    </>
  );
}

export default Offers;
