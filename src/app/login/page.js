"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import cafroximg from '../../../public/cafrox-main.png'
import {
  Typography,
  Input,
  Button,
  Card,
  CardBody,
} from "@material-tailwind/react";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaTimes } from "react-icons/fa";
import { loginuser, forgotPassword } from "@/context/UserContext";
import GoogleLoginButton from "@/components/GoogleLoginButton";
import { useApi } from "@/context/ApiContext";
import Image from "next/image";

export default function Login() {
  const router = useRouter();
  const { setusertoken } = useApi();

  const [loading, setLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [forgotPasswordLoading, setForgotPasswordLoading] = useState(false);
  const [data, setData] = useState({ email: "", password: "" });

const handleSubmit = async (event) => {
  event.preventDefault();
  setLoading(true);

  try {
    const response = await loginuser(data);
    if (response.status === 200) {
      const userData = response.data.data;

      // ✅ Store tokens
      localStorage.setItem("accessToken", userData.accesstoken);
      localStorage.setItem("refreshToken", userData.refreshToken);
      localStorage.setItem("role", userData.userDetails.role);

      Cookies.set("accessToken", userData.accesstoken);
      setusertoken(userData.accesstoken);

      // ✅ 🔔 Notify other components (like Header)
      window.dispatchEvent(new Event("authChange"));

      toast.success("Login successful!");
      router.push("/");
    } else {
      toast.error(response?.data?.message || "Login failed");
    }
  } catch (error) {
    toast.error("An error occurred during login");
  } finally {
    setLoading(false);
  }
};


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div
      className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url(/cafrox-main.png)",
      }}
    >
      <div className="absolute inset-0"></div>

      {/* LEFT SECTION — Company Image */}
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 w-full md:w-1/2 h-[400px] md:h-screen flex items-center justify-center p-8"
      >
        <div className="relative w-full max-w-lg rounded-3xl overflow-hidden ">
          <Image
            src={cafroximg} // your main image path
            alt="Cafrox Luxury Bathtubs"
            width={800}
            height={800}
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <Typography
              variant="h2"
              className="text-white font-bold tracking-wide drop-shadow-lg text-center"
            >
              Welcome to <span className="text-blue-300">Cafrox</span>
            </Typography>
          </div>
        </div>
      </motion.div>

      {/* RIGHT SECTION — Login Form */}
      <motion.div
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 w-full md:w-1/2 flex items-center justify-center p-6"
      >
        <Card className="backdrop-blur-lg bg-white/20 border border-white/30 shadow-2xl rounded-2xl w-full max-w-md">
          <CardBody className="p-8 text-white">
            <div className="text-center mb-8">
              <Typography
                variant="h3"
                className="font-bold text-white drop-shadow-lg"
              >
                Login to <span className="text-blue-300">Cafrox</span>
              </Typography>
              <Typography variant="small" className="text-gray-200 mt-2">
                Access your account to explore premium bathtubs
              </Typography>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <Input
                name="email"
                label="Email"
                size="lg"
                type="email"
                color="white"
                value={data.email}
                onChange={handleInputChange}
                required
                className="text-white placeholder-gray-300"
              />
              <Input
                name="password"
                label="Password"
                size="lg"
                type="password"
                color="white"
                value={data.password}
                onChange={handleInputChange}
                required
                className="text-white placeholder-gray-300"
              />

              <Button
                type="submit"
                variant="gradient"
                color="indigo"
                fullWidth
                disabled={loading}
                className="h-12 text-lg font-semibold rounded-xl shadow-md"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                    Logging in...
                  </div>
                ) : (
                  "Login"
                )}
              </Button>
            </form>

            <div className="relative flex items-center justify-center my-6">
              <div className="w-full border-t border-gray-400"></div>
              <span className="bg-transparent px-2 text-gray-300 text-sm">
                OR
              </span>
              <div className="w-full border-t border-gray-400"></div>
            </div>

            <GoogleLoginButton />

            <Typography
              variant="small"
              className="mt-6 flex justify-center text-gray-200"
            >
              Don’t have an account?
              <Link href="/signup">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="ml-1 font-bold text-blue-300 hover:text-white cursor-pointer"
                >
                  Sign Up
                </motion.span>
              </Link>
            </Typography>
          </CardBody>
        </Card>
      </motion.div>

      {/* Forgot Password Modal */}
      <AnimatePresence>
        {showForgotPassword && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full"
            >
              <div className="flex justify-between items-center mb-6">
                <Typography variant="h4" color="blue-gray">
                  Reset Password
                </Typography>
                <button
                  onClick={() => {
                    setShowForgotPassword(false);
                    setForgotPasswordEmail("");
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FaTimes />
                </button>
              </div>
              <form>
                <div className="mb-6">
                  <Input
                    label="Email"
                    size="lg"
                    type="email"
                    value={forgotPasswordEmail}
                    onChange={(e) => setForgotPasswordEmail(e.target.value)}
                    className="focus:border-indigo-500"
                  />
                </div>
                <Button
                  variant="gradient"
                  fullWidth
                  type="submit"
                  color="indigo"
                  disabled={forgotPasswordLoading}
                  className="h-12"
                >
                  {forgotPasswordLoading ? "Sending..." : "Send Reset Link"}
                </Button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
