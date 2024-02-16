"use client"

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

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