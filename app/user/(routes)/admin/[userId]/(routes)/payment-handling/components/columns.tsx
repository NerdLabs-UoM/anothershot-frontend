"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { UserDetail } from "./userDetails"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/router"
import Link from "next/link"
import PaymentDetails from "./paymentInfo"
import { useState } from "react"
import toast from "react-hot-toast"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string
  clientName: string
  photographerName: string
  amount: number
  status: "PENDING" | "PAID"
  createdAt: Date
  photographer:{
    name: string,
    user:{
      id:string,
      image: string
    }
  }
  client:{
    name: string,
    user:{
      id:string,
      image: string
    }
  }
}

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "photographer.name",
    header: "Photographer",
    cell: ({ row }) => (
      <UserDetail
          userName={row.original.photographer.name}
          image={row.original.photographer.user.image}
      />
  ),
  },
  {
    accessorKey:"client.name",
    header: "Client",
    cell: ({ row }) => (
      <UserDetail
          userName={row.original.client.name}
          image={row.original.client.user.image}
      />
  ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div>
          {row.original.status === "PENDING" ? (
              <Badge variant="default">
                  {row.original.status}
              </Badge>
          ) : row.original.status === "PAID" ? (
              <Badge variant="secondary">{row.original.status}</Badge>
          ) : (
              <Badge variant="outline">{row.original.status}</Badge>
          )}
      </div>
  ),
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      
      return <div className="">{row.original.amount/100}$</div>
    },
    
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell:({row})=>{
      const date = new Date(row.getValue('createdAt'));
      const formattedDate = date.toLocaleDateString()
      return <div>{formattedDate}</div>
    }
  },
  {
    id: "actions",
    accessorKey: "More",
    cell: ({ row }) => {
      
      const payment = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" >
            <DropdownMenuLabel>Option</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(payment.id)
                toast.success("Payment ID copied to clipboard")
              }
              }
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem ><Link href= {`/user/photographer/${row.original.photographer.user.id}/profile`}>View customer</Link></DropdownMenuItem>
            <DropdownMenuItem ><Link href= {`payment-handling/${row.original.id}/paymentInfo`}>View payment details</Link></DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
