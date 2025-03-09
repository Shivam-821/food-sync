import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const slides = [
  {
    id: 1,
    image: "https://source.unsplash.com/1600x600/?food,healthy",
    title: "Explore",
    highlight: "Culinary",
    subtitle: "Insights",
  },
  {
    id: 2,
    image: "https://source.unsplash.com/1600x600/?food,cuisine",
    title: "Discover",
    highlight: "Delicious",
    subtitle: "Recipes",
  },
  {
    id: 3,
    image: "https://source.unsplash.com/1600x600/?food,dining",
    title: "Create",
    highlight: "Tasty",
    subtitle: "Dishes",
  },
];

const HeroSection = () => {
  return (
    <Swiper
      modules={[Autoplay, Navigation]}
      autoplay={{ delay: 5000 }}
      navigation
      loop
      className="relative w-full h-[200px] lg:h-[100px] m-1 rounded-lg"
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.id} className="relative">
          <img
            src={slide.image}
            alt="Food Banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center text-center">
            <h2 className="text-white text-3xl lg:text-5xl font-bold">
              {slide.title}{" "}
              <span className="text-yellow-500">{slide.highlight}</span>{" "}
              {slide.subtitle}
            </h2>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeroSection;
