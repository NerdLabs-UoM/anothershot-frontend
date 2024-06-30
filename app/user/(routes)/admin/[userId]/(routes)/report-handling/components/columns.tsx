"use client";

import {
  ColumnDef,
} from "@tanstack/react-table";

import { MoreHorizontal,X } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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

import { UserDetail } from "./userDetails";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import toast from "react-hot-toast";
import axios from "axios";
import { useState } from "react";
import { ReportStatus } from "@/app/lib/types";


export type Profilereport = {
  id: string;
  subject: string;
  description: string;
  status: "PENDING" | "RESOLVED" | "DISMISSED";
  createdAt: Date;
  photographer: {
    name:string,
    user: {
        id:string,
        image: string;
    };
  };
  user: {
    userName:string,
    image: string;
    
  };
};

const handleStatus = async (ReportId:string,status:string) => {
  axios
    .put(
      `${process.env.NEXT_PUBLIC_API_URL}/api/report/update-report-status`,
      {
        ReportId:ReportId,
        status: status,
      }
    )
    .then((response) => {
      window.location.reload();
      toast.success("report status updated successfully");
    })
    .catch((error) => {
      toast.error("Error updating report status");
    });
    return status;
};

export const columns: ColumnDef<Profilereport>[] = [
  {
    accessorKey: "photographer.name",
    header: "Photographer",
    cell: ({ row }) => (
      <UserDetail
        userName={row.original.photographer?.name}
        image={row.original.photographer?.user.image}
      />
    ),
  },
  {
    accessorKey: "client.name",
    header: "Reported by",
    cell: ({ row }) => (
      <UserDetail
        userName={row.original.user?.userName}
        image={row.original.user?.image}
      />
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return( <div>
        {row.original.status === "PENDING" ? (
          <Badge variant="default"> {row.original.status}</Badge>
        ) : row.original.status === "RESOLVED" ? (
          <Badge variant="secondary">{row.original.status}</Badge>
        ) : row.original.status === "DISMISSED" ? (
          <Badge variant="destructive">{row.original.status}</Badge>
        ) : (
          <Badge variant="outline">{row.original.status}</Badge>
        )}
      </div>)
    },
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
      const payment = row.original;
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
                navigator.clipboard.writeText(payment.id);
                toast.success("Payment ID copied to clipboard");
              }}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            <DropdownMenuItem ><Link href= {`user-management/${row.original.photographer.user.id}/profile`}>Manage reported profile</Link></DropdownMenuItem>
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
            <AlertDialog >
              <AlertDialogTrigger asChild>
                <Button variant='ghost' className="flex pl-2 w-full justify-start">
                  View Description
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogCancel className="flex justify-end h-1 p-0 border-none hover:bg-white">
                    <X className="w-4 h-4"/>
                  </AlertDialogCancel>
                  <AlertDialogTitle>Report Description</AlertDialogTitle>
                  <AlertDialogDescription>
                    {row.original.description}
                  </AlertDialogDescription>
                </AlertDialogHeader>
              </AlertDialogContent>
            </AlertDialog>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
