"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Offer } from "@/app/lib/types"

const formSchema = z.object({
  description: z.string().min(2,{
    message: "Description is required"
  }).max(500),
  price: z.number().min(0),
  package: z.string().min(0)
})
const roles = [
  { label: "Wedding", value: "WEDDING" },
  { label: "WildLife", value: "WILDLIFE" },
  { label: "Graduation", value: "GRADUATION" },
] as const;


const OfferForm = () =>{
    const [values,setValues] = useState<Offer>();

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values);
    };

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          description:"",
          price: 0,          
        },
    });
      return(
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel>Description</FormLabel> */}
                <FormControl>
                  <Input placeholder="Description" {...field} />
                </FormControl>
                <FormDescription>
                  offer description
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
            <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                <FormItem>
                    {/* <FormLabel>Price</FormLabel> */}
                    <FormControl>
                    <Input type="number" min={100} {...field}
                        onChange={event => field.onChange(+event.target.value)}
                    />
                    </FormControl>
                    <FormDescription>
                        price of the offer
                    </FormDescription>
                    <FormMessage />
                </FormItem>
                )}/>

             

            <FormField
                control={form.control}
                name="package"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-8 gap-3 mb-2 justify-center items-center ">
                    <FormLabel className="col-span-2 grid place-content-end">
                      Package
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
                                  form.setValue("package", role.value);
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
              <div className="flex flex-row justify-end">          
              <Button type="submit" >Submit</Button>
              </div>
        </form>
      </Form>
      )
}

export default OfferForm