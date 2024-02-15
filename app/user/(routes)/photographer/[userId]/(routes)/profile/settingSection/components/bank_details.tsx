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
    FormDescription,
} from "@/components/ui/form";
import {
    Card,
    CardHeader,
    CardContent,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {useEffect} from "react";

const bankFormSchema = z.object({
    bankname: z.string().min(2, {message: "Bank Name must be at least 2 characters."})
        .max(100, {message: "Bank name should not exceed 100 characters"})
        .nonempty({message: "Bank name is required"}),
    holdername: z.string().min(2, {message: "Account holder name should be at least 2 characters."})
        .max(100, {message: "Account holder name should not exceed 100 characters"})
        .nonempty({message: "Account holder name is required"}),
    branchname: z.string().min(2, {message: "Branch name should be at least 2 characters long"})
        .max(100, {message: "Branch name should not exceed 100 characters"})
        .nonempty({message: "Branch name is required"}),
    accountno: z.string().min(6, {message: "Account number should be at least 6 characters long"})
        .max(20, {message: "Account number should not exceed 20 characters"})
        .nonempty({message: "Account number is required"}),
    branchcode: z.string().min(3, {message: "Branch code should be at least 3 characters long"})
        .max(10, {message: "Branch code should not exceed 10 characters"})
        .nonempty({message: "Branch code is required"}),
});

const BankDetailsProps = [
    {
      name:"bankname",
        label: "Bank Name",
        placeholder: "bank name",
    },
    {
      name:"holdername",
      label: "Owner's Name",
        placeholder: "account holders name",
    },
    {
      name:"bankname",
      label: "Branch Name",
        placeholder: "branch name",
    },
    {
      name:"accountno",
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
            bankname: "",
            holdername: "",
            branchname: "",
            accountno: "",
            branchcode: "",
        },
    });

    function onSubmit(values: z.infer<typeof bankFormSchema>) {
        console.log(values);
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
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="grid md:grid-cols-2 gap-4"
                    >
                        {BankDetailsProps.map((item, index) => {
                            return (
                                <FormField
                                    key={index}
                                    control={form.control}
                                    name={item.name as "bankname" | "holdername" | "branchname" | "accountno" | "branchcode"}
                                    render={(field) => {
                                        return (
                                            <FormItem>
                                                <div className="grid grid-cols-2">
                                                    <FormLabel>{item.label}</FormLabel>
                                                    <FormControl className="align-middle">
                                                        <Input
                                                            placeholder={item.placeholder}
                                                            {...field}
                                                            className="w-[100%] h-auto"
                                                        />
                                                    </FormControl>
                                                </div>
                                                <FormMessage/>
                                            </FormItem>
                                        );
                                    }}
                                />
                            );
                        })}
                    </form>
                </Form>
                <div className="justify-end">
                    <Button className="w-[130px] t-[1000px] text-center" type="submit">
                        Submit
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default BankDetails;

