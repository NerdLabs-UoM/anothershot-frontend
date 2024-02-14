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

import Image from 'next/image'

const formSchema = z.object({
  Cover: z.string(),
  Name: z.string(),
  Details: z.string(),
});

export default function EditPackages() {
  const form1 = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Cover: "",
      Name: "",
      Details: "",
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
            className="border-black-solid py-1 grid items-center w-screen sm:w-96 h-full"
          >
            <h1 className="text-xl font-bold  mt-2 mb-4 ">Edit Profile</h1>
            <span className="text-gray-500 text-sm mb-2">
              Make changes to your profile here. Click save when you're done.
            </span>


            <FormField
              control={form1.control}
              name="Cover"
              render={({ field }) => (
                <FormItem className="mt-2">
                  <div className="grid grid-cols-8 gap-1 justify-center items-center mb-3 mt-2">
                    <FormLabel className="col-span-4 place-content-end grid font-bold-100 text-md px-6">
                      Featured Photo 1
                    </FormLabel>
                    <FormControl className="col-span-2 ml-0 ">


                      <Image src={"/images/cover image.svg"} alt={"Avatar"} width={78} height={78} className="mt-2" />
                    </FormControl>
                    <FormField
                      control={form1.control}
                      name="Cover"
                      render={({ field }) => (
                        <FormItem className="mt-2">
                          <FormControl className="col-span-2">
                            <Button
                              type="submit"
                              className="w-20 h-10 items-end justify-center flex bg-black text-white py-2 rounded-md mb-0"
                            >
                              Upload
                            </Button>
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form1.control}
              name="Cover"
              render={({ field }) => (
                <FormItem className="mt-2">
                  <div className="grid grid-cols-8 gap-1 justify-center items-center mb-3 mt-2">
                    <FormLabel className="col-span-4 place-content-end grid font-bold-100 text-md px-6">
                      Featured Photo 2
                    </FormLabel>
                    <FormControl className="col-span-2 ml-0 ">


                      <Image src={"/images/cover image.svg"} alt={"Avatar"} width={78} height={78} className="mt-2" />
                    </FormControl>
                    <FormField
                      control={form1.control}
                      name="Cover"
                      render={({ field }) => (
                        <FormItem className="mt-2">
                          <FormControl className="col-span-2 ">
                            <Button
                              type="submit"
                              className="w-20 h-10 items-end justify-center flex bg-black text-white py-2 rounded-md mb-0"
                            >
                              Upload
                            </Button>
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form1.control}
              name="Cover"
              render={({ field }) => (
                <FormItem className="mt-2">
                  <div className="grid grid-cols-8 gap-1 justify-center items-center mb-3 mt-2">
                    <FormLabel className="col-span-4 place-content-end grid font-bold-100 text-md px-6  ">
                      Featured Photo 3
                    </FormLabel>
                    <FormControl className="col-span-2 ml-0 ">


                      <Image src={"/images/cover image.svg"} alt={"Avatar"} width={78} height={78} className="mt-2" />
                    </FormControl>
                    <FormField
                      control={form1.control}
                      name="Cover"
                      render={({ field }) => (
                        <FormItem className="mt-2">
                          <FormControl className="col-span-2 ">
                            <Button
                              type="submit"
                              className="w-20 h-10 items-end justify-center flex bg-black text-white py-2 rounded-md mb-0"
                            >
                              Upload
                            </Button>
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form1.control}
              name="Cover"
              render={({ field }) => (
                <FormItem className="mt-2">
                  <div className="grid grid-cols-8 gap-1 justify-center items-center mb-3 mt-2">
                    <FormLabel className="col-span-4 place-content-end grid font-bold-100 text-md px-6  ">
                      Featured Photo 4
                    </FormLabel>
                    <FormControl className="col-span-2 ml-0 ">


                      <Image src={"/images/cover image.svg"} alt={"Avatar"} width={78} height={78} className="mt-2" />
                    </FormControl>
                    <FormField
                      control={form1.control}
                      name="Cover"
                      render={({ field }) => (
                        <FormItem className="mt-2">
                          <FormControl className="col-span-2 ">
                            <Button
                              type="submit"
                              className="w-20 h-10 items-end justify-center flex bg-black text-white py-2 rounded-md mb-0"
                            >
                              Upload
                            </Button>
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button
                type="submit"
                className="w-32 h-10 items-end flex bg-black text-white py-2 rounded-md mb-0 mt-4 mr-2"
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
