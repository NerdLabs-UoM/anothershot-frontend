"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { updateBankDetails, fetchBankDetails } from "../serviceData";
import { BankDetails } from "@/app/lib/types";

const bankFormSchema = z.object({
    bankName: z.string().regex(/^[A-Za-z0-9 ]+$/, { message: "Enter valid Bank Name" }).min(1, { message: "Bank name is required" }),
    accountName: z.string().regex(/^[A-Za-z0-9 ]+$/, { message: "Enter valid Account Holder Name" }).min(1, { message: "Account holder name is required" }),
    accountBranch: z.string().regex(/^[A-Za-z0-9 ]+$/, { message: "Enter valid Branch" }).min(1, { message: "Branch name is required" }),
    accountNumber: z.string().regex(/^\d{8,18}$/, { message: "Enter valid Account number" }),
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
            accountName: bankDets?.accountName || "",
            accountBranch: bankDets?.accountBranch || "",
            accountNumber: bankDets?.accountNumber || "",
            accountBranchCode: bankDets?.accountBranchCode || "",
        },
    });

    useEffect(() => {
        if (bankDets) {
            form.reset({
                bankName: bankDets.bankName || "",
                accountName: bankDets.accountName || "",
                accountBranch: bankDets.accountBranch || "",
                accountNumber: bankDets.accountNumber || "",
                accountBranchCode: bankDets.accountBranchCode || "",
            })
        }
    }, [bankDets, form])

    useEffect(() => {
        const fetchBankDetail = async () => {
            try {
                const data = await fetchBankDetails(userId);
                setBankDets(data);
            } catch (e) {
                toast.error("Error fetching Bank Details");
            }
        }
        fetchBankDetail();
    }, [])

    async function handleSubmision(values: z.infer<typeof bankFormSchema>) {
        try {
            await updateBankDetails(values, userId)
            toast.success("Bank details Successfully updated");
        } catch (e) {
            toast.error("Error sending Bank Details");
        }
    }

    return (
        <div className="w-[100%] block">

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleSubmision)}
                    className="grid md:grid-cols-2 gap-4 place-content-center"
                >
                    {BankDetailsProps.map((item, index) => (
                        <FormField
                            key={index}
                            control={form.control}
                            name={item.name as "bankName" | "accountName" | "accountBranch" | "accountNumber" | "accountBranchCode"}
                            render={({ field }) => (
                                <FormItem className="md:flex-col">
                                    <div>
                                        <FormLabel className="">{item.label} :</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder={item.placeholder}
                                                {...field}
                                                className="md:w-[300px] lg:w-[400px] xl:w-[500px] sm:w-auto "
                                            />
                                        </FormControl>
                                    </div>
                                    <FormMessage />
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

        </div>
    );
};

export default BankDetailsSection;

