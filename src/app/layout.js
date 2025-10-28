import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import BootstrapClient from "./bootstrap-client";
import Script from "next/script"; // ✅ Make sure this import is present!
import { ApiProvider } from "@/context/ApiContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "cafrox Private Limited",
  description: "Luxury Bathware Collection – Powered by cafrox",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* ✅ Razorpay Checkout Script */}
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="afterInteractive"
        />

        {/* ✅ External CSS Links */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
        />
  
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
        cz-shortcut-listen="true"
      >
        <ApiProvider>
          <CartProvider>
            <Header />
            <main className="min-h-[40vh]">{children}</main>
            <BootstrapClient />
            <Footer />
          </CartProvider>
        </ApiProvider>

        {/* ✅ Google Maps Script (Better at the End for Performance) */}
        <script
          src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD7x-OR8sGvY809feuXyImQg6kDnkLlv2E&libraries=places"
          async
          defer
        ></script>
      </body>
    </html>
  );
}
