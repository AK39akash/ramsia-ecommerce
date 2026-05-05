import React from "react";
import { assets } from "../assets/frontend_assets/assets";
import { useNavigate } from "react-router-dom";

const Banner = () => {

  const navigate = useNavigate();

  return (
    <section className="w-full mt-12 sm:mt-16 lg:mt-20 sm:not-only:mb-10 px-3 sm:px-4 lg:px-4">

      <div className="grid grid-cols-1 lg:grid-cols-2 bg-black items-center gap-6 sm:gap-4 lg:gap-16 rounded-lg overflow-hidden">

        {/* IMAGE */}
        <div className="relative overflow-hidden group">

          <img
            src={assets.hero_img6}
            alt=""
            className="w-full h-[240px] sm:h-[350px] lg:h-[600px] object-cover transition duration-700 group-hover:scale-105"
          />

          {/* Subtle overlay */}
          <div className="absolute inset-0 bg-black/10"></div>

        </div>


        {/* TEXT */}
        <div className="flex  flex-col justify-center text-center lg:text-left px-4 sm:px-8 py-8 sm:pb-13 lg:pb-0 lg:py-10 max-w-xl mx-auto lg:mx-0">

          {/* Label */}
          <p className="text-[9px] sm:text-[10px] tracking-[0.4em] sm:tracking-[0.6em] text-white mb-3 sm:mb-4 lg:mb-6">
            RAMSIA
          </p>

          {/* Heading */}
          <h2 className="text-2xl text-white sm:text-3xl lg:text-6xl font-medium leading-tight mb-4 lg:mb-8">
            Elevated{' '}
            <br className="hidden lg:block" />
            Everyday Style
          </h2>

          {/* Minimal description */}
          <p className="text-white text-xs lg:text-sm leading-relaxed mb-6 lg:mb-10 max-w-md mx-auto lg:mx-0 ">
            Designed for modern silhouettes and refined comfort.
          </p>

          {/* Button */}
          <button 
            onClick={() => navigate('/collection')}
            className="relative w-fit mx-auto lg:mx-0 text-[10px] sm:text-xs tracking-[0.2em] lg:tracking-[0.3em] group text-white cursor-pointer border px-4 py-2 sm:py-2.5 lg:px-5 lg:py-3 hover:bg-white hover:text-black transition duration-300 hover:scale-105">

            SHOP NOW

          </button>

        </div>

      </div>

    </section>
  );
};

export default Banner;