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
    bankname: z.string().min(1,{message: "Bank name is required"}),
    holdername: z.string().min(1,{message: "Account holder name is required"}),
    branchname: z.string().min(1,{message: "Branch name is required"}),
    accountno: z.string().regex(/^\d{8,18}$/,{message:"Account number must be between 8 to 18 digits"}),
    branchcode: z.string().regex(/^[0-9]\d{1,5}$/, { message: "Branch code must be less than 6 digits and required" }),
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
        <Card className="flex flex-wrap mx-auto sm:w-[350px] md:w-[700px] lg:w-[920px] mb-5">
            <CardHeader>
                <CardTitle>Bank Details</CardTitle>
                <CardDescription>
                    Make changes to your profile here. Click save when you're done.
                </CardDescription>
            </CardHeader>
            <CardContent className="grid flex-col gap-2">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleSubmit)}
                        className="grid gap-5 mr-5 md:grid-cols-2"
                    >
                        {BankDetailsProps.map((item, index) => (
                            <FormField
                                key={index}
                                control={form.control}
                                name={item.name as "bankname" | "holdername" | "branchname" | "accountno" | "branchcode"}
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

export default BankDetails;

