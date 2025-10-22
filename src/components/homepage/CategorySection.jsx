"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import a from '../../../public/a.png'
import b from '../../../public/b.png'
import c from '../../../public/c.png'
import d from '../../../public/d.png'
import e from '../../../public/e.png'


const categories = [
    {
        name: "Freestanding Bathtubs",
        img: a,
    },
    {
        name: "Corner Bathtubs",
        img: b,
    },
    {
        name: "Jacuzzi / Spa",
        img: c,
    },
    {
        name: "Wall-Mounted",
        img: d,
    },
    {
        name: "Outdoor Bathtubs",
        img: e,
    },
    {
        name: "Corner Bathtubs",
        img: b,
    },
];

export default function CategorySection() {
    return (
        <section id="categories" className="py-20 bg-white text-center">
            <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="text-3xl font-bold mb-12"
            >
                Explore Our Bathtub Categories
            </motion.h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 max-w-6xl mx-auto">
                {categories.map((cat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1, duration: 0.5 }}
                        className="relative overflow-hidden rounded-2xl shadow-md hover:shadow-2xl group"
                    >
                        <Image
                            src={cat.img}
                            alt={cat.name}
                            width={500}
                            height={400}
                            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0  bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <h3 className="text-white text-xl font-semibold">
                                {cat.name}
                            </h3>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
