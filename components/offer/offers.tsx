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

interface bookingDetails{
  bookingId: string;
}

function Offers({bookingId}: bookingDetails) {

  const [values, setValues] = useState<Offer[]>();
  
  const params = useParams(); 
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
      <div className="flex flex-col">
        <Dialog>
          <DialogTrigger className="">Create Offer</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Make an Offer</DialogTitle>
              <DialogDescription>
                <OfferForm bookingId = {bookingId} />
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
  );
}

export default Offers;
