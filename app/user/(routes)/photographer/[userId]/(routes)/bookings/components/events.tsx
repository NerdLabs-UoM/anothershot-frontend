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
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";
import React from "react";
import { PenSquare, PlusSquare } from "lucide-react";
import { Booking, Event } from "@/app/lib/types";
import { DateTimePickerForm } from "@/components/DateTimePickers/date-time-picker-form";
import { NotificationService } from "@/components/notification/notification";
import { BiSolidPlusSquare } from "react-icons/bi";
import FloatingAddButton from "./floatingAddButton";


export interface EventFormProps {
  id?: string;
  title?: string;
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
  id: z.string(),
  bookingId: z.string(),
  title: z
    .string()
    .min(2, "eventName must be at least 2 characters long").max(50, "Username must be between 2-50 characters long"),
  description: z
    .string()
    .min(2, "eventName must be at least 2 characters long").max(100, "Username must be between 2-100 characters long"),
  start: z.date(),
  end: z.date()
});

export const Events: React.FC<EventFormProps> = ({ eventItems, eventProp, start, setStartDate, end, setEndDate }) => {
  const { data: session } = useSession();
  const [isNew, setIsNew] = useState<boolean>(false);
  const [isOld, setIsOld] = useState<boolean>(true);
  const { userId } = useParams();
  const [booking, setBooking] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedBookingId, setSelectedBookingId] = useState<string>("");
  const [selectedEventId, setSelectedEventId] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const defaultStartDate = new Date();
    const defaultEndDate = new Date();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      bookingId: "",
      title: "",
      description: "",
      start: defaultStartDate,
      end: defaultEndDate
    }
  });

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/photographer/${userId}/clientBookings`
        );
        const data = response.data;
        setBooking(data);
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
          <BiSolidPlusSquare className="hidden sm:inline-block" size={50} />

        </DialogTrigger>
      );
    }
    return null;
  };
  const handleAddEvent = () => {
    setIsDialogOpen(true); 
};

  const onSubmit = async (values: z.infer<typeof formSchema>, e: any) => {
    const startObject = start ? new Date(start) : new Date();
    const endObject = end ? new Date(end) : new Date();

    // startObject.setHours(startObject.getHours() + 5);
    // startObject.setMinutes(startObject.getMinutes() + 30);

    // endObject.setHours(endObject.getHours() + 5);
    // endObject.setMinutes(endObject.getMinutes() + 30);

    const startString = startObject.toISOString();
    const endString = endObject.toISOString();

    const startOnly = startObject.toISOString().split('T')[0];
    const endOnly = endObject.toISOString().split('T')[0];
    const defaultStartOnly = defaultStartDate.toISOString().split('T')[0];
    const defaultEndOnly = defaultEndDate.toISOString().split('T')[0];

    if (startOnly === defaultStartOnly) {
      toast.error("Please select a start date & end date");
      return;
    }
    if (endOnly === defaultEndOnly) {
      toast.error("Please select a end date & time");
      return;
    }
    try {
      setLoading(true);
      if (values) {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/photographer/${userId}/event/create`,
          {
            bookingId: selectedBookingId,
            title: values.title,
            description: values.description,
            start: startString,
            end: endString,
          }
        );
        const data = response.data;
        setLoading(false);
        const newEvent: Event = response.data;
        const newBooking: Booking = response.data;
        if (eventItems.some((eventItem: Event) => eventItem.bookingId === newEvent.bookingId
        )) {
          toast.error("Event already exists.");
        } else {
          eventProp(prevEventList => {
            const newList = [...prevEventList, newEvent];
            return newList;
          });
          toast.success("Event created successfully.");
        }
      }
      NotificationService({
        senderId: session?.user?.id, // Assuming the user who booked is the sender
        receiverId: session?.user.id, // Assuming the user who booked is the receiver
        type: 'Event_Created',
        title: 'Event created successfully',
        description: '',
      });
    }
    catch (error) {
      toast.error("This booking already has an event");
    }
  };

  const handleBookingChange = (value: string) => {
    const selectedBooking = booking.find((bookings) => bookings.id === value);
    if (selectedBooking) {
      form.setValue("title", selectedBooking.subject);
    }
    setSelectedBookingId(value);
  };

  const handleEventChange = (value: string) => {
    const selectedEvent = eventItems.find((events) => events.id === value);
    if (selectedEvent) {
      form.setValue("title", selectedEvent.title);
    }
    setSelectedEventId(value);

  };

  const handleSaveChanges = async (values: z.infer<typeof formSchema>, e: any) => {

    const startObject = start ? new Date(start) : new Date();
    const endObject = end ? new Date(end) : new Date();
    // startObject.setHours(startObject.getHours() + 5);
    // startObject.setMinutes(startObject.getMinutes() + 30);
    // endObject.setHours(endObject.getHours() + 5);
    // endObject.setMinutes(endObject.getMinutes() + 30);
    const startString = startObject.toISOString();
    const endString = endObject.toISOString();
    const startOnly = startObject.toISOString().split('T')[0];
    const endOnly = endObject.toISOString().split('T')[0];
    const defaultStartOnly = defaultStartDate.toISOString().split('T')[0];
    const defaultEndOnly = defaultEndDate.toISOString().split('T')[0];
    if (startOnly === defaultStartOnly) {
      toast.error("Please select a start date & time");
      return;
    }
    if (endOnly === defaultEndOnly) {
      toast.error("Please select a end date & time");
      return;
    }
    if (!selectedEventId) {
      toast.error("Please select an event to update");
      return;
    }

    try {
      const data = {
        eventId: selectedEventId,
        title: values.title,
        description: values.description,
        start: startString,
        end: endString
      };

      const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/photographer/${selectedEventId}/event/update`, data);
      const updatedEvent: Event = response.data;
      eventProp(prevEventList => prevEventList.map(eventItems => eventItems.id === selectedEventId ? updatedEvent : eventItems));
      NotificationService({
        senderId: session?.user?.id,
        receiverId: session?.user.id,
        type: 'Event_Updated',
        title: 'Event Updated successfully',
        description: '',
      });
      toast.success("Event details updated successfully.");
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  const handleDeleteEvent = async () => {
    const data = {
      id: selectedEventId
    };
    try {
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/photographer/${userId}/event/delete`, { data });
      eventProp(prevEventList => prevEventList.filter(eventItem => eventItem.id !== selectedEventId));
      toast.success("Event deleted successfully");
      NotificationService({
        senderId: session?.user?.id,
        receiverId: userId as string,
        type: 'Event_Deleted',
        title: 'Event deleted successfully',
        description: '',
      });
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <main>
      <div className="w-full sm:pr-10">
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) {
            setIsNew(false);
            form.reset();
          }
        }}>
          {renderEditButton()}
          <FloatingAddButton onClick={handleAddEvent} setIsDialogOpen={setIsDialogOpen} />


          <DialogContent className="max-w-[400px] sm:max-w-[430px] max-h-[700px] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="sm:mt-2 sm:mb-2 sm:text-2xl">Edit event Details</DialogTitle>
              <DialogDescription className="sm:mt-2 sm:mb-4">
                Make changes to your event details here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>

            <Button variant={"default"} size={"lg"} onClick={() => { setIsNew(!isNew); }}>
              {isNew ? (
                <>
                  <PenSquare className="mr-2"/> Update Events
                </>
              ) : (
                <>
                  <PlusSquare className="mr-2"/> Add New Event
                </>
              )}
            </Button>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSaveChanges)}>
                {isNew && (<FormField
                  control={form.control}
                  name="title"
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
                    </FormItem>
                  )} />)}
                {!isNew && (<FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-8 gap-3 mb-2 justify-center items-center ">
                      <FormLabel className="col-span-2 grid place-content-end">Events</FormLabel>
                      <Select onValueChange={(value: string) => handleEventChange(value)}>
                        <FormControl className="col-span-6">
                          <SelectTrigger>
                            <SelectValue placeholder="Select an Event" />
                          </SelectTrigger>
                        </FormControl>
                        <FormMessage className="col-span-8"/>
                        <SelectContent >
                          <SelectGroup>
                            {eventItems.map((events) => (
                              <SelectItem key={events.id} value={events.id}>
                                <SelectLabel>{events.title}</SelectLabel>
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />)}
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-8 gap-3 mb-2 justify-center items-center ">
                      <FormLabel className="col-span-2 grid place-content-end">Name</FormLabel>
                      <FormControl className="col-span-6">
                        <Input
                          type="title"
                          placeholder="  Event name"
                          maxLength={50}
                          {...field}
                          size={15} />
                      </FormControl>
                      <FormMessage className="col-span-8" />
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
                          placeholder="  Description"
                          maxLength={100}
                          {...field}
                          size={50} />
                      </FormControl>
                      <FormMessage className="col-span-8"/>
                    </FormItem>
                  )} />
                <FormField
                  control={form.control}
                  name="start"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-8 gap-3 mb-2 items-center">
                      <FormLabel className="col-span-2 grid place-content-end w-3/4 sm:w-full">StartDate</FormLabel>
                      <div className="col-span-6 ">
                        {start && <DateTimePickerForm
                          setDate={setStartDate}
                          date={start} />
                        }
                      </div>
                      <FormMessage className="col-span-8"/>
                    </FormItem>
                  )} />
                <FormField
                  control={form.control}
                  name="end"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-8 gap-3 mb-2 items-center">
                      <FormLabel className="col-span-2 grid place-content-end w-3/4 sm:w-full ">EndDate</FormLabel>
                      <div className="col-span-6 ">
                        {end && <DateTimePickerForm
                          setDate={setEndDate}
                          date={end} />
                        }
                      </div>
                      <FormMessage className="col-span-8"/>
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
                        Events and remove your data from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => (handleDeleteEvent())}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
              <Button variant={"outline"} onClick={() => {
                form.reset();
              }}>Reset</Button>
              {!isNew && <Button onClick={form.handleSubmit(handleSaveChanges)}>
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