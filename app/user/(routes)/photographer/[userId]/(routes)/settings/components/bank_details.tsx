"use client";

import React from "react";
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

const bankFormSchema = z.object({
    bankname: z.string().max(100).nonempty({message: "Bank name is required"}),
    holdername: z.string().max(100, {message: "must less than 100 characters"}).nonempty({message: "Account holder name is required"}),
    branchname: z.string().max(50, {message: "must less than 50 characters"}).nonempty({message: "Branch name is required"}),
    accountno: z.string().max(20, {message: "must less than 20 characters"}).nonempty({message: "Account number is required"}),
    // branchcode: z.string()
        // .refine((branchcode) => !isNaN(parseInt(branchcode)), {message: "Branch code is required"})
        // .transform((branchcode) => !isNaN(Number(branchcode)),{message: "Branch code must be a number"}
    branchcode: z.string()
        .refine((branchcode) => !isNaN(parseInt(branchcode)), { message: "Branch code is required" })
        .refine((branchcode) => Number(branchcode), { message: "Branch code must be a number" })

});

const BankDetailsProps = [
    {
        name: "bankname",
        label: "Bank Name",
        placeholder: "bank name",
    },
    {
        name: "holdername",
        label: "Owner's Name",
        placeholder: "account holders name",
    },
    {
        name: "branchname",
        label: "Branch Name",
        placeholder: "branch name",
    },
    {
        name: "accountno",
        label: "Account No",
        placeholder: "account number",
    },
    {
        name: "branchcode",
        label: "Branch Code",
        placeholder: "branch code",
    },
];

const BankDetails = () => {
    const form = useForm<z.infer<typeof bankFormSchema>>({
        resolver: zodResolver(bankFormSchema),
        defaultValues: {
            bankname: '',
            holdername: '',
            branchname: '',
            accountno: '',
            branchcode: '',
        },
    });

    function handleSubmit(values: z.infer<typeof bankFormSchema>) {
        console.log("submitted ewwa bank eke :", values);
        form.reset();
    }

    return (
        <Card className="md:w-[840px] w-[400px] mt-5 flex flex-wrap md:justify-start md:ml-[85px]">
            <CardHeader>
                <CardTitle>Bank Details</CardTitle>
                <CardDescription>
                    Make changes to your profile here. Click save when you're done.
                </CardDescription>
            </CardHeader>
            <CardContent className="grid flex-col gap-4 ">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleSubmit)}
                        className="grid gap-4 md:grid-cols-2"
                    >
                        {BankDetailsProps.map((item, index) => (
                            <FormField
                                key={index}
                                control={form.control}
                                name={item.name as "bankname" | "holdername" | "branchname" | "accountno" | "branchcode"}
                                render={({field}) => (
                                    <FormItem>
                                        <div className="grid grid-cols-2">
                                            <FormLabel>{item.label} :</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="text"
                                                    placeholder={item.placeholder}
                                                    {...field}
                                                />
                                            </FormControl>
                                        </div>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        ))}

                        <div className="justify-end mt-[80px] ml-[200px]">
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

export default BankDetails;

