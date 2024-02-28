"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Check, ChevronsUpDown, Pencil } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { isEqual } from 'lodash';
import { cn } from "@/app/lib/utils";
import { Testimonial } from "@/app/lib/types";

interface EditButtonProps {
  testimonialsData: Testimonial[];
}

const EditButton: React.FC<EditButtonProps> = ({
  testimonialsData,
}) => {
  const { userId } = useParams();
  const { data: session } = useSession();
  const [testimonials, setTestimonials] = useState<Testimonial[]>(testimonialsData);
  const [checked, setChecked] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTestimonials(testimonialsData);
  }, [testimonialsData]);

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const changedTestimonials = testimonials.filter(testimonial =>
        testimonial.visibility !== testimonialsData.find(testimonialData => testimonialData.id === testimonial.id)?.visibility
      );
      const changedTestimonialsIds = changedTestimonials.map(testimonial => testimonial.id);
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/photographer/${userId}/profile/testimonials/visibility`,
        { testimonialId: changedTestimonialsIds }
      );
      console.log("Testimonials updated successfully:", response.data);
      toast.success("Testimonials updated successfully!");
    } catch (error) {
      console.error("Error updating testimonials:", error);
      toast.error("Failed to update testimonials");
    } finally {
      setLoading(false);
    }
  };

  const handleVisibility = () => {
    const items = [...testimonials];
    const updatedItems = items.map(item => {
      if (item.id === value) {
        item.visibility = isEqual(item.visibility, "PUBLIC") ? "PRIVATE" : "PUBLIC";
      }
      return item;
    });
    setTestimonials(updatedItems);
    setChecked(!checked);
  };

  const handleValueChange = (value: string) => {
    const testimonial = testimonials.find(
      (testimonial) => value === testimonial.id
    );
    isEqual(testimonial?.visibility, "PUBLIC") ? setChecked(true) : setChecked(false);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(
          <svg
            key={i}
            className="w-3 h-3 text-yellow-300"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
        );
      } else {
        stars.push(
          <svg
            key={i}
            className="w-3 h-3 text-gray-300"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
        );
      }
    }
    return stars;
  };

  const renderEditButton = () => {
    if (session?.user?.id === userId) {
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
    <div className="grid grid-cols-1 sm:grid-cols-5 mb-16 mx-3">
      <p className="font-extrabold text-2xl md:text-5xl">Testimonials</p>
      <Dialog>
        {renderEditButton()}
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Testmonials</DialogTitle>
            <DialogDescription>
              Make changes to your tesmonials here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-20 sm:gap-6 py-4 ">
            <div className="grid grid-cols-4 items-center gap-4">
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[180px] justify-between"
                  >
                    {value
                      ? testimonials.find(
                        (testimonial) => testimonial.id === value
                      )?.client.name
                      : "Select testimonial..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search testimonials..." />
                    <CommandEmpty>No framework found.</CommandEmpty>
                    <CommandGroup>
                      {testimonials.map((testimonial) => (
                        <HoverCard key={testimonial.id}>
                          <HoverCardTrigger asChild>
                            <CommandItem
                              key={testimonial.id}
                              value={testimonial.id}
                              onSelect={(currentValue) => {
                                setValue(
                                  currentValue === value ? "" : currentValue
                                );
                                handleValueChange(currentValue);
                                setOpen(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  isEqual(testimonial.visibility, "PUBLIC") ? "opacity-100" : "opacity-0"
                                )}
                              />
                              {testimonial.client.name}
                            </CommandItem>
                          </HoverCardTrigger>
                          <HoverCardContent className="w-[500px]">
                            <div>
                              <img
                                src="/images/com.png"
                                alt="Description of the image"
                                width={20}
                                height={15}
                              />
                            </div>
                            <div className="flex p-0 items-center gap-10 flex-1">
                              <span className="flex flex-col justify-center items-end gap-3 flex-1 self-stretch text-right text-slate-950 text-xs">
                                {testimonial.review}
                              </span>
                              <Avatar className="w-[70px] h-[70px]" >
                                <AvatarImage src={testimonial.client.user.image || undefined} alt="@shadcn" />
                                <AvatarFallback>CN</AvatarFallback>
                              </Avatar>
                            </div>
                            <div>
                              <span className="text-slate-950 text-right font-bold text-xl">
                                {testimonial.client.name}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                              {renderStars(testimonial.rating)}
                            </div>
                          </HoverCardContent>
                        </HoverCard>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            <div className="grid items-center gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={checked}
                  onCheckedChange={handleVisibility}
                  id="visibility"
                />
                <label
                  htmlFor="visibility"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Public Visible
                </label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={() => handleSubmit()}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditButton;
