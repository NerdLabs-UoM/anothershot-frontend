"use client";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { set, useForm } from "react-hook-form";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { PlusSquare } from "lucide-react";

const formSchema = z.object({

  name: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters long",
    })
    .max(50),
  description: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters long",
    })
    .max(50),
  startDate: z.date(),
  endDate: z.date(),
  startTime: z.string(),
  endTime: z.string()

});

const forms = () => {
  const { data: session } = useSession()
  const [isNew, setIsNew] = useState<boolean>(false)
  const { userId } = useParams();
  const [event, setEvent] = useState<Event[]>([]);
  const today = new Date();
  const defaultDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      startDate: defaultDate,
      endDate: defaultDate,
      startTime: "HH:mm",
      endTime: "HH:mm",
    }
  });

  const renderEditButton = () => {
    if (session && session.user && session.user.id === userId) {
      return (
        <DialogTrigger className="flex justify-end items-end">
          <PlusSquare size={42} style={{ color: 'black' }} />
        </DialogTrigger>
      );
    }
    return null;
  };

  function handleDeleteEvent(): void {
    throw new Error('Function not implemented.')
  }

  function handleSaveChanges(): void {
    throw new Error('Function not implemented.')
  }
  function handleCreateEvent(): void {
    throw new Error('Function not implemented.')
  }
  function handleCancel(): void {
    setIsNew(false);
    // Reset the form fields
  }

  return (
    <main>
      <div className="w-full sm:pr-10">
        <Dialog>
          {renderEditButton()}
          <DialogContent className="max-w-[300px] sm:max-w-[420px]">
            <DialogHeader>
              <DialogTitle className="sm:mt-2 sm:mb-2 sm:text-2xl">Edit event Details</DialogTitle>
              <DialogDescription className="sm:mt-2 sm:mb-4">
                Make changes to your event details here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <Button variant={"default"} size={"lg"} onClick={() => setIsNew(true)}><PlusSquare />Add New Event</Button>
            <Form {...form} >
              <form onSubmit={form.handleSubmit(handleSaveChanges)}>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-8 gap-3 mb-2 justify-center items-center ml-0 pl-0 ">
                      <FormLabel className="col-span-2 grid place-content-end">Events</FormLabel>
                      <Select onValueChange={(value: string) => (value)}>
                        <FormControl className="col-span-6">
                          <SelectTrigger>
                            <SelectValue placeholder="Select a event" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent >
                          <SelectGroup>
                            {/* {event.map((eventItems) => (
                                                            // <SelectItem key={eventItems.id} value={eventItems.id}>
                                                            //     <SelectLabel>{eventItems.name}</SelectLabel>
                                                            // </SelectItem>
                                                        ))} */}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-8 gap-3 mb-2 justify-center items-center ">
                      <FormLabel className="col-span-2 grid place-content-end">Name</FormLabel>
                      <FormControl className="col-span-6">
                        <Input
                          type="name"
                          placeholder="event name"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-8 gap-3 mb-2 justify-center items-center ">
                      <FormLabel className="col-span-2 grid place-content-end">Description</FormLabel>
                      <FormControl className="col-span-6">
                        <Input
                          type="description"
                          placeholder="description"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-8 gap-3 mb-2 justify-center items-center ">
                      <FormLabel className="col-span-2 grid place-content-end">
                        Date
                      </FormLabel>
                      <FormControl className="col-span-3">
                        <Input type="startDate" placeholder="startDate" />
                      </FormControl>
                      <FormMessage />
                      <FormField
                        control={form.control}
                        name="endDate"
                        render={({ field }) => (
                          <FormItem className="col-span-3">
                            <FormControl className="w-full">
                              <Input type="end Date" placeholder="endDate" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </FormItem>
                  )} />
                <FormField
                  control={form.control}
                  name="startTime"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-8 gap-3 mb-2 justify-center items-center ">
                      <FormLabel className="col-span-2 grid place-content-end">
                        Time
                      </FormLabel>
                      <FormControl className="col-span-3">
                        <Input type="startTime" placeholder="startTime" />
                      </FormControl>
                      <FormMessage />
                      <FormField
                        control={form.control}
                        name="endTime"
                        render={({ field }) => (
                          <FormItem className="col-span-3">
                            <FormControl className="w-full">
                              <Input type="endTime" placeholder="endTime" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </FormItem>
                  )} />


              </form>
            </Form>
            <DialogFooter>
              {!isNew && (

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant={'destructive'}
                    >Delete</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        packages and remove your data from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => (handleDeleteEvent)}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

              )}
              <Button variant={"outline"} onClick={() => {
                form.reset()
                setIsNew(false)
              }}>Cancel</Button>
              {!isNew && <Button onClick={() => (handleSaveChanges)}>
                Update
              </Button>
              }
              {isNew && <Button onClick={() => (handleCreateEvent)}>
                Save
              </Button>}
            </DialogFooter>
          </DialogContent >
        </Dialog >
      </div >
    </main >
  );
};
export default forms;