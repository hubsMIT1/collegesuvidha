import React, { useEffect, useState, useLayoutEffect } from "react";
import "swiper/swiper-bundle.css";

import MapImage from "../assets/map.png";
import { Navigation, Autoplay } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { formatDistanceToNow, format } from "date-fns";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import OwnerCard from "./OwnerCard";
import MapExample from "../components/GoogleMap";
import { Link } from "react-router-dom";

import { getProductsById } from "../services/product_service";

const ProductDetails = (props) => {
  const [err, setError] = useState();
  const { id } = useParams();
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const ind = parseInt(params.get("index"));
  const [products, setProduct] = useState();
  const { productData } = useSelector((state) => state.productData);
  const [prodDate, setProDate] = useState();

  // Sample product data

  // Function to toggle favorite status
  const toggleFavorite = () => {
    // Implement your favorite logic here
  };
  const toggleFeatured = () => {};

  // Function to open owner chat
  const openChat = () => {
    // Implement your chat logic here
  };

  const handleGetProduct = async () => {
    if (productData) setProduct(productData[ind]);
    else if (!products) {
      try {
        const productResults = await getProductsById(1, id);
        if (productResults.status === 200) {
          setProduct(productResults.data);
        }
      } catch (err) {
        setError(err.message);
      }
    }
    console.log(products);
    if (products && products?.updatedAt) {
      const inputDate = new Date(products?.updatedAt);
      // Format the date as "Month day, year"
      const formattedDate = format(inputDate, "MMMM d, yyyy");
      const distanceToNow = formatDistanceToNow(inputDate, { addSuffix: true });
      setProDate({ formattedDate, distanceToNow });
      console.log(prodDate);
    }
  };
  useLayoutEffect(() => {
    handleGetProduct();
  }, []);

  if (err) {
    return (
      <h1 className="flex justify-center text-xl text-red-500">
        {err?.message}
      </h1>
    );
  }

  if (!products) {
    // You might want to show a loading state here
    return <p>Loading...</p>;
  }

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
                    {products?.images?.map((link, index) => (
                      <SwiperSlide
                        key={index + 1}
                        className="flex justify-center items-center h-[424px] align-middle bg-black"
                      >
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
                  {products?.isFeatured && (
                    <span
                      className="absolute top-0 left-0 bg-yellow-100 px-2 py-1 m-2 rounded z-10"
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
                        Category: {products?.category}
                      </div>

                      <div className="text-gray-500 text-sm">
                        Location: {products?.address},{products?.zipCode}
                      </div>
                      {prodDate && (
                        <div className="text-gray-500 text-sm">
                          Updated:{" "}
                          {prodDate
                            ? prodDate.formattedDate +
                              "," +
                              prodDate.distanceToNow
                            : ""}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {products?.isFavorite ? (
                  <span
                    className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 m-2 rounded-full cursor-pointer z-10"
                    onClick={toggleFavorite}
                  >
                    ❤️ Favorite
                  </span>
                ) : (
                  <span
                    className="absolute top-0 right-0 bg-gray-500 text-white px-2 py-1 m-2 rounded-full cursor-pointer z-10"
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
              {products && <OwnerCard userId={products?.userId} prodId ={id} index={ind} />}
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
                {/* <MapExample /> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
