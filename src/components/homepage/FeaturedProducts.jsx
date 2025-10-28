"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import a from "../../../public/a.png";
import b from "../../../public/b.png";
import c from "../../../public/c.png";

const products = [
    { name: "Freestanding Bathtub", img: a },
    { name: "Corner Bathtub", img: b },
    { name: "Jacuzzi Spa", img: c },
    { name: "Freestanding Bathtub", img: a },
    { name: "Corner Bathtub", img: b },
    { name: "Jacuzzi Spa", img: c },
];

export default function FeaturedProducts() {
    return (
        <section id="products" className="py-16 bg-gray-50 text-center" style={{
            backgroundImage: "url(/assets/images/wedding-venue-body-bg.webp)",
        }}>
            <h2 className="text-3xl font-bold mb-10">Featured Products</h2>

            <div className="px-6">
                <Swiper
                    modules={[Navigation,  Autoplay]}
                    spaceBetween={30}
                    slidesPerView={1}
                    loop={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    pagination={{ clickable: true }}
                    navigation
                    breakpoints={{
                        640: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                >
                    {products.map((p, i) => (
                        <SwiperSlide key={i}>
                            <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden">
                                <Image
                                    src={p.img}
                                    alt={p.name}
                                    width={400}
                                    height={300}
                                    className="w-full h-64 object-cover"
                                />
                                <div className="p-4">
                                    <h3 className="font-semibold text-lg mb-2">{p.name}</h3>
                                    <button className="text-blue-600 hover:underline">
                                        View Details →
                                    </button>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}
