"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/navigation";

import { MdFilterList, MdSearch, MdShoppingCart } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { toast } from "react-hot-toast";

import { getProducts } from "@/context/ProductApi";
import { getSubCategories } from "@/context/SubCategoryContext";
import { useCart } from "@/context/CartContext";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [subCategories, setSubCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("default");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const productsPerPage = 12;

  const { addToCart } = useCart();
  const router = useRouter();

  // Fetch subcategories
  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const subCategoriesData = await getSubCategories();
        setSubCategories(subCategoriesData);
      } catch (err) {
        console.error("Failed to fetch subcategories:", err);
      }
    };
    fetchSubCategories();
  }, []);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await getProducts();
        setProducts(response.data.data || []);
      } catch (err) {
        setError(err.message);
        toast.error("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Determine current category name
  const matchingSubCategory =
    selectedCategory !== "All"
      ? subCategories?.data?.data?.find((c) => c._id === selectedCategory)
      : { name: "All Products" };

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" || product.subCategory[0] === selectedCategory;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case "price-low":
        return a.price[0] - b.price[0];
      case "price-high":
        return b.price[0] - a.price[0];
      case "name":
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  // Pagination
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Slugify for WhatsApp share
  const slugify = (text) =>
    text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  const handleWhatsAppShare = (product) => {
    const slug = slugify(product.name);
    const message = `Check out this product:\n${product.name}\nPrice: ₹${product.price[0]}\nSize: ${product.size[0]}\n\nView more details at: https://www.monstvak.com/chandelier/${slug}`;
    if (typeof window !== "undefined") {
      window.open(
        `https://wa.me/919711994994?text=${encodeURIComponent(message)}`,
        "_blank"
      );
    }
  };

  const handleBuyNow = (product) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("checkoutProduct", JSON.stringify(product));
    }
    router.push("/checkout");
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-center">
          <p className="text-xl font-semibold">Error: {error}</p>
          <p className="mt-2">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Bathtubs | Kazoma Luxury & Jacuzzi Bathtubs</title>
        <meta
          name="description"
          content="Discover Kazoma's collection of luxury and Jacuzzi bathtubs in India. Perfect for homes, hotels, and spas."
        />
        <link rel="canonical" href="https://kazoma.co.in/bathtub" />
      </Head>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-white py-8"
      >
        <div className="max-w-7xl mx-auto px-2 md:px-3 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <motion.h1
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              className="text-4xl font-bold text-gray-900 mb-4"
            >
              {matchingSubCategory?.name || "Products"}
            </motion.h1>
            <motion.p
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              className="text-gray-600 max-w-2xl mx-auto"
            >
              Discover our premium selection of products, designed for comfort
              and style. Browse our collection and find the perfect item for
              you.
            </motion.p>
          </div>

          {/* Filters */}
          <div className="mb-8 grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="relative hidden md:block">
              <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="flex items-center space-x-2">
              <MdFilterList className="text-gray-600" />
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="default">Default</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name</option>
              </select>
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="All">All Categories</option>
              {subCategories?.data?.data?.map((subcategory) => (
                <option key={subcategory._id} value={subcategory._id}>
                  {subcategory.name}
                </option>
              ))}
            </select>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {currentProducts.map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.07 }}
                whileHover={{ y: -3 }}
                className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col"
              >
                <Link
                  href={`/bathtub/${item._id}?id=${item._id}`}
                  scroll={false}
                  className="flex-1 flex flex-col"
                >
                  <div className="relative">
                    <img
                      src={item.image?.[0]}
                      alt={item.name}
                      className="aspect-square w-full object-cover rounded-t-lg"
                    />
                    {item.isNew && (
                      <span className="absolute top-2 left-2 bg-green-500 text-white px-2 py-0.5 text-[10px] sm:text-xs rounded-full">
                        New
                      </span>
                    )}
                  </div>
                  <div className="p-2 md:p-3 flex flex-col flex-1">
                    <p className="text-xs sm:text-sm font-semibold text-gray-900 mb-1 truncate">
                      {item.name}
                    </p>
                    <div className="mb-1 flex items-center space-x-1">
                      <label className="text-xs font-medium text-gray-700">
                        Size:
                      </label>
                      <select className="block w-auto rounded border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-xs px-1 py-0.5">
                        {item.size?.map((size, idx) => (
                          <option key={idx} value={size}>
                            {size}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex items-center justify-between mb-1">
                      <div>
                        <span className="text-sm sm:text-base font-bold text-indigo-600">
                          ₹{item.price?.[0]}
                        </span>
                        <span className="text-xs text-gray-400 line-through ml-1">
                          ₹{(item.price?.[0] * 1.2).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>

                {/* Buttons */}
                <div className="flex w-full justify-around items-center mt-auto space-x-3 p-2">
                  <div
                    onClick={() =>
                      handleBuyNow({
                        
                        ...item,
                        size: item.size?.[0],
                        price: item.price?.[0],
                        quantity: 1,
                      })
                    }
                    className="block w-full cursor-pointer"
                  >
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="p-1.5 mt-1 rounded-full bg-black text-white hover:bg-gray-800 transition-colors w-full text-sm sm:text-sm"
                    >
                      Buy Now
                    </motion.button>
                  </div>

                  <button
                    onClick={() => {
                      addToCart({
                        ...item,
                        size: item.size?.[0],
                        price: item.price?.[0],
                        quantity: 1,
                      });
                      toast.success("Item added to cart!");
                    }}
                    className="p-1 rounded-full bg-indigo-100 text-indigo-600 hover:bg-indigo-200 transition-colors"
                  >
                    <MdShoppingCart className="w-6 h-6" />
                  </button>

                  <button
                    onClick={() => handleWhatsAppShare(item)}
                    className="p-1 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-colors"
                  >
                    <FaWhatsapp className="w-6 h-6" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex flex-wrap justify-center space-x-1 sm:space-x-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.07 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => paginate(i + 1)}
                  className={`px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm ${
                    currentPage === i + 1
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {i + 1}
                </motion.button>
              ))}
            </div>
          )}

          {/* No products found */}
          {currentProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">
                No products found matching your criteria
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default Product;
