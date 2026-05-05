import React from 'react'
import { FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa'
import { useNavigate } from "react-router-dom";

const Footer = () => {

    const navigate = useNavigate();

    return (
        <footer className="w-full bg-gradient-to-br from-black via-[#5c5c5c] to-black mb-14 sm:mb-0 px-4 sm:px-6 lg:px-12">

            {/* TOP SECTION */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 py-12 lg:py-16 border-b border-gray-200">

                {/* BRAND */}
                <div>

                    {/* RAMSIA LOGO TEXT */}
                    <h2 className="text-white text-3xl tracking-[0.2em] lg:tracking-[0.25em] font-medium mb-6">
                        RAMSIA
                    </h2>

                    <p className="text-gray-300 text-sm leading-normal lg:leading-relaxed max-w-sm">
                        Ramsia delivers modern streetwear with a focus on clean design,
                        premium fabrics, and everyday comfort.
                    </p>

                    {/* SOCIALS */}
                    <div className="flex gap-5 mt-6 font-medium text-sm">

                        <a href="#" className='text-white transition duration-300'>
                            <FaInstagram size={20} />
                        </a>

                        <a href="#" className='text-white transition duration-300'>
                            <FaTwitter size={20} />
                        </a>
                        <a href="#" className='text-white transition duration-300'>
                            <FaLinkedin size={20} />
                        </a>

                    </div>

                </div>


                {/* COMPANY */}
                <div>

                    <p className="text-sm tracking-[0.2em] mb-6 text-gray-400 font-semibold">
                        COMPANY
                    </p>

                    <ul className="flex flex-col gap-2 lg:gap-3 text-gray-300/80 text-sm">

                        <li 
                            onClick={() => navigate("/")}
                            className="hover:text-white cursor-pointer transition"
                        >
                            Home
                        </li>

                        <li 
                            onClick={() => navigate("/about")}
                            className="hover:text-white cursor-pointer transition"
                        >
                            About
                        </li>

                        <li 
                            onClick={() => navigate("/terms-&-conditions")}
                            className="hover:text-white cursor-pointer transition"
                        >
                            Terms & Conditions
                        </li>

                        <li 
                            onClick={() => navigate("/privacy-policy")}
                            className="hover:text-white cursor-pointer transition"
                        >
                                Privacy Policy
                        </li>

                    </ul>

                </div>


                {/* CONTACT */}
                <div>

                    <p className="text-sm tracking-[0.3em] mb-6 text-gray-400 font-semibold">
                        CONTACT
                    </p>

                    <ul className="flex flex-col gap-3 text-gray-300/80 text-sm">

                        <li className="hover:text-white transition cursor-pointer">
                            +1 212 456 7890
                        </li>

                        <li className="hover:text-white transition cursor-pointer">
                            contact@ramsia.com
                        </li>

                    </ul>

                </div>

            </div>


            {/* BOTTOM */}
            <div className="flex flex-col sm:flex-row justify-between items-center py-6 text-gray-300 text-xs">

                <p>© 2026 RAMSIA. All rights reserved.</p>

                <div className="flex gap-6 mt-3 sm:mt-0">

                    <span className="hover:text-white cursor-pointer transition">
                        Terms
                    </span>

                    <span className="hover:text-white cursor-pointer transition">
                        Privacy
                    </span>

                </div>

            </div>

        </footer>
    )
}

export default Footer