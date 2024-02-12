"use client"

import React from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import {Input} from "@/components/ui/input";

interface earnings {
    name: string;
    value: number;
}

const data: earnings[] = [
    {
        name: "Total Earning",
        value: 1000
    },
    {
        name: "Pending",
        value: 100
    },
    {
        name: "Fees",
        value: 100
    }
];
const Earnings = () => {
    return (
        <Card className="w-[400px] mt-8 mx-8">
            <CardHeader>
                <CardTitle className="text-5xl font-['Inter']">Earnings</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
                {data.map((item, index) => (
                    <div key={index} className="grid grid-cols-2">
                        <div className="text-2xl font-semibold">{item.name}:</div>
                        <div className="inline-block ml-6 align-middle">{item.value}</div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
};

export default Earnings;