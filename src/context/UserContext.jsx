import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const baseUrl = `${API_URL}/users`;
import { toast } from "react-hot-toast";

export const registerUser = async (data) => {

    try {
        const response = await axios.post(`${baseUrl}/register`, data);
      
        return response.data;
    } catch (error) {

        toast.error(error.response.data.message)
    }
}

export const loginuser = async (data) => {
    console.log(data)
    try {
        const response = await axios.post(`${baseUrl}/login`, data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
return response
        // You can access the response data like this:
        // console.log(response.data);
    } catch (error) {
        console.error('Login error:', error);
    }
}


export const logoutuser = async () => {
    const response = await axios.get(`${baseUrl}/logout`)
    console.log("logout")
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    return response.data;
}

export const getUser = async () => {
    const response = await axios.get(`${baseUrl}/user-details`, {
        headers: {
            Authorization: localStorage.getItem("token")
        }
    })
    return response.data;
}

export const getAllUsers = async () => {
    const response = await axios.get(`${baseUrl}/get-users`)

    return response
}

export const deleteUser = async (id) => {
    const response = await axios.delete(`${baseUrl}/delete-user/${id}`)
    return response.data
}

export const updateUserRole = async (id, role) => {
    const response = await axios.put(`${baseUrl}/update-user-role/${id}`, { role })
    return response.data
}

export const updateUser = async (id, data) => {
    const response = await axios.put(`${baseUrl}/update-user/${id}`, data)
    return response.data
}

export const forgotPassword = async (email) => {
    try {
        const emailData = { email: email }
        console.log("emailData",emailData);
        const response = await axios.put(`${baseUrl}/forgot-password`, { email});
        return response.data;
    } catch (error) {
        console.error('Error in forgot password:', error);
        throw error;
    }
}

export const verifyForgotPasswordOtp = async (email, otp) => {
   
    console.log("email",email)
    console.log("otp",otp)
    try {
        const response = await axios.put(`${baseUrl}/verify-forgot-password-otp`, { email, otp });
        return response.data;
    } catch (error) {   
        console.error('Error in verify forgot password otp:', error);
        throw error;
    }
}

export const resetPassword = async (email, newPassword, confirmPassword) => {
    try {
        const data = { email, newPassword, confirmPassword }
        console.log("data",data)
        const response = await axios.put(`${baseUrl}/reset-password`, { email, newPassword, confirmPassword });
        return response.data;
    } catch (error) {
        console.error('Error in reset password:', error);
        throw error;
    }
}

export const getUserDetails = async () => {
    const response = await axios.get(`${baseUrl}/user-details`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
    });
    return response
}

export const verifyEmails = async (code) => {
    console.log("code",code)
    const response = await axios.get(`${baseUrl}/verify-email?code=${code}`)
    return response
}






















