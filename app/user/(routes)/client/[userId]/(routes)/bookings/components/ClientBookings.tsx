"use client";

import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import ViewOffer from "../offers/viewOffer"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
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
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { View, Check } from "lucide-react";
import { Booking } from "@/app/lib/types";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { NotificationService } from '@/components/notification/notification';

const ClientBookings = () => {
  const { userId } = useParams();
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isOpened, setIsOpened] = useState(false);
  const [openedBookingId, setOpenedBookingId] = useState<string | null>(null);

  const formatCategory = (category: string): string => {
    return category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
  };
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/client/${userId}/clientBookings`);

        const bookingsWithDateObjects = response.data.map((booking: Booking) => {
          if (booking.start && booking.end) {
            const startDate = new Date(booking.start);
            startDate.setHours(startDate.getHours() - 5);
            startDate.setMinutes(startDate.getMinutes() - 30);
            const startDateString = startDate.toLocaleString('en-US', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              hour12: false,
            });
              const endDate = new Date(booking.end);
              endDate.setHours(endDate.getHours() - 5);
              endDate.setMinutes(endDate.getMinutes() - 30);
              const endDateString = endDate.toLocaleString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false,
              });
            return {
              ...booking,
              start: startDateString,
              end: endDateString,
            };
          } else {
            return booking;
          }
        });
        setBookings(bookingsWithDateObjects);

      } catch (error: any) {
        toast.error("Error fetching bookings", error);
      }
      setIsLoading(false);
    };
    fetchBookings();
  }, [userId]);

  const handleRedirect = (photographerId: string) => {
    toast('Redirecting to photographer booikings');
    router.push(`/user/photographer/${photographerId}/bookings`);
  };

  const handleClick = () => {
    router.push(`/user/client/${userId}/bookings/checkout`);
  };

  const handleCancel = async (bookingId: string, clientId: string) => {
    try {
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/client/${clientId}/deleteBooking`, {
        data: {
          bookingId: bookingId,
        },
      });
      if (response.status === 200) {
        toast.success("Booking has been cancelled");
        setBookings((prevBookings) => prevBookings.filter((booking) => booking.id !== bookingId));
      }
      NotificationService({
        senderId: clientId,
        receiverId: bookings.find((booking) => booking.id === bookingId)?.photographer.userId,
        type: "bookingC",
        title: "has cancelled the booking (" + bookings.find((booking) => booking.id === bookingId)?.subject + ")",
        description: ""
      });
    } catch (error: any) {
      toast.error("Error cancelling booking", error);
    }
  }

  return (

    <div className="flex flex-col items-center w-11/12 lg:w-2/3 h-screen lg:h-[550px]">
      <div className="my-5 bg-slate-100 w-1/3 flex justify-center py-2 rounded-md">
        <h3 className="font-semibold text-sm sm:text-base">Bookings</h3>
      </div>
      <Separator className="mb-2 h-0.5" />
      {isLoading ? (
        <div className="grid grid-cols-1 gap-y-4">
          {[...Array(2)].map((_, index) => (
            <Skeleton key={index} className="h-[150px] w-[200px] md:h-[200px] md:w-[400px] rounded-xl" />
          ))}
        </div>) : (
          bookings.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p>No bookings made yet.</p>
            </div>
          ) : (
            <div className="lg:w-2/3 w-auto min-w-full">
              <ScrollArea className="h-[512px] lg:h-[450px] p-4">
                <div className="grid grid-cols-1 mx-0 md:mx-12 xl:mx-24">
                  {bookings.map((booking) => (
                    <Card key={booking.id} className="m-2 px-2 border-t border-slate-50 shadow-inner drop-shadow-lg hover:bg-slate-50">
                      <CardHeader className="pb-1">
                        <CardTitle className="flex justify-between text-base sm:text-lg">{booking.subject}
                          <Dialog open={isOpened} onOpenChange={setIsOpened}>
                            <DialogTrigger onClick={() => {
                              setOpenedBookingId(booking.id);
                              setIsOpened(true);
                            }}>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger><View className="w-4 h-4 sm:w-5 sm:h-5" /></TooltipTrigger>
                                  <TooltipContent>
                                    <p>View</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </DialogTrigger>
                            {openedBookingId && (
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Booking Details</DialogTitle>
                                  <DialogDescription>
                                    View details of the booking you made.
                                  </DialogDescription>
                                </DialogHeader>
                                {bookings.map((booking) => (
                                  booking.id === openedBookingId && (
                                    <div key={booking.id} className="flex items-center gap-10 text-sm sm:text-base">
                                      <Avatar className="w-20 h-20 border-2 border-slate-300 cursor-pointer hover:scale-90 transform transition duration-500" onClick={() => handleRedirect(booking.photographer.userId)}>
                                        <AvatarImage
                                          src={booking.photographer.user.image ?? "https://res.cloudinary.com/dcyqrcuf3/image/upload/v1711878461/defaultImages/default-profile-image_grcgcd.png"}
                                          alt="@shadcn"
                                        />
                                      </Avatar>
                                      <div>
                                        <p><b>Event Name :</b> {booking.subject}</p>
                                        <p><b>Photographer :</b> {booking.photographer.name}</p>
                                        {booking.location !== '' ? (
                                          <p><b>Location :</b> {booking.location}</p>
                                        ) : (
                                          <p className="text-slate-500"><b>Location :</b> No location specified</p>
                                        )}

                                        {booking.package ? (
                                          <p><b>Package :</b> {booking.package.name}</p>
                                        ) : (
                                          <p className="text-slate-500"><b>Package :</b> Selected package not available</p>
                                        )}
                                        <p><b>Start :</b> {booking.start ? booking.start.toLocaleString() : ''}</p>
                                        <p><b>End :</b> {booking.end ? booking.end.toLocaleString() : ''}</p>
                                      </div>
                                    </div>
                                  )
                                ))}
                                <DialogFooter>
                                  <Button onClick={() => setIsOpened(false)}>Close</Button>
                                </DialogFooter>
                              </DialogContent>
                            )}
                          </Dialog>
                        </CardTitle>
                        <CardDescription className="text-xs sm:text-base">{formatCategory(booking.category)}</CardDescription>
                      </CardHeader>
                      <Separator className="mb-6 sm:mb-8 md:mb-10 " />
                      <CardContent>
                        <div className="flex flex-col sm:flex-row sm:justify-between">
                          <div className="flex flex-col text-xs sm:text-sm">
                            <p>Date: {booking.start ? booking.start.toLocaleString().split(',')[0] : ''}</p>
                            {booking.status === "CONFIRMED" || booking.status === "COMPLETED" ? (
                              <p className="font-semibold text-slate-600">Total cost: {booking.offer?.price} Rs</p>
                            ) : booking.status === "CANCELLED" ? (
                              <p className="font-medium text-red-500">Booking has been cancelled</p>
                            ) : (
                              <p className="font-medium text-red-500">! In review</p>
                            )}
                          </div>
                          <div className="flex items-center gap-1 mt-2 sm:mt-0">
                            <div>
                              {booking.status === "CONFIRMED" ? (
                                <ViewOffer bookingId={booking.id} />
                              ) : booking.status === "COMPLETED" ? (
                                <Button disabled className="inline-flex items-center px-4 h-auto border border-transparent rounded-md font-semibold sm:text-sm text-xs text-white bg-green-500"><Check className="w-3 h-3 mr-1" strokeWidth={3} />Paid</Button>
                              ) : <ViewOffer bookingId={booking.id} />}
                            </div>
                            <AlertDialog>
                              <AlertDialogTrigger>
                                <div>
                                  {booking.status === "CONFIRMED" || booking.status === 'PENDING' ? (
                                    <Button className="inline-flex items-center px-4 h-auto border border-transparent rounded-md font-semibold sm:text-sm text-white hover:bg-red-800 focus:outline-none transition ease-in-out duration-150 bg-red-600 text-xs">Cancel</Button>
                                  ) : null}
                                </div>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This action cannot be undone. This will permanently cancel your booking.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Undo</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleCancel(booking.id, booking.clientId)}>Continue</AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </div>
          )
      )}
    </div>
  );
};

export default ClientBookings;