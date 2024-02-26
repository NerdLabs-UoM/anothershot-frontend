"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
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
import React, { Component } from "react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { toast } from "react-hot-toast";


const formSchema = z.object({
  review: z.string().min(100, "Give your feedback should be between 100-200 characters").max(200, "Give your feedback should be between 100-200 characters"),
  rating: z.number(),
});
const SubmitForm: React.FC = ({
}) => {
  const [selectedRating, setSelectedRating] = React.useState<number | 0 >(0);
  const { userId } = useParams();
  const { data: session } = useSession();
  const [loading, setLoading] = React.useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      review: "",
      rating: 0,
    },
  });
  const handleStarClick = (ratingValue: number) => {
    setSelectedRating(ratingValue);
  };
  const onSubmit = async (values: z.infer<typeof formSchema>, e:any) => {
    try {
      setLoading(true);
      if (values) {
        const response = await axios.post(`http://localhost:8000/api/user/photographer/${userId}/profile/testimonial`, {
          review: values.review,
          rating: selectedRating,
          clientId: session?.user?.id,
          photographerId:userId,
        });
        if (response.status === 200) {
          setLoading(false);
          e.target.reset();
          toast.success("Thank you for your feedback");
        }
      }
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong");
    }finally{
      setLoading(false);
    }
    form.reset();
    setSelectedRating(0);
  };

  const renderForm = () => {
    if (session?.user?.id === userId) {
      return null;
    }
    return (<Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start ml-0 sm:ml-20 sm:flex-row sm:items-center md:ml-0">
              <FormLabel className="font-medium text-sm mr-[30px] inline-flex">
                Rate your Experience
              </FormLabel>
              <FormControl>
                <div className="flex items-cente">
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      className={`w-4 h-4 ${selectedRating && index < selectedRating
                        ? "text-yellow-300"
                        : "text-gray-300"
                        } ms-1 cursor-pointer`}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                      onClick={() => handleStarClick(index + 1)}
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="review"
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
