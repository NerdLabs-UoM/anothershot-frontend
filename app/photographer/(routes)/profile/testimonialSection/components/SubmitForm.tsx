"use client"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select,SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import React, { Component } from 'react'


const formSchema = z.object({
    feedback: z.string().max(30, 'Give your feedback'),
    rate: z.enum(["Amazing", "Excellent", "Good", "Ordinary", "Bad"])
})

const SubmitForm = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            feedback: "",
            rate: "Excellent",
        },
    });
    const onSubmit = (values:z.infer<typeof formSchema>)=>{
        console.log(values);
    }

    return (
        <div className="w-[689px]">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-10">
                    <FormField
                        control={form.control}
                        name="rate"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-center ml-0">
                                <FormLabel className="font-medium text-sm mr-[30px] inline-flex">Rate your Experience</FormLabel>
                                <Select onValueChange={field.onChange}>
                                    <FormControl>
                                        <SelectTrigger className="w-[95px] h-[28px] px-1">
                                            <SelectValue placeholder="Excellent" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Amazing">Amazing</SelectItem>
                                        <SelectItem value="Excellent">Excellent</SelectItem>
                                        <SelectItem value="Good">Good</SelectItem>
                                        <SelectItem value="Ordinary">Ordinary</SelectItem>
                                        <SelectItem value="Bad">Bad</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="feedback"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel className="font-medium text-sm">Feedback</FormLabel>
                                <FormControl>
                                    <Textarea className="h-[80px] w-[689px] resize-none" placeholder="Type your feedback here" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="ml-20 w-[530px]">Submit</Button>
                </form>
            </Form>

        </div>
    )
}


export default SubmitForm