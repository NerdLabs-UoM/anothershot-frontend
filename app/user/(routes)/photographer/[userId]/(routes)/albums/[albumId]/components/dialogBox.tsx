// import {
//     Dialog,
//     DialogContent,
//     DialogDescription,
//     DialogHeader,
//     DialogTitle,
//     DialogTrigger,
//     DialogFooter,
//     DialogClose,
// } from "@/components/ui/dialog";
// import {Button} from "@/components/ui/button";
// import {
//     Form,
//     FormControl,
//     FormDescription,
//     FormField,
//     FormItem,
//     FormLabel,
//     FormMessage,
// } from "@/components/ui/form";
// import {z} from "zod";
// import {zodResolver} from "@hookform/resolvers/zod";
// import {BiSolidPlusSquare} from "react-icons/bi";
// import {useForm} from "react-hook-form";


// const albumFormSchema = z.object({
//     name: z.string().min(2).max(50).regex(/^[A-Za-z0-9]+$/),
//     description: z.string().min(2).max(200).regex(/^[A-Za-z0-9]+$/),
// });



// const DialogBox = () => {

//     const form = useForm<z.infer<typeof albumFormSchema>>({
//         resolver: zodResolver(albumFormSchema),
//         defaultValues: {
//             name: "",
//             description: "",
//         },
//     });

//     return(
//         <Dialog>
//             <DialogTrigger asChild>
//                 <Button variant="ghost" size="icon" className="ml-[80px]">
//                     <BiSolidPlusSquare size={100}/>
//                 </Button>
//             </DialogTrigger>
//             <DialogContent className="sm:max-w-[425px]">
//                 <DialogHeader>
//                     <DialogTitle>Create Album</DialogTitle>
//                     <DialogDescription>
//                         Add details about your album.
//                     </DialogDescription>
//                 </DialogHeader>
//                 <Form {...form}>
//                     <form
//                         onSubmit={form.handleSubmit(onSubmit)}
//                         className="grid gap-4 py-4"
//                     >
//                         <FormField
//                             control={form.control}
//                             name="name"
//                             render={({field}) => (
//                                 <FormItem>
//                                     <div className="grid items-center grid-cols-4 gap-4">
//                                         <FormLabel className="text-right">
//                                             Album Name
//                                         </FormLabel>
//                                         <FormControl>
//                                             <Input
//                                                 placeholder="Enter Album Name"
//                                                 {...field}
//                                                 className="col-span-3"
//                                             />
//                                         </FormControl>
//                                     </div>
//                                     <FormMessage/>
//                                 </FormItem>
//                             )}
//                         />
//                         <FormField
//                             control={form.control}
//                             name="description"
//                             render={({field}) => (
//                                 <FormItem>
//                                     <div className="grid items-center grid-cols-4 gap-4">
//                                         <FormLabel className="text-right">
//                                             Description
//                                         </FormLabel>
//                                         <FormControl>
//                                             <Input
//                                                 placeholder="Enter Description"
//                                                 {...field}
//                                                 className="col-span-3"
//                                             />
//                                         </FormControl>
//                                     </div>
//                                     <FormMessage/>
//                                 </FormItem>
//                             )}
//                         />

//                         <DialogFooter>
//                             <Button type="submit">Create Album</Button>
//                         </DialogFooter>
//                     </form>
//                 </Form>
//             </DialogContent>
//         </Dialog>
//     )
// }