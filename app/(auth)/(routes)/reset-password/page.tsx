"use client"

import { compileResetPasswordTemplate } from "@/components/auth/emailTemplates/templateCompiler";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const ResetPasswordPage = () => {

    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const router = useRouter();

    const fetchUserByEmail = async (email: string) => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/user/email/${email}`);
            return res.data;
        } catch (error) {
            toast.error("User not found");
        }
    }

    const handleResetPassword = async () => {
        setLoading(true);
        try {
            const user = await fetchUserByEmail(email);
            if (user.id) {
                const reset_link = `${process.env.NEXT_PUBLIC_BASE_URL}/reset/${user.id}`;
                const body = compileResetPasswordTemplate(user.name, reset_link)
                await axios.post(`/api/sendEmail`, {
                    to: email,
                    subject: "Reset Password",
                    body: body
                })
                    .then((res) => {
                        toast.success("Reset password link has been sent to your email");
                    })
                    .catch((error) => {
                        toast.error("Failed to send reset password link");
                    });
            }
            setLoading(false);
        } catch (error) {
            toast.error("User not found");
        }
        setLoading(false);
    }


    return (
        <div className="grid text-center content-center h-full ">
            <div className="md:border rounded-[20px] md:p-10 min-w-[350px]">
                <h1 className="text-3xl font-bold m-4">Reset Password</h1>
                <p className="text-zinc-500 font-medium m-4">Please enter your email address to reset your password</p>
                <Input value={email} className="w-full mt-4" placeholder="Email Address" onChange={(event) => setEmail(event.target.value)} />
                <Button variant="default" className="w-full mt-4" onClick={handleResetPassword}>
                    {loading && <span className="animate-spin"><Loader2 /></span>}
                    {!loading && <span className="ml-2">Reset Password</span>}
                </Button>
                <p className="text-zinc-500 font-medium m-4">
                    Back to <a className="text-slate-950 cursor-pointer" onClick={() => router.push("/sign-in")}>Sign In</a>
                </p>
            </div>
        </div>
    );
}

export default ResetPasswordPage;