import BlogCategory from '@/components/blog/BlogCategory'
import React from 'react'
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "bootstrap/dist/css/bootstrap.min.css";

const page = () => {
  return (
    <div className="main-wrapper">
      <BlogCategory />
    </div>
  );
}

export default page
