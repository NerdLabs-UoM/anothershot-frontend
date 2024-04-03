"use client";

import React, {useEffect, useState} from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";

import {Button} from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Card,
    CardHeader,
    CardContent,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import { useParams } from "next/navigation";
import { updateBankDetails,fetchBankDetails } from "../serviceData";
import toast from "react-hot-toast";
import { BankDetails } from "@/app/lib/types";


const bankFormSchema = z.object({
    bankName: z.string().regex(/^[A-Za-z0-9 ]+$/,{message:"Enter valid Bank Name"}).min(1,{message: "Bank name is required"}),
    accountName: z.string().regex(/^[A-Za-z0-9 ]+$/,{message:"Enter valid Account Holder Name"}).min(1,{message: "Account holder name is required"}),
    accountBranch: z.string().regex(/^[A-Za-z0-9 ]+$/,{message:"Enter valid Branch"}).min(1,{message: "Branch name is required"}),
    accountNumber: z.string().regex(/^\d{8,18}$/,{message:"Enter valid Account number"}),
    accountBranchCode: z.string().regex(/^\d{1,5}$/, { message: "Enter valid Branch code" }),
});

const BankDetailsProps = [
    {
        name: "bankName",
        label: "Bank Name",
        placeholder: "bank name",
    },
    {
        name: "accountName",
        label: "Owner's Name",
        placeholder: "account holders name",
    },
    {
        name: "accountBranch",
        label: "Branch Name",
        placeholder: "branch name",
    },
    {
        name: "accountNumber",
        label: "Account No",
        placeholder: "account number",
    },
    {
        name: "accountBranchCode",
        label: "Branch Code",
        placeholder: "branch code",
    },
];

const BankDetailsSection = () => {
    const { userId } = useParams();
    const [bankDets, setBankDets] = useState<BankDetails | undefined>(undefined);

    const form = useForm<z.infer<typeof bankFormSchema>>({
        resolver: zodResolver(bankFormSchema),
        defaultValues: {
            bankName: bankDets?.bankName || "",
            accountName: bankDets?.accountName || "" ,
            accountBranch: bankDets?.accountBranch || "",
            accountNumber: bankDets?.accountNumber || "",
            accountBranchCode: bankDets?.accountBranchCode || "",
        },
    });
    


    useEffect(()=>{
        if (bankDets){
            form.reset({
                bankName: bankDets.bankName || "",
                accountName: bankDets.accountName || "",
                accountBranch: bankDets.accountBranch || "",
                accountNumber: bankDets.accountNumber || "",
                accountBranchCode: bankDets.accountBranchCode || "",
            })
        }
    },[bankDets,form])

    useEffect(()=> {
        const fetchBankDetail = async () => {
            const data = await fetchBankDetails(userId);
            setBankDets(data);
        }
        fetchBankDetail();
    },[])

    async function handleSubmision(values: z.infer<typeof bankFormSchema>) {
        try{
            await updateBankDetails(values ,userId)
            toast.success("Bank details Successfully updated");
        }catch(e){
            toast.error("Error sending Bank Details");
        }
    }
    
    return (
        <Card className="flex flex-wrap mx-auto sm:w-[300px] md:w-[700px] lg:w-[920px] mb-5">
            <CardHeader>
                <CardTitle>Bank Details</CardTitle>
                <CardDescription>
                    Make changes to your profile here. Click save when you're done.
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 py-4">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleSubmision)}
                        className="grid gap-5 mr-5 md:grid-cols-2"
                    >
                        {BankDetailsProps.map((item, index) => (
                            <FormField
                                key={index}
                                control={form.control}
                                name={item.name as "bankName" | "accountName" | "accountBranch" | "accountNumber" | "accountBranchCode"}
                                render={({field}) => (
                                    <FormItem>
                                        <div className="grid gap-2 md:grid-cols-2 ">
                                            <FormLabel>{item.label} :</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="text"
                                                    placeholder={item.placeholder}
                                                    {...field}
                                                    className="w-[300px] sm:w-auto"
                                                />
                                            </FormControl>
                                        </div>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        ))}

                        <div className="sm:justify-end md:mt-[70px] sm:ml-[150px] mx-auto ">
                            <Button className="w-[130px] text-center" type="submit">
                                Save Changes
                            </Button>
                        </div>
                    </form>
                </Form>

            </CardContent>
        </Card>
    );
};

export default BankDetailsSection;

