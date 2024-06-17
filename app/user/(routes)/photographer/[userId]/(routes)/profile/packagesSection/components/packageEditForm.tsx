"use client";

import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormControl,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { set, useForm } from "react-hook-form";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusSquare } from 'lucide-react';
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
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
} from "@/components/ui/alert-dialog"
import { Pencil } from "lucide-react";
import { Package } from "@/app/lib/types";
import { useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { NotificationService } from "@/components/notification/notification";

interface PackageEditFormProps {
    packages: Package[];
    packageProp: React.Dispatch<React.SetStateAction<Package[]>>;
}

const formSchema = z.object({
    packageId: z.string(),
    name: z
        .string()
        .min(2, {
            message: "Username must be at least 2 characters long",
        })
        .max(50),
    description: z
        .string()
        .min(2, {
            message: "Username must be at least 2 characters long",
        })
        .max(200),
    price: z.number().positive({
        message: "Price must be a positive number",
    }),
    coverPhoto: z.string()
});

const PackageEditForm: React.FC<PackageEditFormProps> = ({ packages, packageProp }) => {
    const { data: session } = useSession()
    const [selectedPackageId, setSelectedPackageId] = useState<string>("")
    const [isNew, setIsNew] = useState<boolean>(false)
    const { userId } = useParams();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            price: 0,
            coverPhoto: ""
        }
    });

    const priceString = form.getValues("price").toString();
    const priceNumber = parseFloat(priceString);

    const handlePackageChange = (value: string) => {
        const selectedPackage = packages.find((packageItem) => packageItem.id === value)
        if (selectedPackage) {
            form.setValue("name", selectedPackage.name)
            form.setValue("description", selectedPackage.description)
            form.setValue("price", selectedPackage.price)
        }
        setSelectedPackageId(value)
    }

    const handleSaveChanges = async () => {
        const data = {
            photographerId: session?.user?.id,
            packageId: selectedPackageId,
            name: form.getValues("name"),
            description: form.getValues("description"),
            price: priceNumber
        }
        try {
            const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/photographer/packages/edit`, data)
            const updatedPackage: Package = response.data;
            packageProp(prevPackageList => prevPackageList.map(packageItem =>
                packageItem.id === selectedPackageId ? updatedPackage : packageItem
            ));
            if(updatedPackage.price < 0){
                toast.error("Price must be a positive number");
                return;
            }
            toast.success("Package details updated successfully.")
            NotificationService({
                senderId: session?.user?.id, 
                receiverId: session?.user.id,
                type: 'packages_updated',
                title: 'packages Updated',
                description: '',
              });
        }
        catch (error) {
            toast.error("An error occurred. Please try again.")
        }
    }

    const handleCreatePackage = async () => {
        if (!session?.user?.id) return;
        const data = {
            photographerId: session.user.id,
            name: form.getValues("name"),
            description: form.getValues("description"),
            coverPhotos: [],
            price: priceNumber,
        };
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/photographer/packages/create`, data);
            const newPackage: Package = response.data
            if (packages.some((packages: Package) => packages.name === newPackage.name)) {
                toast.error("Package already exists.");
            } 
            else {
                packageProp(prevPackageList => [...prevPackageList, newPackage]);
                if(newPackage.price<0){
                    toast.error("Price must be a positive number");
                    return;
                }
                toast.success("Package created successfully.");
            }
            NotificationService({
                senderId: session?.user?.id, 
                receiverId: session?.user.id,
                type: 'packages_created',
                title: 'packages created',
                description: '',
              });
        } catch (error) {
            toast.error("An error occurred. Please try again.");
        }
    };

    const handleDeletePackage = async () => {
        if (session?.user?.id === undefined) return
        const data = {
            photographerId: session.user.id,
            packageId: selectedPackageId
        }
        try {
            const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/photographer/packages/delete`, { data })
            packageProp(prevPackageList => prevPackageList.filter(packageItem => packageItem.id !== selectedPackageId));
            toast.success("Package deleted successfully.")
            NotificationService({
                senderId: session?.user?.id, 
                receiverId: session?.user.id,
                type: 'packages_deleted',
                title: 'packages Deleted',
                description: '',
              });
        }
        catch (error) {
            toast.error("An error occurred. Please try again.")
        }
    }

    const renderEditButton = () => {
        if (session && session.user && session.user.id === userId) {
            return (
                <DialogTrigger className="sm:col-span-4 sm:flex sm:justify-end ">
                    <Button
                        variant={"outline"}
                        size={"icon"}
                        className="w-[25px] h-[25px] sm:w-[30px] sm:h-[30px] md:w-[40px] md:h-[40px]"
                    >
                        <Pencil />
                    </Button>
                </DialogTrigger>
            );
        }
        return null;
    };

    return (
        <main>
            <div className="w-full sm:pr-10">
                <Dialog>
                    {renderEditButton()}
                    <DialogContent className="max-w-[300px] sm:max-w-[450px]">
                        <DialogHeader>
                            <DialogTitle className="sm:mt-2 sm:mb-2 sm:text-2xl">Edit Package Details</DialogTitle>
                            <DialogDescription className="sm:mt-2 sm:mb-4">
                                Make changes to your package details here. Click save when you're done.
                            </DialogDescription>
                        </DialogHeader>
                        <Button variant={"default"} size={"lg"} onClick={() => setIsNew(true)}><PlusSquare />Add New Package</Button>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(handleSaveChanges)}>
                                <FormField
                                    control={form.control}
                                    name="packageId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Packages</FormLabel>
                                            <Select onValueChange={(value: string) => handlePackageChange(value)}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a package" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent >
                                                    <SelectGroup>
                                                        {packages.map((packageItem) => (
                                                            <SelectItem key={packageItem.id} value={packageItem.id}>
                                                                <SelectLabel>{packageItem.name}</SelectLabel>
                                                            </SelectItem>
                                                        ))}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="name"
                                                    placeholder="package name"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="description"
                                                    placeholder="package description"
                                                    maxLength={100} // Set the maximum character limit
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="price"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Price</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="price"
                                                    placeholder="price"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </form>
                        </Form>
                        <DialogFooter>
                            {!isNew && (

                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button variant={'destructive'}
                                        >Delete</Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This action cannot be undone. This will permanently delete your
                                                packages and remove your data from our servers.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => handleDeletePackage()}>Continue</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>

                            )}
                            <Button variant={"outline"} onClick={() => {
                                form.reset()
                                setIsNew(false)
                            }}>Cancel</Button>
                            {!isNew && <Button onClick={() => handleSaveChanges()}>
                                Update
                            </Button>
                            }
                            {isNew && <Button onClick={() => handleCreatePackage()}>
                                Save
                            </Button>}
                        </DialogFooter>
                    </DialogContent >
                </Dialog >
            </div >
        </main >
    );
};
export default PackageEditForm;