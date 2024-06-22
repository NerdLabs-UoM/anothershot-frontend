"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserDetail } from "../../user-management/components/userDetail";
import { Badge } from "@/components/ui/badge";
import toast from "react-hot-toast";
import axios from "axios";
import { SystemReport } from "@/app/lib/types";
import { Popover } from "@radix-ui/react-popover";
import { PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@radix-ui/react-label";
import { Trash2Icon, TrashIcon } from "lucide-react";

const handleDelete = async (systemReportId: string) => {
  try {
    await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/delete-report/${systemReportId}`
    );
    toast.success("System report deleted successfully");
    window.location.reload();
  } catch (error: any) {
    toast.error("Error deleting feed image:", error);
  }
};

const handleStatus = async (systemReportId: string, status: string) => {
  axios
    .put(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/update-system-report-status`,
      {
        id: systemReportId,
        status: status,
      }
    )
    .then((response) => {
      toast.success("System report status updated successfully");
      window.location.reload();
    })
    .catch((error) => {
      toast.error("Error updating system report status");
    });
};

export const columns: ColumnDef<SystemReport>[] = [
  {
    accessorKey: "user",
    header: "Reported by",
    cell: ({ row }) => (
      <UserDetail
        userName={row.original.user?.userName}
        image={row.original.user?.image}
        email={row.original.user?.email}
      />
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const report = row.original;
      return (
        <RadioGroup
          value={report.status}
          onValueChange={(newStatus) => handleStatus(report.id, newStatus)}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="PENDING" id={`pending-${report.id}`} />
            <Label htmlFor={`pending-${report.id}`}>{"PENDING"}</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="RESOLVED" id={`resolved-${report.id}`} />
            <Label htmlFor={`resolved-${report.id}`}>{"RESOLVED"}</Label>
          </div>
        </RadioGroup>
      );
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
      const createDate = new Date(row.getValue("createdAt"));
      const updateDate = new Date(row.original.updatedAt);
      const formattedCreateDate = createDate.toLocaleDateString();
      const formattedUpdateDate = updateDate.toLocaleDateString();
      return (
        <div>
          <Popover>
            <PopoverTrigger className="border px-5 py-2 rounded-xl active:bg-slate-100">
              View
            </PopoverTrigger>
            <PopoverContent className="w-[400px]">
              <div className="grid gap-4">
                <div className="">
                  <h1 className="text-xl font-bold text-center">
                    Report Details
                  </h1>
                  <hr />
                </div>
                <div className="flex flex-col gap-2">
                  <p>
                    <b>Reported Date</b>:{formattedCreateDate}
                  </p>
                  <p>
                    <b>Updated Date</b>:{formattedUpdateDate}
                  </p>
                  <p>
                    <b>User</b>:{row.original.user?.userName}
                  </p>
                  <p>
                    <b>User ID</b>:{row.original.user?.id}
                  </p>
                  <p>
                    <b>Subject</b>:{row.original.subject}
                  </p>
                  <p>
                    <b>Description</b>:{row.original.description}
                  </p>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      );
    },
  },
  {
    id: "delete",
    cell: ({ row }) => {
      return <Trash2Icon onClick={() => handleDelete(`${row.original.id}`)} className="text-slate-800" />;
    },
  },
];
