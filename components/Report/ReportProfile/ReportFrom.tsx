"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/app/lib/utils";
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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { NotificationService } from "@/components/notification/notification";

const formSchema = z.object({
  description: z
    .string()
    .min(2, {
      message: "Description is required",
    })
    .max(500),
  subject: z.string().min(10,"Subject must not be empty"),
});
const subjects = [
  { label: "Inappropriate Content", value: "Inappropriate Content" },
  { label: "Fraudulent Activity", value: "Fraudulent Activity" },
  { label: "Intellectual Property", value: "Intellectual Property" },
  { label: "Privacy Violations", value: "Privacy Violations" },
  { label: "Any other Reason", value: "Any other Reason" },
] as const;
interface ReportFormProps {
  setIsOpen: React.Dispatch<
      React.SetStateAction<{
          isOpen:boolean;
      }>>
}

const ReportForm:React.FC<ReportFormProps> = ({setIsOpen}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      subject: "",
    },
  });
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const param = useParams();

  const photographerId = param.userId;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsOpen({isOpen:false});
    const offerDetails = {
      description: values.description,
      subject: values.subject,
      userId: userId,
      photographerId: photographerId,
    };
    const createOffer = async () => {
      await axios
        .post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/report/create-report`,
          offerDetails
        )
        .then((res) => {
          toast.success("Report created successfully", { duration: 2000 });
          NotificationService({
            senderId: session?.user?.id, 
            receiverId: session?.user.id, 
            type: 'Profile_reported',
            title: `You have Reported a user profile`,
            description: 'You have reported ',
          });
        })
        .catch((error) => {
          toast.error("Failed to create report", { duration: 2000 });
        });
    };
    await createOffer();
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem className="grid grid-cols-8 gap-3 mb-2 justify-center items-center ">
                <FormLabel className="col-span-2 grid place-content-end">
                  Subject
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl className="col-span-6">
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-[200px] justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? subjects.find(
                              (language) => language.value === field.value
                            )?.label
                          : "Select subject"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search Type" />
                      <CommandEmpty>No subjects</CommandEmpty>
                      <CommandGroup>
                        {subjects.map((subject) => (
                          <CommandItem
                            value={subject.label}
                            key={subject.value}
                            onSelect={() => {
                              form.setValue("subject", subject.value);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                subject.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {subject.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage className="flex justify-end col-span-8"/>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="grid grid-cols-8 gap-3 mb-2 justify-center items-center ">
                <FormLabel className="col-span-2 grid place-content-end">
                  Description
                </FormLabel>
                <FormControl className="col-span-6">
                  <Input placeholder="Description" {...field} />
                </FormControl>
                <FormMessage className="flex justify-end col-span-8"/>
              </FormItem>
            )}
          />
          <div className="flex flex-row justify-end">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ReportForm;
