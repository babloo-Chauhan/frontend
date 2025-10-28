"use client";
import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { getUserDetails } from "@/context/UserContext";
import Cookies from "js-cookie";

const GoogleCallback = () => {
  const router = useRouter();

  useEffect(() => {
    const handleGoogleCallback = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const accessToken = params.get("accessToken");
        const refreshToken = params.get("refreshToken");
        const redirect = params.get("redirect");

        if (!accessToken || !refreshToken) {
          throw new Error("No tokens received from backend");
        }

        // ✅ Store tokens
        Cookies.set("accessToken", accessToken, { expires: 7 });
        Cookies.set("refreshToken", refreshToken, { expires: 30 });
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        // ✅ Fetch user details
        const response = await getUserDetails();
        const role = response.data.data.role;

        // Save user data
        localStorage.setItem("role", role);
        localStorage.setItem("user", JSON.stringify(response.data.data));

        // ✅ 🔔 Notify all components (Header, etc.)
        window.dispatchEvent(new Event("authChange"));

        toast.success("Successfully logged in with Google!");

        // ✅ Redirect
        router.push(redirect || "/");
      } catch (error) {
        console.error("Google auth error:", error);
        toast.error("Failed to login with Google");
        router.push("/login");
      }
    };

    handleGoogleCallback();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin mx-auto"></div>
        <p className="mt-4 text-gray-600">
          Completing Google authentication...
        </p>
      </div>
    </div>
  );
};

export default GoogleCallback;
