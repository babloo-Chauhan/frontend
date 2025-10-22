"use client"
import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

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
import Cookies from "js-cookie";
import Link from "next/link";
import { loginuser, forgotPassword } from "@/context/UserContext";

import { FaTimes } from "react-icons/fa";
import { AnimatePresence } from "framer-motion";
import GoogleLoginButton from "@/components/GoogleLoginButton";
import { useRouter } from "next/navigation";
import { useApi } from "@/context/ApiContext";



const Login = () => {
  const router = useRouter();
  const {usertoken,setusertoken}=useApi();
  
  const [loading, setLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [forgotPasswordLoading, setForgotPasswordLoading] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    console.log(1);
    try {
      const response = await loginuser(data);
      console.log("response", response);
      console.log(2);
      // const result = await response.json();
      // console.log("result", result)

      if (response.status === 200) {
        console.log(response.data.data);
        localStorage.setItem("accessToken", response.data.data.accesstoken);
        localStorage.setItem("role", response.data.data.userDetails.role);
        setusertoken(response.data.data.accesstoken);
        localStorage.setItem("refreshToken", response.data.data.refreshToken);
        Cookies.set("accessToken",response.data.data.accessToken);
        toast.success("Login successful!");

        router.push("/");
      } else {
        toast.error(result.message || "Login failed");
      }
    } catch (error) {
      toast.error("An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!forgotPasswordEmail) {
      toast.error("Please enter your email address");
      return;
    }

    setForgotPasswordLoading(true);
    try {
      const response = await forgotPassword(forgotPasswordEmail);
      toast.success("Password reset instructions sent to your email");
      setShowForgotPassword(false);
      setForgotPasswordEmail("");
      navigate("/verify-otp", { state: { email: forgotPasswordEmail } });
    } catch (error) {
      console.error("Error during forgot password:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to process forgot password request"
      );
    } finally {
      setForgotPasswordLoading(false);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8"
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-md"
        >
          <form onSubmit={handleSubmit}>
            <Card className="shadow-xl border border-gray-100">
              <CardHeader
                variant="gradient"
                color="indigo"
                className="mb-4 grid h-28 place-items-center"
              >
                <Typography variant="h3" color="white" className="font-bold">
                  Login
                </Typography>
              </CardHeader>
              <CardBody className="flex flex-col gap-4 p-6">
                <Input
                  name="email"
                  label="Email"
                  size="lg"
                  type="email"
                  value={data.email}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  name="password"
                  label="Password"
                  size="lg"
                  type="password"
                  value={data.password}
                  onChange={handleInputChange}
                  required
                />
              </CardBody>
              <CardFooter className="pt-0 p-6">
                <Button
                  type="submit"
                  variant="gradient"
                  fullWidth
                  color="indigo"
                  disabled={loading}
                  className="h-12 mb-4"
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

                <div className="relative flex items-center justify-center mb-4">
                  <div className="w-full border-t border-gray-300"></div>
                  <span className="bg-white px-2 text-gray-500 text-sm">
                    OR
                  </span>
                  <div className="w-full border-t border-gray-300"></div>
                </div>

                <GoogleLoginButton />

                <Typography
                  variant="small"
                  className="mt-6 flex justify-center"
                >
                  Don't have an account?
                  <Link href="/signup">
                    <motion.span
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="ml-1 font-bold text-indigo-600 hover:text-indigo-800 cursor-pointer"
                    >
                      Sign Up
                    </motion.span>
                  </Link>
                </Typography>
              </CardFooter>
            </Card>
          </form>
        </motion.div>
      </motion.div>

      {/* Forgot Password Modal */}
      <AnimatePresence>
        {showForgotPassword && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
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
              <form onSubmit={handleForgotPassword}>
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
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant="gradient"
                    fullWidth
                    type="submit"
                    color="indigo"
                    disabled={forgotPasswordLoading}
                    className="h-12"
                  >
                    {forgotPasswordLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                        Sending...
                      </div>
                    ) : (
                      "Send Reset Link"
                    )}
                  </Button>
                </motion.div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Login;
