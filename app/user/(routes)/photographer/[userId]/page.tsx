"use client"

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { useParams } from "next/navigation";

const Photographer = () => {

    const { userId } = useParams();

    return (
        <div>
            <div>Photographer</div>
            <div>{userId}</div>
            <div>
                <Button onClick={() => signOut({
                    callbackUrl: `${window.location.origin}/sign-in`
                })}>Sign Out</Button>
            </div>
        </div>
    );
}

export default Photographer;