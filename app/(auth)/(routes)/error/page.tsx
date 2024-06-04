"use client"

import { set } from "lodash";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import toast from "react-hot-toast";

const AuthErrorPage = () => {
    const [error, setError] = useState('');
    const router = useRouter();

    useEffect(() => {
        const errorFromParams = new URLSearchParams(window.location.search).get("error");
        if (errorFromParams !== null) {
            setError(errorFromParams);
        }
    }, []);

    useEffect(() => {
        if (error === "User not found") {
            toast.error("New users must sign up first");
            router.push("/sign-up");
        }
        if (error === "Email not verified") {
            toast.error("Email not verified. Check your email for the activation link");
            router.push("/sign-in");
        }
    }, [error,router]);

    return (
        <div>
            <Suspense />
        </div>
    );
}

export default AuthErrorPage;
