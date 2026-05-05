import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
import NewsletterBox from "../components/NewsletterBox";
import { FiChevronLeft } from "react-icons/fi";

const Contact = () => {
  return (
    <div className="sm:mt-30">

      {/* MOBILE HEADER */}
      <div className="sticky top-0 z-50 bg-white border-b-2 border-gray-200 sm:hidden">
        <div className="flex items-center justify-between px-4 py-4">
          {/* BACK BUTTON */}
          <button onClick={() => navigate(-1)}>
            <FiChevronLeft className="w-7 h-7" />
          </button>
        </div>
      </div>



      <div className="text-center font-semibold text-2xl sm:text-3xl mt-10 sm:mt-0">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>

      <div className="my-10 sm:my-16 flex flex-col justify-center sm:flex-row gap-10 sm:gap-8 lg:gap-20 mb-14 sm:mb-22 lg:mb-28 px-4">
        
        <img
          className="w-full sm:max-w-sm lg:max-w-[480px]"
          src={assets.contact_img}
          alt=""
        />

        <div className="flex flex-col justify-center items-start gap-8 sm:gap-6 px-4 sm:px-0">

          <div className="flex flex-col gap-3 lg:gap-6">
            <p className="font-semibold text-xl text-gray-600">Our Store</p>
            <p className="text-gray-500">
              54709 Willms Station <br /> Suite 350, Washington, USA
            </p>
            <p className="text-gray-500">
              Tel: (415) 555-0132 <br /> Email: admin@ramsia.com
            </p>
          </div>

          <div className="flex flex-col gap-2 lg:gap-6">
            <p className="font-semibold text-xl text-gray-600">
              Careers at Ramsia
            </p>
            <p className="text-gray-500">
              Learn more about our teams and job openings.
            </p>
          </div>


        
          <button className="border border-black bg-black text-white sm:bg-black sm:text-white lg:bg-white lg:text-black px-7 py-3.5 sm:px-6 lg:px-8 lg:py-4 text-sm sm:text-base hover:bg-black hover:text-white transition-all duration-500 cursor-pointer -mt-4 sm:mt-0">
            Explore Jobs
          </button>

        </div>
      </div>

      <hr className="text-gray-300 border-t-2 mb-10 sm:mb-16 lg:mb-10" />

      <NewsletterBox />
    </div>
  );
};

export default Contact;
