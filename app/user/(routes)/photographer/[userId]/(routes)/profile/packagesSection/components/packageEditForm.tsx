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
import { Pencil } from "lucide-react";
import Image from 'next/image'
import SubmitForm from "../../testimonialSection/components/SubmitForm";
import { Package } from "@/app/lib/types";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import {
    CldUploadWidgetResults,
    CldUploadWidgetInfo,
    CldUploadWidget,
} from "next-cloudinary";
import { useParams, useRouter } from "next/navigation";
import { Photographer } from "@/app/lib/types";
import React from "react";

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
    price: z.string(),
    coverPhoto: z.string()
});
const PackageEditForm: React.FC<PackageEditFormProps> = ({ packages, packageProp }) => {
    const { data: session } = useSession()
    const [isPhotographer, setIsPhotographer] = useState(true);
    const [selectedPackageId, setSelectedPackageId] = useState<string>("")
    const [isNew, setIsNew] = useState<boolean>(false)
    const [coverImageURL, setCoverImageURL] = useState("https://res.cloudinary.com/dts2l2pnj/image/upload/v1708486003/oooolhqi3vcrtcqhhy3b.jpg");
    const { userId } = useParams();
    const [photographer, setPhotographer] = useState<Photographer>();
    const router = useRouter(); const handleRefresh = () => {
        router.refresh();
    };
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            price: "",
            coverPhoto: ""
        }
    });

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
            price: form.getValues("price")
        }
        try {
            const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/photographer/packages/edit`, data)
            const updatedPackage: Package = response.data;

            // Update the package list state by replacing the old package with the updated one
            packageProp(prevPackageList => prevPackageList.map(packageItem =>
                packageItem.id === selectedPackageId ? updatedPackage : packageItem
            ));
            toast.success("Package details updated successfully.")
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
            price: form.getValues("price"),
        };

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/photographer/packages/create`, data);
            const newPackage: Package = response.data; // Assuming the response contains the newly created package

            // Update the package list state by adding the new package
            packageProp(prevPackageList => [...prevPackageList, newPackage]);

            toast.success("Package created successfully.");
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
        }
        catch (error) {
            toast.error("An error occurred. Please try again.")
        }
    }

    return (
        <main>
            <div className="w-full pr-10">
                <Dialog>
                    <DialogTrigger className="sm:col-span-4 sm:flex sm:justify-end ">
                        <Button
                            variant={"outline"}
                            size={"icon"}
                            className="w-[25px] h-[25px] sm:w-[30px] sm:h-[30px] md:w-[40px] md:h-[40px] "
                        >
                            <Pencil />
                        </Button>
                    </DialogTrigger>
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
                                <Button variant={'destructive'} onClick={() => handleDeletePackage()}>Delete</Button>
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
