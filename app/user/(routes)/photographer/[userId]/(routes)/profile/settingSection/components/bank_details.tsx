"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { useEffect } from "react";

const formSchema = z.object({
  username: z.string().min(2).max(50, {
    message: "Username must be at least 2 characters.",
  }),
});

const BankDetailsProps = [
  {
    name: "Bank Name",
    placeholder: "bank name",
  },
  {
    name: "Owner's Name",
    placeholder: "account holders name",
  },
  {
    name: "Branch Name",
    placeholder: "branch name",
  },
  {
    name: "Account No",
    placeholder: "account number",
  },
  {
    name: "Branch Code",
    placeholder: "branch code",
  },
];

const BankDetails = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  useEffect(() => {
    form.setValue("username", "test");
  }, []);

  return (
    <Card className="mx-8 md:w-[840px] w-[600px] mt-5">
      <CardHeader>
        <CardTitle>Bank Details</CardTitle>
        <CardDescription>
          Make changes to your profile here. Click save when you're done.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex grid flex-col gap-4 ">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-2 gap-4"
          >
            {BankDetailsProps.map((item, index) => {
              return (
                <FormField
                  key={index}
                  control={form.control}
                  name="username"
                  render={(field) => {
                    return (
                      <FormItem>
                        <div className="grid grid-cols-2">
                          <FormLabel>{item.name}</FormLabel>
                          <FormControl className="align-middle">
                            <Input
                              placeholder={item.placeholder}
                              {...field}
                              className="w-[100%] h-auto"
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
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

