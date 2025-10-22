// GoogleLoginButton.js
import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { motion } from 'framer-motion';
import { Button } from "@material-tailwind/react";

const GoogleLoginButton = ({ isSignup = false }) => {
    const handleGoogleAuth = () => {
        // Clear any existing tokens
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');

        // Redirect to Google auth
        window.location.href = "https://api.kazoma.co.in/auth/google";
    };

    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
        >
            <Button
                variant="outlined"
                fullWidth
                color="blue-gray"
                className="h-12 flex items-center justify-center gap-2"
                onClick={handleGoogleAuth}
            >
                <FcGoogle className="text-xl" />
                {isSignup ? "Sign up with Google" : "Sign in with Google"}
            </Button>
        </motion.div>
    );
};

export default GoogleLoginButton;
