import React from 'react'
// import {Swiper,SwiperSlide} from 'swiper/react'
import slider1 from '../assets/slider1.jpeg'
import slider2 from '../assets/slider2.jpeg'
import slider4 from '../assets/slider4.jpg'

import { Navigation, Pagination, Scrollbar, A11y,  Autoplay} from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const Carousel = () => {
  return (
    <div className='h-[600px] bg-white'>
    <Swiper
      // install Swiper modules
      modules={[Navigation,Autoplay]}
      spaceBetween={0}
    //   slidesPerView={3}
      navigation = {true}
 
      // pagination={{ clickable: true }}
      // scrollbar={{ draggable: true }}
      // onSwiper={(swiper) => console.log(swiper)}
      // onSlideChange={() => console.log('slide change')}
      autoplay={{
        delay:4500,
      }}
      className='h-[50%]'
    >
        {
          Array.from ({length:5},(_,i)=>
            <SwiperSlide>
                <img src={slider4} />
            </SwiperSlide>
          )
        }
        </Swiper>
        <div className='h-[50%] bg-gradient-to-b from-stone-900'></div>
    </div>
  )
}

export default Carousel