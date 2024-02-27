"use client"

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import { Button } from "@/components/ui/button";
import SignInForm from "@/components/auth/sign-in-form";
import Google from "@/components/icons/Google";

const SignInPage = () => {

    const router = useRouter();

    const handleGoogleSignIn = async () => {
        const res = await signIn('google', {
            callbackUrl: `${window.location.origin}/home`,
            redirect: false,
        })

        if (res?.error) {
            toast.error(res.error);
            router.push("/sign-up");
        }

    }

    return (
        <div className="grid text-center content-center h-full ">
            <div className="md:border rounded-[20px] md:p-10 min-w-[350px]">
                <h1 className="text-3xl font-bold m-4">Sign In</h1>
                <SignInForm />
                <p className="text-zinc-500 font-medium m-2">Or</p>
                <Button variant="default" className="w-full" onClick={() => handleGoogleSignIn()}>
                    <Google />
                    <span className="ml-2">Sign In With Google</span>
                </Button>
                <p className="text-zinc-500 font-medium m-4">
                    Don't have an account? <a className="text-slate-950 cursor-pointer" onClick={() => router.push("/sign-up")}>Sign Up</a>
                </p>
            </div>
        </div>
    );
}

export default SignInPage;