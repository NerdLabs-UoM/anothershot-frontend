"use client"

import { useRouter } from "next/navigation";

import SignUpForm from "@/components/auth/sign-up-form";

const SignUpPage = () => {

    const router = useRouter();

    return (
        <div className="grid text-center content-center h-full ">
            <div className="md:border rounded-[20px] md:p-10">
                <h1 className="text-3xl font-bold m-4">Sign Up</h1>
                <p className="text-zinc-500 font-medium">Please select a user type</p>
                <SignUpForm />
                <p className="text-zinc-500 font-medium m-4">
                    Already have an account? <a className="text-slate-950 cursor-pointer" onClick={() => router.push("/sign-in")}>Sign In</a>
                </p>
            </div>
        </div>
    );
}

export default SignUpPage;