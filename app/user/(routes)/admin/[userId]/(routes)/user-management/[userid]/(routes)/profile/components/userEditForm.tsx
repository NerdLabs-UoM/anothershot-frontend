import React, { useEffect, useState } from "react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
  FormDescription,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Photographer, User } from "@/app/lib/types";
import Link from "next/link";
import axios from "axios";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/app/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import toast from "react-hot-toast";

const roles = [
  { label: "Photographer", value: "PHOTOGRAPHER" },
  { label: "Client", value: "CLIENT" },
  { label: "ADMIN", value: "ADMIN" },
] as const;

const formSchema = z.object({
  username: z.string(),
  email: z
    .string()
    .email()
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
  phoneNo1: z.string().min(10).max(10),
  phoneNo2: z.string().min(10).max(10),
  userRole: z.string({
    required_error: "Please select a language.",
  }),
  street: z.string(),
  city: z.string(),
  state: z.string().regex(/^[a-zA-Z]+$/),
  zipCode: z.string().regex(/^\d{5}$/),
  country: z.string(),
});

const formSchema2 = z.object({
  username: z.string().min(2).max(50),
});

interface EditFormProps {
  userDetails: User;
  userId: string;
  details: {
    name: string;
    email: string;
  };
  setDetails: React.Dispatch<
    React.SetStateAction<{
      name: string;
      email: string;
    }>
  >;
}

const EditForm: React.FC<EditFormProps> = ({
  userId,
  details,
  userDetails,
  setDetails,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      phoneNo1: "",
      phoneNo2: "",
      userRole: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    },
  });

  const form2 = useForm<z.infer<typeof formSchema2>>({
    resolver: zodResolver(formSchema2),
    defaultValues: {
      username: "",
    },
  });

  const [isPhotographer, setIsPhotographer] = useState<boolean>(false);
  const [isClient, setIsClient] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [newvalues, setNewValues] = useState({
    username: "",
    phoneNo1: "",
    phoneNo2: "",
    email: "",
    userRole: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    setDetails({
      name: values.username,
      email: values.email,
    });
    setNewValues({
      username: values.username,
      phoneNo1: values.phoneNo1,
      phoneNo2: values.phoneNo2,
      email: values.email,
      userRole: values.userRole,
      street: values.street,
      city: values.city,
      state: values.state,
      zip: values.zipCode,
      country: values.country,
    });
    try {
      axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/${userId}/adminupdate`,
        {
          userId: userId,
          userName: values.username,
          phoneNum1: values.phoneNo1,
          phoneNum2: values.phoneNo2,
          email: values.email,
          address: {
            street: values.street,
            city: values.city,
            state: values.state,
            zip: values.zipCode,
            country: values.country,
          },
        }
      );
    } catch (err) {
      console.error(err);
    }
    toast.success("Account details updated successfully");
  };

  const onSubmitClient = (values: z.infer<typeof formSchema2>) => {
    setDetails({
      name: values.username,
      email: details.email,
    });
    console.log(values);
    try {
      axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/${userId}/adminupdateclient`,{name:values.username}
      );
    } catch (err) {
      console.error(err);
    }
    toast.success("Client Account details updated successfully");
  };

  const onSubmitAdmin = (values: z.infer<typeof formSchema2>) => {
    setDetails({
      name: values.username,
      email: details.email,
    });
    console.log(values);
    try {
      axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/${userId}/adminupdateadmin`,{name:values.username}
      );
    } catch (err) {
      console.error(err);
    }
    toast.success("Admin Account details updated successfully");
  };

  useEffect(() => {
    if (userDetails?.photographer) {
      setIsPhotographer(true);
      setNewValues({
        username: userDetails.photographer.name,
        phoneNo1: userDetails.photographer.contactDetails?.phoneNum1 ?? "",
        phoneNo2: userDetails.photographer.contactDetails?.phoneNum2 ?? "",
        email: userDetails.email ?? "",
        userRole: userDetails.userRole ?? "",
        street: userDetails.photographer.contactDetails?.address?.street ?? "",
        city: userDetails.photographer.contactDetails?.address?.city ?? "",
        state: userDetails.photographer.contactDetails?.address?.state ?? "",
        zip: userDetails.photographer.contactDetails?.address?.zip ?? "",
        country:
          userDetails.photographer.contactDetails?.address?.country ?? "",
      });
      
    }
    else if(userDetails?.client){
      setIsClient(true);
    }else if(userDetails?.admin){
      setIsAdmin(true);
    }
    console.log(newvalues);
  }, [userDetails]);

  if (isPhotographer) {
    const userForm = (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex flex-col sm:flex-row justify-around w-full gap-3 ">
            <div className="w-10/12 space-y-8">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-8 gap-3 mb-2 justify-center items-center  ">
                    <FormLabel className="col-span-2 grid place-content-end">
                      Username
                    </FormLabel>
                    <FormControl className="col-span-6">
                      <Input placeholder={newvalues.username} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-8 gap-3 mb-2 justify-center items-center ">
                    <FormLabel className="col-span-2 grid place-content-end">
                      Email
                    </FormLabel>
                    <FormControl className="col-span-6">
                      <Input placeholder={newvalues.email} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phoneNo1"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-8 gap-3 mb-2 justify-center items-center ">
                    <FormLabel className="col-span-2 grid place-content-end">
                      contactNo
                    </FormLabel>
                    <FormControl className="col-span-6">
                      <Input placeholder={newvalues.phoneNo1} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phoneNo2"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-8 gap-3 mb-2 justify-center items-center ">
                    <FormLabel className="col-span-2 grid place-content-end">
                      PhoneNo2
                    </FormLabel>
                    <FormControl className="col-span-6">
                      <Input placeholder={newvalues.phoneNo1} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="userRole"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-8 gap-3 mb-2 justify-center items-center ">
                    <FormLabel className="col-span-2 grid place-content-end">
                      User Role
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl className="col-span-6">
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-[200px] justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? roles.find(
                                  (language) => language.value === field.value
                                )?.label
                              : "Select User Type"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput placeholder="Search Type" />
                          <CommandEmpty>No language found.</CommandEmpty>
                          <CommandGroup>
                            {roles.map((role) => (
                              <CommandItem
                                value={role.label}
                                key={role.value}
                                onSelect={() => {
                                  form.setValue("userRole", role.value);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    role.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {role.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-10/12 space-y-8">
              <FormField
                control={form.control}
                name="street"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-8 gap-3 mb-2 justify-center items-center">
                    <FormLabel className="col-span-2 grid place-content-end">
                      Street
                    </FormLabel>
                    <FormControl className="col-span-6 grid place-content-end">
                      <Input placeholder={newvalues.street} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-8 gap-3 mb-2 justify-center items-center">
                    <FormLabel className="col-span-2 grid place-content-end">
                      City
                    </FormLabel>
                    <FormControl className="col-span-6">
                      <Input placeholder={newvalues.city} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-8 gap-3 mb-2 justify-center items-center">
                    <FormLabel className="col-span-2 grid place-content-end">
                      State
                    </FormLabel>
                    <FormControl className="col-span-6">
                      <Input placeholder={newvalues.state} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="zipCode"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-8 gap-3 mb-2 justify-center items-center">
                    <FormLabel className="col-span-2 grid place-content-end">
                      Zip
                    </FormLabel>
                    <FormControl className="col-span-6">
                      <Input placeholder={newvalues.zip} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-8 gap-3 mb-2 justify-center items-center">
                    <FormLabel className="col-span-2 grid place-content-end">
                      Country
                    </FormLabel>
                    <FormControl className="col-span-6">
                      <Input placeholder={newvalues.city} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-4">
                <Link href={`/user/photographer/${userId}/profile`}>
                  <Button  variant="outline">
                    View Profile
                  </Button>
                </Link>
                <Button type="submit" >
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Form>
    );

    return <>{userForm}</>;
  } else if(isClient){
    const userForm = (
      <Form {...form2}>
        <form
          onSubmit={form2.handleSubmit(onSubmitClient)}
          className="space-y-8"
        >
          <FormField
            control={form2.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder={newvalues.username} {...field} />
                </FormControl>
                <FormDescription>
                  This is the public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full grid-cols-8 place-content-end">
            <Link href={`/user/client/${userId}/profile`}>
              <Button className="mx-3" variant="outline">
                View Profile
              </Button>
            </Link>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>
    );
    return <>{userForm}</>;
  }else if(isAdmin){
    const userForm = (
      <Form {...form2}>
        <form
          onSubmit={form2.handleSubmit(onSubmitAdmin)}
          className="space-y-8"
        >
          <FormField
            control={form2.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder={newvalues.username} {...field} />
                </FormControl>
                <FormDescription>
                  This is the public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full grid-cols-8 place-content-end">
            <Link href={`/user/client/${userId}/profile`}>
              <Button className="mx-3" variant="outline">
                View Profile
              </Button>
            </Link>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>
    );
    return <>{userForm}</>;
  }
};

export default EditForm;
