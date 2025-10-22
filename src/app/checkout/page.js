"use client"; // ✅ must be first line

import React, { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { MdDelete, MdAdd, MdEdit } from "react-icons/md";
import toast from "react-hot-toast";
import {
  addAddress,
  deleteAddress,
  getAddress,
  updateAddress,
} from "@/context/AddressContext";
import { checkout, verifyPayment } from "@/context/OrdersContext";
import { useApi } from "@/context/ApiContext";

const Checkout = () => {
  const { cart } = useCart();
  const [checkoutProduct, setCheckoutProduct] = useState(null);
  const [subtotal, setSubtotal] = useState(0);

  // Load single product and subtotal from localStorage
  useEffect(() => {
    const savedProduct = localStorage.getItem("checkoutProduct");
    if (savedProduct) {
      const product = JSON.parse(savedProduct);
      setCheckoutProduct(product);
      setSubtotal(product.price * product.quantity);
    } else {
      // If cart checkout, calculate subtotal
      const cartSubtotal = cart.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      setSubtotal(cartSubtotal);
    }
  }, [cart]);

  const item = checkoutProduct;
  const totalPrice = subtotal;

  // Address state
  const [addressBackend, setAddressBackend] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    address_line: "",
    city: "",
    state: "",
    pincode: "",
    mobile: "",
    country: "India",
  });

  // Authentication
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { usertoken } = useApi();
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsAuthenticated(!!token);
  }, [usertoken]);

  // Fetch addresses
  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await getAddress();
        setAddressBackend(response?.data?.data || []);
      } catch (error) {
        console.error("Error fetching address:", error);
      }
    };
    fetchAddress();
  }, []);

  // Reset form
  const resetForm = () => {
    setAddress({
      firstName: "",
      lastName: "",
      address_line: "",
      city: "",
      state: "",
      pincode: "",
      mobile: "",
      country: "India",
    });
    setIsEditing(false);
    setEditingAddressId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        const updateData = { _id: editingAddressId, ...address };
        const response = await updateAddress(updateData);
        if (response.success) {
          toast.success("Address updated successfully");
          const updatedAddresses = await getAddress();
          setAddressBackend(updatedAddresses?.data?.data || []);
          setShowAddressForm(false);
          resetForm();
        }
      } else {
        await addAddress(address);
        toast.success("Address added successfully");
        const response = await getAddress();
        setAddressBackend(response?.data?.data || []);
        setShowAddressForm(false);
        resetForm();
      }
    } catch (error) {
      console.error("Error saving address:", error);
      toast.error(error.response?.data?.message || "Failed to save address");
    }
  };

  const handleEdit = (addr) => {
    setAddress({
      firstName: addr.firstName || "",
      lastName: addr.lastName || "",
      address_line: addr.address_line || "",
      city: addr.city || "",
      state: addr.state || "",
      pincode: addr.pincode || "",
      mobile: addr.mobile || "",
      country: addr.country || "India",
    });
    setIsEditing(true);
    setEditingAddressId(addr._id);
    setShowAddressForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      try {
        await deleteAddress(id);
        const response = await getAddress();
        setAddressBackend(response?.data?.data || []);
        toast.success("Address deleted successfully");
      } catch (error) {
        console.error("Error deleting address:", error);
        toast.error("Failed to delete address");
      }
    }
  };

  // Handle Payment
  const handlePayment = async () => {
    if (!selectedAddress) {
      toast.error("Please select a delivery address");
      return;
    }

    try {
      const orderItems = item ? [item] : cart;
      const orderResponse = await checkout(
        totalPrice,
        orderItems,
        selectedAddress
      );

      if (!orderResponse?.data) {
        toast.error("Unable to create order. Please try again.");
        return;
      }

      const {
        orderId,
        amount: orderAmount,
        userId,
        userShipping,
        cartItems,
      } = orderResponse.data;

      const options = {
        key: "rzp_test_RUCcnF0fhKzD3s",
        amount: orderAmount * 100,
        currency: "INR",
        name: "Kazoma Industries",
        description: "Purchase",
        order_id: orderId,
        handler: async function (response) {
          try {
            const paymentData = {
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
              amount: orderAmount,
              orderItems: cartItems,
              userId,
              userShipping,
            };
            const api = await verifyPayment(paymentData);
            if (api?.data?.success) {
              toast.success("Payment successful!");
              window.location.href = "/account";
            } else {
              toast.error("Payment verification failed.");
            }
          } catch (error) {
            console.error("Payment verification error:", error);
            toast.error("Payment verification failed.");
          }
        },
        prefill: {
          name: selectedAddress.firstName + " " + selectedAddress.lastName,
          email: "customer@example.com",
          contact: selectedAddress.mobile,
        },
        theme: { color: "#4F46E5" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Payment failed");
    }
  };

  if (!checkoutProduct && cart.length === 0) {
    return (
      <p className="text-center mt-10 text-gray-500">No product selected.</p>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Address Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                Delivery Address
              </h2>
              <button
                onClick={() => setShowAddressForm(true)}
                className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700"
              >
                <MdAdd className="w-5 h-5" />
                <span>Add New Address</span>
              </button>
            </div>
            {addressBackend.map((addr) => (
              <div
                key={addr._id}
                className={`p-4 border rounded-lg cursor-pointer mb-3 ${
                  selectedAddress?._id === addr._id
                    ? "border-indigo-500 bg-indigo-50"
                    : "border-gray-200 hover:border-indigo-300"
                }`}
                onClick={() => setSelectedAddress(addr)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-800">
                      {addr.firstName} {addr.lastName}
                    </h3>
                    <p className="text-gray-600 mt-1">{addr.address_line}</p>
                    <p className="text-gray-600">
                      {addr.city}, {addr.state} - {addr.pincode}
                    </p>
                    <p className="text-gray-600">{addr.country}</p>
                    <p className="text-gray-600 mt-1">Phone: {addr.mobile}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(addr);
                      }}
                      className="text-gray-500 hover:text-indigo-600"
                    >
                      <MdEdit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(addr._id);
                      }}
                      className="text-gray-500 hover:text-red-600"
                    >
                      <MdDelete className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Payment Methods */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Payment Method
            </h2>
            {["Credit/Debit Card", "UPI / Wallets", "Net Banking"].map(
              (method, i) => (
                <div
                  key={i}
                  className="flex items-center space-x-3 p-4 border rounded-lg mb-3 hover:border-indigo-500"
                >
                  <input
                    type="radio"
                    name="payment"
                    className="h-5 w-5 text-indigo-600"
                    defaultChecked={i === 0}
                  />
                  <div>
                    <h3 className="font-medium text-gray-800">{method}</h3>
                    <p className="text-sm text-gray-500">
                      Secure online payment
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        {/* Right Column - Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Order Summary
            </h2>
            {item ? (
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={item.image?.[0]}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <h3 className="font-medium text-gray-800">{item.name}</h3>
                  <p className="text-gray-600">
                    ₹{item.price} × {item.quantity}
                  </p>
                </div>
              </div>
            ) : (
              cart.map((c) => (
                <div key={c._id} className="flex items-center space-x-4 mb-4">
                  <img
                    src={c.productId?.image?.[0]}
                    alt={c.productId?.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-medium text-gray-800">
                      {c.productId?.name}
                    </h3>
                    <p className="text-gray-600">
                      ₹{c.price} × {c.quantity}
                    </p>
                  </div>
                </div>
              ))
            )}
            <div className="border-t border-gray-200 mt-6 pt-4 space-y-3">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₹{totalPrice}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>₹0</span>
              </div>
              <div className="flex justify-between font-semibold text-gray-800 text-lg">
                <span>Total</span>
                <span>₹{totalPrice}</span>
              </div>
            </div>

            {isAuthenticated ? (
              <button
                onClick={handlePayment}
                className="w-full mt-6 bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Proceed to Payment
              </button>
            ) : (
              <Link href="/login">
                <button className="w-full mt-6 bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors">
                  Login to Continue
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
