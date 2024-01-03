"use client";

import {Form,FormField, FormItem, FormLabel, FormMessage, FormControl,FormDescription,} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Youtube } from "lucide-react";

const formSchema = z.object({
  ContactNumber: z.string().min(10).max(10),
  Address: z.string(),
  Instagram: z.string(),
  Facebook: z.string(),
  Youtube: z.string(),
  TikTok: z.string(),
});

export default function ContactForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ContactNumber: "",
      Address: "",
      Instagram: "",
      Facebook: "",
      Youtube: "",
      TikTok: "",
    },
  });
  const handleSubmit = () => {};

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <main className="flex min-h-screen flex-col ite justify-between p-36  gap-6 ">
      <div className="mx-500">
        <h1 className="font-bold text-color-black text-2xl">
          Edit Contacts
        </h1>
        <span>Make changes to your profile. Click save when you're done. </span>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className=" w-1/2 gap-6 p-4  gap-6  mt-6  justify-center  align-items-center  ml-100 "
        >
          <FormField
            control={form.control}
            name="ContactNumber"
            render={({ field }) => (
              <FormItem className="mt-0 ">
                <FormLabel>ContactNumber</FormLabel>
                <div className="flex grid-row-1 ">
                  <FormControl>
                    <Input
                      className="w-50"
                      placeholder="+94712469756"
                      {...field}
                    />
                  </FormControl>
                  <FormControl>
                    <Input
                      className="w-50 "
                      placeholder="+94712247894"
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="Address"
            render={({ field }) => (
              <FormItem className="mt-6 h-12">
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Address Line1   Address Line2    Address Line3"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="Instagram"
            render={({ field }) => (
              <FormItem className="mt-6">
                <FormLabel>Instagram</FormLabel>
                <FormControl>
                  <Input placeholder="Insta Url" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="Facebook"
            render={({ field }) => (
              <FormItem className="mt-6">
                <FormLabel>Facebook</FormLabel>
                <FormControl>
                  <Input placeholder="FB Url" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="Youtube"
            render={({ field }) => (
              <FormItem className="mt-6">
                <FormLabel>Youtube</FormLabel>
                <FormControl>
                  <Input placeholder="YT Url" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="TikTok"
            render={({ field }) => (
              <FormItem className="mt-6">
                <FormLabel>TikTok</FormLabel>
                <FormControl>
                  <Input placeholder="TikTok Url" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-2/3  ml-50   mt-10"
          >
            Save Changes
          </Button>
        </form>
      </Form>
    </main>
  );
}
