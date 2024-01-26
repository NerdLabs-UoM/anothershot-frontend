import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import SubmitForm from "../../testimonialSection/components/SubmitForm";

const formSchema = z.object({
  ContactNumber1: z.string().min(10).max(10),
  ContactNumber2: z.string().min(10).max(10),
  Address: z.string(),
  Instagram: z.string(),
  Facebook: z.string(),
  Youtube: z.string(),
  TikTok: z.string(),
});

export default function ContactForm() {
  const form1 = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ContactNumber1: "",
      ContactNumber2: "",
      Address: "",
      Instagram: "",
      Facebook: "",
      Youtube: "",
      TikTok: "",
    },
  });

  return (
    <main>
      <div className="w-full pr-10">
        <Form {...form1}>
          <form
            onSubmit={form1.handleSubmit((SubmitForm) =>
              console.log(SubmitForm)
            )}
            className="border-black-solid py-1 grid items-center w-96 h-full"
          >
            <h1 className="text-xl font-bold  mt-2 mb-4 ">Edit Contacts</h1>
            <span className="text-gray-500 text-sm mb-2">
              Make changes to your profile here. Click save when you're done.
            </span>

            <FormField
              control={form1.control}
              name="ContactNumber1"
              render={({ field }) => (
                <FormItem className="grid grid-cols-8 gap-4 justify-center items-center mb-4">
                  <FormLabel className="col-span-2 grid place-content-end">
                    Contact no
                  </FormLabel>
                  <div className="col-span-6">
                    <div className="grid grid-cols-6 gap-4">
                      <FormControl className="col-span-3">
                        <Input placeholder="+94712469756" {...field} />
                      </FormControl>
                      <FormField
                        control={form1.control}
                        name="ContactNumber2"
                        render={({ field }) => (
                          <FormItem>
                            <div>
                              <div>
                                <FormControl className="col-span-3 w-32">
                                  <Input
                                    placeholder="+94712469756"
                                    {...field}
                                  />
                                </FormControl>
                              </div>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form1.control}
              name="Address"
              render={({ field }) => (
                <FormItem className="mb-4 w-92">
                  <div className="grid grid-cols-8 gap-4 justify-center items-center mb-2">
                    <FormLabel className="col-span-2 grid place-content-end">
                      Address
                    </FormLabel>
                    <FormControl className="col-span-6 h-16">
                      <Input
                        placeholder="Address Line1   Address Line2    Address Line3"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form1.control}
              name="Instagram"
              render={({ field }) => (
                <FormItem className="mt-2">
                  <div className="grid grid-cols-8 gap-4 justify-center items-center mb-4">
                    <FormLabel className="col-span-2 grid place-content-end">
                      Instagram
                    </FormLabel>
                    <FormControl className="col-span-6">
                      <Input placeholder="Insta Url" {...field} />
                    </FormControl>

                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form1.control}
              name="Facebook"
              render={({ field }) => (
                <FormItem className="mt-2">
                  <div className="grid grid-cols-8 gap-4 justify-center items-center mb-4">
                    <FormLabel className="col-span-2 place-content-end grid">
                      Facebook
                    </FormLabel>
                    <FormControl className="col-span-6">
                      <Input placeholder="FB Url" {...field} />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form1.control}
              name="Youtube"
              render={({ field }) => (
                <FormItem className="mt-2">
                  <div className="grid grid-cols-8 gap-4 justify-center items-center mb-3">
                    <FormLabel className="col-span-2 place-content-end grid ">
                      Youtube
                    </FormLabel>
                    <FormControl className="col-span-6">
                      <Input placeholder="YT Url" {...field} />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form1.control}
              name="TikTok"
              render={({ field }) => (
                <FormItem className="mt-4 mb-4">
                  <div className="grid grid-cols-8 gap-4 justify-center items-center mb-2">
                    <FormLabel className="col-span-2 place-content-end grid">
                      TikTok
                    </FormLabel>
                    <FormControl className="col-span-6">
                      <Input placeholder="Tik Tok Url" {...field} />
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button
                type="submit"
                className="w-32 h-10 items-end flex bg-black text-white py-2 rounded-md mb-0"
              >
                Save changes
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </main>
  );
}
