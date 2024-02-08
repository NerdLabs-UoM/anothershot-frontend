"use client"

import React from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

const HomePage = () => {

    const { data: session } = useSession();

    console.log(session);

    return (
        <div>
            <div>Home Page</div>
            <div>{session?.user?.id}</div>
            <div>{session?.user?.name}</div>
            <div>{session?.user?.email}</div>
            <Button onClick={() => signOut({
                callbackUrl: `${window.location.origin}/sign-in`
            })}>Sign Out</Button>
        </div>
    );
}

export default HomePage;