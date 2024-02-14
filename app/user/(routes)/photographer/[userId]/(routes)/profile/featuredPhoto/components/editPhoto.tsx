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
              className="border-black-solid py-1 grid items-center w-96 h-full"
            >
              <h1 className="text-xl font-bold  mt-2 mb-4 ">Edit Packages</h1>
              <span className="text-gray-500 text-sm mb-2">
                Make changes to your profile here. Click save when you're done.
              </span>
              
              <FormField
                control={form1.control}
                name="Cover"
                render={({ field }) => (
                  <FormItem className="mt-2">
                    <div className="grid grid-cols-8 gap-4 justify-center items-center mb-3 mt-6">
                      <div className="flex flex-row flex-col-3 gap-4">
                      <FormLabel className="col-span-2 place-content-end grid ">
                        Cover
                      </FormLabel>
                      <FormControl className="col-span-6 ">
                        <input
                          type="image"
                          id="/images/cover image.png"
                          width="139"
                          height="78"
                          accept="/images/close-up-recording-video-with-smartphone-during-concert-toned-picture 1.png"
                          className="rounded-xl"
                        />
                      </FormControl>
                      <FormField
                        control={form1.control}
                        name="Cover"
                        render={({ field }) => (
                          <FormItem className="mt-2">
                            <div className="grid grid-cols-8 gap-8 justify-center items-center mb-3 mt-6">
                              
                              <FormControl className="col-span-6">
                                <Button
                                  type="submit"
                                  className="w-24 h-10 items-end flex bg-black text-white py-2 rounded-md mb-0"
                                >
                                  Upload
                                </Button>
                              </FormControl>
                              
                              <FormMessage />
                            </div>
                          </FormItem>
                          
                        )}
                      />
                      </div>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form1.control}
                name="Name"
                render={({ field }) => (
                  <FormItem className="mt-2">
                    <div className="grid grid-cols-8 gap-4 justify-center items-center mb-4">
                      <FormLabel className="col-span-2 place-content-end grid">
                        Name
                      </FormLabel>
                      <FormControl className="col-span-6">
                        <Input placeholder="package Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form1.control}
                name="Details"
                render={({ field }) => (
                  <FormItem className="mt-2">
                    <div className="grid grid-cols-8 gap-4 justify-center items-center mb-3">
                      <FormLabel className="col-span-2 place-content-end grid ">
                        Details
                      </FormLabel>
                      <FormControl className="col-span-6">
                        <Input placeholder="package details" {...field} />
                      </FormControl>
                      <FormMessage />
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
  