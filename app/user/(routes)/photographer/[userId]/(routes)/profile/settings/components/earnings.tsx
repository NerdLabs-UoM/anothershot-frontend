"use client"

import React, { useEffect } from "react";
import axios from "axios";
import { Earnings } from "@/app/lib/types";
import toast from "react-hot-toast";



type EarningSectionProps = {
    userId: string|string[];
};

const EarningSection:React.FC<EarningSectionProps> = ({userId}) => {
    const [earnings, setEarnings] = React.useState<Earnings>();
    

    useEffect(() => {
        const fetchEarnings = async () => {
            try{
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/photographer/${userId}/earnings`);
            setEarnings(res.data);
            }catch(e){
                toast.error("Error fetching earnings");
            }
        };
        fetchEarnings();
    },[]);

    const fields = [
        {
            name: "Total Earning",
            value: earnings?.totalAmount,
        },
        {
            name: "Pending",
            value: earnings?.pending,
        },
        {
            name: "Fees",
            value: earnings?.fees,
        }
    ];
    
    return (
        <div className="w-auto">
                {fields.map((item, index) => (
                    <div key={index} className="sm:grid grid-cols-[150px_auto] items-center gap-2 md:gap-4 mb-2">
                        <div className="md:text-xl font-semibold">{item.name}:</div>
                        <div className="inline-block pt-1 ml-6 align-middle text-sm md:text-xl ">{`(USD) ${item.value}`}</div>
                    </div>
                ))}
        </div>
        
    );
};

export default EarningSection;