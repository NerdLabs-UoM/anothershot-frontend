"use client";

import * as z from "zod";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Settings, PenSquare } from "lucide-react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

const formSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters long",
    })
    .max(50),
  description: z
    .string()
    .min(2, { message: "Description must be least 2 characters long" })
    .max(500),
});

const Hero = () => {

  const session = useSession();
  const { userId } = useParams();
  const [sessionId, setSessionId] = useState<string | null>(null);
  useEffect(() => {
    if (session.data) {
      setSessionId(session.data.user.id);
    }
  }, [session]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  const [values, setValues] = useState({
    name: "Photographer name",
    description:
      "A website that enthusiast can search and find good photographers to hire with image feed like piterest",
  });
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setValues({ name: values.username, description: values.description });
  };

  const handleCreateChat = async () => {

    const newChat = {
      senderId: sessionId,
      receiverId: userId,
    };

    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/chat/create`, newChat);
      console.log(res);
      if (res.data.error) {
        toast.error(res.data.error);
      }
      if (res.status === 201) {
        toast.success("Chat created successfully");
        setTimeout(() => {
          window.location.href = `/user/client/${session.data?.user.id}/inbox`;
        }, 1000);
      }
    } catch (error: any) {
      if (error.response.data.error) {
        toast.error(error.response.data.error);
        setTimeout(() => {
          window.location.href = `/user/client/${session.data?.user.id}/inbox`;
        }, 1000);
      }
    }

  };

  const photographer: boolean = false;
  return (
    <div className="flex flex-row md:w-11/12 h-[400px] bg-cover bg-no-repeat bg-gradient-to-r from-violet-500 to-fuchsia-500  justify-between md:p-10 rounded-xl sm:px-24 md:h-[500px]">
      <div className="p-5 md:px-0">
        <div className="flex pt-10">
          <div>
            <Avatar className="w-20 h-20">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          {photographer && (
            <div className="px-2">
              <Dialog>
                <DialogTrigger>
                  <PenSquare className="w-[40px]" />
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                  </DialogHeader>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-8"
                    >
                      <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                              <Input
                                type="name"
                                placeholder="Kevin"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              This is your public display name.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Discription</FormLabel>
                            <FormControl>
                              <Input
                                type="description"
                                placeholder="Photographer"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              This is your bio description
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit">Submit</Button>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>

              <div className="text-xs font-bold md:text-lg pl-2">4.9</div>
            </div>
          )}
        </div>
        <div className="pt-5">
          <div className="text-2xl font-bold max-w-3/5 md:text-3xl">
            {values.name}
          </div>
          <div className="text-xs w-4/5 md:text-lg">{values.description}</div>
        </div>
      </div>
      <div className="flex flex-row align-middle p-0 gap-1">
        {photographer || (
          <>
            <Button className="rounded-3xl" onClick={() => handleCreateChat()}>
              Message
            </Button>
            <Button className="rounded-3xl" asChild>
              <Link href="/photographer/Bookings">Book Now</Link>
            </Button>
          </>
        )}
        {photographer && (
          <Link href="photographer/prfile/settings" className="pt-2 px-2">
            <Settings />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Hero;
