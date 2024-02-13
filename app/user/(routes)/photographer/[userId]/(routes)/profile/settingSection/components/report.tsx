"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import * as z from "zod"

import {Button} from "@/components/ui/button"
import {Card, CardHeader, CardTitle, CardContent} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Textarea} from "@/components/ui/textarea";
import React from "react";
import {v4 as uuidv4} from "uuid";


const formSchema = z.object({
    subject: z.string().max(100, "Subject"),
    description: z.string().max(300, "Enter a Description"),
});
const ReportForm = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            subject: "",
            description: "",
        },
    });
    // const onSubmit = (values: z.infer<typeof formSchema>) => {
    //     const newReport = {
    //         subject:values.subject,
    //         description: values.description,
    //     };
    //     setReportData((prevReports) => [
    //         ...prevReports,
    //         newReport,
    //     ]);
    // };

    const handleSubmit = () => {

    }
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-5xl font-['Inter']">Report</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="subject"
                            render={({field}) => (
                                <FormItem
                                    className="flex flex-col items-start ml-44 sm:ml-20 sm:flex-row sm:items-center md:ml-0">
                                    <FormLabel className="font-medium text-sm mr-[30px] inline-flex">
                                        Subject
                                    </FormLabel>
                                    <FormControl>
                                        <Input type="text" {...field} placeholder="Subject"/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({field}) => (
                                <FormItem className="flex flex-col ml-44 sm:ml-20 md:ml-0">
                                    <FormLabel className="font-medium text-sm">Feedback</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            className="h-[80px] w-[346px] sm:w-[537px] md:w-[689px] resize-none"
                                            placeholder="Type your feedback here"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <Button
                            type="submit"
                            className="ml-44 sm:ml-20 h-9 w-[346px] sm:h-11 sm:w-[537px] md:w-[530px]"
                        >
                            Submit
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>

    )
}

export default ReportForm;