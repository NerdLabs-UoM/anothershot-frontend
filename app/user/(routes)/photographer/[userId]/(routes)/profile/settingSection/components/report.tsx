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


const ReportFormSchema = z.object({
    subject: z.string().max(100).nonempty({message: "Enter a subject"}),
    description: z.string().max(300, ).nonempty({message: "Enter a Description"}),
});

const ReportForm = () => {
    const form = useForm<z.infer<typeof ReportFormSchema>>({
        resolver: zodResolver(ReportFormSchema),
        defaultValues: {
            subject: "",
            description: "",
        },
    });
    const handleSubmit = (val: z.infer<typeof ReportFormSchema>) => {
        console.log("submitted dewal:", val);
        form.reset();
    }
    return (
        <Card className="grid border-none mx-auto w-[550px] ">
            <CardHeader className="flex mb-4">
                <CardTitle className="text-5xl font-['Inter']">Report</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 justify-items-start">
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
                                    <FormLabel className="text-sm font-medium">Feedback</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            className="w-[350px] h-[130px]"
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
                            className=""
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
