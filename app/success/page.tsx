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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CircleDollarSign } from 'lucide-react';
import { useRouter } from "next/navigation";

const Success = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Success Page</title>
      </Head>
      <div className="h-[80vh] flex justify-center items-center">
      <Card className="w-[350px]">
      <CardHeader>
      <CircleDollarSign className="text-green-400 w-full " />
        <CardTitle className="flex justify-center">Thank You</CardTitle>
        <CardDescription className="flex justify-center">
          Payment done Successfully
        </CardDescription>
      </CardHeader>
      <CardContent>
        
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button variant='outline' onClick={()=>{router.push("/")}}>Back to the Site</Button>
      </CardFooter>
    </Card>
      </div>
    </>
  );
};

export default Success;