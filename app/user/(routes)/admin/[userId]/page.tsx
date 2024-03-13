"use client"

import AdminHeader from "@/components/adminHeader";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { useParams } from "next/navigation";

const Admin = () => {

    const { userId } = useParams();

    return (
        <div>
            {/* <h1>Admin Page</h1>
            <div>{userId}</div>
            <div>
                <Button onClick={() => signOut({
                    callbackUrl: `${window.location.origin}/sign-in`
                })}>Sign Out</Button>
            </div> */}
        </div>
    );
}

export default Admin;
