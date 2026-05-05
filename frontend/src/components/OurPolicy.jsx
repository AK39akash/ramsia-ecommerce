import React from 'react'
import { assets } from '../assets/frontend_assets/assets'
import { FiHeadphones, FiRefreshCw, FiShield } from 'react-icons/fi'

const OurPolicy = () => {
    return (
        <section className="w-full my-16 md:mt-15 lg:my-24">

            <div className="relative overflow-hidden py-16 sm:py-12  lg:py-16">

                {/* DARK GRADIENT BASE */}
                <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0a0a0a] to-black"></div>


                {/* SUBTLE PREMIUM OVERLAY */}
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.05),transparent,rgba(255,255,255,0.05))]"></div>

                

                {/* SOFT GLOW */}
                <div className='absolute top-[20%] left-[30%] w-80 h-80 bg-white/10 rounded-full blur-3xl'></div>

                

                {/* CONTENT */}
                <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-6 px-6 sm:px-10">

                    {/* ITEM */}
                    {[
                        {
                            icon: <FiRefreshCw />,
                            title: "Easy Exchange",
                            desc: "Hassle-free exchange on all orders",
                        },
                        {
                            icon: <FiShield />,
                            title: "7-Day Returns",
                            desc: "Easy returns within 7 days",
                        },
                        {
                            icon: <FiHeadphones />,
                            title: "24/7 Support",
                            desc: "Always here to help you",
                        },
                    ].map((item, index) => (

                        <div
                            key={index}
                            className='group relative flex flex-col items-center text-center px-6 py-10 rounded-xl backdrop-blur-md bg-white/5 border border-white/10 hover:border-white/30 transition duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]'
                        >

                            {/* ICON */}
                            <div className="text-white text-3xl mb-5 transition group-hover:scale-110">
                                {item.icon}
                            </div>

                            {/* TITLE */}
                            <p className='text-white text-sm tracking-wide font-semibold mb-2'>
                                {item.title}
                            </p>

                            {/* DESC */}
                            <p className='text-xs text-gray-400'>
                                {item.desc}
                            </p>

                            {/* HOVER GLOW EFFECT */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-[radial-gradient(circle,rgba(255,255,255,0.08),transparent)] rounded-xl"></div>

                        </div>

                    ))}

                </div>

            </div>

        </section>
    )
}

export default OurPolicy