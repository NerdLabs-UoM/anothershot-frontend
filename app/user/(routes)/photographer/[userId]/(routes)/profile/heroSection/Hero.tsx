"use client";

import * as z from "zod";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
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
import { Input } from "@/components/ui/input";
import { Avatar , AvatarImage } from "@/components/ui/avatar";
import { Settings, PenSquare, Camera } from "lucide-react";

import {
  CldUploadWidgetResults,
  CldUploadWidgetInfo,
  CldUploadWidget,
  cloudinaryLoader,
} from "next-cloudinary";

import { useSession } from "next-auth/react";
import axios from "axios";
import toast from "react-hot-toast";
import { Photographer, Suspended, User } from "@/app/lib/types";
import { addYears } from "date-fns";

const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters long",
    })
    .max(50),
  bio: z
    .string()
    .min(2, { message: "Description must be least 2 characters long" })
    .max(500),
});

const Hero = () => {
  const [photographer, setPhotographer] = useState<Photographer>();
  const { userId } = useParams();
  const { data: session } = useSession();
  const [isPhotographer, setIsPhotographer] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const [coverImageURL, setCoverImageURL] = useState("https://res.cloudinary.com/dts2l2pnj/image/upload/v1708486003/oooolhqi3vcrtcqhhy3b.jpg");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [values, setValues] = useState({
    name: "",
    description: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const [isSuspended, setIsSuspended] = useState<Suspended>("NOT_SUSPENDED");
  const router = useRouter();
  const handleRefresh = () => {
    router.refresh();
  };

  useEffect(() => {
    const fetchData = async () => {
      try{
        const res = await axios.get<Photographer>(
          `${process.env.NEXT_PUBLIC_API_URL}/api/photographer/${userId}`
        );
        setPhotographer(res.data);
      }
      catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [userId]);

  useEffect(() => {
    if (userId == session?.user.id) {
      setIsPhotographer(true);
    }
    const user = async () => {
      try{
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
    if(isSuspended=="SUSPENDED") {
      toast.error("Your account has been Suspended")
    }
  },[isSuspended])

  useEffect(() => {
    if(photographer){
      setValues({
        name: photographer.name,
        description: photographer.bio ?? "",
      });
      
    }
    setProfileImage(photographer?.user.image ?? "");
      if(coverImageURL!=null){
        setCoverImageURL(photographer?.coverPhoto ?? "");
      }

  }, [photographer]);

  useEffect(() => {
    if (session) {
      setSessionId(session?.user.id);
    }
  }, [session]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsOpen(false);
    setValues({ name: values.name, description: values.bio });
    async function Update() {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/photographer/${userId}`,
        values
      );
    }
    Update();
    handleRefresh();
  };

  const handleCreateChat = async () => {
    const newChat = {
      senderId: sessionId,
      receiverId: userId,
    };

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/chat/create`,
        newChat
      );
      console.log(res);
      if (res.data.error) {
        toast.error(res.data.error);
      }
      if (res.status === 201) {
        toast.success("Chat created successfully");
        setTimeout(() => {
          window.location.href = `/user/client/${session?.user.id}/inbox`;
        }, 1000);
      }
    } catch (error: any) {
      if (error.response.data.error) {
        toast.error(error.response.data.error);
        setTimeout(() => {
          window.location.href = `/user/client/${session?.user.id}/inbox`;
        }, 1000);
      }
    }
  };

  return (
    <div className="flex flex-col sm:flex-row md:w-11/12 h-[350px] md:justify-between md:p-10 rounded-xl sm:px-24 md:h-[500px] bg-cover bg-no-repeat  bg-white bg-opacity-85 ">
      <div className="absolute inset-0 z-[-10] mt-48 sm:mt-24">
        <Image
          src={coverImageURL}
          objectFit="justify-between md:p-10 rounded-xl sm:px-24 md:h-[500px] cover"
          quality={50}
          alt="cover"
          width={1920}
          height={400}
        />
      </div>

      <div className="p-5 md:px-0">
        <div className="flex px-10 pt-10 align-middle">
          <div>
            <Avatar className="relative w-20 h-20">
              <div className="z-20 w-full bg-black h-30 opacity-5 hover:opacity-30">
                {isPhotographer && (
                  <CldUploadWidget
                    onOpen={() => {
                      console.log(isPhotographer);
                    }}
                    onSuccess={(results: CldUploadWidgetResults) => {
                      console.log(results);
                      const uploadedResult =
                        results.info as CldUploadWidgetInfo;
                      const profileImageURL = {
                        image: uploadedResult.secure_url,
                      };
                      setProfileImage(profileImageURL.image);

                      async function Update() {
                        await axios.put(
                          `${process.env.NEXT_PUBLIC_API_URL}/api/photographer/${userId}/profile-picture`,
                          profileImageURL
                        );
                      }
                      console.log(photographer)
                      Update();
                      handleRefresh();
                    }}

                    options={{
                      publicId:`${session?.user.id}.profile`,
                      tags: ["profile image", `${session?.user.id}`],
                      sources: ["local"],
                      googleApiKey: "<image_search_google_api_key>",
                      showAdvancedOptions: false,
                      cropping: true,
                      multiple: false,
                      defaultSource: "local",
                      resourceType: "image",
                      folder: `${session?.user.id}/profile`,
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
                    uploadPreset="t2z7iiq4"
                  >
                    {({ open }) => {
                      return (
                        <Button
                          variant="default"
                          className="mt-5 ml-3 rounded-full"
                          onClick={() => {
                            open();
                          }}
                        >
                          <Camera />
                        </Button>
                      );
                    }}
                  </CldUploadWidget>
                )}
              </div>
              <AvatarImage
                src={profileImage}
                alt="@shadcn"
                className="absolute"
              />
      
            </Avatar>
          </div>

          {isPhotographer && (
            <CldUploadWidget
              onOpen={() => {}}
              onSuccess={(results: CldUploadWidgetResults) => {
                const uploadedResult = results.info as CldUploadWidgetInfo;

                const tags = uploadedResult.tags;
                console.log(tags);
                const coverImageURL = {
                  coverPhoto: uploadedResult.secure_url,
                };
                setCoverImageURL(coverImageURL.coverPhoto);
                async function Update() {
                  await axios.put(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/photographer/${userId}/cover-photo`,
                    coverImageURL
                  );
                }
                Update();
                handleRefresh();
              }}

              onPublicId={()=>{
                
              }}
              options={{
                tags: ["cover image", `${session?.user.id}`],
                sources: ["local"],
                googleApiKey: "<image_search_google_api_key>",
                showAdvancedOptions: false,
                cropping: true,
                croppingCoordinatesMode: "custom",
                croppingAspectRatio: 2,
                multiple: false,
                defaultSource: "local",
                resourceType: "image",
                folder: `${photographer?.userId}/${photographer?.name}/cover-image`,
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
                  },
                },
              }}
              uploadPreset="t2z7iiq4"
            >
              {({ open }) => {
                return (
                  <Button
                    variant="default"
                    className="mt-5 ml-5 rounded-full"
                    onClick={() => {
                      open();
                    }}
                  >
                    Edit Cover Photo
                  </Button>
                );
              }}
            </CldUploadWidget>
          )}
        </div>
        <div className="px-10 pt-5">
          <div className="text-2xl font-bold max-w-3/5 md:text-3xl">
            {values.name}
          </div>
          <div className="w-4/5 text-xs md:text-lg">{values.description}</div>
        </div>
      </div>

      <div className="flex flex-row p-0 px-12 align-middle">
        {isPhotographer && (
          <div className="pt-2">
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger>
                <PenSquare className="w-[40px]" />
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Profile</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                  >
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input type="name" placeholder="Kevin" {...field} />
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
                          <FormLabel>Discription</FormLabel>
                          <FormControl>
                            <Input
                              type="description"
                              placeholder="Photographer"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            This is your bio description
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
        )}
        {isPhotographer || (
          <Button
            variant="default"
            onClick={() => handleCreateChat()}
            className="w-4/5 mx-3"
            asChild
          >
            <Link href="/photographer/Bookings">Message</Link>
          </Button>
        )}
        {isPhotographer || (
          <Button variant="destructive" className="w-4/5" asChild>
            <Link href="/photographer/Bookings">Book Now</Link>
          </Button>
        )}

        {isPhotographer && (
          <Link
            href="profile/settings"
            className="relative px-2 pt-2"
          >
            <Settings />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Hero;
