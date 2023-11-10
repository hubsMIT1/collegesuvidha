import React, { useEffect, useState } from "react";
import "swiper/swiper-bundle.css";

import MapImage from "../assets/map.png";
import { Navigation, Autoplay } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
import { useParams } from "react-router-dom";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import OwnerCard from "./OwnerCard";
import MapExample from "../components/GoogleMap";
import { Link } from "react-router-dom";

import { callApi } from "../utils/CallApi";

function ProductDetails(props) {
  // Sample product data
  const product = {
    name: "Sample Product",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    price: "$99.99",
    seller: "John Doe",
    location: "New York, NY",
    uploadedDate: "2 days ago",
    isFavorite: false, // Set to true if the user has favorited this product
    owner: {
      name: "Seller Name",
      sellerRating: "4.8", // Seller's rating
    },
    isFeatured: true,
  };

  // Function to toggle favorite status
  const toggleFavorite = () => {
    // Implement your favorite logic here
  };
  const toggleFeatured = () => {};

  // Function to open owner chat
  const openChat = () => {
    // Implement your chat logic here
  };
  const [err, setError] = useState(null);

  const { id } = useParams();
  const [products, setProduct] = useState(null);

  const getProduct = async () => {
    try {
      const productResults = await callApi(`product`, { params: {} });
      if (productResults.message === undefined)
        setProduct(productResults.products[id]);
      else setError(productResults);
    } catch (err) {
      setError(err);
    }
  };
  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className="container mx-auto p-4">
      {err ? (
        <h1 className="flex justify-center text-xl text-red-500">
          {" "}
          {err?.message}{" "}
        </h1>
      ) : (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="container mx-auto p-4 ">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="lg:flex relative">
                <div className="lg:w-1/2 items-center relative bg-black">

                    {/* make a swiper component */}
                  <Swiper
                    // install Swiper modules
                    modules={[Navigation, Autoplay]}
                    spaceBetween={0}
                    slidesPerView={1}
                    navigation={true}
                    autoplay={{
                      delay: 4000,
                    }}
                    className="flex justify-center items-center"
                  >
                    {products?.images?.map((link) => (
                      <SwiperSlide className="flex justify-center items-center h-[424px] align-middle bg-black">
                        <div className="h-full object-cover  flex justify-center items-center">
                          {" "}
                          <img
                            src={link}
                            title={`${products?.title} images `}
                            className="w-1/2 h-full "
                            alt={products?.title}
                          />{" "}
        
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  {/* make a featured tag component */}
                  {product.isFeatured && (
                    <span
                      className="absolute top-0 left-0 bg-yellow-100 px-2 py-1 m-2 rounded z-50"
                      onClick={toggleFeatured}
                    >
                      Featured
                    </span>
                  )}
                </div>
                {/* make a component for the product text details  */}
                <div className="lg:w-1/2 lg:p-4">
                  <div className="p-4">
                    <h2 className="text-2xl font-bold mb-2">
                      {products?.title}
                    </h2>
                    <p className="text-gray-600 text-sm">
                      {products?.description}
                    </p>
                    <div className="mt-4">
                      <div className="text-green-500 text-xl font-semibold">
                        ₹ {products?.price}
                      </div>
                      <div className="text-gray-500 text-sm">
                        Seller: {product.seller}
                      </div>
                      <div className="text-gray-500 text-sm">
                        Brand: {products?.brand}
                      </div>
                      <div className="text-gray-500 text-sm">
                        Category: {products?.category}
                      </div>

                      <div className="text-gray-500 text-sm">
                        Location: {product.location}
                      </div>
                      <div className="text-gray-500 text-sm">
                        Uploaded: {product.uploadedDate}
                      </div>
                    </div>
                  </div>
                </div>
                {product.isFavorite ? (
                  <span
                    className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 m-2 rounded-full cursor-pointer z-50"
                    onClick={toggleFavorite}
                  >
                    ❤️ Favorite
                  </span>
                ) : (
                  <span
                    className="absolute top-0 right-0 bg-gray-500 text-white px-2 py-1 m-2 rounded-full cursor-pointer z-50"
                    onClick={toggleFavorite}
                  >
                    ♡ Favorite
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="mt-4  md:flex">

            {/* Owner details */}
            <div className=" p-4 rounded-lg md:w-1/2">
              <OwnerCard />
            </div>

            {/* Map section */}
            <div className=" p-4 sm:pl-10 rounded-lg  md:ml-4 mt-4 md:mt-0  ">
              <div className="text-gray-600 min-h-[20rem] ">
                <Link
                  className="flex justify-center z-1000 align-center min-h-[18rem] max-h-[400px] rounded-lg items-center max-w-[40rem] shadow-lg"
                  to="https://www.google.com/maps/place/NIT+Trichy+:+OJAS/@10.7602422,78.8053984,16.06z/data=!4m6!3m5!1s0x3baa8d3beb869ba3:0x50c84f0724e3fa3a!8m2!3d10.7612259!4d78.8089575!16s%2Fm%2F02q8_2v?entry=ttu"
                >
                  <img
                    src={MapImage}
                    alt={"temprary"}
                    className=" object-cover items-center cursor-pointer"
                  />
                </Link>
                <MapExample />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetails;
