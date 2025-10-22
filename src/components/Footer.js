"use client"
import { motion, AnimatePresence } from "framer-motion";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaTelegram,
  FaArrowUp,
  FaWhatsapp,
} from "react-icons/fa";
import { useState, useEffect } from "react";

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showWhatsApp, setShowWhatsApp] = useState(true);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleWhatsAppClick = () => {
    window.open("https://wa.me/919711994994", "_blank", "noopener,noreferrer");
  };

  const toggleSection = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const footerLinks = [
    {
      title: "Our Story",
      links: [
        "Company Profile",
        "Our Facility",
        "Commitment to Quality",
        "Contract Manufacturing",
        "Our Awards",
      ],
    },
    {
      title: "Categories",
      links: [
        "simple bathtub",
        "simple with panel bathtub",
        "jacuzzi siver bathtub",
        "jacuzzi gold bathtub",
        "fully loaded bathtub",
      ],
    },
    {
      title: "Quick Links",
      links: ["Blog", "Subscription", "Announcements", "FAQ's"],
    },
  ];

  return (
    <footer className="relative text-gray-300 bt-0">
      {/* WhatsApp Floating Button */}
      <style>
        {`
          .floating_btn {
            position: fixed;
            bottom: 40px;
            right: 30px;
            width: 80px;
            height: 80px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            z-index: 1000;
          }

          @keyframes pulsing {
            to {
              box-shadow: 0 0 0 30px rgba(66, 219, 135, 0);
            }
          }

          .contact_icon {
            background-color: #42db87;
            color: #fff;
            width: 60px;
            height: 60px;
            font-size: 30px;
            border-radius: 50px;
            text-align: center;
            box-shadow: 2px 2px 3px #999;
            display: flex;
            align-items: center;
            justify-content: center;
            transform: translateY(0);
            animation: pulsing 1.25s cubic-bezier(.66, 0, 0, 1) infinite;
            font-weight: 400;
            font-family: sans-serif;
            text-decoration: none !important;
            transition: .3s ease-in-out;
          }

          .contact_icon:hover {
            background-color: #25d366;
            transform: scale(1.05);
          }
        `}
      </style>
      {/* Blurred background image with overlay */}
      <div
        className="absolute inset-0 w-full h-full z-0"
        style={{
          backgroundImage:
            'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf9OAYYpwxj_JJim9F53Hc_vA81Vx3M_rDqg&s")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(6px)",
        }}
        aria-hidden="true"
      ></div>
      <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-gray-900/90 to-gray-800/90 z-10"></div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-extrabold text-blue-400 drop-shadow-lg">
              Cafrox industries
            </h2>
            <div className="space-y-2">
              <p className="text-gray-300 font-medium">Call us 24/7</p>
              <p className="text-xl font-bold text-yellow-300 drop-shadow">
                +91-9711994994
              </p>
            </div>
            <p className="text-sm text-gray-200">
              Khasra No. 26/11/1 Ground Floor, Near R.B.M School, Village
              Bakkarwala, New Delhi-110041
            </p>
            <a
              href="mailto:info@kazoma.co.in"
              className="text-blue-300 hover:text-blue-200 font-semibold transition-colors block"
              rel="noopener noreferrer"
            >
              info@cafrox.co.in
            </a>
            <div className="flex gap-4 text-xl mt-2">
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="https://www.facebook.com/kazomaindustriespvtltd"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-blue-500 transition-colors"
                aria-label="Facebook"
              >
                <FaFacebookF />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="https://www.instagram.com/kazomaindustriespvtltd/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-pink-500 transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="https://youtube.com/@kazoma935?si=vp1aXoYcaqJBkHxy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-red-500 transition-colors"
                aria-label="YouTube"
              >
                <FaYoutube />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="https://t.me/8416800849"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-blue-400 transition-colors"
                aria-label="Telegram"
              >
                <FaTelegram />
              </motion.a>
            </div>
          </motion.div>

          {/* Footer Links Sections */}
          {footerLinks.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="space-y-3"
            >
              <h3
                className="-my-2 text-lg font-bold text-yellow-200 cursor-pointer flex justify-between items-center md:text-white md:font-semibold"
                onClick={() => toggleSection(index)}
              >
                {section.title}
                <span className="ml-2 text-white md:hidden">
                  {openIndex === index ? "−" : "+"}
                </span>
              </h3>

              <ul
                className={`space-y-1 overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? "max-h-96" : "max-h-0 md:max-h-full"
                } md:max-h-full`}
              >
                {section.links.map((link) => (
                  <motion.li
                    key={`${section.title}-${link}`}
                    whileHover={{ x: 5 }}
                    className="text-gray-200 hover:text-blue-300 font-medium transition-colors cursor-pointer px-2 py-1 rounded focus:bg-blue-900/40 focus:outline-none"
                    tabIndex={0}
                  >
                    {link}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="border-t border-gray-700 mt-4 pt-2"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-300">
              Copyright © {new Date().getFullYear()}{" "}
              <a
                href="https://www.kazoma.co.in"
                className="text-blue-300 hover:text-blue-200 font-semibold transition-colors"
                rel="noopener noreferrer"
              >
                www.kazoma.co.in
              </a>
            </div>
            <div className="flex items-center gap-4">
              <p className="text-sm text-gray-300">We Use Safe Payment For</p>
              <div className="flex gap-2">
                <img
                  src="https://res.cloudinary.com/dh7fgb3vg/image/upload/v1744028198/Payment_ydx4ug.svg"
                  alt="Payment Methods"
                  className="h-8"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating WhatsApp Button */}
      {/* <AnimatePresence>
        {showWhatsApp && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-24 right-4 z-50"
          >
            <button
              onClick={handleWhatsAppClick}
              className="text-white p-4 rounded-full shadow-sm transition-colors group relative"
            >
              <img
                src="https://res.cloudinary.com/dh7fgb3vg/image/upload/v1744830625/WhatsApp_icon_qucvgu.png"
                alt="WhatsApp"
                className="w-10 h-10"
              />
            </button>
          </motion.div>
        )}
      </AnimatePresence> */}

      <div className="floating_btn fixed bottom-24 right-4 z-50">
        <a href="https://wa.me/+918416800849">
          <div className="contact_icon">
           <FaWhatsapp/>
          </div>
        </a>
      </div>

      {/* Scroll to Top Button */}
      {/* <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300"
            aria-label="Scroll to top"
          >
            <FaArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence> */}
    </footer>
  );
};

export default Footer;
