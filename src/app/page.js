"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

// Import your bathtub images
import a from "../../public/1.jpg";
import b from "../../public/2.jpg";
import c from "../../public/3.jpg";
import d from "../../public/4.jpg";
import e from "../../public/5.jpg";
import f from "../../public/6.jpg";
import FeaturedProducts from "@/components/homepage/FeaturedProducts";
import AboutSection from "@/components/homepage/AboutSection";
import WhyChooseUs from "@/components/homepage/WhyChooseUs";
import CategorySection from "@/components/homepage/CategorySection";
import GoogleReviews from "@/components/homepage/GoogleReviews";

export default function BathtubSlider() {
  const slides = [
    {
      img: a,
      title: "Jacuzzi Bathtub",
      desc: "Experience relaxation with Cafrox luxury Jacuzzi bathtubs.",
    },
    {
      img: b,
      title: "Luxury Bathtub",
      desc: "Premium designs crafted for comfort and elegance.",
    },
    {
      img: c,
      title: "Modern Bathtub",
      desc: "Contemporary bathtubs that elevate your bathroom style.",
    },
    {
      img: d,
      title: "Corner Bathtub",
      desc: "Perfect for compact spaces with stylish curves.",
    },
    {
      img: e,
      title: "Oval Bathtub",
      desc: "Elegant oval shape with deep soaking experience.",
    },
    {
      img: f,
      title: "Freestanding Bathtub",
      desc: "Stand-alone beauty that defines modern bathrooms.",
    },
  ];

  return (
    <>
      <section className="relative w-full bg-white py-6">
        <Swiper
          pagination={{ dynamicBullets: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          modules={[Pagination, Autoplay]}
          className="mySwiper w-full lg:h-[85vh]  mx-auto rounded-2xl shadow-lg overflow-hidden"
        >
          {slides.map((slide, i) => (
            <SwiperSlide key={i} className="relative">
              {/* Wrapper div for positioning */}
              <div className="relative w-full h-[400px] lg:h-[85vh]">
                <Image
                  src={slide.img}
                  alt={slide.title}
                  fill // 👈 replaces width+height and makes it cover the div
                  className="object-cover w-full h-full"
                  priority
                />
                {/* Text overlay */}
                <div className="absolute inset-0 z-10 bg-black/40 flex flex-col items-center justify-center text-center text-white px-4">
                  <h3 className="text-2xl md:text-3xl font-bold mb-2 drop-shadow-md">
                    {slide.title}
                  </h3>
                  <p className="max-w-xl text-sm md:text-base opacity-90">
                    {slide.desc}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <FeaturedProducts />
        <CategorySection />
        {/* <AboutSection /> */}
        <WhyChooseUs />
        <GoogleReviews />
      </section>
    </>
  );
}
