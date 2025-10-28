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

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { cart } = useCart();

  // ✅ Check login status on mount + listen for changes
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("accessToken");
      setIsAuthenticated(!!token);
    };

    checkAuth(); // Run once
    window.addEventListener("authChange", checkAuth);
    window.addEventListener("storage", checkAuth); // in case of another tab

    return () => {
      window.removeEventListener("authChange", checkAuth);
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  // const handleLogout = () => {
  //   localStorage.removeItem("accessToken");
  //   window.dispatchEvent(new Event("authChange")); // notify header
  //   setIsAuthenticated(false);
  // };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            alt="Logo"
            src="/cafroxlogo.png"
            width={70}
            height={70}
            className="rounded-full object-contain"
            priority
          />
        </Link>

        {/* Search */}
        <div className="flex relative w-1/2 md:w-1/3 items-center bg-gray-50 border rounded-full shadow-sm px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400 transition">
          <IoSearch className="text-gray-500 text-lg mr-2" />
          <input
            type="text"
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

        {/* Desktop Nav */}
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

          <Link href="/cart" className="relative">
            <FaShoppingCart className="text-yellow-500 text-2xl" />
            {cart?.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cart.length}
              </span>
            )}
          </Link>

          {/* Auth */}
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Link href="/account">
                <MdAccountCircle className="h-9 w-9 text-gray-700 hover:text-blue-600 transition" />
              </Link>
              {/* <button
                onClick={handleLogout}
                className="text-sm font-semibold text-gray-700 hover:text-red-600 transition"
              >
                Logout
              </button> */}
            </div>
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
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>
      </nav>
    </header>
  );
}
