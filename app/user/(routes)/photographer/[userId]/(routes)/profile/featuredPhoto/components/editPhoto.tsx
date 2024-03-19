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
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Pencil } from "lucide-react";


import Image from 'next/image'
import SubmitForm from "../../testimonialSection/components/SubmitForm";

const formSchema = z.object({
  Cover: z.string(),
  Name: z.string(),
  Details: z.string(),
});

export default function EditPhoto() {
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
        <Dialog>
          <DialogTrigger className="sm:col-span-4 sm:flex sm:justify-end ">
            {/* <Button 
              variant={"outline"}
              size={"icon"}
              className="w-[25px] h-[25px] sm:w-[30px] sm:h-[30px] md:w-[40px] md:h-[40px] "
            > */}
              <Pencil />
            {/* </Button> */}
          </DialogTrigger>

          <div>
            <DialogContent className="max-w-[300px] sm:max-w-[450px]">
              <DialogHeader>
                <DialogTitle className="sm:mt-2 sm:mb-2 sm:text-2xl">Edit Contact Details</DialogTitle>
                <DialogDescription className="sm:mt-2 sm:mb-4">
                  Make changes to your contact details here. Click save when you're done.
                </DialogDescription>
              </DialogHeader>

              <Form {...form1}>
                <form
                  onSubmit={form1.handleSubmit((onsubmit) =>
                    console.log(SubmitForm)
                  )}
                >
                  <FormField
                    control={form1.control}
                    name="Cover"
                    render={({ field }) => (
                      <FormItem className="grid grid-cols-10 gap-1 mb-2 justify-center items-center ">
                        <FormLabel className="col-span-4  grid place-content-end pr-6">
                          Featured Photo 1
                        </FormLabel>
                        <FormControl className="col-span-3">
                          <Image src={"/images/cover image.svg"} alt={"Avatar"} width={78} height={78} className="mt-2" />
                        </FormControl>
                        <FormMessage />
                        <FormField
                          control={form1.control}
                          name="Cover"
                          render={({ field }) => (
                            <FormItem className="col-span-3">
                              <FormControl className="w-full">
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
                      </FormItem>
                    )} />

                  <FormField
                    control={form1.control}
                    name="Cover"
                    render={({ field }) => (
                      <FormItem className="grid grid-cols-10 gap-1 mb-2 justify-center items-center ">
                        <FormLabel className="col-span-4 grid place-content-end pr-6">
                          Featured Photo 2
                        </FormLabel>
                        <FormControl className="col-span-3">
                          <Image src={"/images/cover image.svg"} alt={"Avatar"} width={78} height={78} className="mt-2" />
                        </FormControl>
                        <FormMessage />
                        <FormField
                          control={form1.control}
                          name="Cover"
                          render={({ field }) => (
                            <FormItem className="col-span-3">
                              <FormControl className="w-full">
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
                      </FormItem>
                    )} />
                  <FormField
                    control={form1.control}
                    name="Cover"
                    render={({ field }) => (
                      <FormItem className="grid grid-cols-10 gap-1 mb-2 justify-center items-center">
                        <FormLabel className="col-span-4 grid place-content-end pr-6">
                          Featured Photo 3
                        </FormLabel>
                        <FormControl className="col-span-3">
                          <Image src={"/images/cover image.svg"} alt={"Avatar"} width={78} height={78} className="mt-2" />
                        </FormControl>
                        <FormMessage />
                        <FormField
                          control={form1.control}
                          name="Cover"
                          render={({ field }) => (
                            <FormItem className="col-span-3">
                              <FormControl className="w-full">
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
                      </FormItem>
                    )} />

                  <FormField
                    control={form1.control}
                    name="Cover"
                    render={({ field }) => (
                      <FormItem className="grid grid-cols-10 gap-1 mb-2 justify-center items-center ">
                        <FormLabel className="col-span-4 grid place-content-end pr-6">
                          Featured Photo 4
                        </FormLabel>
                        <FormControl className="col-span-3">
                          <Image src={"/images/cover image.svg"} alt={"Avatar"} width={78} height={78} className="mt-2" />
                        </FormControl>
                        <FormMessage />
                        <FormField
                          control={form1.control}
                          name="Cover"
                          render={({ field }) => (
                            <FormItem className="col-span-3">
                              <FormControl className="w-full">
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
                      </FormItem>
                    )} />
                  


                </form>
              </Form>
              <DialogFooter>
                <Button variant={"outline"} onClick={() => form1.reset()}>Cancel</Button>
                <Button onClick={() => form1.handleSubmit((onsubmit) =>
                  console.log(SubmitForm)
                )}>
                  Save</Button>
              </DialogFooter>
            </DialogContent >
          </div>
        </Dialog >
      </div >
    </main >
  );
}
