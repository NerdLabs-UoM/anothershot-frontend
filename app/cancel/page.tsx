
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
import { Frown } from 'lucide-react';
import { useRouter } from "next/navigation";

const Cancel = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Cancel Page</title>
      </Head>
      <div className="h-[80vh] flex justify-center items-center">
      <Card className="w-[350px]">
      <CardHeader>
      <Frown className="text-red-500 w-full " />
        <CardTitle className="flex justify-center">Try Again</CardTitle>
        <CardDescription className="flex justify-center">
          Payment has been Declined
        </CardDescription>
      </CardHeader>
      <CardContent>
        
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button variant='outline' onClick={()=>{router.push("/")}}>Back to Home</Button>
      </CardFooter>
    </Card>
      </div>
    </>
  );
};

export default Cancel;