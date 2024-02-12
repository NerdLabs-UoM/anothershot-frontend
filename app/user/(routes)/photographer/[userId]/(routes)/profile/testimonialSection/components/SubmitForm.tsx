"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { Component } from "react";
import {useSession} from "next-auth/react";
import { useParams } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

interface TestimonialsData {
  id: string;
  name: string;
  feedback: string;
  url: string;
  visibility: boolean;
}
interface SubmitFormProps {
  testimonialsData: TestimonialsData[];
  setTestimonialsData: React.Dispatch<React.SetStateAction<TestimonialsData[]>>;
}
const formSchema = z.object({
  feedback: z.string().min(100,"Give your feedback should be between 100-200 characters").max(200, "Give your feedback should be between 100-200 characters"),
  rate: z.enum(["Amazing", "Excellent", "Good", "Ordinary", "Bad"]),
});
const SubmitForm: React.FC<SubmitFormProps> = ({
  setTestimonialsData,
  testimonialsData,
}) => {
  const { userId } = useParams();
  const { data: session } = useSession();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      feedback: "",
      rate: "Excellent",
    },
  });
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    const newTestimonial = {
      id: uuidv4(),
      name: "New User",
      feedback: values.feedback,
      url: "/images/ellipse.png", 
      visibility: true,
    };
    setTestimonialsData((prevTestimonials) => [
      ...prevTestimonials,
      newTestimonial,
    ]);
    form.reset();
  };
  const renderForm = () => {
    if (session?.user?.id === userId) {
      return null;
    }
  return (<Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <FormField
        control={form.control}
        name="rate"
        render={({ field }) => (
          <FormItem className="flex flex-col items-start ml-0 sm:ml-20 sm:flex-row sm:items-center md:ml-0">
            <FormLabel className="font-medium text-sm mr-[30px] inline-flex">
              Rate your Experience
            </FormLabel>
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
          <FormItem className="flex flex-col ml-0 sm:ml-20 md:ml-0">
            <FormLabel className="font-medium text-sm">Feedback</FormLabel>
            <FormControl>
              <Textarea
                className="h-[80px] w-[346px] sm:w-[537px] md:w-[689px] resize-none"
                placeholder="Type your feedback here"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button
        type="submit"
        className="ml-0 sm:ml-20 h-9 w-[346px] sm:h-11 sm:w-[537px] md:w-[530px]"
      >
        Submit
      </Button>
    </form>
  </Form>)
  };
  return (
    <div className="w-[340px] sm:w-[689px]">
      {renderForm()}
    </div>
  );
};

export default SubmitForm;
