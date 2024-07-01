"use client";

import Head from "next/head";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MonitorX } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import SystemReportSection from "./SuspendedReport/SuspendedReport";
import { signOut } from "next-auth/react";

const Suspended = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Suspended Page</title>
      </Head>
      <div className="h-[80vh] flex justify-center items-center">
        <Card className="w-[350px]">
          <CardHeader>
            <MonitorX className="text-red-400 w-full " />
            <CardTitle className="flex justify-center">
              Your Account has been suspended
            </CardTitle>
            <CardDescription className="flex justify-center">
              Your accont has been suspended due to some reasons. Please contact
              the support team for more information.
            </CardDescription>
          </CardHeader>
          <CardContent></CardContent>
          <CardFooter className="flex justify-center gap-4">
            <Button
              variant="outline"
              onClick={() =>
                signOut({
                  callbackUrl: `${window.location.origin}/sign-in`,
                })
              }
            >
              Back to Sign In
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="destructive">Report to Admin</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <div className="grid grid-cols-1 gap-4">
                  <Card className="border-none">
                    <CardHeader>
                      <CardTitle>Report to admin</CardTitle>
                      <CardDescription>
                        You can report your issues from here.
                      </CardDescription>
                      <CardContent>
                        <SystemReportSection />
                      </CardContent>
                    </CardHeader>
                  </Card>
                </div>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default Suspended;
