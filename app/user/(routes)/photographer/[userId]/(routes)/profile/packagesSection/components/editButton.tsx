import React from "react";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import EditPackages from './editPackages';

const EditButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} size={"icon"}>
          <Pencil />
        </Button>
      </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
       
        <div className="grid gap-4 py-4">
            <EditPackages/>
        </div>
       
    </DialogContent>
    </Dialog>
  );
};

export default EditButton;
