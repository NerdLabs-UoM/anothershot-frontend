"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import * as z from "zod"

import {Button} from "@/components/ui/button"
import {Card, CardHeader, CardTitle, CardContent} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {Textarea} from "@/components/ui/textarea";
import React from "react";
import { submitReport } from "../serviceData";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";

const ReportFormSchema = z.object({
    subject: z.string().regex(/^[A-Za-z0-9 ]+$/,{message:"Enter valid Report"}).max(100).min(1,{message: "Enter a subject"}),
    description: z.string().max(300, ).regex(/^[A-Za-z0-9 ]+$/,{message:"Enter valid Description"}).min(1,{message: "Enter a Description"}),
});

const ReportForm = () => {
    const { userId } = useParams();
    const form = useForm<z.infer<typeof ReportFormSchema>>({
        resolver: zodResolver(ReportFormSchema),
        defaultValues: {
            subject: "",
            description: "",
        },
    });
    const handleSubmit = (val: z.infer<typeof ReportFormSchema>) => {
        try{
            submitReport(userId,val);
            toast.success("Report successfully submitted");
        }catch(e){
            toast.error("Error submitting report");
        }
        form.reset();
    }
    return (
        <Card className="grid border-none ">
            <CardHeader className="flex mb-4">
                <CardTitle className="text-5xl font-['Inter']">Report</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 ml-0 justify-self-start">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="subject"
                            render={({field}) => {
                                return (
                                    <FormItem className="flex flex-col ">
                                        <FormLabel className="font-medium text-sm mr-[30px] inline-flex">
                                            Subject
                                        </FormLabel>
                                        <FormControl>
                                            <Input className="w-[350px]"
                                                   type="text" {...field} placeholder="Subject"/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                );
                            }}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({field}) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel className="text-sm font-medium">Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            className="w-[350px] h-[130px]"
                                            placeholder="Enter a Description.."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <Button
                            type="submit"
                            className="w-[100%]"
                        >
                            Submit Report
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>

    )
}

export default ReportForm;
