"use client";

const features = [
    { icon: "🛠️", title: "Premium Material" },
    { icon: "🌿", title: "Eco-friendly Manufacturing" },
    { icon: "🚚", title: "Fast Delivery" },
    { icon: "💬", title: "24/7 Support" },
];

export default function WhyChooseUs() {
    return (
        <section className="py-20 bg-gray-100 text-center">
            <h2 className="text-3xl font-bold mb-10">Why Choose Kazoma?</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 px-6">
                {features.map((f, i) => (
                    <div
                        key={i}
                        className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition"
                    >
                        <div className="text-4xl mb-3">{f.icon}</div>
                        <h3 className="font-semibold text-lg">{f.title}</h3>
                    </div>
                ))}
            </div>
        </section>
    );
}
