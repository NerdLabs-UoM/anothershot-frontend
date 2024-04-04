"use client"
import Image from "next/image";
import {User} from "@/app/lib/types";
import {CldImage} from 'next-cloudinary';

export const UserDetail: React.FC<Partial<User>> = ({userName, email, image}) => {
    return (
        <div className="relative flex gap-4">
            <Image
                src={image ||"/images/avatar.png"}
                className="rounded-3xl"
                alt="img"
                width={50}
                height={50}
            />
            <div>
                <div className="text-gray-900">{userName}</div>
                <div className="text-gray-500">{email}</div>
            </div>
        </div>
    )
}