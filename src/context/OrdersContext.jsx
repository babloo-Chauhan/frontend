import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const baseUrl = `${API_URL}/payment`;




export const getUserOrder = async (orderId) => {
    try {
        const response = await axios.get(`${baseUrl}/userorder`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        });
        
        return response;
    } catch (error) {
        console.log("error", error);


    }
};

export const updateOrder = async (orderId, status) => {
    try {
        console.log("orderId", orderId);
        console.log("status", status);
        const response = await axios.put(`${baseUrl}/update-status`, {  orderId: orderId, status: status });
        return response;
    } catch (error) {
        console.log("error", error);

    }
};

export const deleteOrder = async (orderId) => {
    try {
        const response = await axios.delete(`${baseUrl}/delete-order`, {
            data: {
                orderId: orderId
            }
        });
        return response;
    } catch (error) {
        console.log("error", error);
    }
};

export const getAllOrders = async () => {
    try {
        console.log("hhhh")
        const response = await axios.get(`${baseUrl}/orders`);

        console.log("response.data", response.data);
        return response;
    } catch (error) {
        console.log("error", error);
    }
};

export const checkout = async (aa, cart, item, selectedAddress) => {
    try {
        const orderResponse = await axios.post(`${baseUrl}/checkout`, {
            amount: aa,
           
            cartItems: cart ? cart : item,
            userShipping: selectedAddress,
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            }
        });
        console.log("dd", orderResponse)
        return orderResponse;
       
    } catch (error) {
        console.log("error", error);
    }
};

export const verifyPayment = async (paymentData) => {
    try {
            const response = await axios.post(`${baseUrl}/verify-payment`, paymentData);
            return response;
        } catch (error) {
            console.log("error", error);
        }
    }








