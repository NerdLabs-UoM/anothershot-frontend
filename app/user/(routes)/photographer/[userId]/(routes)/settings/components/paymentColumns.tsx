"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
    clientName: string,
    invoiceId: string,
    date: string,
    paymentStatus: string,
    amount: number,
    type: string,
}

export const columns: ColumnDef<Payment>[] = [
    {
        accessorKey: "clientName",
        header:"Client Name",
        cell:({row}) =>{
            return(
                <div className="text-gray-900">
                    {row.original.clientName}
                </div>
            );
        }
    },
    {
        accessorKey: "invoiceId",
        header: "Invoice ID",

    },
    {
        accessorKey: "date",
        header: "Date",
    },
    {
        accessorKey: "paymentStatus",
        header: "Payment Status",
    },
    {
        accessorKey: "amount",
        header: "Amount",
    },
    {
        accessorKey: "type",
        header: "Type",
    }
]
