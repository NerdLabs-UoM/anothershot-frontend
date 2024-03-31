"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Check, ChevronsUpDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/app/lib/utils";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
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
import toast from "react-hot-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PhotographerCategory } from "@/app/lib/types";
import {
    fetchCategories,
    updateCategories,
    fetchCategoryById,
} from "../serviceData";

const FormSchema = z.object({
    category: z.string({
        required_error: "Please select a category.",
    }),
});

const AddCategorySection = () => {
    const [categories, setCategories] = useState<PhotographerCategory[]>([]);
    const [categoryList, setCategoryList] = useState<
        { label: string; value: PhotographerCategory }[]
    >([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [categoriesArray, setCategoriesArray] = useState<
        { label: string; selected: boolean }[]
    >([]);
    const { userId } = useParams();

    useEffect(() => {
        const fetchCategory = async () => {
            const data = await fetchCategories();
            setCategoryList(
                Object.entries(data).map(([key, value]) => ({
                    label:
                        key.toLowerCase().charAt(0).toUpperCase() +
                        key.toLowerCase().slice(1),
                    value: value as PhotographerCategory, // Ensure value is of type PhotographerCategory
                }))
            );
        };
        fetchCategory();

        const fetchCatById = async () => {
            const data = await fetchCategoryById(userId);
            setSelectedCategories(data);
        };
        fetchCatById();
    }, []);

    useEffect(() => {
        setCategoriesArray(
            categoryList.map((category) => ({
                label: category.label,
                selected: false,
            }))
        );
    }, [categoryList]);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });

    async function onSubmit() {
        try {
            await updateCategories(selectedCategories, userId);
            toast.success("Categories updated successfully");
        } catch (e) {
            toast.error("Error updating categories");
            console.log("eerror", e);
        }
    }

    return (
        <Card className="w-[350px] my-8 lg:w-[540px] h-auto mx-auto">
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
                        className="flex flex-col w-2/3 pb-2 mx-auto space-y-6 md:w-full"
                    >
                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem className="items-center justify-center">
                                    <div className="flex gap-2.5 ">
                                        <FormLabel className="text-md">
                                            Category
                                        </FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant="outline"
                                                        role="combobox"
                                                        className={cn(
                                                            "w-[200px] justify-between",
                                                            !field.value &&
                                                                "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value
                                                            ? categoriesArray.find(
                                                                  (category) =>
                                                                      category.label ===
                                                                      String(
                                                                          field.value
                                                                      )
                                                              )?.label
                                                            : "Select Category"}
                                                        <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-[200px] p-0">
                                                <Command>
                                                    <CommandInput placeholder="Search category..." />
                                                    <ScrollArea className="border rounded-md h-72">
                                                        <CommandEmpty>
                                                            No category found.
                                                        </CommandEmpty>
                                                        <CommandGroup>
                                                            {categoriesArray?.map(
                                                                (category) => {
                                                                    return (
                                                                        !category.selected && (
                                                                            <CommandItem
                                                                                value={
                                                                                    category.label
                                                                                }
                                                                                key={
                                                                                    category.label
                                                                                }
                                                                                onSelect={() => {
                                                                                    form.setValue(
                                                                                        "category",
                                                                                        category.label
                                                                                    );
                                                                                    category.selected =
                                                                                        true;
                                                                                    setSelectedCategories(
                                                                                        (
                                                                                            prevCategories
                                                                                        ) => [
                                                                                            ...prevCategories,
                                                                                            category.label,
                                                                                        ]
                                                                                    );
                                                                                }}
                                                                                className="hover:bg-gray-200"
                                                                                disabled={selectedCategories.includes(
                                                                                    category.label
                                                                                )}
                                                                            >
                                                                                <Check
                                                                                    className={cn(
                                                                                        "mr-2 h-4 w-4",
                                                                                        category.label ===
                                                                                            field.value
                                                                                            ? "opacity-100"
                                                                                            : "opacity-0"
                                                                                    )}
                                                                                />
                                                                                {
                                                                                    category.label
                                                                                }
                                                                            </CommandItem>
                                                                        )
                                                                    );
                                                                }
                                                            )}
                                                        </CommandGroup>
                                                    </ScrollArea>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormItem className="flex flex-wrap">
                            <FormLabel className="items-end text-md">
                                List
                            </FormLabel>
                            {selectedCategories?.map((category, index) => (
                                <Badge
                                    variant="outline"
                                    key={index}
                                    className="flex object-fill w-auto gap-3 ml-3 text-sm"
                                >
                                    {category}
                                    <Image
                                        src="/icons/xMark.svg"
                                        alt="image"
                                        width={8}
                                        height={8}
                                        className="mr-2 cursor-pointer"
                                        onClick={() => {
                                            const data: string[] = [
                                                ...selectedCategories,
                                            ];
                                            data.splice(index, 1);

                                            setSelectedCategories(data);
                                        }}
                                    />
                                </Badge>
                            ))}
                        </FormItem>
                        <div className="justify-end mt-[20px] ml-[10rem] lg:ml-[20rem]">
                            <Button
                                className="w-[80px] text-center bg-red-600"
                                type="submit"
                            >
                                Save
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}

export default AddCategorySection;
