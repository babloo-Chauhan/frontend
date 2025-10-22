"use client"
import axios from "axios";
import { createContext, useState, useContext, useEffect } from "react";
// import AxiosToastError from "../utils/AxiosToastError";
import toast from 'react-hot-toast';

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const baseUrl = `${API_URL}/carts`;


const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [subtotal, setsubtotal] = useState();
  const [shipingcharge, setshipingcharge] = useState();
  const [usertoken, setusertoken] = useState();
  // const navigate = useNavigate();

  const getToCart = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        setCart([]);
        return;
      }

      const response = await axios.get(`${baseUrl}/get`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data.success) {
        setCart(response.data.data || []);
      }
      return response.data.data;
    } catch (error) {
    }
  };

  const addToCart = async (item, size, price, qty) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        // navigate("/login");
        toast.error("Please login to add items to cart");
       
        return;
      }else{
        const response = await axios.post(`${baseUrl}/create`, {
          productId: item._id,
          qty: item.quantity,
          size: item.size,
          price: item.price,
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

        if (response.data.success) {
          toast.success("Item added to cart")

        }

      }

  


      const exist = cart.find((i) => i._id === item._id);

      if (exist) {
        setCart((prevCart) =>
          prevCart.map((i) =>
            i._id === item._id ? { ...exist, qty: exist.qty + 1 } : i
          )
        );
      } else {
        setCart([...cart, { ...item, qty: 1 }]);
      }
  
      return response;
    } catch (error) {
     
      toast.error(error.response?.data?.message || "Failed to add item to cart");
    }
  };

  const updateCartQty = async (item, qty) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        toast.error("Please login to update cart");
        return;
      }

      if (qty < 1) {
        const response = await axios.delete(`${baseUrl}/delete-cart-item`, {
          data: { _id: item._id },
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setCart(prevCart => prevCart.filter(cartItem => cartItem._id !== item._id));
      } else {
        const response = await axios.put(`${baseUrl}/update-qty`, {
          _id: item._id,
          qty: qty,
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setCart(prevCart =>
          prevCart.map(cartItem =>
            cartItem._id === item._id ? { ...cartItem, quantity: qty } : cartItem
          )
        );
        return response;
      }
    } catch (error) {
      console.error("Error:", error.response?.data?.message || "Failed to update quantity");
      toast.error("Failed to update quantity");
    }
  };

  const deleteToCartItem = async (item) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        toast.error("Please login to remove items from cart");
        return;
      }

      const response = await axios.delete(`${baseUrl}/delete-cart-item`, {
        data: { _id: item._id },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setCart(prevCart => prevCart.filter(cartItem => cartItem._id !== item._id));
      return response;
    } catch (error) {
      console.error("Error:", error.response?.data?.message || "Failed to remove item");
      toast.error("Failed to remove item from cart");
    }
  };

  // Initialize cart when component mounts
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      getToCart();
    }
  }, []);

  const addToCartFromSingleProduct = (item, qty) => {
    const exist = cart.find((i) => i._id === item._id);
    if (exist) {
      setCart((prevCart) =>
        prevCart.map((i) => (i._id === item._id ? { ...exist, qty: qty } : i))
      );
      return;
    } else {
      setCart([...cart, { ...item, qty: qty }]);
    }
  };
  console.log("subtotal",subtotal)

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        addToCartFromSingleProduct,
        getToCart,
        updateCartQty,
        subtotal,
        setsubtotal,
        shipingcharge,
        setshipingcharge,
        deleteToCartItem
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
