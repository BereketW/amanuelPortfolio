"use client";
import { X } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper";

export default function Imageslider() {
  const [isopen, setIsOpen] = useState(false);
  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isopen)}>
        <X />
      </button>
      <div className={"flex w-full items-center justify-between"}>
        <button
          onClick={() => count < gallery.length && setCount(count + 1)}
          className={"next-btn"}
        >
          <ChevronLeft />
        </button>
        <Swiper
          className="w-[280px] max-sm:flex-1 sm:w-[400px] md:w-[600px] lg:w-[800px] xl:w-[1000px] 2xl:w-[1200px] relative mb-10 h-[600px]"
          // style={{ border: "1px solid red", width: "400px" }}
          slidesPerView={1}
          // pagination={true}
          // navigation={true}
          spaceBetween={20}
          // slidesPerView={2}
          modules={[Pagination, Navigation, Autoplay]}
          pagination={{ clickable: true }}
          navigation={{
            nextEl: ".next-btn",
            prevEl: ".prev-btn",
          }}

          // className="w-full"
        >
          {/*{gallery.map((image) => (*/}
          {gallery.map((image) => (
            <SwiperSlide
              key={image.id}
              className=" w-[500px] max-sm:w-[400px] absolute max-sm:pr-4  bottom-0 left-0 justify-center items-center"
            >
              <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 ">
                <Image
                  src={image.image}
                  alt={`Slide ${image.id}`}
                  className="object-contain min-w-[400px]   h-full border border-gray-300"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <button
          onClick={() => count > 0 && setCount(count - 1)}
          className={"prev-btn"}
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}
