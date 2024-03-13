"use client";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Testimonial } from "@/app/lib/types";



interface CarouselMessagesProps {
  testimonialsData: Testimonial[];
}

const CarouselMessages: React.FC<CarouselMessagesProps> = ({
  testimonialsData,
}) => {

  const [visibleTestimonials, setVisibleTestimonials] = useState<Testimonial[]>(testimonialsData);
  console.log(testimonialsData);
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [windowWidth, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    const updateWindowWidth = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", updateWindowWidth);
    updateWindowWidth();
    return () => {
      window.removeEventListener("resize", updateWindowWidth);
    };
  }, []);

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

  useEffect(() => {
    const visibleTestimonials = testimonialsData.filter(
      (testimonial) => testimonial.visibility === "PUBLIC"
    );
    console.log(visibleTestimonials);
    setVisibleTestimonials(visibleTestimonials);
  }, [testimonialsData]);

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(
          <svg
            key={i}
            className="w-4 h-4 text-yellow-300"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
        );
      } else {
        stars.push(
          <svg
            key={i}
            className="w-4 h-4 text-gray-300"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
        );
      }
    }
    return stars;
  };
  return (
    <div className="flex flex-col ml-3 sm:ml-0">
      {visibleTestimonials.length > 0 ? (
        <Carousel
          className="flex flex-row items-start gap-12 flex-1 self-stretch mb-10 w-[360px] sm:w-[550px] md:w-[700px] lg:w-[920px] xl:w-[1200px]"
          setApi={setApi}
        >
          <CarouselContent className="w-[365px] sm:w-[565px] md:w-[715px] lg:w-[935px] xl:w-[1215px]">
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
                          {testimonial.review}
                        </span>
                        <Avatar className="w-[70px] h-[70px] sm:w-[100px] sm:h-[100px]" >
                          <AvatarImage src={testimonial.client.user.image || undefined} alt="@shadcn" />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                      </div>
                      <div>
                        <span className="text-slate-950 text-right font-bold text-base sm:text-2xl">
                          {testimonial.client.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        {renderStars(testimonial.rating)}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {window.innerWidth > 779 && <CarouselPrevious />}
          {window.innerWidth > 779 && <CarouselNext />}
        </Carousel>
      ) : (
        <div className="text-center text-slate-950 mt-4">No testimonials to display.</div>
      )}
    </div>
  );
};
export default CarouselMessages;
