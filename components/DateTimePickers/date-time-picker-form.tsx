"use client";

import { format, isBefore, startOfToday } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/app/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { TimePickerDemo } from "./time-picker-demo";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface DateTimePickerFormProps {
    setDate: React.Dispatch<React.SetStateAction<Date>>;
    date: Date;
}

const formSchema = z.object({
    dateTime: z.date(),
});

type FormSchemaType = z.infer<typeof formSchema>;

export function DateTimePickerForm(
    props: DateTimePickerFormProps
) {
    const form = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema),
    });

    const today = startOfToday();

    function onDateChange(date: Date) {
        props.setDate(date);
    }

    return (
        <Form {...form}>
            <form
                className="flex items-end gap-4 justify-center"
            >
                <FormField
                    control={form.control}
                    name="dateTime"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <Popover>
                                <FormControl>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className={cn(
                                                "w-[280px] justify-start text-left font-normal",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {field.value ? (
                                                format(field.value, "PPP HH:mm:ss")
                                            ) : (
                                                <span>Pick a date & time</span>
                                            )}
                                        </Button>
                                    </PopoverTrigger>
                                </FormControl>
                                <PopoverContent className="w-auto p-0 max-h-64 overflow-y-auto">
                                <div className="p-3 border-t border-border flex items-center justify-center">
                                        <TimePickerDemo
                                            setDate={(date) => {
                                                if (date && !isBefore(date, today)) {
                                                    field.onChange(date);
                                                    props.setDate(date);
                                                }
                                            }}
                                            date={props.date}
                                        />
                                    </div>
                                    <Calendar
                                        mode="single"
                                        selected={props.date}
                                        onSelect={(date) => {
                                            if (date && !isBefore(date, today)) {
                                                field.onChange(date);
                                                props.setDate(date);
                                            }
                                        }}
                                        initialFocus
                                        disabled={(date) => isBefore(date, today)}
                                    />
                                </PopoverContent>
                            </Popover>
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    );
}
