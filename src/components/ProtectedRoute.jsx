"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function ProtectedRoute({ children }) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token =
            Cookies.get("accessToken") || localStorage.getItem("accessToken");

        if (!token) {
            router.replace("/login"); // redirect if not logged in
        } else {
            setLoading(false); // show content
        }
    }, [router]);

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <p className="text-gray-600">Checking authentication...</p>
            </div>
        );
    }

    return children;
}
