"use client";

import React, { useState } from "react";
import {useSession} from "next-auth/react";
import { useParams } from "next/navigation";
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
import { cn } from "@/lib/utils";

interface TestimonialsData {
  id: string;
  name: string;
  feedback: string;
  url: string;
  visibility: boolean;
}

interface EditButtonProps {
  testimonialsData: TestimonialsData[];
  setTestimonialsData: React.Dispatch<React.SetStateAction<TestimonialsData[]>>;
}

const EditButton: React.FC<EditButtonProps> = ({
  testimonialsData,
  setTestimonialsData,
}) => {
  const { userId } = useParams();
  const { data: session } = useSession();
  const [testimonials, setTestimonials] = useState(testimonialsData);
  const [checked, setChecked] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const handleSubmit = () => {
    setTestimonialsData(testimonials);
    toast.success("Testimonials updated successfully!");
  };

  const handleVisibility = () => {
    const items = [...testimonials];
    const testimonial = items.find((testimonial) => value === testimonial.id);
    testimonial!.visibility = !testimonial?.visibility;
    setTestimonials(items);
    setChecked(!checked);
  };

  const handleValueChange = (value: string) => {
    const testimonial = testimonials.find(
      (testimonial) => value === testimonial.id
    );
    testimonial?.visibility ? setChecked(true) : setChecked(false);
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
          <div className="grid grid-cols-2 gap-6 py-4 ">
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
                      )?.name
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
                        <HoverCard>
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
                                  testimonial.visibility
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {testimonial.name}
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
                                {testimonial.feedback}
                              </span>
                              <Avatar className="w-[70px] h-[70px]" >
                                <AvatarImage src={testimonial.url} alt="@shadcn" />
                                <AvatarFallback>CN</AvatarFallback>
                              </Avatar>
                            </div>
                            <div>
                              <span className="text-slate-950 text-right font-bold text-xl">
                                {testimonial.name}
                              </span>
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
