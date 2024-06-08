
"use client"

import React from "react";
import { useParams } from "next/navigation";
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
import toast from "react-hot-toast";
import axios from "axios";
import { resolve } from "path/win32";

const ReportFormSchema = z.object({
    subject: z.string().regex(/^[A-Za-z0-9 ]+$/,{message:"Enter valid Report"}).max(100).min(1,{message: "Enter a subject"}),
    description: z.string().max(300, ).regex(/^[A-Za-z0-9 \n]+$/,{message:"Enter valid Description"}).min(1,{message: "Enter a Description"}),
});

const SystemReportSection = () => {
    const { userId } = useParams();
    
    const form = useForm<z.infer<typeof ReportFormSchema>>({
        resolver: zodResolver(ReportFormSchema),
        defaultValues: {
            subject: "",
            description: "",
        },
    });
    
    const handleSubmit = async(val: z.infer<typeof ReportFormSchema>) => {
        try{
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/user/${userId}/systemreport`, val);
            toast.success("Report successfully submitted");
        }catch(e){
            toast.error("Error submitting report");
        }
        form.reset();
    }
    
    return (
        <div className="w-[100%]">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => {
                            return (
                                <FormItem className="flex flex-col ">
                                    <FormLabel className="font-medium text-sm mr-[30px] inline-flex">
                                        Subject
                                    </FormLabel>
                                    <FormControl>
                                        <Input className="w-[100%]"
                                            type="text" {...field} placeholder="Subject" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            );
                        }}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel className="text-sm font-medium">Description</FormLabel>
                                <FormControl>
                                    <Textarea
                                        className="w-[100%] h-[130px]"
                                        placeholder="Enter a Description.."
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
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
        </div>
    )
}

export default SystemReportSection;
