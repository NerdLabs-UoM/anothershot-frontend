"use client";

import * as z from "zod";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  CldUploadWidgetResults,
  CldUploadWidgetInfo,
  CldUploadWidget,
} from "next-cloudinary";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { PenSquare, Camera } from "lucide-react";
import { Client, Suspended, User } from "@/app/lib/types";
import axios from "axios";
import { useParams } from "next/navigation";
import { toast } from "react-hot-toast";
import { useSession } from "next-auth/react";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";  

const formSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name is must_be_a_string",
    }
    )
    .min(2, {
      message: "Username must be at least 2 characters long",
    })
    .max(50),
  bio: z
    .string()
    .min(2, { message: "Description must be least 2 characters long" })
    .max(200, { message: "Description must be below 200 characters" }),
})

const ProfileBio = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [client, setClient] = useState<Client>();
  const [values, setValues] = useState({
    name: "",
    bio: "",
  });
  const [profileImage, setProfileImage] = useState("");
  const { userId } = useParams();
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const [isSuspended, setIsSuspended] = useState<Suspended>("NOT_SUSPENDED");
  const [isLoadingprofile, setIsLoadingProfile] = useState(true);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/client/${userId}/clientDetails`);
        setClient(response.data);
      } catch (error: any) {
        console.error('Error fetching details:', error);
      } finally {
        setIsLoadingProfile(false);
      }
    };
    fetchClients();
  }, [userId]);
  useEffect(() => {
    if (client) {
      setValues({
        name: client.name,
        bio: client.bio || "",
      });
      setProfileImage(client.user.image ?? "https://res.cloudinary.com/dcyqrcuf3/image/upload/v1711878461/defaultImages/default-profile-image_grcgcd.png");
    }
  }, [client]);

  useEffect(() => {
    const user = async () => {
      try {
        const res = await axios.get<User>(
          `${process.env.NEXT_PUBLIC_API_URL}/api/user/${userId}/profile`
        );
        setIsSuspended(res.data.suspended);
      }
      catch (err) {
        console.error(err);
      }
    };
    user();

  }, [session]);

  useEffect(() => {
    if (isSuspended == "SUSPENDED") {
      toast.error("Your account has been Suspended")
    }
  }, [isSuspended])


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      bio: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>, e: any) => {
    setValues(values);
    try {
      setLoading(true);
      if (values) {
        const response = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/api/client/${userId}/profile`, {
          name: values.name,
          bio: values.bio,
          clientId: userId,
        });
        if (response.status === 201) {
          setLoading(false);
          e.target.reset();
          console.log(response.status);
          toast.success("Successfully submitted details.");
        }
      }
    } catch (error: any) {
      setLoading(false);
      toast.error("Error submitting details", error);
    } finally {
      setLoading(false);
    }
    setIsOpen(false);
  };

  return (
    <div className= "rounded-lg border border-slate-100 shadow-inner drop-shadow-md w-11/12 lg:w-1/3 h-full p-3 lg:mr-5 lg:mt-20">
      <div className="flex justify-between">
        <Avatar className="relative w-20 h-20 lg:w-24 lg:h-24">
          <div className="z-20 w-full bg-black h-30 opacity-5 hover:opacity-40">
            <CldUploadWidget
              onSuccess={(results: CldUploadWidgetResults) => {
                const uploadedResult =
                  results.info as CldUploadWidgetInfo;
                const profileImageURL = {
                  image: uploadedResult.secure_url,
                };
                setProfileImage(profileImageURL.image);

                async function Update() {
                  try {
                    await axios.patch(
                      `${process.env.NEXT_PUBLIC_API_URL}/api/client/${userId}/profile/image`,
                      {
                        image: profileImageURL.image,
                        clientId: userId,
                      }
                    );
                  } catch (error: any) {
                    toast.error("Error updating profile image", error);
                  }
                }
                Update();
              }}

              options={{
                sources: ["local"],
                googleApiKey: "<image_search_google_api_key>",
                showAdvancedOptions: false,
                singleUploadAutoClose: true,
                cropping: true,
                multiple: false,
                defaultSource: "local",
                resourceType: "image",
                folder: `anothershot/${userId}/clientProfile`,
                styles: {
                  palette: {
                    window: "#ffffff",
                    sourceBg: "#f4f4f5",
                    windowBorder: "#90a0b3",
                    tabIcon: "#000000",
                    inactiveTabIcon: "#555a5f",
                    menuIcons: "#555a5f",
                    link: "#000000",
                    action: "#000000",
                    inProgress: "#464646",
                    complete: "#000000",
                    error: "#cc0000",
                    textDark: "#000000",
                    textLight: "#fcfffd",
                    theme: "white",
                  },
                },
              }}
              uploadPreset={`${process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}`}
            >
              {({ open }) => {
                return (
                  <Button
                    variant="default"
                    className="mt-5 ml-3 lg:ml-5 lg:mt-8 rounded-full"
                    onClick={() => {
                      open();
                    }}
                  >
                    <Camera />
                  </Button>
                );
              }}
            </CldUploadWidget>
          </div>
          <AvatarImage
            src={profileImage}
            alt="@shadcn"
            className="absolute"
          />
        </Avatar>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <PenSquare className="w-6 h-6" />
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="Alex" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your public display name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input placeholder="Client" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your bio description.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      <div>
       {isLoadingprofile ? (
          <div className="flex items-center space-x-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>) : (
      <div className="flex flex-col">
        <h1 className="texl-xl lg:text-2xl font-bold">{values.name}</h1>
        <p className="text-gray-700 font-normal text-xs lg:text-base leading-4">@{client?.user.userName}</p>
        <Separator className="mt-2" />
        <p className="text-xs lg:text-sm pt-3">{values.bio}</p>
      </div>
          )}
      </div>
    </div>
  );
};

export default ProfileBio;