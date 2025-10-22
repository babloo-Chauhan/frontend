"use client"
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
} from "@material-tailwind/react";
import { registerUser } from "@/context/UserContext";
import Link from "next/link";
import GoogleLoginButton from "@/components/GoogleLoginButton";

const Signup = () => {

  const [data, setData] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // ✅ Form Validation
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

  // ✅ Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const res = await registerUser(data);
      if (res.success) {
        toast.success("Registration successful! Redirecting...");
        setTimeout(() => navigate("/login"), 1500);
      } else toast.error(res.message);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Registration failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle Inputs
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-blue-100 px-4 py-10"
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        <form onSubmit={handleSubmit}>
          <Card className="shadow-2xl rounded-2xl border border-gray-100 backdrop-blur-xl bg-white/90">
            {/* Header */}
            <CardHeader
              floated={false}
              shadow={false}
              color="indigo"
              variant="gradient"
              className="grid h-28 place-items-center rounded-t-2xl"
            >
              <Typography
                variant="h3"
                color="white"
                className="font-bold tracking-wide"
              >
                Create Account
              </Typography>
            </CardHeader>

            {/* Body */}
            <CardBody className="flex flex-col gap-5 p-6">
              {/* Name */}
              <Input
                name="name"
                label="Full Name"
                size="lg"
                value={data.name}
                onChange={handleInputChange}
                className={`focus:border-indigo-500 ${
                  errors.name ? "border-red-500" : ""
                }`}
              />
              {errors.name && (
                <Typography variant="small" color="red">
                  {errors.name}
                </Typography>
              )}

              {/* Mobile */}
              <Input
                name="mobile"
                label="Phone Number"
                size="lg"
                value={data.mobile}
                onChange={handleInputChange}
                className={`focus:border-indigo-500 ${
                  errors.mobile ? "border-red-500" : ""
                }`}
              />
              {errors.mobile && (
                <Typography variant="small" color="red">
                  {errors.mobile}
                </Typography>
              )}

              {/* Email */}
              <Input
                name="email"
                label="Email"
                size="lg"
                type="email"
                value={data.email}
                onChange={handleInputChange}
                className={`focus:border-indigo-500 ${
                  errors.email ? "border-red-500" : ""
                }`}
              />
              {errors.email && (
                <Typography variant="small" color="red">
                  {errors.email}
                </Typography>
              )}

              {/* Password */}
              <Input
                name="password"
                label="Password"
                size="lg"
                type="password"
                value={data.password}
                onChange={handleInputChange}
                className={`focus:border-indigo-500 ${
                  errors.password ? "border-red-500" : ""
                }`}
              />
              {errors.password && (
                <Typography variant="small" color="red">
                  {errors.password}
                </Typography>
              )}

              {/* Remember Me */}
              <Checkbox
                name="rememberMe"
                label="Remember Me"
                checked={data.rememberMe}
                onChange={handleInputChange}
                color="indigo"
              />
            </CardBody>

            {/* Footer */}
            <CardFooter className="p-6 pt-0">
              <Button
                type="submit"
                variant="gradient"
                color="indigo"
                fullWidth
                disabled={loading}
                className="h-12 text-base font-semibold rounded-xl shadow-md hover:shadow-lg transition-all"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Signing Up...
                  </div>
                ) : (
                  "Sign Up"
                )}
              </Button>

              {/* Divider */}
              <div className="relative flex items-center justify-center my-5">
                <div className="w-full border-t border-gray-300"></div>
                <span className="absolute bg-white/90 px-3 text-gray-500 text-sm">
                  OR
                </span>
              </div>

              {/* Google Login */}
              <GoogleLoginButton isSignup={true} />

              {/* Footer Link */}
              <Typography variant="small" className="mt-6 text-center">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
                >
                  Log In
                </Link>
              </Typography>
            </CardFooter>
          </Card>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default Signup;
