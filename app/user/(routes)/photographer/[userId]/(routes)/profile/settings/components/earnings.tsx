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
            console.log("earn data=>",res.data);
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
        <div className="w-[100%] ">
        {/* <Card className="w-[350px] mt-8 h-[300px] mx-auto md:justify-start">
            <CardHeader>
                <CardTitle className="text-5xl font-['Inter']">Earnings</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 "> */}
                {fields.map((item, index) => (
                    <div key={index} className="grid grid-cols-2">
                        <div className="text-xl  ">{item.name}:</div>
                        <div className="inline-block pt-1 ml-6 align-middle text-xl ">{`USD ${item.value}`}</div>
                    </div>
                ))}
            {/* </CardContent> */}
        {/* </Card> */}
        </div>
        
    );
};

export default EarningSection;