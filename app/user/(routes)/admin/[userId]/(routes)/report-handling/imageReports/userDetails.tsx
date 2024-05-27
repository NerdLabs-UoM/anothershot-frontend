"use client"
import Image from "next/image";
import {User} from "@/app/lib/types";

export const UserDetail: React.FC<Partial<User>> = ({userName, email, image}) => {
    return (
        <div className="relative flex gap-4">
            <Image
                src={image ||"/images/avatar.png"}
                className="rounded-3xl"
                alt="img"
                width={40}
                height={40}
            />
            <div className="flex flex-col justify-center">
                <div className="text-gray-900 align-middle ">{userName}</div>
            </div>
        </div>
    )
}