import React, { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import OfferForm from "./OfferFrom";

interface BookingDetails{
  bookingId: string;
  clientId:string;
  eventName:string;
}

function Offers({bookingId,clientId,eventName}: BookingDetails) {
  const [isOpen, setIsOpen] = useState<{ isOpen: boolean }>({ isOpen: false });

  const handleOpenChange = (open: boolean) => {
    setIsOpen({ isOpen: open });
  };

  return (
      <div className="flex flex-col">
        <Dialog open={isOpen.isOpen} onOpenChange={handleOpenChange}>
          <DialogTrigger className="bg-green-500 py-1 rounded-md bg-opacity-40">Create Offer</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Make an Offer</DialogTitle>
              <DialogDescription>
                <OfferForm bookingId = {bookingId} clientId={clientId} setIsOpen={setIsOpen} eventName={eventName}/>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
  );
}

export default Offers;
