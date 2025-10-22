"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import he from "he";
import bdi from "../../../public/assets/images/blog-detail-item1.webp";
import bdi2 from "../../../public/assets/images/blog-detail-item2.webp";
import bdi3 from "../../../public/assets/images/blog-detail-item3.webp";
import bdi4 from "../../../public/assets/images/blog-detail-item4.webp";
import bdi5 from "../../../public/assets/images/blog-detail-item5.webp";
import bdi6 from "../../../public/assets/images/blog-detail-item6.webp";
import bdi7 from "../../../public/assets/images/blog-detail-item7.webp";
import bdi8 from "../../../public/assets/images/blog-detail-item8.webp";
import bdi9 from "../../../public/assets/images/blog-detail-item8.webp";
import bdi10 from "../../../public/assets/images/blog-detail-item9.webp";
import bdi11 from "../../../public/assets/images/blog-detail-item10.webp";
import b1 from "../../../public/assets/images/blog-item1.webp";

import bdi12 from "../../../public/assets/images/blog-detail-item9.webp";
import bi from "../../../public/assets/images/blog-item1.webp";
import la from "../../../public/assets/images/luci-avetisyan.webp";
import m from "../../../public/assets/images/MySpace.webp";
import b from "../../../public/assets/images/Behance.webp";
import g from "../../../public/assets/images/GitHub.webp";
import $ from "jquery"; // make sure jquery is installed
// import { useApi } from "@/context/ApiContext";
import { useSearchParams } from "next/navigation";

const accordionItems = [
  {
    id: "One",
    title: "Before the wedding",
    content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit...",
  },
  {
    id: "Two",
    title: "The wedding ceremony",
    content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit...",
  },
  {
    id: "Three",
    title: "The wedding banquet",
    content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit...",
  },
  {
    id: "Four",
    title: "The services for your wedding",
    content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit...",
  },
  {
    id: "Five",
    title: "Wedding fashion",
    content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit...",
  },
  {
    id: "Six",
    title: "Health and beauty",
    content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit...",
  },
  {
    id: "Seven",
    title: "Honeymoon",
    content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit...",
  },
  {
    id: "Eight",
    title: "After the wedding",
    content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit...",
  },
  {
    id: "Nine",
    title: "The wedding reception",
    content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit...",
  },
];

const BlogDetails = () => {
  // const { blogDetailApi } = useApi();
  const [blogDetail, setblogDetail] = useState();
  const searchParams = useSearchParams();
  const slug = searchParams.get("blog");
  // useEffect(() => {
  //   const fetchBlogCategory = async () => {
  //     const res = await blogDetailApi(slug);
  //     console.log("blog details pp", res);
  //     setblogDetail(res.data);
  //   };
  //   fetchBlogCategory();
  // }, []);

  console.log("blog details bbabloo", blogDetail);

  useEffect(() => {
    // Image Lightbox
    $(".zoom-icon").click(function () {
      let imgSrc = $(this).siblings("img").attr("src");
      $(".lightbox img").attr("src", imgSrc);
      $(".lightbox").css("display", "flex").hide().fadeIn();
    });

    $(".lightbox .close, .lightbox").click(function (e) {
      if (e.target !== this) return;
      $(".lightbox").fadeOut(function () {
        $(this).css("display", "none");
      });
    });

    // Share counter toggle
    $(".icon-circle").click(function () {
      $(this)
        .closest(".share-item")
        .find(".count-bubble")
        .toggleClass("active");
    });

    // Cleanup on unmount
    return () => {
      $(".zoom-icon").off("click");
      $(".lightbox .close, .lightbox").off("click");
      $(".icon-circle").off("click");
    };
  }, []);
  return (
    <div>
      {" "}
      <div className="breadcrumb-wrap">
        <div className="container-fluid">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">
                <Link href="#">Home</Link>
              </li>
              <li className="breadcrumb-item">
                <Link href="#">Blogs </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Honeymoon
              </li>
            </ol>
          </nav>
        </div>
      </div>
      <div
        className="main-banner blog-detail-banner"
        style={{
          background: `url(${
            blogDetail?.[0]?.image
              ? "https://lab5.invoidea.work/destinationwedding/public/" +
                blogDetail?.[0]?.image
              : `/assets/images/blog-detail-banner.webp`
          }) no-repeat center / cover`,
        }}
      >
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12 mx-auto">
              <div className="category d-flex gap-1">
                {/* {blogDetail?.[0]?.category.map((data,index)=>(
                  <Link href="#" key={index}> {data.name}</Link>
                ))} */}
                <Link href="#"> bathtub</Link>
                <Link href="#">Wedding</Link>
                <Link href="#">Destination Wedding</Link>
              </div>
              <div className="content">
                <h1>
                  {/* 10 Best Budget Honeymoon <br />
                  Destinations Outside India */}
                  bath tub title
                </h1>
                <div className="title-date ">
                  <h6>by Joanna Wellick </h6>
                  <div className="read-time">
                    <i className="fa-regular fa-clock me-2" />2 minute read
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="blog-detail-page ptb">
        <section>
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-8">
                <div className="row">
                  <div className="col-3">
                    <div className="share-box-wrapper  sticky-top1">
                      <h2>966</h2>
                      <p>Shares</p>
                      <hr />
                      <div className="share-item">
                        <div>
                          <div className="icon-circle">
                            <div className="icons icon-facebook">
                              <i className="fab fa-facebook-f" />
                            </div>
                          </div>
                        </div>
                        <div className="count-bubble">528</div>
                      </div>
                      <div className="share-item">
                        <div className="icons icon-circle">
                          <div className="icons icon-twitter">
                            <i className="fa-brands fa-square-x-twitter" />
                          </div>
                        </div>
                        <div className="count-bubble">528</div>
                      </div>
                      <div className="share-item">
                        <div>
                          <div className="icons icon-circle">
                            <div className="icons icon-pinterest">
                              <i className="fab fa-pinterest-p" />
                            </div>
                          </div>
                        </div>
                        <div className="count-bubble">528</div>
                      </div>
                      <div className="share-item">
                        <div className="icon-circle">
                          <div className="icons icon-gmail">
                            <i className="fa-regular fa-envelope" />
                          </div>
                        </div>
                        <div className="count-bubble">528</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-9">
                    {/* <div className="content">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: blogDetail?.[0]?.description
                            ? he.decode(blogDetail[0].description)
                            : "",
                        }}
                      />

                      
                    </div> */}

                    <div className="content">
                      <p>
                        Aenean eleifend ante maecenas pulvinar montes lorem et
                        pede dis dolor pretium donec dictum. Vici consequat
                        justo enim. Venenatis eget adipiscing luctus lorem.
                        Adipiscing veni amet luctus enim sem libero tellus
                        viverra venenatis aliquam. Commodo natoque quam pulvinar
                        elit.
                      </p>
                      <hr className="my-5" />
                      <h5 className="mb-4">TABLE OF CONTENTS</h5>
                      <ul className="table-contents">
                        <li>
                          {" "}
                          <span className="me-2">1</span>
                          Nam condimentum varius justo
                        </li>
                        <li>
                          <span className="me-2">2</span> Faucibus nullam luctus
                          felis pretium donec
                        </li>
                        <ul>
                          <li>
                            Tincidunt veni tellus orci aenean consectetuer
                          </li>
                          <li>Eu ridiculus fringilla</li>
                        </ul>
                      </ul>
                      <hr className="my-5" />
                      <h2 className="heading-2">
                        Eu ridiculus fringilla aenean
                      </h2>
                      <p>
                        Eget aenean tellus venenatis. Donec odio tempus. Felis
                        arcu pretium metus nullam quam aenean sociis quis sem
                        neque vici libero. Venenatis nullam fringilla{" "}
                        <Link href="#">pretium magnis</Link> aliquam nunc
                        vulputate integer augue ultricies cras. Eget viverra
                        feugiat cras ut. Sit natoque montes tempus ligula eget
                        vitae pede rhoncus maecenas consectetuer commodo
                        condimentum aenean.
                      </p>
                      <hr className="my-5" />
                      <div className="box">
                        <i className="fa-solid fa-arrow-right" />
                        <h3>
                          Quis adipiscing ligula donec ullamcorper tellus. Id
                          odio vulputate aliquam nullam vitae tincidunt semper
                          etiam quam donec quis.<span>Donec Massa Integer</span>
                        </h3>
                      </div>
                      <hr className="my-5" />
                      <p>
                        Ut eu sem aenean imperdiet. Hendrerit penatibus sem
                        adipiscing aliquet consequat nec orci nascetur. Etiam
                        massa quam dolor aenean maecenas sociis tellus
                        consectetuer. In sit donec massa integer nisi mus
                        viverra odio ultricies ridiculus. Sapien sem lorem.
                        Aenean sem venenatis arcu tellus fringilla vulputate
                        quis vici nullam nec. Cum quam veni lorem elit aliquet
                        pede in enim. Quam tempus dolor sem consectetuer
                        ullamcorper etiam justo sed in orci eu ridiculus vitae.
                      </p>
                      <ul className="mollis-list">
                        <li>Mollis lorem vitae varius.</li>
                        <li>
                          Felis laoreet justo aenean curabitur{" "}
                          <Link href="#">donec consequat</Link> sit nascetur
                          tellus dapibus.
                        </li>
                        <li>
                          Maecenas imperdiet vitae vidi vel parturient eleifend
                          mollis eu libero.
                        </li>
                        <li>
                          Dictum libero felis feugiat fringilla sed etiam vel
                          sem nullam elit vitae eu.
                        </li>
                        <li>
                          Felis nec eget curabitur sapien nisi aliquam pretium
                          donec dapibus feugiat. Faucibus enim venenatis mus
                          semper.
                        </li>
                      </ul>
                      <p>
                        Enim dapibus ante sapien eleifend dis vulputate quis
                        viverra ultricies vitae eros. Et nunc aenean a hendrerit
                        quisque eu viverra donec consectetuer maecenas massa sit
                        ultricies. Tellus ante quis vici elementum etiam.
                      </p>
                      <h2 className="heading-2">
                        Faucibus nullam luctus felis pretium donec
                      </h2>
                      <p>
                        Amet tempus viverra ut libero nascetur id veni ridiculus
                        rhoncus. Dis donec cras ultricies. Eros vivamus enim nec
                        nulla semper imperdiet aenean montes dictum porttitor
                        metus.
                      </p>
                      <div className="row">
                        <div className="col-6 mb-4">
                          <div className="image">
                            <Image
                              src={
                                blogDetail?.[0]?.images?.[0]?.url
                                  ? `https://lab5.invoidea.work/destinationwedding/public/` +
                                    blogDetail?.[0]?.images?.[0].url
                                  : bdi
                              }
                              className="img-fluid"
                              alt=""
                              width={0}
                              height={0}
                              style={{ width: "100%", height: "auto" }}
                            />
                          </div>
                        </div>
                        <div className="col-6 mb-4">
                          <div className="image">
                            <Image
                              src={
                                blogDetail?.[0]?.images?.[1]?.url
                                  ? `https://lab5.invoidea.work/destinationwedding/public/` +
                                    blogDetail?.[0]?.images?.[1].url
                                  : bdi2
                              }
                              className="img-fluid"
                              alt=""
                              width={0}
                              height={0}
                              style={{ width: "100%", height: "auto" }}
                            />
                          </div>
                        </div>
                        <div className="col-8 mb-4">
                          <div className="image">
                            <Image
                              src={
                                blogDetail?.[0]?.images?.[2]?.url
                                  ? `https://lab5.invoidea.work/destinationwedding/public/` +
                                    blogDetail?.[0]?.images?.[2].url
                                  : bdi3
                              }
                              className="img-fluid"
                              alt=""
                              width={0}
                              height={0}
                              style={{ width: "100%", height: "auto" }}
                            />
                          </div>
                        </div>
                        <div className="col-4 mb-4">
                          <div className="image">
                            <Image
                              src={
                                blogDetail?.[0]?.images?.[3]?.url
                                  ? `https://lab5.invoidea.work/destinationwedding/public/` +
                                    blogDetail?.[0]?.images?.[3].url
                                  : bdi4
                              }
                              className="img-fluid"
                              alt=""
                              width={0}
                              height={0}
                              style={{ width: "100%", height: "auto" }}
                            />
                          </div>
                        </div>
                        <div className="col-4 mb-4">
                          <div className="image">
                            <Image
                              src={
                                blogDetail?.[0]?.images?.[4]?.url
                                  ? `https://lab5.invoidea.work/destinationwedding/public/` +
                                    blogDetail?.[0]?.images?.[4].url
                                  : bdi5
                              }
                              className="img-fluid"
                              alt=""
                              width={0}
                              height={0}
                              style={{ width: "100%", height: "auto" }}
                            />
                          </div>
                        </div>
                        <div className="col-8 mb-4">
                          <div className="image">
                            <Image
                              src={
                                blogDetail?.[0]?.images?.[5]?.url
                                  ? `https://lab5.invoidea.work/destinationwedding/public/` +
                                    blogDetail?.[0]?.images?.[5].url
                                  : bdi6
                              }
                              className="img-fluid"
                              alt=""
                              width={0}
                              height={0}
                              style={{ width: "100%", height: "auto" }}
                            />
                          </div>
                        </div>
                      </div>
                      <p>
                        Sit dis sed ante integer ullamcorper vel donec tellus a.
                        Nisi vici vulputate elit quis adipiscing aenean
                        imperdiet justo varius. Vel eget luctus a sem pede sit
                        metus nulla maecenas. Etiam eleifend curabitur lorem.
                        Viverra faucibus sem ultricies vitae etiam quam id
                        feugiat in tellus vici ut. Tellus quam varius commodo
                        luctus aliquam nec amet nullam quis viverra sit
                        fringilla consectetuer.
                      </p>
                      <ul className="check-list">
                        <li>
                          <span>
                            <i className="fa-solid fa-check" />
                          </span>{" "}
                          Ultricies sit semper leo dolor maecenas.
                        </li>
                        <li>
                          <span>
                            <i className="fa-solid fa-check" />
                          </span>{" "}
                          Magnis nam penatibus justo nec quis eget amet
                          venenatis integer rutrum eleifend commodo tincidunt.
                        </li>
                        <li>
                          <span>
                            <i className="fa-solid fa-check" />
                          </span>{" "}
                          Aenean nunc pretium lorem ullamcorper leo.
                        </li>
                        <li>
                          <span>
                            <i className="fa-solid fa-check" />
                          </span>{" "}
                          Nec arcu ullamcorper lorem mus eu.
                        </li>
                        <li>
                          <span>
                            <i className="fa-solid fa-check" />
                          </span>{" "}
                          <strong>Elit natoque mollis quisque.</strong>
                        </li>
                      </ul>
                      <p>
                        Sit dis sed ante integer ullamcorper vel donec tellus a.
                        Nisi vici vulputate elit quis adipiscing aenean
                        imperdiet justo varius. Vel eget luctus a sem pede sit
                        metus nulla maecenas. Etiam eleifend curabitur lorem.
                        Viverra faucibus sem ultricies vitae etiam quam id
                        feugiat in tellus vici ut. Tellus quam varius commodo
                        luctus aliquam nec amet nullam quis viverra sit
                        fringilla consectetuer.
                      </p>
                      <p>
                        Sociis consequat adipiscing sit curabitur donec sem
                        luctus cras natoque vulputate dolor eget dapibus. Nec
                        vitae eros ullamcorper laoreet dapibus mus ac ante
                        viverra. A aenean sit augue curabitur et parturient nisi
                        sed enim. Nulla nec quis sit quisque sem commodo
                        ultricies neque. Lorem eget venenatis dui ante luctus
                        ultricies tellus montes. Quis in sapien tempus.
                      </p>
                      <div className="product-img">
                        <Image src={bdi6} alt="Product" />
                        <div className="zoom-icon">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={23}
                            height={23}
                            viewBox="0 0 23 23"
                            fill="none"
                          >
                            <path
                              d="M16.375 14.5L22.625 20.75L20.75 22.625L14.5 16.375V15.3875L14.1625 15.0375C12.6925 16.3048 10.8159 17.0014 8.875 17C6.72012 17 4.65349 16.144 3.12976 14.6202C1.60602 13.0965 0.75 11.0299 0.75 8.875C0.75 6.72012 1.60602 4.65349 3.12976 3.12976C4.65349 1.60602 6.72012 0.75 8.875 0.75C11.0299 0.75 13.0965 1.60602 14.6202 3.12976C16.144 4.65349 17 6.72012 17 8.875C17 10.8875 16.2625 12.7375 15.0375 14.1625L15.3875 14.5H16.375ZM8.875 14.5C12 14.5 14.5 12 14.5 8.875C14.5 5.75 12 3.25 8.875 3.25C5.75 3.25 3.25 5.75 3.25 8.875C3.25 12 5.75 14.5 8.875 14.5ZM12 9.5H9.5V12H8.25V9.5H5.75V8.25H8.25V5.75H9.5V8.25H12V9.5Z"
                              fill="white"
                            />
                          </svg>
                        </div>
                      </div>

                      <div className="lightbox">
                        <span className="close">×</span>
                        <Image src={bdi8} alt="Zoomed Image" />
                      </div>
                      <span className="my-3 d-block">
                        Ut pede leo libero cum ridiculus
                      </span>
                      <p>
                        Sociis consequat adipiscing sit curabitur donec sem
                        luctus cras natoque vulputate dolor eget dapibus. Nec
                        vitae eros ullamcorper laoreet dapibus mus ac ante
                        viverra. A aenean sit augue curabitur et parturient nisi
                        sed enim. Nulla nec quis sit quisque sem commodo
                        ultricies neque. Lorem eget venenatis dui ante luctus
                        ultricies tellus montes. Quis in sapien tempus.
                      </p>
                      <h2 className="heading-2">Eu ridiculus fringilla</h2>
                      <p>
                        Nam dictum vitae penatibus ligula id sem eget ante
                        faucibus feugiat nascetur vel. Pretium vitae mus rhoncus
                        sit maecenas quam felis orci adipiscing. Aenean
                        parturient eget quam. Leo vel lorem sociis phasellus
                        arcu dolor. Dis donec eu pede.
                      </p>
                      <div className="row mb-3">
                        <div className="col-4">
                          <Image src={bdi9} className="img-fluid" alt="" />
                        </div>
                        <div className="col-4">
                          <Image src={bdi10} className="img-fluid" alt="" />
                        </div>
                        <div className="col-4">
                          <Image src={bdi11} className="img-fluid" alt="" />
                        </div>
                      </div>
                      <p>
                        Venenatis ante veni nullam ridiculus penatibus vidi eu
                        consectetuer integer. Vulputate ipsum lorem nascetur
                        rhoncus. Aliquam vitae elit blandit enim eget laoreet.
                        Dapibus leo sociis quis nulla adipiscing amet integer
                        sem ullamcorper in maecenas eu imperdiet.
                      </p>
                      <p>
                        Ante blandit amet ultricies ut in nam massa rhoncus.
                        Eget eu massa nisi quis viverra dapibus aliquam. Id
                        ridiculus lorem ut amet dis orci tellus etiam aenean
                        pellentesque.
                      </p>
                      <p>
                        Maecenas tempus aenean nulla viverra neque vel nec cras
                        justo sapien condimentum ut varius. Blandit sem etiam
                        vel nullam vulputate sociis amet varius dolor. Vitae a
                        ut. Etiam rhoncus ante sit. Nisi nullam donec dui eu
                        phasellus a elementum elit faucibus nec. Eros eu
                        pulvinar pede luctus sit aenean lorem.
                      </p>
                      <div className="share-section">
                        <div className="share-count">
                          10K <span>Shares</span>
                        </div>
                        <Link href="#" className="btn btn-share btn-facebook">
                          <i className="fab fa-facebook-f" /> Shares{" "}
                          <span>636</span>
                        </Link>
                        <Link href="#" className="btn btn-share btn-pinterest">
                          <i className="fab fa-pinterest-p" /> Shares{" "}
                          <span>636</span>
                        </Link>
                        <Link href="#" className="btn btn-share btn-linkedin">
                          <i className="fab fa-linkedin-in" /> <span>636</span>
                        </Link>
                      </div>
                      <div className="avetisyan-wrap mt-5">
                        <div className="row">
                          <div className="col-lg-3">
                            <div className="image">
                              <Image
                                src={la}
                                className="img-fluid"
                                alt="Luci Avetisyan"
                              />
                            </div>
                          </div>
                          <div className="col-lg-9">
                            <div className="content">
                              <h3>Luci Avetisyan</h3>
                              <p className="py-2">
                                Sed cras nec a nulla sapien adipiscing ut etiam.
                                In sem viverra mollis metus quam adipiscing vel
                                nascetur condimentum felis sapien. Pede
                                consequat laoreet enim sit aliquet mollis
                                semper.
                              </p>
                              <div className="icons">
                                <ul>
                                  <li>
                                    <Link href="#">
                                      <Image
                                        src={m}
                                        className="img-fluid"
                                        alt="MySpace"
                                      />
                                    </Link>
                                  </li>
                                  <li>
                                    <Link href="#">
                                      <Image
                                        src={b}
                                        className="img-fluid"
                                        alt="Behance"
                                      />
                                    </Link>
                                  </li>
                                  <li>
                                    <Link href="#">
                                      <Image
                                        src={g}
                                        className="img-fluid"
                                        alt="GitHub"
                                      />
                                    </Link>
                                  </li>
                                  <li>
                                    <Link href="#">
                                      <Image
                                        src={m}
                                        className="img-fluid"
                                        alt="GitHub"
                                      />
                                    </Link>
                                  </li>
                                </ul>
                              </div>
                              <div className="d-flex justify-content-center my-5">
                                <button className="commentsBtn btn-wrap btn">
                                  View Comments (0)
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="blog-tags sticky-top1 ">
                  <h2>Blogs topics on </h2>
                  <h3>The Destination Wedding Bharat</h3>
                  <div className="accordion" id="accordionExample">
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingOne">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseOne"
                          aria-expanded="true"
                          aria-controls="collapseOne"
                        >
                          Before the wedding
                        </button>
                      </h2>
                      <div
                        id="collapseOne"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingOne"
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body">
                          <p>
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Aspernatur ab, molestiae provident dicta
                            inventore laborum dolorum quo labore maiores neque
                            mollitia earum dignissimos quod ratione, sint eum
                            excepturi! Nisi, error?
                          </p>
                        </div>
                      </div>

                      {/* Item 2 */}
                      <div className="accordion-item">
                        <h2 className="accordion-header" id="headingTwo">
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseTwo"
                            aria-expanded="false"
                            aria-controls="collapseTwo"
                          >
                            The wedding ceremony
                          </button>
                        </h2>
                        <div
                          id="collapseTwo"
                          className="accordion-collapse collapse"
                          aria-labelledby="headingTwo"
                          data-bs-parent="#accordionExample"
                        >
                          <div className="accordion-body">
                            <p>
                              Lorem ipsum dolor sit amet consectetur,
                              adipisicing elit. Aspernatur ab, molestiae
                              provident dicta inventore laborum dolorum quo
                              labore maiores neque mollitia earum dignissimos
                              quod ratione, sint eum excepturi! Nisi, error?
                            </p>
                          </div>
                        </div>
                      </div>
                      {/* Item 3 */}
                      <div className="accordion-item">
                        <h2 className="accordion-header" id="headingThree">
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseThree"
                            aria-expanded="false"
                            aria-controls="collapseThree"
                          >
                            The wedding banquet
                          </button>
                        </h2>
                        <div
                          id="collapseThree"
                          className="accordion-collapse collapse"
                          aria-labelledby="headingThree"
                          data-bs-parent="#accordionExample"
                        >
                          <div className="accordion-body">
                            <p>
                              Lorem ipsum dolor sit amet consectetur,
                              adipisicing elit. Aspernatur ab, molestiae
                              provident dicta inventore laborum dolorum quo
                              labore maiores neque mollitia earum dignissimos
                              quod ratione, sint eum excepturi! Nisi, error?
                            </p>
                          </div>
                        </div>
                      </div>
                      {/* Item 4 */}
                      <div className="accordion-item">
                        <h2 className="accordion-header" id="headingFour">
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseFour"
                            aria-expanded="false"
                            aria-controls="collapseFour"
                          >
                            The services for your wedding
                          </button>
                        </h2>
                        <div
                          id="collapseFour"
                          className="accordion-collapse collapse"
                          aria-labelledby="headingFour"
                          data-bs-parent="#accordionExample"
                        >
                          <div className="accordion-body">
                            <p>
                              Lorem ipsum dolor sit amet consectetur,
                              adipisicing elit. Aspernatur ab, molestiae
                              provident dicta inventore laborum dolorum quo
                              labore maiores neque mollitia earum dignissimos
                              quod ratione, sint eum excepturi! Nisi, error?
                            </p>
                          </div>
                        </div>
                      </div>
                      {/* Item 5 */}
                      <div className="accordion-item">
                        <h2 className="accordion-header" id="headingFive">
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseFive"
                            aria-expanded="false"
                            aria-controls="collapseFive"
                          >
                            Wedding fashion
                          </button>
                        </h2>
                        <div
                          id="collapseFive"
                          className="accordion-collapse collapse"
                          aria-labelledby="headingFive"
                          data-bs-parent="#accordionExample"
                        >
                          <div className="accordion-body">
                            <p>
                              Lorem ipsum dolor sit amet consectetur,
                              adipisicing elit. Aspernatur ab, molestiae
                              provident dicta inventore laborum dolorum quo
                              labore maiores neque mollitia earum dignissimos
                              quod ratione, sint eum excepturi! Nisi, error?
                            </p>
                          </div>
                        </div>
                      </div>
                      {/* Item 6 */}
                      <div className="accordion-item">
                        <h2 className="accordion-header" id="headingSix">
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseSix"
                            aria-expanded="false"
                            aria-controls="collapseSix"
                          >
                            Health and beauty
                          </button>
                        </h2>
                        <div
                          id="collapseSix"
                          className="accordion-collapse collapse"
                          aria-labelledby="headingSix"
                          data-bs-parent="#accordionExample"
                        >
                          <div className="accordion-body">
                            <p>
                              Lorem ipsum dolor sit amet consectetur,
                              adipisicing elit. Aspernatur ab, molestiae
                              provident dicta inventore laborum dolorum quo
                              labore maiores neque mollitia earum dignissimos
                              quod ratione, sint eum excepturi! Nisi, error?
                            </p>
                          </div>
                        </div>
                      </div>
                      {/* Item 7 */}
                      <div className="accordion-item">
                        <h2 className="accordion-header" id="headingSeven">
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseSeven"
                            aria-expanded="false"
                            aria-controls="collapseSeven"
                          >
                            Honeymoon
                          </button>
                        </h2>
                        <div
                          id="collapseSeven"
                          className="accordion-collapse collapse"
                          aria-labelledby="headingSeven"
                          data-bs-parent="#accordionExample"
                        >
                          <div className="accordion-body">
                            <p>
                              Lorem ipsum dolor sit amet consectetur,
                              adipisicing elit. Aspernatur ab, molestiae
                              provident dicta inventore laborum dolorum quo
                              labore maiores neque mollitia earum dignissimos
                              quod ratione, sint eum excepturi! Nisi, error?
                            </p>
                          </div>
                        </div>
                      </div>
                      {/* Item 8 */}
                      <div className="accordion-item">
                        <h2 className="accordion-header" id="headingEight">
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseEight"
                            aria-expanded="false"
                            aria-controls="collapseEight"
                          >
                            After the wedding
                          </button>
                        </h2>
                        <div
                          id="collapseEight"
                          className="accordion-collapse collapse"
                          aria-labelledby="headingEight"
                          data-bs-parent="#accordionExample"
                        >
                          <div className="accordion-body">
                            <p>
                              Lorem ipsum dolor sit amet consectetur,
                              adipisicing elit. Aspernatur ab, molestiae
                              provident dicta inventore laborum dolorum quo
                              labore maiores neque mollitia earum dignissimos
                              quod ratione, sint eum excepturi! Nisi, error?
                            </p>
                          </div>
                        </div>
                      </div>
                      {/* Item 9 */}
                      <div className="accordion-item">
                        <h2 className="accordion-header" id="headingNine">
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseNine"
                            aria-expanded="false"
                            aria-controls="collapseNine"
                          >
                            The wedding reception
                          </button>
                        </h2>
                        <div
                          id="collapseNine"
                          className="accordion-collapse collapse"
                          aria-labelledby="headingNine"
                          data-bs-parent="#accordionExample"
                        >
                          <div className="accordion-body">
                            <p>
                              Lorem ipsum dolor sit amet consectetur,
                              adipisicing elit. Aspernatur ab, molestiae
                              provident dicta inventore laborum dolorum quo
                              labore maiores neque mollitia earum dignissimos
                              quod ratione, sint eum excepturi! Nisi, error?
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="ptb">
          <div className="container-fluid">
            <div
              className="newsletters-box"
              style={{
                background:
                  "url(/assets/images/newsletters-banner.webp) no-repeat center / cover",
              }}
            >
              <div className="row">
                <div className="col-lg-12">
                  <h2 className="heading-2">Sign Up for Our Newsletters</h2>
                  <p>Get notified of the best deals on our WordPress themes.</p>
                  <form>
                    <div className="input-group">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Enter your email"
                      />
                      <button className="input-group-text btn btn-wrap">
                        Subscribe
                      </button>
                    </div>
                    <div className="form-check mb-3 mt-3">
                      <label className="form-check-label">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="remember"
                        />{" "}
                        By checking this box, you confirm that you have read and
                        are agreeing to our terms of use regarding the storage
                        of the data submitted through this form.
                      </label>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
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
    </div>
  );
};

export default BlogDetails;
