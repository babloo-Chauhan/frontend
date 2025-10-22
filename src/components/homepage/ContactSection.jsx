"use client";

export default function ContactSection() {
    return (
        <section id="contact" className="py-20 px-6 bg-gray-900 text-white text-center">
            <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
            <p className="mb-8 text-gray-300">Have questions or need a quote? Let’s talk!</p>

            <form className="max-w-xl mx-auto space-y-4">
                <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 py-3 rounded-md text-gray-900"
                />
                <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-4 py-3 rounded-md text-gray-900"
                />
                <textarea
                    placeholder="Your Message"
                    className="w-full px-4 py-3 rounded-md text-gray-900"
                    rows="4"
                ></textarea>
                <button className="bg-white text-gray-900 font-semibold px-6 py-3 rounded-full hover:bg-gray-200 transition">
                    Send Message
                </button>
            </form>

            <div className="mt-10 text-gray-400">
                📍 Delhi, India | ☎️ +91-9876543210 | ✉️ info@kazoma.in
            </div>
        </section>
    );
}
