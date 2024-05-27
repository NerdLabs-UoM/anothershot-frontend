import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import { EllipsisVertical } from "lucide-react";
import ReportPhotoFrom from "./ReportPhotoForm";
interface ImageId {
  imageId: string;
}

function ReportPhoto({ imageId }: ImageId) {


  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <EllipsisVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-20">
          <DropdownMenuGroup>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="bg-transparent text-black font-normal hover:bg-slate-200 pr-14">
                  Report
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogCancel className="flex justify-end border-none hover:bg-white h-1">
                    x
                  </AlertDialogCancel>
                  <AlertDialogTitle>Report Photo</AlertDialogTitle>
                  <AlertDialogDescription>
                    Create a report on this photo with relevent cause and description
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <ReportPhotoFrom imageId={imageId} />
                <AlertDialogFooter></AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default ReportPhoto;
