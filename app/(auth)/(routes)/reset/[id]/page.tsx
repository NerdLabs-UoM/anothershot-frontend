"use client";

import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { resetUserPasswordService } from "@/services/auth/api";

interface ResetPageProps {
  params: {
    id: string;
  };
}

const schema = z
  .object({
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const ResetPage = ({ params }: ResetPageProps) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleReset = async () => {
    try {
      setLoading(true);
      const res = await resetUserPasswordService(
        params.id,
        form.getValues().password
      );
      if (res.data.error) {
        toast.error(res.data.error);
      }
      if (res.status === 200) {
        form.reset();
        toast.success("Password reset successfully");
      }
      setLoading(false);
      setTimeout(() => {
        router.push("/sign-in");
      }, 2000);
    } catch (error) {
      toast.error("An error occurred");
    }
    setLoading(false);
  };

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    await handleReset();
  };

  return (
    <div className="grid text-center content-center h-full ">
      <div className="md:border rounded-[20px] md:p-10 min-w-[350px]">
        <h2 className="text-3xl font-bold m-4">Password Reset</h2>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="max-w-sm space-y-4 text-left"
          >
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" placeholder="password" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="confirm password"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button variant="default" className="w-full" type="submit">
              {loading && (
                <span className="animate-spin">
                  <Loader2 />
                </span>
              )}
              {!loading && <span className="ml-2">Reset Password</span>}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ResetPage;
