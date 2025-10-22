"use client";
import Image from "next/image";
import a from '../../../public/a.png'
import b from '../../../public/b.png'
import c from '../../../public/c.png'

const products = [
    { name: "Freestanding Bathtub", img: a },
    { name: "Corner Bathtub", img: b },
    { name: "Jacuzzi Spa", img: c },
];

export default function FeaturedProducts() {
    return (
        <section id="products" className="py-16 bg-gray-50 text-center">
            <h2 className="text-3xl font-bold mb-10">Featured Products</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
                {products.map((p, i) => (
                    <div
                        key={i}
                        className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden"
                    >
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
                ))}
            </div>
        </section>
    );
}
