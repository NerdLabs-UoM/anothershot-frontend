"use client";

import {Button} from "@/components/ui/button";
import React, {useEffect, useState} from "react";
import {BiSolidPlusSquare} from "react-icons/bi";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";
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
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {useParams, usePathname, useRouter} from "next/navigation";
import axios from "axios";
import Image from "next/image";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {Album, Photographer} from "@/app/lib/types";
import {useSession} from "next-auth/react";
import Masonry from "react-masonry-css";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem, DropdownMenuPortal, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {MoreVertical, Settings} from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";

const albumFormSchema = z.object({
    name: z.string()
        .min(2)
        .max(50)
        .regex(/^[A-Za-z0-9 ]+$/, {message: "Enter valid Name"}),
    description: z.string()
        .min(2)
        .max(200)
        .regex(/^[A-Za-z0-9 ]+$/, {message: "Enter valid Description"}),
});

const AlbumPage = () => {
    const [isPhotographer, setIsPhotographer] = useState<boolean>(false);
    const [albumCoverImage, setAlbumCoverImage] = useState<string>(
        "https://res.cloudinary.com/dcn64hytu/image/upload/v1710027623/my%20album1/tuzt7eqztsfe67equdxq.jpg"
    );
    const [album, setAlbum] = useState<{ name: string; description: string; id: string }[]>([]);
    const [albumId, setAlbumId] = useState<string>("");
    const pathname = usePathname();
    const router = useRouter();
    const {data: session} = useSession();
    const {userId} = useParams();
    const [isOpen, setIsOpen] = useState(false);
    const form = useForm<z.infer<typeof albumFormSchema>>({
        resolver: zodResolver(albumFormSchema),
        defaultValues: {
            name: "",
            description: "",
        },
    });

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/api/photographer/${userId}/getalbums`
            );
            const albumsData = res.data.map((album: Album) => ({
                name: album.name,
                description: album.description,
                id: album.id
            }));
            setAlbum(albumsData);
            console.log("Hi this ==>", albumsData);

        };
        fetchData();
    }, []);

    useEffect(() => {
        if (userId == session?.user.id) {
            setIsPhotographer(true);
        }
    }, [userId, session]);

    // useEffect(() => {
    //     if (session) {
    //         setSessionId(session?.user.id);
    //     }
    // }, [session]);

    function onSubmit(values: z.infer<typeof albumFormSchema>) {
        async function Create() {
            try {
                const res = await axios.post(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/photographer/${userId}/createAlbum`,
                    {photographerId: userId, ...values}
                );
                toast.success("Album created successfully");
                setAlbum((prevAlbums) => [
                    ...prevAlbums,
                    {name: values.name, description: values.description, id: res.data.id},
                ]);
            } catch (e) {
                toast.error("Error creating album");
            }
        }

        Create();
        form.reset();
    }

    const handleDeleteAlbum = async (id: string) => {
        try {
            await axios.delete(
                `${process.env.NEXT_PUBLIC_API_URL}/api/photographer/${id}/deletealbum`
            );
            setAlbum(prevAlbums => prevAlbums.filter((album) => album["id"] !== id));
            toast.success("Album deleted successfully");
        } catch (e) {
            console.log("error ==> ", e)
            toast.error("Error deleting album");
        }
    };

    return (
        console.log("this is the album", album),
        <div className="mb-[50px]">
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="ml-[80px]">
                        <BiSolidPlusSquare size={100}/>
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Create Album</DialogTitle>
                        <DialogDescription>
                            Add details about your album.
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="grid gap-4 py-4"
                        >
                            <FormField
                                control={form.control}
                                name="name"
                                render={({field}) => (
                                    <FormItem>
                                        <div className="grid items-center grid-cols-4 gap-4">
                                            <FormLabel className="text-right">
                                                Album Name
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter Album Name"
                                                    {...field}
                                                    className="col-span-3"
                                                />
                                            </FormControl>
                                        </div>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({field}) => (
                                    <FormItem>
                                        <div className="grid items-center grid-cols-4 gap-4">
                                            <FormLabel className="text-right">
                                                Description
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter Description"
                                                    {...field}
                                                    className="col-span-3"
                                                />
                                            </FormControl>
                                        </div>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <DialogFooter>
                                <Button type="submit">Create Album</Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>

            <div className="container mx-auto">
                <Masonry
                    breakpointCols={{
                        default: 4,
                        1024: 3,
                        768: 2,
                        640: 1
                    }}
                    className="flex gap-4"
                    columnClassName=""
                >
                    {album?.map((album: { name: string, description: string, id: string }, index: number) => (
                        <Card
                            key={index}
                            className="w-[300px] my-3 mx-3 h-[400px] rounded-[40px] overflow-hidden relative"
                        >
                            <img
                                className="absolute top-0 left-0 object-cover w-full h-full"
                                src="/images/animal.png"
                                alt="Background Image"
                            />
                            <div
                                className="absolute bottom-0 left-0 w-full h-[120px] bg-gradient-to-t from-black to-transparent rounded-b-[40px] p-4 flex items-center justify-between">
                                <div className="flex flex-col justify-center">
                                    <h3 className="text-xl font-semibold text-white">{album["name"]}</h3>
                                    <p className="text-sm text-white">{album["description"]}</p>
                                </div>
                                <div className="flex space-x-2">


                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                role="save"
                                                size="sm"
                                                className="flex items-center justify-center gap-2"
                                            >
                                                <MoreVertical size={32} color="#ffffff" strokeWidth={2.5}/>
                                            </Button>
                                        </DropdownMenuTrigger>

                                        <DropdownMenuContent className="w-56">
                                            <DropdownMenuGroup>
                                                {isPhotographer &&
                                                    <>
                                                        <DropdownMenuItem
                                                            onClick={() => handleDeleteAlbum(album["id"])}>Delete
                                                            Album
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem>
                                                            <Link href={`albums/${album["id"]}?view=true`}>
                                                                Edit Album
                                                            </Link>
                                                        </DropdownMenuItem>
                                                    </>
                                                }
                                                <DropdownMenuItem>
                                                    <Link href={`albums/${album["id"]}?view=false`}>
                                                        View Album
                                                    </Link>
                                                </DropdownMenuItem>
                                            </DropdownMenuGroup>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                        </Card>
                    ))}
                </Masonry>
            </div>
        </div>
    );
};

export default AlbumPage;