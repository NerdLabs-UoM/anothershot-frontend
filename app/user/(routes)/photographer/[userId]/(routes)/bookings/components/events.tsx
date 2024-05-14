"use client";
import {
  Form,
  FormField,
  FormItem,
  FormLabel, FormMessage,
  FormControl
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
  DialogFooter
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";
import React from "react";
import { PlusSquare } from "lucide-react";
import { Booking, Event } from "@/app/lib/types";
import { DateTimePickerForm } from "@/components/DateTimePickers/date-time-picker-form";

export interface EventFormProps {
  id?: string;
  name?: string;
  bookingId?: string;
  description?: string;
  start?: Date;
  setStartDate: React.Dispatch<React.SetStateAction<Date>>;
  end?: Date;
  setEndDate: React.Dispatch<React.SetStateAction<Date>>;
  eventItems: Event[];
  eventProp: React.Dispatch<React.SetStateAction<Event[]>>;
}

export const formSchema = z.object({
  name: z
    .string()
    .min(2, "Username must be between 2-50 characters long").max(50, "Username must be between 2-50 characters long"),
  description: z
    .string()
    .min(2, "Username must be between 2-100 characters long").max(100, "Username must be between 2-100 characters long"),
  start: z.date(),
  end: z.date()
});
export const Events: React.FC<EventFormProps> = ({ eventItems, eventProp, start, setStartDate, end, setEndDate }) => {
  const { data: session } = useSession();
  const [isNew, setIsNew] = useState<boolean>(false);
  const { userId } = useParams();
  const [booking, setBooking] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedBookingId, setSelectedBookingId] = useState<string>("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: ""
      // start: "",
      // end: "",
    }
  });

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/photographer/${userId}/clientBookings`
        );
        console.log(response);
        // const data = response.data.map((eventData: EventFormProps) => {
        //   if (eventData.start && eventData.end) {
        //     return {
        //       ...eventData,
        //       startDate: new Date(eventData.start),
        //       endDate: new Date(eventData.end)
        //     };
        //   } else {
        //     return eventData;
        //   }
        //   console.log(data.map);
        // });
        const data = response.data;
        setBooking(data);
        console.log(data);
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

  const onSubmit = async (values: z.infer<typeof formSchema>, e: any) => {
    try {
      setLoading(true);
      if (values) {
        console.log(values);
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/photographer/${userId}/event/create`,
          {
            name: values.name,
            bookingId: selectedBookingId,
            start: values.start,
            end: values.end,
            description: values.description,
          }
        );
        const data = response.data;
        console.log(data);
        // if (response.status !== 200) {
        //   console.error(`Server responded with status code ${response.status}`);
        //   toast.error("An error occurred. Please try again.");
        //   return;
        // }
        setLoading(false);
        const newEvent: Event = response.data;
        const newBooking: Booking = response.data;
        console.log("Response data:", newBooking);
        // if (booking.some((booking: Booking) => booking.id === newBooking.id)) {
        //   toast.error("Event already exists.");
        if (eventItems.some((eventItem: Event) => eventItem.id !== null
        )) {
          toast.error("Event already exists.");

        } else {
          eventProp(prevEventList => {
            const newList = [...prevEventList, newEvent];
            console.log("Updated event list:", newList);
            return newList;
          });
          toast.success("Event created successfully.");
        }
      }
    }
    catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  const handleBookingChange = (value: string) => {
    const selectedBooking = booking.find((bookings) => bookings.id === value);
    if (selectedBooking) {
      form.setValue("name", selectedBooking.subject);
    }
    setSelectedBookingId(value);

  };

  const handleDeleteEvent = async () => {
    if (!session?.user?.id) return;
    const data = {
      photographerId: session.user.id,
      eventId: eventProp.name
    };
    try {
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/photographer/${userId}/event/delete`, { data });
      eventProp(prevEventList => prevEventList.filter(eventItem => eventItem.id !== selectedBookingId));
      console.log(response.data);
      toast.success("Event deleted successfully");
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  const handleSaveChanges = async () => {
    if (!session?.user?.id) return;
    const data = {
      photographerId: session.user.id,
      name: form.getValues("name"),
      description: form.getValues("description"),
      start: form.getValues("start"),
      end: form.getValues("end"),
    };
    try {
      const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/photographer/${userId}/event/update`, data);
      const updatedEvent: Event = response.data;
      eventProp(prevEventList => prevEventList.map(eventItems => eventItems.id === updatedEvent.id ? updatedEvent : eventItems));
      console.log(response.data);
      toast.success("Event details updated successfully.");
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <main>
      <div className="w-full sm:pr-10">
        <Dialog>
          {renderEditButton()}
          <DialogContent className="max-w-[300px] sm:max-w-[450px] max-h-[700px] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="sm:mt-2 sm:mb-2 sm:text-2xl">Edit event Details</DialogTitle>
              <DialogDescription className="sm:mt-2 sm:mb-4">
                Make changes to your event details here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>

            <Button variant={"default"} size={"lg"} onClick={() => setIsNew(true)}><PlusSquare />Add New Event</Button>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSaveChanges)}>
                {isNew && (<FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-8 gap-3 mb-2 justify-center items-center ml-0 pl-0 ">
                      <FormLabel className="col-span-2 grid place-content-end">Bookings</FormLabel>
                      <Select onValueChange={(value: string) => handleBookingChange(value)}>
                        <FormControl className="col-span-6">
                          <SelectTrigger>
                            <SelectValue placeholder="Select a Booking" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
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
                  )} />)}
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
                          maxLength={50}
                          {...field} />
                      </FormControl>
                    </FormItem>
                  )} />
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
                          maxLength={100}
                          {...field} />
                      </FormControl>
                    </FormItem>
                  )} />
                <FormField
                  control={form.control}
                  name="start"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-8 gap-3 mb-2 justify-center items-center ">
                      <FormLabel className="col-span-2 grid place-content-end">Start Date</FormLabel>
                      <FormControl className="col-span-6">
                        {start && <DateTimePickerForm
                          setDate={setStartDate}
                          date={start} />
                          }
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                <FormField
                  control={form.control}
                  name="end"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-8 gap-3 mb-2 justify-center items-center ">
                      <FormLabel className="col-span-2 grid place-content-end">End Date</FormLabel>
                      {end && <DateTimePickerForm
                        setDate={setEndDate}
                        date={end} />}
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
                        )} />
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
                form.reset();
                setIsNew(false);
              }}>Cancel</Button>
              {!isNew && <Button onClick={() => (handleSaveChanges)}>
                Update
              </Button>}
              {isNew && <Button onClick={form.handleSubmit(onSubmit)}>
                Save
              </Button>}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </main>
  );
};


export default Events;