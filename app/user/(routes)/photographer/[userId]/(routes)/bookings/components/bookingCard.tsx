import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Booking } from "@/app/lib/types";

interface BookingCardProps {
    booking: Booking | null;
    isOpened: boolean;
    onClose: () => void;
}

const BookingCard: React.FC<BookingCardProps> = ({ booking, isOpened, onClose }) => {
    const router = useRouter();

    return (
        <Dialog open={isOpened} onOpenChange={onClose}>
            <DialogContent className="max-w-[300px] sm:max-w-[380px]">
                <DialogHeader>
                    <DialogTitle>Booking Details</DialogTitle>
                    <DialogDescription>
                        View details of the booking.
                    </DialogDescription>
                </DialogHeader>
                {booking && (
                    <div className="flex items-center gap-10 text-sm sm:text-base">
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
