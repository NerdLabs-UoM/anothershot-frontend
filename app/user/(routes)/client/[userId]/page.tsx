"use client"

import { Separator } from "@/components/ui/separator";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Check, ChevronsUpDown } from "lucide-react";
import { Photographer } from "@/app/lib/types";
import { cn } from "@/app/lib/utils";
import { signOut } from "next-auth/react";

const Client = () => {

    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")
    const [photographers, setPhotographers] = useState<Photographer[]>([])

    const { userId } = useParams();

    useEffect(() => {
        const fetchPhotographers = async () => {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/photographer/get/all`)
            setPhotographers(res.data)
        }
        fetchPhotographers()

        return () => {
            setPhotographers([])
        }
    }, [])

    const handleVisit = () => {
        if (value) {
            window.location.href = `/user/photographer/${value}/profile`
        }
    }

    return (
        <div>
            <div>Client</div>
            <div>{userId}</div>
            <div>
                <Button onClick={() => signOut({
                    callbackUrl: `${window.location.origin}/sign-in`
                })}>Sign Out</Button>
            </div>
            <Separator />

            <div className="flex gap-2">
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="w-[200px] justify-between"
                        >
                            {value
                                ? photographers.find((photographer) => photographer.userId === value)?.name
                                : "Select photographer..."}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                        <Command>
                            <CommandInput placeholder="Search photographer..." />
                            <CommandEmpty>No photographer found.</CommandEmpty>
                            <CommandGroup>
                                {photographers.map((photographer) => (
                                    <CommandItem
                                        key={photographer.userId}
                                        value={photographer.userId}
                                        onSelect={(currentValue) => {
                                            setValue(currentValue === value ? "" : currentValue)
                                            setOpen(false)
                                        }}
                                    >
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                value === photographer.userId ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                        {photographer.name}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </Command>
                    </PopoverContent>
                </Popover>
                <Button onClick={() => handleVisit()}>Visit</Button>
            </div>
        </div>
    );
}

export default Client;
