"use client";

import * as z from "zod";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import useFetch from "./fetchData";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Settings, PenSquare, Camera } from "lucide-react";

import {
  CldUploadButton,
  CldImage,
  CldUploadWidgetResults,
  CldUploadWidgetInfo,
  CldUploadWidget,
} from "next-cloudinary";

import { Settings, PenSquare } from "lucide-react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";


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



const userId = "65ca65fd9d72ab17fec59a0b";
const Hero = () => {
  const {userId} = useParams()
  const {data:session} = useSession();
  const[isPhotographer,setIsPhotographer] = useState(false);

  useEffect(()=>{
    if(userId == session?.user.id) {
      setIsPhotographer(true)
    }

    // if(session?.user.userRole =='PHOTOGRAPHER'){
    //   setIsPhotographer(true)
    // }
  },[userId,session])
  const [values, setValues] = useState({
    name: "",
    description:"",
  });
  const [profileImage,setProfileImage] = useState('')
  const [coverImageURL,setCoverImageURL] = useState('')
  const [profilePhoto, setProfilePhoto] = useState<string>();

  const { item, loading, error } = useFetch(
    `http://localhost:8000/api/photographer/${userId}`
  );

    useEffect(()=>{
      setValues({name:item?.name as string, description:item?.bio as string});
      setProfileImage(item?.user.image as string);
      setCoverImageURL(item?.coverPhoto as string);
    },[item])


  const session = useSession();
  const { userId } = useParams();
  const [sessionId, setSessionId] = useState<string | null>(null);
  useEffect(() => {
    if (session.data) {
      setSessionId(session.data.user.id);
    }
  }, [session]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  
  

  const [isOpen, setIsOpen] = useState(false);
  
  const router = useRouter();
  const handleRefresh = () => {
    router.refresh();
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsOpen(false);
    setValues({ name: values.name, description: values.bio });
    async function Update() {
      await axios.put(
        `http://localhost:8000/api/photographer/${userId}`,
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
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/chat/create`, newChat);
      console.log(res);
      if (res.data.error) {
        toast.error(res.data.error);
      }
      if (res.status === 201) {
        toast.success("Chat created successfully");
        setTimeout(() => {
          window.location.href = `/user/client/${session.data?.user.id}/inbox`;
        }, 1000);
      }
    } catch (error: any) {
      if (error.response.data.error) {
        toast.error(error.response.data.error);
        setTimeout(() => {
          window.location.href = `/user/client/${session.data?.user.id}/inbox`;
        }, 1000);
      }
    }

  };

  const photographer: boolean = false;
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
        <div className="flex pt-10 align-middle px-10">
          <div>
            <Avatar className="relative w-20 h-20">
              <div className=" z-20 h-30 w-full bg-black opacity-5 hover:opacity-30">
                {isPhotographer &&
                <CldUploadWidget
                  onOpen={() => {
                    console.log(isPhotographer)
                  }}
                  onSuccess={(results: CldUploadWidgetResults) => {
                    const uploadedResult = results.info as CldUploadWidgetInfo;
                    const profileImageURL = {
                      image: uploadedResult.secure_url,
                    };
                    setProfileImage(profileImageURL.image)

                    async function Update() {
                      await axios.put(
                        `http://localhost:8000/api/photographer/${userId}/profile-picture`,
                        profileImageURL
                      );
                    }
                    Update();
                    handleRefresh();
                  }}
                  options={{
                    tags: ['profile image',`${session?.user.id}`],
                    publicId: `${item?.id}`,
                    sources: ["local"],
                    googleApiKey: "<image_search_google_api_key>",
                    showAdvancedOptions: false,
                    cropping: true,
                    multiple: false,
                    defaultSource: "local",
                    resourceType: "image",
                    folder: `${item?.id}/${item?.name}`,
                
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
                        theme:"white",
                      },
                    },
                  }}
                  uploadPreset="t2z7iiq4"
                >
                  {({ open }) => {
                    return (
                      <Button
                        variant="default"
                        className="rounded-full mt-5 ml-3"
                        onClick={() => {
                          open();
                        }}
                      >
                        <Camera />
                      </Button>
                    );
                  }}
                </CldUploadWidget>}
              </div>
              <AvatarImage
                src={profileImage}
                alt="@shadcn"
                className="absolute"
              />
              <AvatarFallback></AvatarFallback>
            </Avatar>
          </div>

          {isPhotographer&&<CldUploadWidget
            onOpen={() => {
              
            }}
            onSuccess={(results: CldUploadWidgetResults) => {
              const uploadedResult = results.info as CldUploadWidgetInfo;

              const tags= uploadedResult.tags
              console.log(tags)
              const coverImageURL = {
                coverPhoto: uploadedResult.secure_url as string,
              };
              setCoverImageURL(coverImageURL.coverPhoto)
              async function Update() {
                await axios.put(
                  `http://localhost:8000/api/photographer/${userId}/cover-photo`,
                  coverImageURL
                );
              }
              Update();
              handleRefresh();
            }}
            options={{
              tags: ['cover image',`${session?.user.id}`],
              sources: ["local"],
              googleApiKey: "<image_search_google_api_key>",
              showAdvancedOptions: false,
              cropping: true,
              croppingCoordinatesMode: 'custom',
              croppingAspectRatio: 2,
              multiple: false,
              defaultSource: "local",
              resourceType: "image",
              folder: `${item?.id}/${item?.name}`,
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
                  className="rounded-full mt-5 ml-5"
                  onClick={() => {
                    open();
                  }}
                >
                  Edit Cover Photo
                </Button>
              );
            }}
          </CldUploadWidget>}
        </div>
        <div className="pt-5 px-10">
          <div className="text-2xl  font-bold max-w-3/5 md:text-3xl">
            {values.name}
          </div>
          <div className="text-xs  w-4/5 md:text-lg">{values.description}</div>
        </div>
      </div>

      <div className="flex flex-row align-middle p-0 px-12">

        {isPhotographer && 
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
        }
        {isPhotographer || (
          <Button variant="default" onClick={() => handleCreateChat() className="w-4/5 mx-3" asChild>
            <Link href="/photographer/Bookings">Message</Link>
          </Button>
        )}
        {isPhotographer || (
          <Button variant="destructive" className="w-4/5" asChild>
            <Link href="/photographer/Bookings">Book Now</Link>
          </Button>

        )}
        
        {isPhotographer && (
          <Link href="photographer/prfile/settings" className="relative pt-2 px-2">
            <Settings />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Hero;
