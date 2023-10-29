import React from 'react'
// import {Swiper,SwiperSlide} from 'swiper/react'
import calcuIcon from '../assets/calcu-icon.png'
import cycleIcon from '../assets/cycl-icon.png'

import coolerIcon from '../assets/cooler-icon.png'
import dumbbellIcon from '../assets/dumbbell-icon.png'
import eleKettle from '../assets/ele-kettle.png'
import labDress from '../assets/lab-dress-icon.png'
import labShoes from '../assets/lab-shoes.png'
import mattressIcon from '../assets/mattress-icon.png'
import others from '../assets/others-icon.png'





import { Navigation, Pagination, Scrollbar, A11y,  Autoplay,Keyboard, Mousewheel} from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function CarouselCategory() {
  return (
    <div className='bg-white m-3'>
    <div className='text-2xl font-semibold p-3 text-center'>
      All Available Categories
    </div>
    <Swiper
      // install Swiper modules
      modules={[Navigation,Mousewheel,Autoplay,Pagination,Keyboard,Mousewheel]}
      // centeredSlides={true}
      grabCursor={true}
        keyboard={{
          enabled: true,
        }}
        mousewheel={true}
        pagination={{
          clickable: true,
        }}
      // navigation = {true}
      // loop={true}
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
 
      // pagination={{ clickable: true }}
      // scrollbar={{ draggable: true }}
      // onSwiper={(swiper) => console.log(swiper)}
      // onSlideChange={() => console.log('slide change')}
      autoplay={{
        delay:3000,
      }}
      className='flex justify-center'
    >
            <SwiperSlide>
          
            <img src={cycleIcon} title="cycle" />
                <div className="side-text relative  left-[40px] font-bold text-xl">Cycle</div>
           
            </SwiperSlide>
            <SwiperSlide>
                 <img src={calcuIcon } />
                <div className="side-text relative top-[0px] left-[20px] font-bold text-xl">Calculator</div>

            </SwiperSlide>
            <SwiperSlide>
                <img src={eleKettle} />
                <div className="side-text relative  left-[40px] font-bold text-xl">Kettle</div>

            </SwiperSlide>
            <SwiperSlide>
                <img src={coolerIcon} />
                <div className="side-text relative  left-[30px] font-bold text-xl">Cooler</div>

            </SwiperSlide>
            <SwiperSlide>
                <img src={labDress} />
                <div className="side-text relative  left-[20px] font-bold text-xl">Lab Dress</div>

            </SwiperSlide>
            <SwiperSlide>
                <img src={labShoes} />
                <div className="side-text relative  left-[20px] font-bold text-xl">Lab Shoes</div>

            </SwiperSlide>
            <SwiperSlide>
                <img src={dumbbellIcon} />
                <div className="side-text relative  left-[20px] font-bold text-xl">Dumb Bell</div>

            </SwiperSlide>
            <SwiperSlide>
                <img src={others} />
                <div className="side-text relative  left-[40px] font-bold text-xl">Other</div>

            </SwiperSlide>
        </Swiper>
        {/* <div className='h-[50%] bg-gradient-to-b from-stone-900'></div> */}
    </div>
  )
}

export default CarouselCategory