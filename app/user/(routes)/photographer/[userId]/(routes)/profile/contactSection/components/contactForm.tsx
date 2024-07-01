import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Pencil } from "lucide-react";
import axios from "axios";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ContactDetails } from "@/app/lib/types";
import { NotificationService } from "@/components/notification/notification";

interface ContactDetailsFormProps {
  contactDets: ContactDetails | null;
  setContactDets: React.Dispatch<React.SetStateAction<ContactDetails | null>>;
}

const formSchema = z.object({
  contactNum1: z.string()
    .regex(/^\+?[0-9]{9,12}$/, { message: "Contact number 1 must be between 9 and 12 digits, and can optionally start with a '+'." }),
  contactNum2: z.string()
    .regex(/^\+?[0-9]{9,12}$/, { message: "Contact number 2 must be between 9 and 12 digits, and can optionally start with a '+'." })
    .nullable()
    .optional(),
  email: z.string()
    .email({ message: "Please enter a valid email address." })
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: "Please enter a valid email address format." }),
  street: z.string(),
  city: z.string(),
  state: z.string()
    .regex(/^[a-zA-Z]+$/, { message: "State must only contain letters." }),
  zip: z.string(),
  country: z.string(),
  instagram: z.string().nullable(),
  facebook: z.string().nullable(),
  youtube: z.string().nullable(),
  tiktok: z.string().nullable(),
});

const ContactDetsEditForm: React.FC<ContactDetailsFormProps> = ({ contactDets, setContactDets }) => {

  const { userId } = useParams();
  const { data: session } = useSession();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contactNum1: contactDets?.phoneNum1 || "",
      contactNum2: contactDets?.phoneNum2 || "",
      email: contactDets?.email || "",
      street: contactDets?.address?.street || "",
      city: contactDets?.address?.city || "",
      state: contactDets?.address?.state || "",
      zip: contactDets?.address?.zip || "",
      country: contactDets?.address?.country || "",
      instagram: contactDets?.socialMedia?.instagram || "",
      facebook: contactDets?.socialMedia?.facebook || "",
      youtube: contactDets?.socialMedia?.youtube || "",
      tiktok: contactDets?.socialMedia?.tiktok || "",
    },
  });

  const populateForm = () => {
    form.setValue("contactNum1", contactDets?.phoneNum1 || "");
    form.setValue("contactNum2", contactDets?.phoneNum2 || "");
    form.setValue("email", contactDets?.email || "");
    form.setValue("street", contactDets?.address?.street || "");
    form.setValue("city", contactDets?.address?.city || "");
    form.setValue("state", contactDets?.address?.state || "");
    form.setValue("zip", contactDets?.address?.zip || "");
    form.setValue("country", contactDets?.address?.country || "");
    form.setValue("instagram", contactDets?.socialMedia?.instagram || "");
    form.setValue("facebook", contactDets?.socialMedia?.facebook || "");
    form.setValue("youtube", contactDets?.socialMedia?.youtube || "");
    form.setValue("tiktok", contactDets?.socialMedia?.tiktok || "");
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/photographer/contactdetails`, {
        userId: userId,
        phoneNum1: values.contactNum1,
        phoneNum2: values.contactNum2,
        email: values.email,
        address: {
          street: values.street,
          city: values.city,
          state: values.state,
          zip: values.zip,
          country: values.country,
        },
        socialMedia: {
          instagram: values.instagram,
          facebook: values.facebook,
          youtube: values.youtube,
          tiktok: values.tiktok,
        },
      });

      if (res.status === 200) {
        if (contactDets)
          setContactDets({
            ...contactDets,
            phoneNum1: values.contactNum1,
            phoneNum2: values.contactNum2,
            email: values.email,
            address: {
              street: values.street,
              city: values.city,
              state: values.state,
              zip: values.zip,
              country: values.country,
            },
            socialMedia: {
              instagram: values.instagram,
              facebook: values.facebook,
              youtube: values.youtube,
              tiktok: values.tiktok,
            },
          })
        toast.success("Contact details updated successfully");
      } else {
        toast.error("Failed to update contact details");
      }
      NotificationService({
        senderId: session?.user?.id,
        receiverId: session?.user.id,
        type: 'contact_updated',
        title: 'contact Updated',
        description: '',
      });
    }
    catch (err) {
      toast.error("An error occured. Please try again.")
    }
  }

  const renderEditButton = () => {
    if (session?.user?.id === userId) {
      return (
        <DialogTrigger className="sm:col-span-4 sm:flex sm:justify-end " onClick={populateForm}>
          <Button
            variant={"outline"}
            size={"icon"}
            className="w-[25px] h-[25px] sm:w-[30px] sm:h-[30px] md:w-[40px] md:h-[40px]"
          >
            <Pencil />
          </Button>
        </DialogTrigger>
      );
    } return null;
  };

  return (
    <Dialog>
      {renderEditButton()}
      <DialogContent className="max-w-[300px] sm:max-w-[480px] max-h-[700px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="sm:mt-2 sm:mb-2 sm:text-2xl">Edit Contact Details</DialogTitle>
          <DialogDescription className="sm:mt-2 sm:mb-4">
            Make changes to your contact details here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="contactNum1"
              render={({ field }) => (
                <FormItem className="grid grid-cols-8 gap-3 mb-2 justify-center items-center ">
                  <FormLabel className="col-span-2 grid place-content-end">
                    Contact
                  </FormLabel>
                  <FormControl className="col-span-3">
                    <Input placeholder="Mobile" {...field} />
                  </FormControl>
                  <FormMessage className="col-span-8" />
                  <FormField
                    control={form.control}
                    name="contactNum2"
                    render={({ field }) => (
                      <FormItem className="col-span-3">
                        <FormControl className="w-full">
                          <Input placeholder="Office" {...field}
                            value={field.value || ''} />
                        </FormControl>
                        <FormMessage className="col-span-12" />
                      </FormItem>
                    )}
                  />
                </FormItem>
              )} />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="grid grid-cols-8 gap-3 mb-2 justify-center items-center ">
                  <FormLabel className="col-span-2 grid place-content-end">
                    Email
                  </FormLabel>
                  <FormControl className="col-span-6">
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage className="col-span-8" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="street"
              render={({ field }) => (
                <FormItem className="grid grid-cols-8 gap-3 mb-2 justify-center items-center ">
                  <FormLabel className="col-span-2 grid place-content-end">
                    Address
                  </FormLabel>
                  <FormControl className="col-span-3">
                    <Input placeholder="Street" {...field} />
                  </FormControl>
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem className="col-span-3">
                        <FormControl className="w-full">
                          <Input placeholder="City" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem className="grid grid-cols-8 gap-3 mb-2 justify-center items-center">
                  <FormLabel className="col-span-2 grid place-content-end">
                  </FormLabel>
                  <FormControl className="col-span-3">
                    <Input placeholder="State" {...field} />
                  </FormControl>
                  <FormMessage className="col-span-8" />
                  <FormField
                    control={form.control}
                    name="zip"
                    render={({ field }) => (
                      <FormItem className="col-span-3">
                        <FormControl>
                          <Input placeholder="Zip" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
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
                    <Input placeholder="Country" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="instagram"
              render={({ field }) => (
                <FormItem className="grid grid-cols-8 gap-3 mb-2 justify-center items-center ">
                  <FormLabel className="col-span-2 grid place-content-end">
                    Instagram
                  </FormLabel>
                  <FormControl className="col-span-6">
                    <Input
                      placeholder="Add Url"
                      {...field}
                      value={field.value || ''}
                      onChange={(e) => field.onChange(e.target.value === '' ? null : e.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="facebook"
              render={({ field }) => (
                <FormItem className="grid grid-cols-8 gap-3 mb-2 justify-center items-center">
                  <FormLabel className="col-span-2 grid place-content-end">
                    Facebook
                  </FormLabel>
                  <FormControl className="col-span-6">
                    <Input
                      placeholder="Add Url"
                      {...field}
                      value={field.value || ''}
                      onChange={(e) => field.onChange(e.target.value === '' ? null : e.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="youtube"
              render={({ field }) => (
                <FormItem className="grid grid-cols-8 gap-3 mb-2 justify-center items-center">
                  <FormLabel className="col-span-2 grid place-content-end">
                    Youtube
                  </FormLabel>
                  <FormControl className="col-span-6">
                    <Input
                      placeholder="Add Url"
                      {...field}
                      value={field.value || ''}
                      onChange={(e) => field.onChange(e.target.value === '' ? null : e.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tiktok"
              render={({ field }) => (
                <FormItem className="grid grid-cols-8 gap-3 mb-2 justify-center items-center">
                  <FormLabel className="col-span-2 grid place-content-end">
                    Tiktok
                  </FormLabel>
                  <FormControl className="col-span-6">
                    <Input
                      placeholder="Add Url"
                      {...field}
                      value={field.value || ''}
                      onChange={(e) => field.onChange(e.target.value === '' ? null : e.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button variant={"outline"} onClick={() => form.reset()}>Reset</Button>
          <Button onClick={() => form.handleSubmit(onSubmit)()}>Save</Button>
        </DialogFooter>
      </DialogContent >
    </Dialog >
  );
};

export default ContactDetsEditForm;
