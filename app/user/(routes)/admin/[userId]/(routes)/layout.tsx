"use client"

import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import AdminHeader from "@/components/adminHeader";

type UserLayoutProps = {
    children: React.ReactNode;
}

const UserLayout = (props: UserLayoutProps) => {
    return (
        <>
            {props.children}
        </>
    );
}

export default UserLayout;