'use client'

import Head from "next/head";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { MonitorX  } from 'lucide-react';
import { useRouter } from "next/navigation";

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
      <MonitorX  className="text-red-400 w-full " />
        <CardTitle className="flex justify-center">Your Account has been suspended</CardTitle>
        <CardDescription className="flex justify-center">
            Your accont has been suspended due to some reasons. Please contact the support team for more information.
        </CardDescription>
      </CardHeader>
      <CardContent>
        
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button variant='outline' onClick={()=>{router.push("/sign-in")}}>Back to Sign In</Button>
      </CardFooter>
    </Card>
      </div>
    </>
  );
};

export default Suspended;