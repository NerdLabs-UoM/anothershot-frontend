"use client"

import React from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

const HomePage = () => {

    const router = useRouter();    
    const { data: session, status }: any = useSession();
    

    return (
        <div>
            <div>Home Page</div>
            <div>{session?.user?.email}</div>
            <Button onClick={() => signOut({
                callbackUrl: `${window.location.origin}/`
            })}>Sign Out</Button>
        </div>
    );
}

export default HomePage;