"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { BiSolidPlusSquare } from "react-icons/bi";
import { MoreVertical } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Card } from "@/components/ui/card";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Masonry from "react-masonry-css";
import toast from "react-hot-toast";
import { Album } from "@/app/lib/types";

const albumFormSchema = z.object({
    name: z
        .string()
        .min(2)
        .max(50)
        .regex(/^[A-Za-z0-9 ]+$/, { message: "Enter valid Name" }),
    description: z
        .string()
        .min(2)
        .max(500, { message: "Description exceeds maximum limit" }),
});

const AlbumPage = () => {
    const [isPhotographer, setIsPhotographer] = useState<boolean>(false);
    const [album, setAlbum] = useState<
        {
            name: string;
            description: string;
            id: string;
            image: string;
        }[]
    >([]);
    const { data: session } = useSession();
    const { userId } = useParams();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/api/photographer/${userId}/getalbums`
            );
            const albumsData = res.data.map((album: Album) => ({
                name: album.name,
                description: album.description,
                id: album.id,
                image: album.images[0]
                    ? album.images[0].image
                    : "/images/albumcover.png",
            }));
            setAlbum(albumsData);
        };
        fetchData();
    }, [userId]);

    useEffect(() => {
        if (userId == session?.user.id) {
            setIsPhotographer(true);
        }
    }, [userId, session]);

    const form = useForm<z.infer<typeof albumFormSchema>>({
        resolver: zodResolver(albumFormSchema),
        defaultValues: {
            name: "",
            description: "",
        },
    });

    function onSubmit(values: z.infer<typeof albumFormSchema>) {
        setIsOpen(false);
        async function Create() {
            try {
                const res = await axios.post(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/photographer/${userId}/createAlbum`,
                    { photographerId: userId, ...values }
                );
                toast.success("Album created successfully");
                setAlbum((prevAlbums) => [
                    ...prevAlbums,
                    {
                        name: values.name,
                        description: values.description,
                        id: res.data.id,
                        image: "/images/albumcover.png",
                    },
                ]);
            } catch (e) {
                toast.error("Error creating album");
            }
        }

        Create();
        form.reset();
    }

    const handleDeleteAlbum = async (id:string) => {
        try {
            const res = await axios.delete(
                `${process.env.NEXT_PUBLIC_API_URL}/api/photographer/${id}/deletealbum`
            );
            setAlbum((prevAlbums) =>
                prevAlbums.filter((album) => album["id"] !== id)
            );
            toast.success("Album deleted successfully");
        } catch (error) {
            toast.error("Error deleting album");
        }
    }

    return (
        <div className="mb-[50px]">
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    {isPhotographer && (
                        <Button
                            variant="ghost"
                            size="icon"
                            className="ml-[80px]"
                        >
                            <BiSolidPlusSquare size={100} />
                        </Button>
                    )}
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
                                render={({ field }) => (
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
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="grid items-center grid-cols-4 gap-4">
                                            <FormLabel className="text-right">
                                                Description
                                            </FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Enter Description"
                                                    {...field}
                                                    className="col-span-3"
                                                />
                                            </FormControl>
                                        </div>
                                        <FormMessage />
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
                        640: 1,
                    }}
                    className="flex gap-4"
                    columnClassName=""
                >
                    {album?.map(
                        (
                            album: {
                                name: string;
                                description: string;
                                id: string;
                                image: string;
                            },
                            index: number
                        ) => (
                            <>
                            
                            <Card
                                key={index}
                                className="w-[300px] mb-9 mx-3 h-[400px] rounded-[40px] overflow-hidden relative"
                            >
                                <Image
                                    src={album.image}
                                    alt="album cover"
                                    layout="fill"
                                    objectFit="cover"
                                />
                                <div className="absolute bottom-0 left-0 w-full h-[120px] bg-gradient-to-t from-black to-transparent rounded-b-[40px] p-4 flex items-center justify-between">
                                    <div className="flex flex-col justify-center">
                                        <HoverCard>
                                            <HoverCardTrigger asChild>
                                                <div>
                                                    <h3 className="text-xl font-semibold text-white">
                                                        {album["name"]}
                                                    </h3>
                                                    <p className="text-sm text-white">
                                                        {album[
                                                            "description"
                                                        ].slice(0, 30)}
                                                    </p>
                                                </div>
                                            </HoverCardTrigger>
                                            <HoverCardContent className="h-auto w-60">
                                                <h6 className="text-xl font-semibold">
                                                    {album["name"]}
                                                </h6>
                                                <p className="text-sm ">
                                                    {album["description"]}
                                                </p>
                                            </HoverCardContent>
                                        </HoverCard>
                                    </div>
                                    <div className="flex space-x-2">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <MoreVertical
                                                    size={32}
                                                    color="#ffffff"
                                                    strokeWidth={2.5}
                                                />
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="w-56">
                                                <DropdownMenuGroup>
                                                    {isPhotographer && (
                                                        <>
                                                            <AlertDialog>
                                                            <AlertDialogTrigger>
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    className="w-full h-4 py-4 ml-0 pr-28"
                                                                    >
                                                                    Delete Album
                                                                </Button>
                                                            </AlertDialogTrigger>
                                                                    <AlertDialogContent>
                                                                        <AlertDialogHeader>
                                                                            <AlertDialogTitle>Are you sure to delete this Album ?</AlertDialogTitle>
                                                                            <AlertDialogDescription>
                                                                            This action cannot be undone. This will permanently remove from your Albums.
                                                                            </AlertDialogDescription>
                                                                        </AlertDialogHeader>
                                                                        <AlertDialogFooter>
                                                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                            <AlertDialogAction onClick={()=>handleDeleteAlbum(album["id"])}>Continue</AlertDialogAction>
                                                                        </AlertDialogFooter>
                                                                    </AlertDialogContent>
                                                                </AlertDialog>
                                                            <DropdownMenuItem>
                                                                <Link
                                                                    href={{
                                                                        pathname: `albums/${album["id"]}`,
                                                                        query: {
                                                                            view: true,
                                                                            albumName:
                                                                                album[
                                                                                    "name"
                                                                                ],
                                                                            albumDescription:
                                                                                album[
                                                                                    "description"
                                                                                ],
                                                                        },
                                                                    }}
                                                                >
                                                                    Edit Album
                                                                </Link>
                                                            </DropdownMenuItem>
                                                        </>
                                                    )}
                                                    <DropdownMenuItem>
                                                        <Link
                                                            href={{
                                                                pathname: `albums/${album["id"]}`,
                                                                query: {
                                                                    view: false,
                                                                    albumName:
                                                                        album[
                                                                            "name"
                                                                        ],
                                                                    albumDescription:
                                                                        album[
                                                                            "description"
                                                                        ],
                                                                },
                                                            }}
                                                        >
                                                            View Album
                                                        </Link>
                                                    </DropdownMenuItem>
                                                </DropdownMenuGroup>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </div>
                            </Card>
                            </>
                        )
                    )}
                </Masonry>
            </div>
        </div>
    );
};

export default AlbumPage;
