"use client";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";
import React from "react";
import { PlusSquare } from "lucide-react";
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { cn } from "@/app/lib/utils"
import { Booking, Event } from "@/app/lib/types";


interface EventFormProps {
  id?: string;
  name?: string;
  bookingId?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  start?: string;
  end?: string;
  eventItems: Event[];
  eventProp: React.Dispatch<React.SetStateAction<Event[]>>;
}

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
  start: z.string(),
  end: z.string()
});

const Events: React.FC<EventFormProps> = ({ eventItems, eventProp }) => {
  const { data: session } = useSession()
  const [isNew, setIsNew] = useState<boolean>(false)
  const { userId } = useParams();
  const [booking, setBooking] = useState<Booking[]>([]);

  const today = new Date();
  const defaultDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",

      startDate: defaultDate,
      endDate: defaultDate,
      start: "HH:mm",
      end: "HH:mm",
    }
  });

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/photographer/${userId}/clientBookings`
        );
        const data = response.data;
        setBooking(data)
        console.log(response.data);
      } catch (error) {
        toast.error("Cannot fetch Bookings.Please try again.");
      }
    };
    fetchBookings();
  }, [userId]);

  const renderEditButton = () => {
    if (session && session.user && session.user.id === userId) {
      return (
        <DialogTrigger className="flex justify-center items-center">
          <PlusSquare size={42} style={{ color: 'black' }} />
        </DialogTrigger>
      );
    }
    return null;
  };

  const handleDeleteEvent = async () => {
    if (!session?.user?.id) return;
    const data = {
      photographerId: session.user.id,
      name: form.getValues("name"),
      description: form.getValues("description"),
      startDate: form.getValues("startDate"),
      endDate: form.getValues("endDate"),
      start: form.getValues("start"),
      end: form.getValues("end"),
    };
    try {
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/photographer/${userId}/event/create`, { data });
      const newEvent: Event = response.data
      console.log(response.data);
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };
  //   const handleBookingChange = (value: string) => {
  //     const selectedBooking = event.find((bookingItems) => bookingItems.id === value)
  //     if (selectedBooking) {

  //     }
  //     setSelectedBookingId(value);
  // }
  const handleSaveChanges = async () => {
    if (!session?.user?.id) return;
    const data = {
      photographerId: session.user.id,
      name: form.getValues("name"),
      description: form.getValues("description"),
      startDate: form.getValues("startDate"),
      endDate: form.getValues("endDate"),
      start: form.getValues("start"),
      end: form.getValues("end"),
    };
    try {
      const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/photographer/${userId}/event/update`, data);
      const newEvent: Event = response.data
      console.log(response.data);
      toast.success("Event details updated successfully.")

    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };
  const handleCreateEvent = async () => {
    if (!session?.user?.id) return;
    const data = {
      photographerId: session.user.id,
      name: form.getValues("name"),
      description: form.getValues("description"),
      startDate: form.getValues("startDate"),
      endDate: form.getValues("endDate"),
      start: form.getValues("start"),
      end: form.getValues("end"),
    };
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/photographer/${userId}/event/create`, data);
      const newEvent: Event = response.data
      console.log(response.data);
      if (eventItems.some((event: Event) => event.name === newEvent.name)) {
        toast.error("event already exists.");
      } else {
        (event: Event) => [...eventItems, newEvent];
        toast.success("event created successfully.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <main>
      <div className="w-full sm:pr-10">
        <Dialog>
          {renderEditButton()}
          <DialogContent className="max-w-[300px] sm:max-w-[450px]">
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
                      <FormLabel className="col-span-2 grid place-content-end">Bookings</FormLabel>
                      <Select onValueChange={(value: string) => (value)}>
                        <FormControl className="col-span-6">
                          <SelectTrigger>
                            <SelectValue placeholder="Select a Booking" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent >
                          <SelectGroup>
                            {booking.map((bookings) => (
                              <SelectItem key={bookings.id} value={bookings.id}>
                                <SelectLabel>{bookings.subject}</SelectLabel>
                              </SelectItem>
                            ))}
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
                      <FormLabel className="col-span-2 grid place-content-end">Start Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl className="col-span-6">
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[296px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            // disabled={(date) =>
                            //   date > new Date() || date < new Date("1900-01-01")
                            // }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      {/* <FormDescription>
                        Enter the event start date
                      </FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  )} />
                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-8 gap-3 mb-2 justify-center items-center ">
                      <FormLabel className="col-span-2 grid place-content-end">End Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl className="col-span-6">
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[296px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            // disabled={(date) =>
                            //   date > new Date() || date < new Date("1900-01-01")
                            // }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      {/* <FormDescription>
                        Enter the event end date
                      </FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  )} />
                <FormField
                  control={form.control}
                  name="start"
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
                        name="end"
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
export default Events;