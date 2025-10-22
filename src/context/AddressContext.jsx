import axios from "axios";
import { toast } from "react-hot-toast";
const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
 const baseUrl = `${API_URL}/address`;

const addAddress = async (address) => {
    console.log(address, "address in context");
    try {
        const response = await axios.post(`${baseUrl}/create`,address, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error adding address:", error);
        throw error;
    }
}

const getAddress = async () => {
    try {
        const response = await axios.get(`${baseUrl}/get`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        });
        return response;
    } catch (error) {
        console.error("Error fetching address:", error);
        throw error;
    }
}
const updateAddress = async (address) => {
    try {
        const response = await axios.put(`${baseUrl}/update`, address, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error updating address:", error);
        throw error;
    }
}

const deleteAddress = async (addressId) => {
    try {
        const response = await axios.delete(`${baseUrl}/disable`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            data: { _id: addressId },
        });
        return response.data;
    } catch (error) {
        console.error("Error deleting address:", error);
        throw error;
    }
}
export { addAddress, getAddress, updateAddress, deleteAddress };
export default { addAddress, getAddress, updateAddress, deleteAddress };
