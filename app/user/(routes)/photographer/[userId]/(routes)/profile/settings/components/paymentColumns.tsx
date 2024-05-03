"use client"

import { ColumnDef } from "@tanstack/react-table"

export type Payment = {
    name: string,
    bookingsId: string,
    updatedAt: string,
    status: string,
    amount: number,
    category: string,
}

export const columns: ColumnDef<Payment>[] = [
    {
        accessorKey: "client.name",
    header: "Client Name",
    },
    {
        accessorKey: "bookingsId",
        header: "Booking ID",
    },
    {
        accessorKey: "updatedAt",
        header: "Date",
    },
    {
        accessorKey: "booking.status",
        header: "Payment Status",
    },
    {
        accessorKey: "amount",
        header: "Amount",
    },
    {
        accessorKey: "booking.category",
        header: "Category",
    }
]
