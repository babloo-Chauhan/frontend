"use client";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import React from "react";

const ContactUs = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", delay: custom * 0.1 },
    }),
  };

  return (
    <>
      <Helmet>
        <title>Contact Kazoma | Get in Touch</title>
        <meta
          name="description"
          content="Contact Kazoma for luxury bathtub inquiries, support, or showroom visits. We're here to help you find the perfect bathtub."
        />
        <link rel="canonical" href="https://kazoma.co.in/contact" />
      </Helmet>

      <div
        className="relative min-h-screen bg-fixed bg-cover bg-center py-20 px-4 text-gray-800"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-white/70 backdrop-blur-sm"></div>

        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Page Title */}
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 mb-12"
          >
            Contact <span className="text-blue-600">Kazoma</span>
          </motion.h2>

          {/* Content Grid */}
          <div className="flex flex-col md:flex-row gap-10 bg-white/90 rounded-2xl shadow-xl p-6 md:p-10">
            {/* Left Section */}
            <motion.div
              className="flex-1 space-y-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <div>
                <h3 className="text-2xl font-semibold text-blue-600 mb-2">
                  Our Address
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Kazoma Industries Private Limited
                  <br />
                  Khasra No. 26/11/1, Ground Floor, <br />
                  Near R.B.M School, Village Bakkarwala, <br />
                  New Delhi - 110041
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-blue-600 mb-2">
                  Contact Details
                </h3>
                <p className="text-gray-700">
                  Phone:{" "}
                  <a
                    href="tel:+918416800849"
                    className="text-blue-600 hover:underline"
                  >
                    +91 8416800849
                  </a>
                  <br />
                  Email:{" "}
                  <a
                    href="mailto:info@kazoma.co.in"
                    className="text-blue-600 hover:underline"
                  >
                    info@kazoma.co.in
                  </a>
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-blue-600 mb-2">
                  Find Us Here
                </h3>
                <iframe
                  title="kazoma-industries-private-limited"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28017.28880339363!2d77.02300287431638!3d28.62493340000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d051905218173%3A0xc079e496aa40fb7a!2sKazoma%20Industries%20Private%20Limited!5e0!3m2!1sen!2sin!4v1750356719437!5m2!1sen!2sin"
                  width="100%"
                  height="220"
                  className="rounded-lg shadow-md border-0"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </motion.div>

            {/* Right Section - Form */}
            <motion.div
              className="flex-1 bg-gray-50 p-6 rounded-xl shadow-md"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={1}
            >
              <h3 className="text-2xl font-semibold mb-4 text-blue-600">
                Send Us a Message
              </h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-1 font-medium">
                    Name:
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1 font-medium">
                    Phone:
                  </label>
                  <input
                    type="text"
                    name="text"
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-1 font-medium">
                    Email:
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-1 font-medium">
                    Message:
                  </label>
                  <textarea
                    name="message"
                    rows="5"
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                  ></textarea>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all shadow-md"
                >
                  Send Message
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
