import React, { useContext, useState } from "react";
import { assets } from "../assets/frontend_assets/assets";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";
import { ShopContext } from "../context/ShopContext";

const Hero = () => {


  const { navigate } = useContext(ShopContext);


  const slides = [
    {
      image: assets.hero_img7,
      title: "ELEVATED STYLE",
      subtitle: "RAMSIA COLLECTION",
    },
    {
      images: [
        assets.hero_img1,
        assets.hero_img2,
        assets.hero_img4
      ],
      title: "TIMELESS FASHION",
      subtitle: "NEW SEASON",
    },
    {
      image: assets.hero_img6,
      title: "MODERN LUXURY",
      subtitle: "EXCLUSIVE DROP",
    },
  ];


  return (
    <section
      className="w-full h-screen overflow-hidden"
    >

      <Swiper
        modules={[Autoplay, EffectFade]}
        autoplay={{ delay: 3500 }}
        effect="fade"
        loop
        className="h-full"
      >

        {slides.map((slide, index) => (

          <SwiperSlide key={index}>

            <div className="relative w-full h-screen">

                <div className="absolute inset-0">

                    {slide.images ? (

                      <>

                        {/* MOBILE -> 2 IMAGES */}
                        <div className="grid grid-cols-2 h-full sm:hidden">

                            {slide.images.slice(0, 2).map((img, i) => (
                                <img 
                                    key={i}
                                    src={img} 
                                    className="w-full h-full object-cover"
                                    alt="" 
                                />
                            ))}

                        </div>

                        {/* DESKTOP -> 3 IMAGES */}
                        <div className="hidden sm:grid grid-cols-3 h-full">
                          {slide.images.map((img, i) => (
                            <img
                              key={i}
                              src={img}
                              className="w-full h-full object-cover"
                              alt=""
                            />
                          ))}
                        </div>
                      
                      </>

                    ) : (

                        <img 
                            src={slide.image} 
                            alt="" 
                            className="w-full h-full object-cover scale-105"
                        />
                    )}

                </div>

              {/* MOBILE SEARCH BAR */}
              <div className="sm:hidden absolute top-15 left-0 w-full px-4 z-30">

                <div
                  onClick={() => navigate("/search")}
                  className="flex items-center gap-3 bg-white/20 backdrop-blur-xs border border-white/60 rounded-full px-4 py-3"
                >

                  {/* ICON */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35m1.6-5.4a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>

                  {/* TEXT */}
                  <span className="text-sm text-white/80 animate-pulse">
                    Search "Shirts", "Jeans"...
                  </span>
                  

                </div>

              </div>

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60"></div>
              

              {/* TEXT */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6"
              >

                <div className="flex flex-col items-center">


                    <p className="text-[9px] sm:text-[11px] lg:text-xs tracking-[0.5em] mb-4 opacity-80 fade-up fade-delay-1">
                      {slide.subtitle}
                    </p>

                    <h1 className="text-2xl sm:text-[44px] lg:text-6xl font-light tracking-[0.08em] leading-tight mb-6 fade-up fade-delay-2">
                      {slide.title}
                    </h1>

                    {/* DIVIDER LINE */}
                    <div className="w-8 sm:w-12 lg:w-16 h-[1px] bg-white mb-6 fade-up fade-delay-2"></div>

                    <button 
                      onClick={() => navigate('/collection')}
                      className="border border-white px-6 lg:px-8 py-2.5 lg:py-3 text-[10px] sm:text-xs font-medium tracking-[0.2em] lg:tracking-[0.3em] opacity-0 fade-up fade-delay-3 bg-white text-black hover:bg-gray-200 hover:scale-105 transition duration-300 cursor-pointer">
                      SHOP NOW
                    </button>

                </div>


              </div>

            </div>

          </SwiperSlide>

        ))}

      </Swiper>

    </section>
  );


};

export default Hero;