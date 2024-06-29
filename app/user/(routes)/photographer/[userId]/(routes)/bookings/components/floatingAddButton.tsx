import React from 'react';
import { BiSolidPlusSquare } from 'react-icons/bi';
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import {
    DialogTrigger,
} from "@/components/ui/dialog";

interface FloatingAddButtonProps {
    onClick: () => void;
    setIsDialogOpen: (isOpen: boolean) => void;
}

export const FloatingAddButton: React.FC<FloatingAddButtonProps> = ({ onClick, setIsDialogOpen }) => {
    const { userId } = useParams();
    const { data: session } = useSession();

    const handleClick = () => {
        onClick();
        setIsDialogOpen(true); 
    };

    const renderButton = () => {
        if (session && session.user && session.user.id === userId) {
            return (
                <div>
                    <button
                        className="fixed sm:hidden bottom-16 right-4 rounded-full w-14 h-14 shadow-lg z-50 bg-black text-white flex items-center justify-center"
                        onClick={handleClick}
                    >
                        <BiSolidPlusSquare className="w-6 h-6" />
                    </button>
                </div>
            );
        }
    };

    return (
        <div>
            {renderButton()}
        </div>
    );
};

export default FloatingAddButton;
