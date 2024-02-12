import { useState } from "react";

import CarouselMessages from "./components/CarouselMessages";
import EditButton from "./components/EditButton";
import SubmitForm from "./components/SubmitForm";

interface TestimonialsData {
  id: string;
  name: string;
  feedback: string;
  url: string;
  visibility: boolean;
}
const testimonialsData: TestimonialsData[] = [
  {
    id: "1",
    name: "Esther Howard",
    feedback:
      "The quality of their work is outstanding. The attention to detail and their editing skills truly  I am always impressed and the whole process, from booking to receiving the final photos, was seamless.",
    url: "/images/avatar.png",
    visibility: true,
  },
  {
    id: "2",
    name: "John Smith",
    feedback:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.",
    url: "/images/ellipse.png",
    visibility: true,
  },
  {
    id: "3",
    name: "Nick Smith",
    feedback:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.",
    url: "/images/ellipse.png",
    visibility: true,
  },
  {
    id: "4",
    name: "Ann Smith",
    feedback:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.",
    url: "/images/ellipse.png",
    visibility: true,
  },
];
const TestMonialsSection = () => {
  const [testimonials, setTestimonials] = useState(testimonialsData);
  return (
    <div className="flex flex-col items-center w-full border-y border-transparent py-40">
      <EditButton
        testimonialsData={testimonials}
        setTestimonialsData={setTestimonials}
      />
      <CarouselMessages 
        testimonialsData={testimonials} 
      />
      <SubmitForm
        testimonialsData={testimonials}
        setTestimonialsData={setTestimonials}
      />
    </div>
  );
};

export default TestMonialsSection;
