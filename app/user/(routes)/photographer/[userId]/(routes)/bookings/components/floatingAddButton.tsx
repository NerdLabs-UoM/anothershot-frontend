import React from 'react';
import { BiSolidPlusSquare } from 'react-icons/bi';
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
} from "@/components/ui/dialog";

interface FloatingAddButtonProps {
    onClick: () => void;
}

export const FloatingAddButton: React.FC<FloatingAddButtonProps> = ({ onClick }) => {
    const { userId } = useParams();
    const { data: session } = useSession();

    const renderButton = () => {
        if (session && session.user && session.user.id === userId) {
            return (
                <DialogTrigger asChild>
                    <button
                        className="absolute sm:hidden bottom-4 right-4 rounded-full w-14 h-14 shadow-lg z-50 bg-black text-white flex items-center justify-center"
                        onClick={onClick}
                    >
                        <BiSolidPlusSquare className="w-6 h-6" />
                    </button>
                </DialogTrigger>
            );
        }
    };

    return <div>
        <Dialog>
            {renderButton()}
        </Dialog></div>;
};

export default FloatingAddButton;

