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
        <Card className="w-[400px] mt-8 h-[300px] mx-auto md:justify-start">
            <CardHeader>
                <CardTitle className="text-5xl font-['Inter']">Earnings</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 ">
                {data.map((item, index) => (
                    <div key={index} className="grid grid-cols-2">
                        <div className="text-2xl font-semibold ">{item.name}:</div>
                        <div className=" ml-6 align-middle inline-block pt-1">{item.value}</div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
};

export default Earnings;