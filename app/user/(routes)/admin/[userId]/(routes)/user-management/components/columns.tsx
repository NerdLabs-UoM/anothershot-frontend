"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";

import { UserDetail } from "./userDetail";
import { useRouter } from "next/router";
import Link from "next/link";

type UserManagement = {
  id: string;
  userRole: string;
  name: string;
  email: string;
  status: string;
};

export const columns: ColumnDef<UserManagement>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <div>
          <Checkbox className="border-slate" />
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            User Id
            <ArrowDown className="w-4 h-4 ml-2" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="py-3 text-gray-900 text-sm font-medium font-['Inter'] leading-tight">
        <Checkbox className="mr-8 border-slate" />
        {row.original.id}
      </div>
    ),
  },
  {
    accessorKey: "userRole",
    header: "User Role",
    cell: ({ row }) => (
      <div
        className={`pl-1.5 pr-2 py-0.5 text-center rounded-full ${
          row.original.userRole == "PHOTOGRAPHER"
            ? "text-emerald-700 bg-green-300 w-32 flex gap-1 "
            : "bg-slate-300 w-16 text-zinc-700"
        }`}
      >
        {row.original.userRole === "photographer" ? (
          <>
            <Image
              src="/icons/check.svg"
              alt="image"
              width={8}
              height={8}
              className="relative"
            />
            {row.original.userRole}
          </>
        ) : (
          row.original.userRole
        )}
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => ( <UserDetail name={row.original.name} email={row.original.email} image="/images/Avatar (1).png"/> ),
  },
  {
    accessorKey: "status",
    header: "Report Status",
    cell: "No Reports",
  },
  {
    
    id: "actions",
    cell: ({ row }) => (
      <Button variant="secondary" onClick={() => handleView(row.original.id)}>
       <Link href ={`user-management/${row.original.id}/profile`}> View</Link> 
      </Button>
    ),
  },
  
];


const handleView = (id: string) => {
  console.log(`View button clicked for user with ID: ${id}`);
};
