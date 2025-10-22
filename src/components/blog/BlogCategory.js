"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import b1 from "../../../public/assets/images/blog-item1.webp";
import b2 from "../../../public/assets/images/blog-item2.webp";
import b3 from "../../../public/assets/images/blog-item3.webp";
import b4 from "../../../public/assets/images/blog-item4.webp";
import b5 from "../../../public/assets/images/blog-item5.webp";
// import { useApi } from "@/context/ApiContext";
import { useSearchParams } from "next/navigation";

const BlogCategory = () => {
  const searchParams = useSearchParams();
  const slug = searchParams.get("blog");
  //   const [blogCategory, setblogCategory] = useState();
  // const { blogDetailsApi } = useApi();
  const [blogDetail, setBlogDetail] = useState(null);

  // useEffect(() => {
  //   if (!slug) return; // wait until router is ready

  //   const fetchBlogCategory = async () => {
  //     const res = await blogDetailsApi(slug);
  //     console.log("blog details gggggg", res.data);
  //     setBlogDetail(res.data);
  //   };

  //   fetchBlogCategory();
  // }, [slug]);
  return (
    <div>
      {/* 🌟 Banner Section */}
      <div
        className="relative bg-cover bg-bottom bg-no-repeat flex items-center justify-center h-90 sm:h-96"
        style={{ backgroundImage: "url(/4.jpg)"}}
      >
        <div className="text-center text-white bg-black/40 px-6 py-10 rounded-lg">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-wide">Blog</h1>
        </div>
      </div>

      {/* 🌿 Blog Grid Section */}
      <div
        className="bg-no-repeat bg-top py-12"
        style={{
          backgroundImage: "url(/assets/images/wedding-venue-body-bg.webp)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-md overflow-hidden group hover:shadow-xl transition-all duration-300"
              >
                <Link href={`/blog/blogs?blog=slug`}>
                  <div className="overflow-hidden">
                    <Image
                      src={b1}
                      alt="Blog"
                      className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500"
                      width={800}
                      height={500}
                    />
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <h6 className="uppercase tracking-wide font-semibold text-gray-700">
                        Bathtub
                      </h6>
                      <span className="text-gray-500">
                        25 <span className="mx-1 text-gray-400">|</span> APR
                      </span>
                    </div>

                    <h5 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                      10 Best Budget Honeymoon Destinations Outside India
                    </h5>

                    <div className="flex justify-end">
                      <i className="fa-solid fa-arrow-right text-blue-600 text-lg group-hover:translate-x-1 transition-transform duration-300"></i>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCategory;
