"use client";
import Image from "next/image";

export default function AboutSection() {
    return (
        <section id="about" className="py-20 px-6 bg-white grid md:grid-cols-2 gap-10 items-center">
            <Image
                src="/images/about.jpg"
                alt="About Kazoma"
                width={600}
                height={400}
                className="rounded-2xl shadow-lg object-cover"
            />
            <div>
                <h2 className="text-3xl font-bold mb-4">About Kazoma</h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                    Kazoma Industries Pvt. Ltd. is a leading manufacturer of premium bathtubs,
                    committed to blending design, comfort, and durability for modern homes.
                </p>
                <ul className="space-y-3">
                    <li>✔️ 10+ Years of Experience</li>
                    <li>✔️ ISO Certified Quality</li>
                    <li>✔️ Nationwide Delivery & Support</li>
                </ul>
            </div>
        </section>
    );
}
