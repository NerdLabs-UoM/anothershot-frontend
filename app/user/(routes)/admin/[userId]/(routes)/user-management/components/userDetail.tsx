"use client"
import Image from "next/image";

interface userDetailProps {
  name: string;
  email: string;
  image: string;
}

export const UserDetail:React.FC<userDetailProps> = ({ name,email,image }) => {
  return(
      <div className="relative flex gap-4">
        <Image
          src={image}
          alt="img"
          width={50}
          height={50}
        />
        <div>
          <div className="text-gray-900">{name}</div>
          <div className="text-gray-500">{email}</div>
        </div>
      </div>
  )
}