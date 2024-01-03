"use client"

import React, { Component, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

interface TestimonialsData {
  id: string;
  name: string;
  message: string;
  url: string;
  visibility: boolean;
}

const testimonialsData: TestimonialsData[] = [
  {
    id: "1",
    name: 'Esther Howard',
    message: 'The quality of their work is outstanding. The attention to detail and their editing skills truly  I am always impressed and the whole process, from booking to receiving the final photos, was seamless.',
    url: '/images/avatar.png',
    visibility: true
  },
  {
    id: "2",
    name: 'John Smith',
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.',
    url: '/images/ellipse.png',
    visibility: true
  },
  {
    id: "3",
    name: 'Nick Smith',
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.',
    url: '/images/ellipse.png',
    visibility: true
  },
  {
    id: "4",
    name: 'Ann Smith',
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.',
    url: '/images/ellipse.png',
    visibility: true
  },
];

const EditButton = () => {

  const [testimonials, setTestimonials] = useState(testimonialsData);
  const [selected, setSelected] = useState("");
  const [checked, setChecked] = useState(false);

  const handleSubmit = () => {
    console.log("submit")
  }

  const handleVisibility = () => {
    const items = testimonials.map((item) =>
      item.id === selected ? { ...item, visibility: !item.visibility } : item
    )
    setTestimonials(items)
  }

  const handleValueChange = (value: string) => {
    const item = testimonials.find((item) =>
      value === item.id
    )
    item?.visibility ? setChecked(true) : setChecked(false)
    setSelected(value)
  }

  return (
      <div className="flex justify-between space-x-[1000px] mb-16">
        <p className="text-5xl font-extrabold">Testimonials</p>
        <Dialog>
          <DialogTrigger>
            <Button variant={"outline"} size={"icon"}>
              <Pencil />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Testmonials</DialogTitle>
              <DialogDescription>
                Make changes to your tesmonials here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-5 py-4 ">
              <div className="grid grid-cols-4 items-center gap-4">
                <Select onValueChange={(value) => handleValueChange(value)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a testimonial" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {testimonials.map((item, key) => {
                        return (
                          <SelectItem key={key} value={item.id} >
                            {item.name}
                          </SelectItem>
                        )
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid items-center gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox onCheckedChange={handleVisibility} id="visibility"  />
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
              <Button type="submit" onClick={() => handleSubmit()}>Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
  )
}

export default EditButton;
