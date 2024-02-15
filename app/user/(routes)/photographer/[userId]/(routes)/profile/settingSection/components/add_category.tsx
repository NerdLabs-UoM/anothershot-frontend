"use client";

import React from "react";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";

const categories = [
  { label: "Wedding", value: "wed" },
  { label: "Wildlife", value: "wil" },
  { label: "Event", value: "ev" },
  { label: "Portrait", value: "port" },
  { label: "Landscape", value: "lan" },
  { label: "Food", value: "foo" },
  { label: "Street", value: "stre" },
  { label: "Architectural", value: "archi" },
  { label: "Product", value: "prod" },
  { label: "Sports", value: "spor" },
  { label: "Macro", value: "mac" },
] as const;

// const  selectedCategories:string[] = [];
const FormSchema = z.object({
  category: z.string({
    required_error: "Please select a category.",
  }),
});

function AddCategory() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Card className="w-[400px] my-8 sm:w-[540px] h-auto mx-auto">
      <CardHeader>
        <CardTitle>Select your photography categories</CardTitle>
        <CardDescription>
          Select the photography categories you are familiar with
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col w-2/3 pb-2 space-y-6"
          >
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem className="flex gap-2.5 justify-center items-center">
                  <FormLabel className="text-md">Category</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-[200px] justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? categories.find(
                                (category) => category.value === field.value
                              )?.label
                            : "Select Category"}
                          <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search category..." />
                        <CommandEmpty>No category found.</CommandEmpty>
                        <CommandGroup>
                          {categories.map((category) => (
                            <CommandItem
                              value={category.label}
                              key={category.value}
                              onSelect={() => {
                                form.setValue("category", category.value);
                                setSelectedCategories([
                                  ...selectedCategories,
                                  category.label,
                                ]);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  category.value === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {category.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />
            <FormItem className="flex flex-wrap">
              <FormLabel className="items-end text-md">List</FormLabel>
              {selectedCategories.map((category, index) => (
                <Card
                  key={index}
                  className="flex object-fill w-auto gap-3 ml-3 text-sm"
                >
                  {category}
                  {/* {var index:string[] = selectedCategories.splice(index, 1)} */}
                  <Image
                    src="/icons/xMark.svg"
                    alt="image"
                    width={8}
                    height={8}
                    className="mr-2"
                    onClick={() => {
                      const data: string[] = selectedCategories.splice(
                        index,
                        1
                      );
                      const arr: string[] = selectedCategories.filter(
                        (category) => category !== data[0]
                      );
                      setSelectedCategories(arr);
                    }}
                  />
                </Card>
              ))}
            </FormItem>
          </form>
        </Form>

        <Button
          className=" object-none object-right-bottom bg-red-500"
          type="submit"
        >
          Save
        </Button>
      </CardContent>
    </Card>
  );
}

export default AddCategory;