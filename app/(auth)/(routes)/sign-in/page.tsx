"use client"

import Google from "@/components/icons/Google";
import { Button } from "@/components/ui/button";
import SignInForm from "./components/sign-in-form";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const SignInPage = () => {

    const router = useRouter();

    return (
        <div className="grid text-center content-center h-full ">
            <div className="md:border rounded-[20px] md:p-10 min-w-[350px]">
                <h1 className="text-3xl font-bold m-4">Sign In</h1>
                <SignInForm />
                <p className="text-zinc-500 font-medium m-2">Or</p>
                <Button variant="default" className="w-full" onClick={() => signIn('google',
                    { callbackUrl: `${window.location.origin}/home` }
                )}>
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