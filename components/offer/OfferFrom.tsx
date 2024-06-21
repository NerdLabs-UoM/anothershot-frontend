"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import axios from "axios"
import toast from "react-hot-toast"
import { useSession } from "next-auth/react"
import { NotificationService } from "@/components/notification/notification";

const formSchema = z.object({
  description: z.string().min(2,{
    message: "Description is required"
  }).max(500),
  price: z.number().min(10, {
    message: "Price is required"
  })
})

interface ReportFormProps {
  bookingId:string;
  clientId:string;
  eventName:string;
  setIsOpen: React.Dispatch<
      React.SetStateAction<{
          isOpen:boolean;
      }>>;
  setHasOffer: React.Dispatch<
      React.SetStateAction<{
          hasOffer:boolean;
      }>>
}

const OfferForm:React.FC<ReportFormProps> = ({bookingId,clientId,eventName,setIsOpen,setHasOffer}:ReportFormProps) =>{
    const {data:session} = useSession();
    const userId = session?.user?.id;

    const onSubmit =async (values: z.infer<typeof formSchema>) =>{
      setIsOpen({isOpen:false});
        const offerDetails = {
            clientId: clientId,
            photographerId: userId,
            description: values.description,
            bookingsId: bookingId,
            clientName: eventName,
            price: values.price,
        }
        const createOffer = async()=>{
          await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/api/offer/create-offer`,
            offerDetails
          ).then((res) => {
            toast.success("offer created successfully", { duration: 2000 });
            
          })
          .catch((error) => {
            toast.error("Failed to create offer", { duration: 2000 });
          })
        }
        setHasOffer({hasOffer: true})
        await createOffer();
    };

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          description:"",
          price: 0,          
        },
    });
      return(
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Description" {...field} />
                </FormControl>
                <FormDescription>
                  offer description
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
            <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                <FormItem>
                    <FormControl>
                    <Input type="number" min={100} {...field}
                        onChange={event => field.onChange(+event.target.value)}
                    />
                    </FormControl>
                    <FormDescription>
                        price of the offer
                    </FormDescription>
                    <FormMessage />
                </FormItem>
                )}/>
              <div className="flex flex-row justify-end">          
              <Button type="submit" >Submit</Button>
              </div>
        </form>
      </Form>
      )
}

export default OfferForm