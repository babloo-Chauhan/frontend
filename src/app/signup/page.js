"use client";

import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import cafroximg from '../../../public/cafrox-main.png'
import {
  Card,
  CardBody,
  Typography,
  Input,
  Checkbox,
  Button,
} from "@material-tailwind/react";
import { registerUser } from "@/context/UserContext";
import Link from "next/link";
import GoogleLoginButton from "@/components/GoogleLoginButton";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Signup = () => {
  const router = useRouter();
  const [data, setData] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // ✅ Validation
  const validateForm = () => {
    const newErrors = {};

    if (!data.name.trim()) newErrors.name = "Name is required";
    else if (data.name.length < 3)
      newErrors.name = "Name must be at least 3 characters";

    if (!data.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      newErrors.email = "Enter a valid email address";

    if (!data.mobile.trim()) newErrors.mobile = "Phone number is required";
    else if (!/^[0-9]{10}$/.test(data.mobile))
      newErrors.mobile = "Enter a valid 10-digit phone number";

    if (!data.password.trim()) newErrors.password = "Password is required";
    else if (data.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Handle Form Submit
const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validateForm()) return;

  setLoading(true);
  try {
    const res = await registerUser(data);

    if (res.success) {
      const userData = res.data;

      // ✅ Store tokens (if returned)
      if (userData.accessToken) {
        localStorage.setItem("accessToken", userData.accessToken);
        localStorage.setItem("refreshToken", userData.refreshToken);
        localStorage.setItem("role", userData.role);
        localStorage.setItem("user", JSON.stringify(userData));

        // ✅ Notify app (Header, etc.) instantly
        window.dispatchEvent(new Event("authChange"));
      }

      toast.success("Registration successful! please login");
      setTimeout(() => router.push("/login"), 1200);
    } else {
      toast.error(res.message || "Registration failed");
    }
  } catch (error) {
    toast.error(
      error.response?.data?.message || "Registration failed. Try again."
    );
  } finally {
    setLoading(false);
  }
};


  // ✅ Handle Input Change
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  return (
    <div
      className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage: "url(/cafrox-main.png)",
      }}
    >
      {/* LEFT SECTION — Cafrox Main Image */}
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 w-full md:w-1/2 h-[400px] md:h-screen flex items-center justify-center p-8"
      >
        <div className="relative w-full max-w-lg rounded-3xl overflow-hidden">
          <Image
            src={cafroximg}
            alt="Cafrox Premium Bathtubs"
            width={800}
            height={800}
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <Typography
              variant="h2"
              className="text-white font-bold tracking-wide text-center"
            >
              Welcome to <span className="text-blue-300">Cafrox</span>
            </Typography>
          </div>
        </div>
      </motion.div>

      {/* RIGHT SECTION — Signup Form */}
      <motion.div
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 w-full md:w-1/2 flex items-center justify-center p-6"
      >
        <Card className="backdrop-blur-xl bg-white/10 border border-white/30 rounded-2xl w-full max-w-md">
          <CardBody className="p-8 text-white">
            <div className="text-center mb-8">
              <Typography variant="h3" className="font-bold text-white">
                Create Your <span className="text-blue-300">Cafrox</span>{" "}
                Account
              </Typography>
              <Typography variant="small" className="text-gray-200 mt-2">
                Join us and explore our luxury bathtubs
              </Typography>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <Input
                name="name"
                label="Full Name"
                size="lg"
                color="white"
                value={data.name}
                onChange={handleInputChange}
                className="text-white placeholder-gray-300 !border-t-white"
              />
              {errors.name && (
                <Typography variant="small" color="red">
                  {errors.name}
                </Typography>
              )}

              <Input
                name="mobile"
                label="Phone Number"
                size="lg"
                color="white"
                value={data.mobile}
                onChange={handleInputChange}
                className="text-white placeholder-gray-300"
              />
              {errors.mobile && (
                <Typography variant="small" color="red">
                  {errors.mobile}
                </Typography>
              )}

              <Input
                name="email"
                label="Email"
                size="lg"
                type="email"
                color="white"
                value={data.email}
                onChange={handleInputChange}
                className="text-white placeholder-gray-300"
              />
              {errors.email && (
                <Typography variant="small" color="red">
                  {errors.email}
                </Typography>
              )}

              <Input
                name="password"
                label="Password"
                size="lg"
                type="password"
                color="white"
                value={data.password}
                onChange={handleInputChange}
                className="text-white placeholder-gray-300"
              />
              {errors.password && (
                <Typography variant="small" color="red">
                  {errors.password}
                </Typography>
              )}

              <Checkbox
                name="rememberMe"
                label={<span className="text-gray-200">Remember Me</span>}
                checked={data.rememberMe}
                onChange={handleInputChange}
                color="blue"
              />

              <Button
                type="submit"
                variant="gradient"
                color="indigo"
                fullWidth
                disabled={loading}
                className="h-12 text-lg font-semibold rounded-xl"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                    Signing Up...
                  </div>
                ) : (
                  "Sign Up"
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

            <GoogleLoginButton isSignup={true} />

            <Typography
              variant="small"
              className="mt-6 flex justify-center text-gray-200"
            >
              Already have an account?
              <Link href="/login">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="ml-1 font-bold text-blue-300 hover:text-white cursor-pointer"
                >
                  Login
                </motion.span>
              </Link>
            </Typography>
          </CardBody>
        </Card>
      </motion.div>
    </div>
  );
};

export default Signup;
