"use client"
import Image from "next/image";
import {User} from "@/app/lib/types";
import {CldImage} from 'next-cloudinary';
// interface userDetailProps:User[] {
//   userName: string;
//   email: string;
//   image: string;
// }

export const UserDetail: React.FC<Partial<User>> = ({userName, email, image}) => {
    return (
        <div className="relative flex gap-4">
            {/*<CldImage*/}
            {/*  src={image?image:"Image"}*/}
            {/*  alt="img"*/}
            {/*  width={50}*/}
            {/*  height={50}*/}
            {/*/>*/}
            <Image
                src="/images/avatar.png"
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