"use client";

import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { TypeAnimation } from "react-type-animation";
import Image from "next/image";
import Link from "next/link";
import { MdAccountCircle } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "@/context/CartContext";
import { useApi } from "@/context/ApiContext";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [iflogin, setiflogin] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const { cart , getToCart } = useCart();
  const [isAuthenticated, setisAuthenticated] = useState();
    const { usertoken } = useApi();
    useEffect(() => {
      // ✅ Runs only in the browser
      const token = localStorage.getItem("accessToken");
      setisAuthenticated(!!token);
    }, [usertoken]);

 console.log("cart :",cart.length)

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        {/* Logo */}
        <div className="flex items-center gap-2 overflow-visible">
          <Link href="/" className="flex items-center gap-2">
            <Image
              alt="Logo"
              src="/cafroxlogo.png"
              width={70}
              height={70}
              className="rounded-full object-contain z-10"
              priority
            />
          </Link>
        </div>

        {/* Search Bar */}
        <div className="flex relative w-1/2 md:w-1/3 items-center bg-gray-50 border rounded-full shadow-sm px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400 transition">
          <IoSearch className="text-gray-500 text-lg mr-2" />
          <input
            type="text"
            // placeholder="Search products..."
            value={searchText}
            onFocus={() => setIsTyping(true)}
            onBlur={() => setIsTyping(false)}
            onChange={(e) => setSearchText(e.target.value)}
            className="bg-transparent w-full outline-none text-gray-700 text-sm"
          />
          {!isTyping && !searchText && (
            <TypeAnimation
              sequence={[
                "bathtub",
                1500,
                "jacuzzi",
                1500,
                "LED bathtub",
                1500,
                "gold jacuzzi",
                1500,
              ]}
              wrapper="span"
              speed={50}
              className="absolute left-9 text-gray-400 text-xs pointer-events-none"
              repeat={Infinity}
            />
          )}
        </div>

        {/* Desktop Nav Links + Profile */}
        <div className="hidden md:flex items-center gap-6">
          {["Bathtub", "About", "Blog", "Contact"].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition"
            >
              {item}
            </Link>
          ))}

          <Link
            href="/cart"
            className="relative text-sm font-medium text-gray-700 hover:text-blue-600 transition"
          >
            <FaShoppingCart className="text-yellow-500 text-xl md:text-2xl" />
            {cart?.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cart.length}
              </span>
            )}
          </Link>

          {isAuthenticated ? (
            <Link
              href={`/account`}
              className="flex items-center gap-2 cursor-pointer"
            >
              <MdAccountCircle className="h-9 w-9 rounded-full border border-blue-400 shadow-sm hover:scale-105 transition" />
            </Link>
          ) : (
            <Link
              href="/login"
              className="text-sm font-semibold text-gray-800 hover:text-blue-600 transition"
            >
              Log in →
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100"
          >
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Slide Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header with Close Button */}
        <div className="flex items-center justify-between px-4 py-3 border-b shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800">Menu</h2>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Menu Links */}
        <div className="p-6 space-y-5">
          {["Bathtub", "About", "Blog", "Contact"].map((item) => (
            <a
              key={item}
              href="#"
              className="block text-gray-800 font-medium hover:text-blue-600 transition"
            >
              {item}
            </a>
          ))}

          {/* Login / Profile */}
          <div className="mt-6 border-t pt-4">
            {iflogin ? (
              <div className="flex items-center gap-3">
                <img
                  src="/profile.png"
                  alt="profile"
                  className="h-10 w-10 rounded-full border"
                />
                <span className="font-semibold text-gray-700">Hi, Babloo</span>
              </div>
            ) : (
              <a
                href="#"
                className="block text-center bg-blue-500 text-white py-2 rounded-md font-semibold hover:bg-blue-600 transition"
              >
                Log in
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Background Overlay */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300"
        />
      )}
    </header>
  );
}
