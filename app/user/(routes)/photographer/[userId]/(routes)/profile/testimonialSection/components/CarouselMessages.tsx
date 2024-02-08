"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import React, { useState } from "react";

interface TestimonialsData {
  id: string;
  name: string;
  feedback: string;
  url: string;
  visibility: boolean;
}

interface CarouselMessagesProps {
  testimonialsData: TestimonialsData[];
}

const CarouselMessages: React.FC<CarouselMessagesProps> = ({
  testimonialsData,
}) => {
  const [testimonials, setTestimonials] = useState(testimonialsData);
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);
  const visibleTestimonials = testimonialsData.filter(
    (testimonial) => testimonial.visibility
  );
  return (
    <div className="flex flex-col">
      {visibleTestimonials.length > 0 && (
        <Carousel
          className="flex flex-row items-start gap-12 flex-1 self-stretch mb-10 w-[360px] sm:w-[550px] md:w-[700px] lg:w-[920px]"
          setApi={setApi}
        >
          <CarouselContent className="w-[365px] sm:w-[565px] md:w-[715px] lg:w-[935px]">
            {visibleTestimonials.map((testimonial) => (
              <CarouselItem key={testimonial.id}>
                <div className="p-1">
                  <Card>
                    <CardContent className="flex flex-col p-[12px] md:p-[20px] lg:p-[40px] ">
                      <div>
                        <Image
                          src="/images/com.png"
                          alt="Description of the image"
                          width={39}
                          height={29}
                          className="w-[20px] h-[15px] sm:w-[30px] sm:h-[25px] md:w-[39px] md:h-[29px]"
                        />
                      </div>
                      <div className="flex flex-col items-start md:flex-row p-0 md:items-center gap-10 flex-1">
                        <span className="flex flex-col justify-center items-end gap-3 flex-1 self-stretch text-right text-slate-950 text-sm sm:text-base">
                          {testimonial.feedback}
                        </span>
                        <Avatar className="w-[70px] h-[70px] sm:w-[100px] sm:h-[100px]" >
                          <AvatarImage src={testimonial.url} alt="@shadcn" />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                      </div>
                      <div>
                        <span className="text-slate-950 text-right font-bold text-base sm:text-2xl">
                          {testimonial.name}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      )}
    </div>
  );
};
export default CarouselMessages;
