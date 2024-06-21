import React from "react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import axios from "axios";
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
import toast from "react-hot-toast";
import { NotificationService } from "@/components/notification/notification";
import { useSession } from "next-auth/react";
const roles = [
  { label: "Pending", value: "PENDING" },
  { label: "Paid", value: "PAID" },
] as const;

const formSchema = z.object({
  status: z.string({
    required_error: "Update Status.",
  }),
});
interface EditFormProps {
  paymentId: String | undefined;
  photographerId: String | undefined;
  amount: number | undefined;
}

const StatusForm: React.FC<EditFormProps> = ({
  paymentId,
  photographerId,
  amount,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: "",
    },
  });


  const { data: session } = useSession();

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    axios
      .put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/payment/update-payment-status/${paymentId}`,
        {
          status: values.status,
        }
      )
      .then((response) => {
        toast.success("Payment status updated successfully");
      })
      .catch((error) => {
        toast.error("Error updating payment status");
      });

    NotificationService({
      senderId: session?.user?.id,
      receiverId: photographerId?.toString(),
      type: "payment",
      title: "Payment done",
      description: `payment of ${amount} has been sent to your bank account`,
    });
  };

  const userForm = (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="grid grid-cols-8 gap-3 mb-2 justify-center items-center ">
              <FormLabel className="col-span-2 grid place-content-end">
                Status
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
                        ? roles.find(
                            (language) => language.value === field.value
                          )?.label
                        : "Update payment status"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search Type" />
                    <CommandEmpty>No language found.</CommandEmpty>
                    <CommandGroup>
                      {roles.map((role) => (
                        <CommandItem
                          value={role.label}
                          key={role.value}
                          onSelect={() => {
                            form.setValue("status", role.value);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              role.value === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {role.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );

  return <>{userForm}</>;
};

export default StatusForm;
