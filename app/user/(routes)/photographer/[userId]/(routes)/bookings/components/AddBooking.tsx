"use client";

import React, { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { BiSolidPlusSquare } from "react-icons/bi";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
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
import { Input } from "@/components/ui/input"
import axios from 'axios';
import { useParams, useRouter } from "next/navigation";
import { useSession } from 'next-auth/react';
import { Package } from "@/app/lib/types";
import { Photographer } from "@/app/lib/types";
import toast from 'react-hot-toast';
import { DateTimePickerForm } from "@/components/DateTimePickers/date-time-picker-form";
import { NotificationService } from '@/components/notification/notification';

const formSchema = z.object({
    eventName: z.string().min(2, "Event name should be between 5-50 characters").max(50, "Event name should be between 2-50 characters"),
    eventLocation: z.string(),
    sdate: z.date(),
    edate: z.date(),
    eventType: z.string({ required_error: "Event type is required." }),
    package: z.string({ required_error: "Package is required." }),

});

const AddBooking = () => {
    const { userId } = useParams();
    const { data: session } = useSession();
    const [isOpened, setIsOpened] = React.useState(false);
    const [photographer, setPhotographer] = React.useState<Photographer[]>([]);
    const [packages, setPackages] = React.useState<Package[]>([]);
    const [loading, setLoading] = React.useState(false);

    const defaultStartDate = new Date();
    defaultStartDate.setHours(defaultStartDate.getHours() + 5);
    defaultStartDate.setMinutes(defaultStartDate.getMinutes() + 30);

    const defaultEndDate = new Date();
    defaultEndDate.setHours(defaultEndDate.getHours() + 5);
    defaultEndDate.setMinutes(defaultEndDate.getMinutes() + 30);
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            eventName: "",
            eventLocation: "",
            sdate: defaultStartDate,
            edate: defaultEndDate,
        },
    });
    const [startDate, setStartDate] = React.useState<Date>(new Date());
    const [endDate, setEndDate] = React.useState<Date>(new Date());
    const router = useRouter();

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/photographer/${userId}/bookingsPackage`);
                setPackages(response.data);
            } catch (error: any) {
                toast.error('Error fetching packages:', error);
            }
        };
        fetchPackages();
    }, [userId]);

    useEffect(() => {
        const fetchPhotographer = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/photographer/${userId}/bookingsCategory`);
                setPhotographer(response.data);
            } catch (error: any) {
                toast.error('Error fetching photographer:', error);
            }
        };
        fetchPhotographer();
    }, [userId]);

    const photographerId = userId as string;

    const onSubmit = async (values: z.infer<typeof formSchema>, e: any) => {

        if (session === null) {
            toast.error('You must be logged in to request bookings');
            return;
        }

        const startDateObject = startDate ? new Date(startDate) : new Date();
        const endDateObject = endDate ? new Date(endDate) : new Date();

        startDateObject.setHours(startDateObject.getHours() + 5);
        startDateObject.setMinutes(startDateObject.getMinutes() + 30);

        endDateObject.setHours(endDateObject.getHours() + 5);
        endDateObject.setMinutes(endDateObject.getMinutes() + 30);

        const sdateString = startDateObject.toISOString();
        const edateString = endDateObject.toISOString();

        const startDateOnly = startDateObject.toISOString().split('T')[0];
        const defaultStartDateOnly = defaultStartDate.toISOString().split('T')[0];
        
        if (startDateOnly === defaultStartDateOnly) {
            toast.error("Please select a start date.");
            return;
        }
        
        const endDateOnly = endDateObject.toISOString().split('T')[0];
        const defaultEndDateOnly = defaultEndDate.toISOString().split('T')[0];
        
        if (endDateOnly === defaultEndDateOnly) {
            toast.error("Please select an end date.");
            return;
        }

        setLoading(true);
        try {
            if (values) {
                const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/photographer/${userId}/clientBooking`, {
                    clientId: session?.user?.id,
                    photographerId: userId,
                    eventName: values.eventName,
                    eventLocation: values.eventLocation,
                    start: sdateString,
                    end: edateString,
                    category: values.eventType,
                    packageId: values.package,
                });

                if (response.status === 201) {
                    setLoading(false);
                    toast.success("Booking request sent successfully!");
                }
            }
            NotificationService({
                senderId: session?.user?.id,
                receiverId: photographerId,
                type: "bookingP",
                title: "has requested a booking ( to " + startDateOnly + " )",
                description: ""
            });
            NotificationService({
                senderId: photographerId,
                receiverId: session?.user?.id,
                type: "bookingPC",
                title: "has received the request",
                description: "Your booking request is received. It is under review. You will be notified once it is accepted."
            });
        } catch (error) {
            setLoading(false);
            toast.error("Error booking requesting");
        } finally {
            setLoading(false);
        }
        setIsOpened(false);
        form.reset();
        setStartDate(new Date());
        setEndDate(new Date());
        router.push(`/user/client/${session?.user.id}/bookings`)
    };
    const categories = photographer?.map((photographerItem: Photographer) => photographerItem.category);

    const eventMenuStyle = {
        maxHeight: categories && categories.length > 4 ? '100px' : 'auto',
    };

    const packageMenuStyle = {
        maxHeight: packages && packages.length > 4 ? '100px' : 'auto',
    };

    return (
        <div className='flex justify-center mt-3'>
            {session?.user.userRole === 'CLIENT' && (
                <Dialog open={isOpened} onOpenChange={setIsOpened}>
                    <DialogTrigger>
                        <BiSolidPlusSquare size={50} />
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add Booking</DialogTitle>
                            <DialogDescription>
                                Check the availability of the photographer before booking.
                            </DialogDescription>
                        </DialogHeader>

                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 text-xs">
                                <FormField
                                    control={form.control}
                                    name="eventName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Event Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Event Name" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="eventLocation"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Location*</FormLabel>
                                            <FormControl>
                                                <Input placeholder="eg:- Light House, Galle (optional)" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="sdate"
                                    render={({ field }) => (
                                        <FormItem className='flex flex-col'>
                                            <FormLabel>Start</FormLabel>
                                            <DateTimePickerForm
                                                setDate={setStartDate}
                                                date={startDate}
                                            />
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="edate"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>End</FormLabel>
                                            <DateTimePickerForm
                                                setDate={setEndDate}
                                                date={endDate}
                                            />
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="eventType"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Event Type</FormLabel>
                                            <Select onValueChange={field.onChange}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select the event type" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent className=' overflow-y-auto' style={eventMenuStyle} >
                                                    <SelectGroup>
                                                        {categories?.map((cat: string[]) => (
                                                            cat.map((item: string, index: number) => (
                                                                <SelectItem key={index} value={item}>
                                                                    {item}
                                                                </SelectItem>
                                                            ))
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
                                    name="package"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Packages</FormLabel>
                                            <Select onValueChange={field.onChange}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a package" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent className='overflow-y-auto' style={packageMenuStyle}>
                                                    <SelectGroup>
                                                        {packages.map((packageItem) => (
                                                            <SelectItem key={packageItem.id} value={packageItem.id}>
                                                                {packageItem.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button>Request</Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This action cannot be undone. You can't change the booking again.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction onClick={form.handleSubmit(onSubmit)}>Continue</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>

                            </form>
                        </Form>

                    </DialogContent>

                </Dialog>
            )}
        </div>
    );
};


export default AddBooking;