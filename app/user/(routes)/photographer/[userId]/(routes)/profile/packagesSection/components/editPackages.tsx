// import React, { useState } from 'react';
// import {
//   Form,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
//   FormControl,
// } from "@/components/ui/form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import * as z from "zod";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import Select from "./select";
// import Image from 'next/image';
// import { PackageCard } from './packageCard';


// const formSchema = z.object({
//   Cover: z.string(),
//   Name: z.string(),
//   Details: z.string(),
// });

// export default function EditPackages() {
//   const form1 = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       Cover: "",
//       Name: "",
//       Details: "",
//     },
//   });

//   const [cards, setCards] = useState<{ src: string; alt: string; width: number; height: number; name: string; description: string; price: number;  }[]>([]);
  
//   // Function to add a new card
//   const addCard = () => {
//     setCards(prevCards => [
//       ...prevCards,
//       {
//         src: "/images/cover image.svg",
//         alt: `image`,
//         width: 260,
//         height: 173,
//         name: `title1 ${prevCards.length + 1}`,
//         description: `title ${prevCards.length + 2}`,
//         price: 1000,
//         // content2: `Content ${prevCards.length + 2}`,
//         // content3: `Content ${prevCards.length + 3}`
//       }
//     ]);
//   };

  
// // Function to handle form submission
// const handleSubmit = (formData: any) => {
//   // Extract necessary data from the form data
//   const { Cover, Name, Details } = formData;
  
//   // Assuming you want to add the new card with the form data
//   // Modify this part according to your requirement
//   setCards(prevCards => [
//     ...prevCards,
//     {
//       src: "/images/cover image.svg",
//       alt: `image`,
//       width: 260,
//       height: 173,
//       name: Name, // Using the Name as title1
//       description: "", // You may set this to an empty string or derive it from some other data
//       price: Details, // Using the Details as content1
//       // content2: "", // You may set this to an empty string or derive it from some other data
//       // content3: "", // You may set this to an empty string or derive it from some other data
//     }
//   ]);
  
//   form1.reset(); // Reset the form after submission
// };


//   return (
//     <main>
//       <div className="w-full pr-10">
//         <Form {...form1}>
//           <form
//             onSubmit={form1.handleSubmit(handleSubmit)}
//             className="border-black-solid py-1 grid items-center w-screen sm:w-96 h-full"
//           >
//             <h1 className="text-xl font-bold  mt-2 mb-4 ">Edit Packages</h1>
//             <span className="text-gray-500 text-sm mb-2">
//               Make changes to your profile here. Click save when you're done.
//             </span>

//             <div>
//               <Select />
//             </div>

//             <FormField
//               control={form1.control}
//               name="Cover"
//               render={({ field }) => (
//                 <FormItem className="mt-2">
//                   <div className="grid grid-cols-8 gap-4 justify-center items-center mb-3 mt-6">
//                     <FormLabel className="col-span-2 place-content-end grid font-bold-100 text-md ">
//                       Cover
//                     </FormLabel>
//                     <FormControl className="col-span-3 ml-0 ">
//                       <Image src={"/images/cover image.svg"} alt={"Avatar"} width={139} height={78} />
//                     </FormControl>
//                     <FormField
//                       control={form1.control}
//                       name="Cover"
//                       render={({ field }) => (
//                         <FormItem className="mt-2">
//                           <FormControl className="col-span-3 ml-2">
//                             <Button
//                               type="submit"
//                               className="w-20 h-10 items-end justify-center flex bg-black text-white py-2 rounded-md mb-0"
//                             >
//                               Upload2
//                             </Button>
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                   </div>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form1.control}
//               name="Name"
//               render={({ field }) => (
//                 <FormItem className="mt-2">
//                   <div className="grid grid-cols-8 gap-4 justify-center items-center mb-4">
//                     <FormLabel className="col-span-2 place-content-end grid font-bold-100 text-md">
//                       Name
//                     </FormLabel>
//                     <FormControl className="col-span-6 font-bold-100 text-md">
//                       <Input placeholder="package Name" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </div>
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form1.control}
//               name="Details"
//               render={({ field }) => (
//                 <FormItem className="mt-2">
//                   <div className="grid grid-cols-8 gap-4 justify-center items-center mb-3">
//                     <FormLabel className="col-span-2 place-content-end grid font-bold-100 text-md">
//                       Details
//                     </FormLabel>
//                     <FormControl className="col-span-6 font-normal text-md">
//                       <Input placeholder="package details" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </div>
//                 </FormItem>
//               )}
//             />

//             <div className="flex justify-end">
//               <Button type="submit" onClick={AddCard} className="w-32 h-10 items-end flex bg-black text-white py-2 rounded-md mb-0">
//                 Save changes
//               </Button>
//             </div>
//           </form>
//         </Form>
//       </div>
//       {/* New cards added to the packages section */}
//       {/* <div className="card-list flex flex-wrap flex-row justify-center">
//         {cards.map((card, index) => (
//           <PackageCard
//             key={index}
//             src={card.src}
//             alt={card.alt}
//             width={card.width}
//             height={card.height}
//             name={card.name}
//             description={card.description}
//             price={card.price}
//             // content2={card.content2}
//             // content3={card.content3}
//           />
//         ))}
//       </div> */}
//     </main>
//   );
// }
