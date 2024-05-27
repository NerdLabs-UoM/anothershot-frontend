"use client";

import {
  ColumnDef,
} from "@tanstack/react-table";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserDetail } from "./userDetails";
import { Badge } from "@/components/ui/badge";
import toast from "react-hot-toast";
import Image from "next/image";
import axios from "axios";


export type Imagereport = {
  id: string;
  subject: string;
  description: string;
  status: "PENDING" | "RESOLVED" | "DISMISSED";
  createdAt: Date;
  feedImage: {
    id: string;
    imageUrl: string;
    photographerId: string;
  };
  user: {
    id: string;
    userName: string;
    image: string;
  };
};

const handleDelete = async (imageId: string, photographerId: string) => {
  try {
    await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/api/photographer/${photographerId}/feed/delete`,
      {
        data: {
          feedId: imageId,
        },
      }
    );
  } catch (error: any) {
    toast.error("Error deleting feed image:", error);
  }
};

const handleStatus = async (ImageReportId:string,status:string) => {
  toast.success("Dismissed");
  axios
    .put(
      `${process.env.NEXT_PUBLIC_API_URL}/api/report/update-image-report-status`,
      {
        ImageReportId:ImageReportId,
        status: status,
      }
    )
    .then((response) => {
      toast.success("report status updated successfully");
    })
    .catch((error) => {
      toast.error("Error updating report status");
    });
};


export const columns: ColumnDef<Imagereport>[] = [
  {
    accessorKey: "feedImage.id",
    header: "Reported Image",
    cell: ({ row }) => (
      <div>
        <Dialog>
          <DialogTrigger>View Image</DialogTrigger>
          <DialogContent className="w-auto">
            <DialogHeader>
              <DialogTitle>Reported Image</DialogTitle>
              <div>
                <Image
                  src={row.original.feedImage?.imageUrl || "/images/avatar.png"}
                  className="rounded-3xl"
                  alt="img"
                  width={320}
                  height={400}
                />
              </div>
            </DialogHeader>
            <div className = "flex justify-end gap-2">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant='destructive'>
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    the image.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() =>
                      handleDelete(
                        row.original.feedImage?.id,
                        row.original.feedImage?.photographerId
                      )
                    }
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    ),
  },
  {
    accessorKey: "client.name",
    header: "Reported by",
    cell: ({ row }) => (
      <UserDetail
        userName={row.original.user?.userName}
        image={row.original.user.image}
      />
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div>
        {row.original.status === "PENDING" ? (
          <Badge variant="default">{row.original.status}</Badge>
        ) : row.original.status === "RESOLVED" ? (
          <Badge variant="secondary">{row.original.status}</Badge>
        ) : row.original.status === "DISMISSED" ? (
          <Badge variant="destructive">{row.original.status}</Badge>
        ) : (
          <Badge variant="outline">{row.original.status}</Badge>
        )}
      </div>
    ),
  },
  {
    accessorKey: "subject",
    header: "Subject",
    cell: ({ row }) => {
      return <div className="">{row.original.subject}</div>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      const formattedDate = date.toLocaleDateString();
      return <div>{formattedDate}</div>;
    },
  },
  {
    id: "actions",
    accessorKey: "More",
    cell: ({ row }) => {
      const report = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Option</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(report.id);
                toast.success("Payment ID copied to clipboard");
              }}
            >
              Copy report ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            <DropdownMenuItem
            onClick={() => {
              const status = "RESOLVED"
              handleStatus(row.original.id,status);
            }} >Mark as Resolved</DropdownMenuItem>
            <DropdownMenuItem
              className="bg-transparent text-black font-normal hover:bg-slate-200"
              onClick={() => {
                const status = "DISMISSED"
                handleStatus(row.original.id,status);
              }}
            >
              Dismiss Report
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
