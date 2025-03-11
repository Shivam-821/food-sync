import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const UpSlider = () => {
  return (
    <div className='mt-16'>
      <UpcycleHero />
    </div>
  )
}

export default UpSlider


const slides = [
  {
    id: 1,
    image: "https://www.henryford.com/-/media/project/hfhs/henryford/henry-ford-blog/images/interior-banner-images/2022/10/upcycling-food.jpg",
    title:"Upcycling Food: How You Can Reduce Food Waste And Help The Environment | Henry Ford Health System - Detroit, MI",
    link:"https://www.bonappetit.com/story/upcycled-snacks"
  },
  {
    id: 2,
    image: "https://assets.bonappetit.com/photos/6176e4eda0c731c6377a8344/16:9/w_2560%2Cc_limit/Upcycled-Snacks-Roundup.jpg",
    title:"9 Delicious Snacks Made From Upcycled Foods and Ingredients | Bon Appétit",
    link:"https://www.henryford.com/blog/2022/10/upcycling-food"
  },
];

const UpcycleHero = () => {
  return (
    <Swiper
      modules={[Autoplay, Navigation]}
      autoplay={{ delay: 5000 }}
      navigation
      loop
      className="relative w-full h-[100px] lg:h-[430px] m-1 rounded-lg"
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.id} className="relative">
          <a
            href={slide.link}
            target="_blank"
            rel="noreferrer"
          >
            <img
              src={slide.image}
              alt="Food Banner"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-opacity-30 flex items-end justify-center text-center">
              <h2 className="text-white flex justify-center items-center h-[50px] bg-black w-full text-xl lg:text-2xl font-bold">
                {slide.title}
              </h2>
            </div>
          </a>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

