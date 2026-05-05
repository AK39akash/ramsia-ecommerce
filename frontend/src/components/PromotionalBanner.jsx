import React from 'react'
import { useNavigate } from 'react-router-dom'

const PromotionalBanner = () => {

    const navigate = useNavigate();

    return (
        <section className="w-full mt-2 sm:mt-4 lg:mt-10">

            <div className="relative overflow-hidden h-[200px] sm:h-[220px] lg:h-[340px]">

                {/* GRADIENT */}
                <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-900 to-black"></div>

                {/* ANIMATED SHAPES */}
                <div className="absolute top-[-40px] left-[5%] w-40 h-40 sm:w-55 sm:h-55 lg:w-72 lg:h-72 bg-white/10 rounded-full blur-3xl animate-float"></div>

                <div className="absolute bottom-[-50px] right-[5%] w-48 h-48 sm:w-55 sm:h-55 lg:w-80 lg:h-80 bg-white/10 rounded-full blur-3xl animate-float-reverse"></div>

                {/* EXTRA SMALL SHAPE */}
                <div className="hidden sm:block absolute top-[30%] left-[40%] w-40 h-40 bg-white/5 rounded-full blur-2xl animate-float"></div>

                {/* BORDER GLOW */}
                <div className="absolute inset-0 border border-white/10 rounded-lg"></div>

                {/* CONTENT */}
                <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4 sm:px-8 lg:px-16 text-white">

                    {/* LABEL */}
                    <p className="text-[9px] sm:text-[11px] lg:text-xs tracking-[0.4em] text-gray-400 mb-2 lg:mb-4">
                        RAMSIA EXCLUSIVE
                    </p>

                    {/* MAIN TEXT */}
                    <h2 className="text-lg sm:text-[22px] lg:text-5xl font-light leading-snug tracking-wide mb-2 lg:mb-4">
                        Redefine Your Everyday Style
                    </h2>

                    {/* SUB TEXT */}
                    <p className="text-[10px] sm:text-xs lg:text-sm text-gray-300 mb-4 lg:mb-6 max-w-xs sm:max-w-md lg:max-w-xl leading-relaxed">
                        Discover premium essentials crafted for modern streetwear — limited time offer with exclusive pricing on selected pieces.
                    </p>

                    {/* CTA */}
                    <button 
                        onClick={() => navigate('/collection')}
                        className="group text-[10px] border sm:text-[10px] lg:text-xs tracking-[0.2em] lg:tracking-[0.25em] flex items-center justify-center cursor-pointe py-3 lg:py-2 px-3 active:bg-black text-white cursor-pointer hover:underline hover:bg-[#060810]"
                    >

                        EXPLORE COLLECTION

                        

                    </button>

                </div>

            </div>

        </section>
    )
}

export default PromotionalBanner