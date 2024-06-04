"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import React, { use, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Photographer, User ,Suspended } from "@/app/lib/types";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import EditForm from "./components/userEditForm";
import { date } from "zod";
import { useSession } from "next-auth/react";

const UserPage=()=> {
  const {data:session} = useSession();
  const [userData, setUserData] = useState<User>();
  const [details, setDetails] = useState({
    name: "",
    email: "",
  });
  const [userRole, setUserRole] = useState();
  const [suspended, setSuspended] = useState<Suspended>("NOT_SUSPENDED");

  const pathname = usePathname();
  const id = pathname.split("/").slice(-2, -1)[0];
  useEffect(() => {
    const fetchData = async () => {
      try{
        const res = await axios.get<User>(
          `${process.env.NEXT_PUBLIC_API_URL}/api/user/${id}/profile`
        );
        setUserData(res.data);
      }catch (err) {
        router.push("/404")
        console.error(err);
      }
      
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (userData) {
      if (userData.photographer) {
        setDetails({
          name: userData.photographer.name,
          email: userData.email ?? "",
        });
        console.log(userData.suspended);
        setSuspended(userData.suspended);
      } else if (userData.client) {
        setDetails({
          name: userData.client.name,
          email: userData.email,
        });
        setSuspended(userData.suspended);
      }else if(userData.admin){
        setDetails({
          name: userData.admin.name,
          email: userData.email,
        });
        setSuspended(userData.suspended);
      }
    }
  }, [userData]);

  const onDelete = () => {
    async function Delete() {
      const res = await axios.delete<User>(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/${id}/delete`
      );
      console.log(res);
      return res;
    }
    Delete();
  };
  const onSuspend = () => {
    async function Suspend() {
      const res = await axios.put<User>(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/${id}/suspend`
      );
      console.log(res);
      return res;
    }
    Suspend();
    setSuspended("SUSPENDED")
    toast.error('Account Suspended')
  };
  const onUnlock = () => {
    async function Unlock() {
      const res = await axios.put<User>(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/${id}/unlock`
      );
      console.log(res);
      return res;
    }
    Unlock();
    setSuspended("NOT_SUSPENDED")
    toast.success('successfully unlocked');
  };
  const router = useRouter();
  return (
    <div>
      <Button
        className="rounded-3xl"
        variant="ghost"
        onClick={() => {
          router.back();
        }}
      >
        <ArrowLeft />
      </Button>
      <div className="container border rounded-md">
        <div className="flex flex-col sm:flex-row justify-between border-b items-center align-middle">
          <div className="flex items-center align-middle gap-5 py-2">
            <Avatar className="relative w-16 h-16">
              <AvatarImage
                src={userData?.image || "/images/avatar.png"}
                alt="@shadcn"
                className="absolute"
              />
            </Avatar>
            <div className="text-sm">
              <div>{details.name}{suspended=="SUSPENDED" ?<div className="text-red-600">(Suspended)</div>:""}</div>
              <div className="text-slate-300">{userData?.email}</div>
            </div>
          </div>
          <div className="flex gap-2">
            <Dialog >
              <DialogTrigger className="inline-flex items-center px-4 py-2 border border-transparent rounded-md font-semibold text-sm text-white bg-red-500 hover:bg-red-400 focus:outline-none focus:border-red-700 focus:ring-red-300 disabled:opacity-25 transition ease-in-out duration-150">
                Delete
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you absolutely sure?</DialogTitle>
                  <DialogDescription className = "flex gap-4 justify-center sm:justify-end">
                    <Button
                    variant="ghost"
                      onClick={() => {
                        onDelete();
                        router.push(`/user/admin/${session?.user.id}/user-management`);
                      }}
                    >
                      Delete
                    </Button>
                    <DialogClose asChild>
                    <Button onClick={()=>{console.log("Close")}}>Cancel</Button>
                    </DialogClose>
                    
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>

            <Button variant="destructive" onClick={()=>{onSuspend()}}>Suspend</Button>
            <Button variant="default" onClick={()=>{onUnlock()}}>Unlock</Button>
          </div>
        </div>
        <div className="my-4">
          <EditForm
            userId={id}
            details={details}
            userDetails={userData as User}
            setDetails={setDetails}
          />{""}
        </div>
      </div>
    </div>
  );
}

export default UserPage;
