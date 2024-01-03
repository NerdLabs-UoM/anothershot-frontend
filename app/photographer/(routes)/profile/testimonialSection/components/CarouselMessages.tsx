"use client"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious,type CarouselApi} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image";
import React, { Component,useState, useEffect } from 'react'


const testimonialsData = [
  {
    id: 1,
    name: 'Esther Howard',
    message: 'The quality of their work is outstanding. The attention to detail and their editing skills truly  I am always impressed and the whole process, from booking to receiving the final photos, was seamless.',
    url: '/images/avatar.png'
  },
  {
    id: 2,
    name: 'John Smith',
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.',
    url:'/images/ellipse.png'
  },

];

const CarouselMessages =() => {
  
  
    const [api, setApi] = React.useState<CarouselApi>()
    const [current, setCurrent] = React.useState(0)
    const [count, setCount] = React.useState(0)

    React.useEffect(() => {
      if (!api) {
        return
      }
   
      setCount(api.scrollSnapList().length)
      setCurrent(api.selectedScrollSnap() + 1)
   
      api.on("select", () => {
        setCurrent(api.selectedScrollSnap() + 1)
      })
    }, [api])

    return (
      <div className="flex flex-col">
        <Carousel className="flex flex-col items-start gap-12 flex-1 self-stretch" setApi={setApi}>
          <CarouselContent> 
            {testimonialsData.map((testimonial) => (
              <CarouselItem key={testimonial.id}>
                <div className="p-1">
                  <Card >
                    <CardContent className="flex flex-col p-[40px] ">
                      <div>
                        <Image
                          src="/images/com.png"
                          alt="Description of the image"
                          width={39}
                          height={29}
                        />
                      </div>
                      <div className="flex p-0 items-center gap-10 flex-1">
                        <span className="flex flex-col justify-center items-end gap-3 flex-1 self-stretch text-right text-slate-950">{testimonial.message}</span>
                        <img src={testimonial.url} width={100} height={100}/>
                      </div>
                      <div>
                        <span className="text-slate-950 text-right font-bold text-2xl">{testimonial.name}</span>
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

      </div>
    )
  
}

export default CarouselMessages