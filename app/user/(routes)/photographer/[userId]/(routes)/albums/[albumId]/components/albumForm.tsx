import { useEffect, useState } from "react";
import { BiSolidPlusSquare } from "react-icons/bi";
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
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Album } from "@/app/lib/types";
import { Pencil } from "lucide-react";

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
    visibile: z
        .boolean()
        .default(false)
        .optional(),
    price: z
    .preprocess((value) => parseFloat(z.string().parse(value)), z.number().optional())
});

interface AlbumFormProps {
    userId: string | string[];
    albumId?: string |string[];
    isPhotographer: boolean;
    isCreateAlbum?: boolean;
    album?:Album;
    onAlbumEdit?: (newAlbum:Album) => void;
    onAlbumSubmit?: (album:Album) => void;
}

const AlbumForm: React.FC<AlbumFormProps> = ({ userId,albumId, isPhotographer, isCreateAlbum, album,onAlbumEdit,onAlbumSubmit }) => {
    const [isOpen, setIsOpen] = useState(false);

    const form = useForm<z.infer<typeof albumFormSchema>>({
        resolver: zodResolver(albumFormSchema),
        defaultValues: {
            name: album?.name || "",
            description: isCreateAlbum ? "" : album?.description,
            visibile: isCreateAlbum ? false:(album?.visibility === "PUBLIC"),
            price:album?.price || 0
        },
    });

    useEffect(()=>{
        if (album){
            form.reset({
                name: album.name || "",
                description: album.description || "",
                visibile: (album?.visibility === "PUBLIC") || false,
            })
        }
    },[album,form])

    function onSubmit(values: z.infer<typeof albumFormSchema>) {
        setIsOpen(false);
        const visibilityVal = values.visibile ? 'PUBLIC' : 'PRIVATE';
        async function Create() {
            try {
                const res = await axios.post(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/photographer/${userId}/createAlbum`,
                    {
                        photographerId: userId,
                        name: values.name,
                        description: values.description,
                        visibility: visibilityVal,
                        price:values.price
                    }
                );
                console.log("create album",res);
                toast.success("Album created successfully");
                if (onAlbumSubmit) {
                    onAlbumSubmit(res.data);
                }
            } catch (e) {
                toast.error("Error creating album");
            }
        }
        
        async function Edit() {
            try {
                const res = await axios.put(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/photographer/${albumId}/editalbum`,
                    { albumId: albumId, name:values.name, description:values.description,visibility:visibilityVal,price:values.price}
                );
                toast.success("Album edited successfully");
                if(onAlbumEdit){
                    onAlbumEdit(res.data)
                }
                console.log("edir album ",res)
            }catch(e){
                toast.error("Error editing album");
            }
        }

        if (isCreateAlbum) {
            Create();
        } else {
            Edit();
        }
        form.reset();
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger >
                {isPhotographer && (isCreateAlbum ? <BiSolidPlusSquare size={50} className="ml-[80px]" /> : <Pencil color="black" size={15} className="mt-2" />)}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{isCreateAlbum ? "Create Album" : "Edit Album"}</DialogTitle>
                    <DialogDescription>
                        {isCreateAlbum ? "Add details about your album." : "Edit album details."}
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
                                                className="col-span-3 h-32"
                                            />
                                        </FormControl>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="visibile"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="flex items-center gap-4">
                                        <FormLabel className="text-right">
                                            Visible to Public
                                        </FormLabel>
                                        <FormControl>
                                            <Switch
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                                className="col-span-3" />
                                        </FormControl>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="grid items-center grid-cols-4 gap-4">
                                        <FormLabel className="text-right">
                                        Price (USD)
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter Price"
                                                {...field}
                                                className="col-span-2"
                                                type="number"
                                            />
                                        </FormControl>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button type="submit">{isCreateAlbum?"Create Album":"Save"}</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

export default AlbumForm;