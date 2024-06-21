import { Separator } from "@/components/ui/separator";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Booking } from "@/app/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface BookingCardProps {
    booking: Booking | null;
    isOpened: boolean;
    onClose: () => void;
}

const BookingCard: React.FC<BookingCardProps> = ({ booking, isOpened, onClose }) => {
    const router = useRouter();

    const handleRedirect = (photographerId: string) => {
        toast('Redirecting to photographer bookings');
        router.push(`/user/photographer/${photographerId}/bookings`);
    };

    return (
        <Dialog open={isOpened} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Booking Details</DialogTitle>
                    <DialogDescription>
                        View details of the booking.
                    </DialogDescription>
                </DialogHeader>
                {booking && (
                    <div className="flex items-center gap-10 text-sm sm:text-base">
                        {/* <Avatar
                            className="w-20 h-20 border-2 border-slate-300 cursor-pointer hover:scale-90 transform transition duration-500"
                            onClick={() => handleRedirect(booking.client.userId)}
                        >
                            <AvatarImage
                                src={booking.client.user.image ?? "https://res.cloudinary.com/dcyqrcuf3/image/upload/v1711878461/defaultImages/default-profile-image_grcgcd.png"}
                                alt={booking.client.name}
                            />
                        </Avatar> */}
                        <div>
                            <p><b>Event Name :</b> {booking.subject}</p>
                            <p><b>Client :</b> {booking.client.name}</p>
                            {booking.location ? (
                                <p><b>Location :</b> {booking.location}</p>
                            ) : (
                                <p className="text-slate-500"><b>Location :</b> No location specified</p>
                            )}
                            {booking.package ? (
                                <p><b>Package :</b> {booking.package.name}</p>
                            ) : (
                                <p className="text-slate-500"><b>Package :</b> Selected package not available</p>
                            )}
                            <p><b>Start :</b> {booking.start ? new Date(booking.start).toLocaleString() : ''}</p>
                            <p><b>End :</b> {booking.end ? new Date(booking.end).toLocaleString() : ''}</p>

                        </div>
                    </div>
                )}
                <DialogFooter>
                    <Button onClick={onClose}>Close</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default BookingCard;
