"use client"

import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

type UserLayoutProps = {
    children: React.ReactNode;
}

const UserLayout = (props: UserLayoutProps) => {
    return (
        <>
            {/* <div>
                <Button onClick={() => signOut({
                    callbackUrl: `${window.location.origin}/sign-in`
                })}>Sign Out</Button>
            </div> */}
            {props.children}
            <Navbar/>
        </>
    );
}

export default UserLayout;