"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import axios from "axios"
import { toast } from 'react-hot-toast'
import { useEffect, useState } from "react"
import { LoaderCircle, MapPin, Star } from 'lucide-react';
import { useRouter } from "next/navigation"
import { Skeleton } from "@/components/ui/skeleton";

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Photographer, PhotographerCategory } from "@/app/lib/types";
import { Input } from "@/components/ui/input"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const FormSchema = z.object({
    photographername: z.string().optional(),
    location: z.string().optional(),
    category: z.string().optional(),
})

const SearchPage = () => {

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })
    const router = useRouter()
    const [categories, setCategories] = useState<
        { label: string; value: PhotographerCategory }[]
    >([]);
    const [photographers, setPhotographers] = useState<Photographer[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/photographer/getallcategories`);
                setCategories(
                    Object.entries(res.data).map(([key, value]) => ({
                        label:
                            key.toLowerCase().charAt(0).toUpperCase() +
                            key.toLowerCase().slice(1),
                        value: value as PhotographerCategory,
                    }))
                );
            } catch (e) {
                toast.error("Error fetching categories");
            }
        };
        fetchCategory();
    }, [])

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        setLoading(true);
        const { photographername, location, category } = data;
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/home/search`, {
                params: {
                    name: photographername,
                    location,
                    category,
                }
            });
            setPhotographers(res.data);
            setLoading(false);
        } catch (e) {
            toast.error("Error fetching photographers");
            setLoading(false);
        }
    }

    return (
        <main className="p-5">
            <div className="w-full flex justify-center">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-wrap gap-2">
                        <FormField
                            control={form.control}
                            name="photographername"
                            render={({ field }) => (
                                <FormItem className="lg:w-64 md:w-auto w-full">
                                    <FormControl>
                                        <Input {...field} type="text" placeholder="Photographer Name" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="location"
                            render={({ field }) => (
                                <FormItem className="lg:w-64 md:w-48 w-32">
                                    <FormControl>
                                        <Input {...field} type="text" placeholder="Location" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem className="lg:w-64">
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Category" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {categories.map((category) => (
                                                <SelectItem key={category.value} value={category.value}>
                                                    {category.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-24">
                            {
                                loading ? <LoaderCircle className="animate-spin" /> : 'Search'
                            }
                        </Button>
                    </form>
                </Form>
            </div>
            <Separator className="my-5" />
            <div className="my-5 flex gap-2 flex-wrap">
            {loading ? (
               <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 w-full h-screen ml-20">
               {Array.from({ length: 8 }).map((_, index) => (
                 <Skeleton key={index} className="h-1/2 w-4/5 rounded-lg" />
               ))}
             </div>
            ) : (
                photographers.map((photographer) => (
                    <Card key={photographer.id} className="md:w-[340px] w-full">
                        <CardHeader className="grid grid-cols-[1fr_110px] items-start gap-4 space-y-0">
                            <div className="space-y-1">
                                <CardTitle className="flex align-middle">
                                    <Avatar className="flex justify-center items-center cursor-pointer"
                                        onClick={() => router.push(`/user/photographer/${photographer.userId}/profile`)}
                                    >
                                        <AvatarImage
                                            src={photographer.user.image}
                                            alt={photographer.user.image}
                                            width={10}
                                            height={10}
                                        />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <Button variant="link" className="ml-2 text-sm font-semibold"
                                        onClick={() => router.push(`/user/photographer/${photographer.userId}/profile`)}
                                    >
                                        {photographer.name.toLocaleUpperCase()}
                                    </Button>
                                </CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-sm text-foreground">
                                <div className="flex items-center">
                                    <Star size={16} />
                                    <span className="ml-2">
                                        {
                                            (photographer.testimonial.reduce((acc, curr) => acc + curr.rating, 0) / photographer.testimonial.length).toFixed(1) || 'Newbie'
                                        }
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    <MapPin size={16} />
                                    <span className="ml-2">{photographer.contactDetails?.address?.city}</span>
                                </div>
                                <Separator className="my-3" />
                                <div className="flex mt-2">
                                    {
                                        photographer.category.map((category) => (
                                            <Badge key={category} className="mr-1 cursor-pointer">
                                                {category}
                                            </Badge>
                                        ))
                                    }
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))
            )}
            </div>
        </main>
    );
}

export default SearchPage;
