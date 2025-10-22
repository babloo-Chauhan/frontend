"use client";

import React, { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { getProducts } from "@/context/ProductApi";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import {
  MdShoppingCart,
  MdFavorite,
  MdShare,
  MdRemove,
  MdAdd,
} from "react-icons/md";
import axios from "axios";
import Link from "next/link";

const SingleProduct = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const { addToCart } = useCart();

  const [item, setItem] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [productQuantity, setProductQuantity] = useState(1);
  const [isWishlist, setIsWishlist] = useState(false);

  // ✅ Fetch product by ID
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `https://api.kazoma.co.in/api/products/${id}`
        );
        setItem(res.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    if (id) fetchProduct();
  }, [id]);

  // ✅ Initialize selections when product is fetched
  useEffect(() => {
    if (item) {
      setSelectedImage(item.image?.[0] || "");
      setSelectedSize(item.size?.[0] || "");
      setSelectedPrice(item.price?.[0] || "");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [item]);

  // ✅ Fetch related products
  useEffect(() => {
    let isMounted = true;
    const fetchRelated = async () => {
      try {
        const { data } = await getProducts();
        if (isMounted && item) {
          const related = data.data.filter(
            (product) =>
              product._id !== item._id &&
              product.subCategory.some((catId) =>
                item.subCategory.includes(catId)
              )
          );
          setRelatedProducts(related);
        }
      } catch (error) {
        console.error("Error fetching related products:", error);
      }
    };
    if (item) fetchRelated();
    return () => {
      isMounted = false;
    };
  }, [item]);

  // ✅ Quantity controls
  const handleIncrement = () => setProductQuantity((q) => q + 1);
  const handleDecrement = () => setProductQuantity((q) => (q > 1 ? q - 1 : 1));

  // ✅ Add to Cart
  const handleAddToCart = () => {
    if (!selectedSize || !selectedPrice) {
      toast.error("Please select a size first.");
      return;
    }
    addToCart({
      ...item,
      size: selectedSize,
      price: selectedPrice,
      quantity: productQuantity,
    });
    toast.success("Item added to cart!");
  };

  // ✅ Buy Now
  const handleBuyNow = (product) => {
    if (!selectedSize || !selectedPrice) {
      toast.error("Please select a size before proceeding.");
      return;
    }
    if (typeof window !== "undefined") {
      localStorage.setItem("checkoutProduct", JSON.stringify(product));
    }
    router.push("/checkout");
  };

  // ✅ Share Product
  const handleShare = () => {
    if (!item) return;
    if (navigator.share) {
      navigator.share({
        title: item.name,
        text: item.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  if (!item)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading product...
      </div>
    );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 py-8"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Thumbnails */}
              <div className="flex lg:flex-col gap-2 order-2 lg:order-1">
                {item.image?.map((img, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    className={`cursor-pointer rounded-lg overflow-hidden w-20 h-20 ${
                      selectedImage === img ? "ring-2 ring-indigo-500" : ""
                    }`}
                    onClick={() => setSelectedImage(img)}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                ))}
              </div>

              {/* Main Image */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative aspect-square overflow-hidden rounded-xl bg-white shadow-lg order-1 lg:order-2 flex-1"
              >
                <img
                  src={selectedImage || "/placeholder.jpg"}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{item.name}</h1>
              <div className="mt-2 flex items-center space-x-4">
                <span className="text-2xl font-bold text-indigo-600">
                  ₹{selectedPrice}
                </span>
                <span className="text-lg text-gray-500 line-through">
                  ₹{(selectedPrice * 1.2).toFixed(2)}
                </span>
                <span className="text-green-600 font-medium">20% off</span>
              </div>
            </div>

            {/* Size */}
            <div className="w-full max-w-xs">
              <label
                htmlFor="size"
                className="block text-sm font-semibold text-gray-800 mb-1"
              >
                Select Size
              </label>
              <select
                id="size"
                value={selectedSize || ""}
                onChange={(e) => {
                  const newSize = e.target.value;
                  const idx = item.size.indexOf(newSize);
                  if (idx !== -1) {
                    setSelectedSize(newSize);
                    setSelectedPrice(item.price[idx]);
                  }
                }}
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 text-sm"
              >
                <option value="">Select Size</option>
                {item.size.map((size, i) => (
                  <option key={i} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-sm font-medium text-gray-900">Quantity</h3>
              <div className="mt-1 flex items-center space-x-2">
                <button
                  onClick={handleDecrement}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                >
                  <MdRemove className="w-5 h-5" />
                </button>
                <span className="w-12 text-center">{productQuantity}</span>
                <button
                  onClick={handleIncrement}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                >
                  <MdAdd className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex space-x-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                disabled={!selectedSize}
                className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center space-x-2 ${
                  selectedSize
                    ? "bg-indigo-600 text-white hover:bg-indigo-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                <MdShoppingCart className="w-5 h-5" />
                <span>Add to Cart</span>
              </motion.button>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1"
              >
                <button
                  onClick={() =>
                    handleBuyNow({
                      ...item,
                      size: selectedSize,
                      price: selectedPrice,
                      quantity: productQuantity,
                    })
                  }
                  disabled={!selectedSize}
                  className={`w-full py-3 px-4 rounded-lg transition-colors ${
                    selectedSize
                      ? "bg-black text-white hover:bg-gray-800"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Buy Now
                </button>
              </motion.div>
            </div>

            {/* Wishlist + Share */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsWishlist(!isWishlist)}
                className={`p-2 rounded-full transition-colors ${
                  isWishlist
                    ? "text-red-500"
                    : "text-gray-400 hover:text-red-500"
                }`}
              >
                <MdFavorite className="w-6 h-6" />
              </button>
              <button
                onClick={handleShare}
                className="p-2 rounded-full text-gray-400 hover:text-indigo-600 transition-colors"
              >
                <MdShare className="w-6 h-6" />
              </button>
            </div>

            {/* Description & Features */}
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Description
                </h3>
                <p className="mt-2 text-gray-600">{item.description}</p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Features</h3>
                <ul className="mt-2 space-y-2">
                  {item.features.map((f, i) => (
                    <li key={i} className="flex items-center text-gray-600">
                      <span className="mr-2">•</span> {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* ✅ Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Related Products
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <motion.div
                key={product._id}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
              >
                <Link href={`/bathtub?id=${product._id}`}>
                  <div className="relative">
                    <img
                      src={product.image?.[0]}
                      alt={product.name}
                      className="aspect-square w-full object-cover rounded-lg"
                    />
                    {product.isNew && (
                      <span className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 text-xs rounded-full">
                        New
                      </span>
                    )}
                  </div>
                  <div className="p-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {product.name}
                    </h3>
                    <div className="mt-2 flex items-center space-x-2">
                      <span className="text-lg font-bold text-indigo-600">
                        ₹{product.price[0]}
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        ₹{(product.price[0] * 1.2).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SingleProduct;
