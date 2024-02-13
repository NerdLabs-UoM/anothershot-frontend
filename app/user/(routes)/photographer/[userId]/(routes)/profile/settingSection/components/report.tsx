// "use client"
//
// import {zodResolver} from "@hookform/resolvers/zod"
// import {useForm} from "react-hook-form"
// import * as z from "zod"
//
// import {Button} from "@/components/ui/button"
// import {Card, CardHeader, CardTitle, CardContent} from "@/components/ui/card";
// import {
//     Form,
//     FormControl,
//     FormDescription,
//     FormField,
//     FormItem,
//     FormLabel,
//     FormMessage,
// } from "@/components/ui/form"
// import {Input} from "@/components/ui/input"
// import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
// import {Textarea} from "@/components/ui/textarea";
// import React from "react";
// import {v4 as uuidv4} from "uuid";
//
//
// const ReportFormSchema = z.object({
//     subject: z.string().max(100, {message:"Enter a subject"}),
//     description: z.string().max(300, {message:"Enter a Description"}),
// });
// const ReportForm = () => {
//     const form = useForm<z.infer<typeof ReportFormSchema>>({
//         resolver: zodResolver(ReportFormSchema),
//         defaultValues: {
//             subject: "",
//             description: "",
//         },
//     });
//     // const onSubmit = (values: z.infer<typeof formSchema>) => {
//     //     const newReport = {
//     //         subject:values.subject,
//     //         description: values.description,
//     //     };
//     //     setReportData((prevReports) => [
//     //         ...prevReports,
//     //         newReport,
//     //     ]);
//     // };
//
//     const handleSubmit = (val:z.infer<typeof ReportFormSchema>) => {
//         console.log("submitted dewal:",val);
//     }
//     return (
//         <Card className="border-none grid mx-auto justify-center">
//             <CardHeader className="flex mb-4">
//                 <CardTitle className="text-5xl font-['Inter']">Report</CardTitle>
//             </CardHeader>
//             <CardContent className="grid gap-4 justify-items-start">
//                 <Form {...form}>
//                     <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
//                         <FormField
//                             control={form.control}
//                             name="subject"
//                             render={({field}) => (
//                                 <FormItem className="flex flex-col ml-44 sm:ml-20 md:ml-0">
//                                     <FormLabel className="font-medium text-sm mr-[30px] inline-flex">
//                                         Subject
//                                     </FormLabel>
//                                     <FormControl>
//                                         <Input className="md:w-[350px]"
//                                                type="text" {...field} placeholder="Subject"/>
//                                     </FormControl>
//                                     <FormMessage/>
//                                 </FormItem>
//                             )}
//                         />
//                         <FormField
//                             control={form.control}
//                             name="description"
//                             render={({field}) => (
//                                 <FormItem className="flex flex-col ml-44 sm:ml-20 md:ml-0">
//                                     <FormLabel className="font-medium text-sm">Feedback</FormLabel>
//                                     <FormControl>
//                                         <Textarea
//                                             className="md:w-[350px] h-[130px]"
//                                             placeholder="Type your feedback here"
//                                             {...field}
//                                         />
//                                     </FormControl>
//                                     <FormMessage/>
//                                 </FormItem>
//                             )}
//                         />
//                         <Button
//                             type="submit"
//                             className=""
//                         >
//                             Submit
//                         </Button>
//                     </form>
//                 </Form>
//             </CardContent>
//         </Card>
//
//     )
// }
//
// export default ReportForm;


"use client"

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver }  from "@hookform/resolvers/zod";
import {Form, FormField, FormItem, FormLabel, FormMessage,FormControl} from "@/components/ui/form";
import {Input} from "@/components/ui/input";

const ReportFormSchema = z.object({
   subject: z.string().max(100, {message: "Enter a subject"}),
    // description: z.string().max(300, {message: "Enter a Description"}),
});

export default function ReportForm() {

    const form = useForm<z.infer<typeof ReportFormSchema>>({
        resolver: zodResolver(ReportFormSchema),
        defaultValues:{
            subject: "",
            // description: "",
        }
    });
    
    const handleSubmit = (val:z.infer<typeof ReportFormSchema>) => {
        console.log("submitted dewal:",val);
    }
    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                    <FormField control={form.control} name="subject" render={({ field })=>{
                        return <FormItem>
                            <FormLabel>Subject</FormLabel>
                            <FormControl>
                                <Input placeholder="subject" type="text" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    }} />
                </form>
                
            </Form>
        </div>
    )
}