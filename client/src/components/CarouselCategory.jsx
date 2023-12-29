import React from "react";

import calcuIcon from "../assets/calcu-icon.png";
import cycleIcon from "../assets/cycl-icon.png";

import coolerIcon from "../assets/cooler-icon.png";
import dumbbellIcon from "../assets/dumbbell-icon.png";
import eleKettle from "../assets/ele-kettle.png";
import labDress from "../assets/lab-dress-icon.png";
import labShoes from "../assets/lab-shoes.png";
import others from "../assets/others-icon.png";

import {
  Navigation,
  Pagination,
  Autoplay,
  Keyboard,
  Mousewheel,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

function CarouselCategory() {
  return (
    <div className="bg-white m-3">
      <div className="text-xl font-semibold p-3 text-center">
        All Available Categories
      </div>
      <Swiper
        modules={[
          Navigation,
          Mousewheel,
          Autoplay,
          Pagination,
          Keyboard,
          Mousewheel,
        ]}
        grabCursor={true}
        keyboard={{
          enabled: true,
        }}
        mousewheel={true}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          300: {
            slidesPerView: 2,
            slidesPerGroup: 1,
          },
          500: {
            slidesPerView: 3,
            slidesPerGroup: 2,
          },
          650: {
            slidesPerView: 4,
            slidesPerGroup: 2,
          },
          900: {
            slidesPerView: 6,
            slidesPerGroup: 3,
          },
        }}
        autoplay={{
          delay: 3000,
        }}
        className="flex ml-10"
      >
        <SwiperSlide className="ml-10" >
          <Link to={`allproducts?category=${encodeURIComponent("Cycle")}`}>
            <img src={cycleIcon} title="Cycle" alt="" className="h-20" />
            <div className="side-text relative left-[25px] font-bold text-md ">
              Cycle
            </div>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link
            to={`allproducts?category==${encodeURIComponent("Calculator")}`}
          >
            <img src={calcuIcon} alt=""  className="h-20"/>
            <div className="side-text relative top-[0px] left-[10px] font-bold text-md">
              Calculator
            </div>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to={`allproducts?category=${encodeURIComponent("Kettle")}`}>
            <img src={eleKettle} alt="" className="h-20"/>
            <div className="side-text relative  left-[25px] font-bold text-md">
              Kettle
            </div>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to={`allproducts?category=${encodeURIComponent("Cooler")}`}>
            <img src={coolerIcon} alt="" className="h-20"/>
            <div className="side-text relative  left-[15px] font-bold text-md">
              Cooler
            </div>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to={`allproducts?category=${encodeURIComponent("Lab Dress")}`}>
            <img src={labDress} alt=""className="h-20" />
            <div className="side-text relative  left-[10px] font-bold text-md">
              Lab Dress
            </div>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to={`allproducts?category=${encodeURIComponent("Lab Shoes")}`}>
            <img src={labShoes} alt="" className="h-20"/>
            <div className="side-text relative  left-[10px] font-bold text-md">
              Lab Shoes
            </div>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to={`allproducts?category=${encodeURIComponent("Dumb Bell")}`}>
            <img src={dumbbellIcon} alt="" className="h-20"/>
            <div className="side-text relative  left-[10px] font-bold text-md">
              Dumb Bell
            </div>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to={`allproducts?category=${encodeURIComponent("Others")}`}>
            <img src={others} alt="" className="h-20"/>
            <div className="side-text relative  left-[25px] font-bold text-md">
              Other
            </div>
          </Link>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default CarouselCategory;
