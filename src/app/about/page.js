"use client";

import React from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

export default function AboutPageAnimated() {
  // animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: (custom = 0) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut", delay: custom * 0.08 },
    }),
  };

  // stats data
  const stats = [
    {
      id: 1,
      label: "Retail stores in India",
      start: 0,
      end: 12,
      suffix: "+",
      duration: 2,
    },
    {
      id: 2,
      label: "Products sold",
      start: 0,
      end: 15000,
      suffix: "+",
      duration: 2.4,
    },
    {
      id: 3,
      label: "Registered users",
      start: 0,
      end: 200000,
      suffix: "+",
      duration: 2.6,
    },
    {
      id: 4,
      label: "Quick shipping partners",
      start: 0,
      end: 60,
      suffix: "+",
      duration: 2,
    },
  ];

  const [refStats, inViewStats] = useInView({
    triggerOnce: true,
    rootMargin: "-10%",
  });

  const services = [
    "Wide network of outlets",
    "Convenient delivery",
    "Authorized service centers",
    "Original goods with guarantee",
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* HEADER */}
      <motion.header
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="relative bg-cover bg-center py-44 mb-8"
        style={{
          backgroundImage: "url(/1.jpg)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center left",
        }}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="text-center backdrop-blur-sm bg-white/40 rounded-2xl px-8 py-10 shadow-lg">
              <nav className="flex items-center justify-center text-sm mb-4 text-gray-700">
                <a href="#" className="hover:text-blue-600 transition-colors">
                  Home
                </a>
                <span className="mx-2 text-gray-500">/</span>
                <span className="text-gray-900 font-semibold">About</span>
              </nav>
              <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight">
                About Us
              </h1>
            </div>
          </div>
        </div>
      </motion.header>

      {/* MAIN CONTENT */}
      <div className="container mx-auto px-4 pb-16">
        <div className="max-w-7xl mx-auto space-y-16">
          {/* INTRODUCTION */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="bg-white py-12 rounded-2xl shadow-md text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Cafrox – Bathtub
            </h2>
            <div className="max-w-3xl mx-auto text-gray-700 space-y-4 leading-relaxed px-4">
              <p className="text-lg">
                Welcome to <strong>Cafrox Bath</strong>, your trusted source for
                premium bathtubs that redefine relaxation and elevate bathroom
                aesthetics.
              </p>
              <p className="text-lg">
                Our mission is to create products that seamlessly blend luxury
                with practicality, offering customers comfort, quality, and
                durability.
              </p>
            </div>
          </motion.section>

          {/* SERVICES SECTION */}
          <motion.section
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="py-20 bg-gradient-to-b from-gray-50 to-white rounded-2xl"
          >
            <div className="max-w-7xl mx-auto">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-4xl font-extrabold text-center text-gray-900 mb-12"
              >
                Our Services
              </motion.h2>

              {/* Desktop grid */}
              <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {services.map((s, i) => (
                  <motion.div
                    key={s}
                    custom={i}
                    variants={fadeUp}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl border border-gray-100 transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow">
                        ✓
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {s}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          High quality service and seamless shopping experience.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* ✅ Mobile grid (no scroll float button) */}
              <div className="lg:hidden mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6 px-4">
                {services.map((s, i) => (
                  <motion.div
                    key={s}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                        ✓
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {s}
                        </h3>
                        <p className="text-gray-600 text-sm mt-1">
                          High quality service and seamless shopping experience.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* EXPERIENCE SECTION */}
          <motion.section
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={fadeUp}
            className="py-16"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <motion.img
                src="https://cafrox.com/wp-content/uploads/2024/11/micke-lindstrom-wJIhQLXG5CI-unsplash-scaled.jpg"
                alt="Luxury bathtub"
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="w-full h-auto rounded-2xl shadow-xl"
              />

              <div className="space-y-4 px-2">
                <h2 className="text-3xl font-bold text-gray-900">
                  Serving People for More Than 11 Years With Over 95% Satisfied
                  Customers.
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  We aspire to be a leader in modern bathroom solutions.
                  Customer satisfaction is the foundation of everything we do.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  From selection to installation, we provide exceptional service
                  at every step.
                </p>
              </div>
            </div>
          </motion.section>

          {/* STATISTICS SECTION */}
          <section ref={refStats} className="py-16 bg-gray-50 rounded-2xl">
            <div className="max-w-7xl mx-auto px-4">
              <motion.h2
                initial={{ opacity: 0, y: 12 }}
                animate={inViewStats ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="text-4xl font-extrabold text-center text-gray-900 mb-12"
              >
                We Reached So Far
              </motion.h2>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {stats.map((s, i) => (
                  <motion.div
                    key={s.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={inViewStats ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.55, delay: i * 0.08 }}
                    className="text-center bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300"
                  >
                    <div className="text-4xl font-extrabold text-blue-600 mb-2">
                      {inViewStats ? (
                        <CountUp
                          start={s.start}
                          end={s.end}
                          duration={s.duration}
                          delay={0.3}
                          separator=","
                          suffix={s.suffix}
                        />
                      ) : (
                        s.start
                      )}
                    </div>
                    <div className="text-sm text-gray-600">{s.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* SERVICE PRIORITY SECTION */}
          <motion.section
            custom={3}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="py-20"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="space-y-6 px-2">
                <h2 className="text-3xl font-bold text-gray-900">
                  Service is Our Top Priority
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  We are available 24/7. Need advice? Our private shoppers will
                  be happy to help you.
                </p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300">
                  Contact Now
                </button>
              </div>

              <motion.img
                src="https://cafrox.com/wp-content/uploads/2024/11/steven-ungermann-Aac7IlKnYX8-unsplash-scaled.jpg"
                alt="Customer service"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="w-full h-auto rounded-2xl shadow-xl"
              />
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
}
