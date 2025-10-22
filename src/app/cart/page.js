"use client";
import React from "react";
import { useCart } from "@/context/CartContext.jsx";
import { IoTrash } from "react-icons/io5";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";

const Cart = () => {
  const {
    cart,
    updateCartQty,
    deleteToCartItem,
    setshipingcharge,
    setsubtotal,
  } = useCart();
  const router = useRouter();

  // ✅ Buy Now for single product
  const handleBuyNow = (product) => {
    if (!product) {
      toast.error("No product selected");
      return;
    }
    if (typeof window !== "undefined") {
      localStorage.setItem("checkoutProduct", JSON.stringify(product));
    }
    router.push("/checkout");
  };

  // ✅ Checkout for cart items
  const handlecheckout = () => {
    if (cart.length === 0) {
      toast.error("Cart is empty");
      return;
    }
    let subtotal = 0;
    const shipping = 30.0;
    cart.forEach((item) => (subtotal += item.price * item.quantity));
    localStorage.setItem("subtotal",subtotal)
    setsubtotal(subtotal);
    setshipingcharge(shipping);

    // Remove single product from localStorage if exists
    if (typeof window !== "undefined")
      localStorage.removeItem("checkoutProduct");

    router.push("/checkout");
  };

  const EmptyCart = () => (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h4 className="text-2xl font-semibold mb-6">🛒 Your Cart is Empty</h4>
      <Link
        href="/bathtub"
        className="bg-gray-900 text-white px-5 py-2 rounded-md hover:bg-gray-700 transition"
      >
        ← Continue Shopping
      </Link>
    </div>
  );

  const ShowCart = () => {
    let subtotal = 0;
    const shipping = 30.0;
    let totalItems = 0;
    cart.forEach((item) => {
      subtotal += item.price * item.quantity;
      totalItems += item.quantity;
    });

    return (
      <section className="py-10 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 bg-white shadow-md rounded-2xl p-6">
              <h2 className="text-xl font-semibold mb-6 border-b pb-3">
                🛍️ Your Items
              </h2>
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col sm:flex-row items-center sm:items-start justify-between border-b py-4 gap-4"
                >
                  <div className="w-24 h-24 flex-shrink-0">
                    <img
                      src={item.productId?.image[0]}
                      alt={item.productId?.name}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>

                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="font-semibold text-gray-800">
                      {item.productId?.name}
                    </h3>
                    <p className="text-sm text-gray-500">₹{item.price} each</p>
                  </div>

                  <div className="flex items-center justify-center sm:justify-end gap-3">
                    <button
                      className="bg-gray-200 px-3 py-1 rounded-md"
                      onClick={() =>
                        item.quantity > 1
                          ? updateCartQty(item, item.quantity - 1)
                          : toast.error("Minimum quantity is 1")
                      }
                    >
                      −
                    </button>

                    <span className="font-semibold">{item.quantity}</span>

                    <button
                      className="bg-gray-200 px-3 py-1 rounded-md"
                      onClick={() => updateCartQty(item, item.quantity + 1)}
                    >
                      +
                    </button>

                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                      onClick={() => {
                        deleteToCartItem(item);
                        toast.success("Item removed from cart");
                      }}
                    >
                      <IoTrash />
                    </button>
                  </div>

                  <div className="text-right font-semibold text-gray-700 w-20">
                    ₹{item.price * item.quantity}
                  </div>

                  {/* Buy Now button for single product */}
                  <div className="w-full mt-2 sm:mt-0 sm:w-auto">
                    <button
                      onClick={() => handleBuyNow(item)}
                      className="bg-indigo-600 text-white py-1 px-3 rounded-md hover:bg-indigo-700 transition text-sm"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="bg-white shadow-md rounded-2xl p-6 h-fit">
              <h2 className="text-xl font-semibold mb-6 border-b pb-3">
                Order Summary
              </h2>
              <ul className="space-y-3">
                <li className="flex justify-between text-gray-600">
                  <span>Products ({totalItems})</span>
                  <span className="font-semibold text-gray-800">
                    ₹{subtotal.toFixed(2)}
                  </span>
                </li>
                <li className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-semibold text-gray-800">
                    ₹{shipping.toFixed(2)}
                  </span>
                </li>
                <li className="flex justify-between text-gray-800 font-semibold border-t pt-3">
                  <span>Total</span>
                  <span>₹{(subtotal + shipping).toFixed(2)}</span>
                </li>
              </ul>

              <button
                onClick={handlecheckout}
                className="mt-6 w-full bg-gray-900 text-white py-3 rounded-md hover:bg-gray-700 transition font-semibold"
              >
                Proceed to Checkout →
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-10">Your Cart</h1>
      {cart.length > 0 ? <ShowCart /> : <EmptyCart />}
    </div>
  );
};

export default Cart;
