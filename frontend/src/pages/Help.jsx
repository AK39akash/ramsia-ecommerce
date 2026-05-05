import React from "react";
import { FiChevronLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Help = () => {

  const faqs = [
    {
      q: "How do I track my order?",
      a: "Go to Orders page and click on your order to track it.",
    },
    {
      q: "How can I return a product?",
      a: "You can request a return within 7 days from delivery.",
    },
    {
      q: "When will I get my refund?",
      a: "Refunds are processed within 5-7 business days.",
    },
  ];

  const navigate = useNavigate();

  return (
    <div className="h-full border border-gray-200 sm:p-5">

      {/* MOBILE HEADER */}
      <div className="sticky top-0 z-50 bg-white border-b-2 border-gray-200 sm:hidden">
        <div className="flex items-center justify-between px-4 py-4">
          {/* BACK BUTTON */}
          <button onClick={() => navigate(-1)}>
            <FiChevronLeft className="w-7 h-7" />
          </button>

          {/* TITLE */}
          <h2 className="text-[17px] font-semibold tracking-wide">HELP & SUPPORT</h2>

          <div />
        </div>
      </div>

      <div className="flex items-center justify-center">

        <h2 className="hidden sm:flex text-xl text-center sm:text-xl font-bold mb-6">
          Help & Support
        </h2>

      </div>



      {/* FAQ */}
      <div className="sm:border-2 sm:border-gray-200 flex flex-col items-center w-full p-6 mt-2 sm:mt-0 mb-4 sm:mb-8">

        <h3 className="text-lg text-center sm:text-start font-bold mb-4">FAQs</h3>

        <div className="flex flex-col gap-4 w-full">
          {faqs.map((item, index) => (
            <div key={index}>
              <p className="font-medium">{item.q}</p>
              <p className="text-sm text-gray-600 mt-1">{item.a}</p>
            </div>
          ))}
        </div>

      </div>

      <hr className="text-gray-300 sm:hidden" />

      {/* CONTACT */}
      
      <div className="sm:border-2 flex flex-col items-center sm:border-gray-200 p-6 mt-4 sm:mt-0">

        <h3 className="text-lg text-center font-bold mb-4">Contact Support</h3>

        <p className="text-sm text-gray-600 mb-4">
          Need help? Reach out to us anytime.
        </p>

        <button className="bg-black text-white px-6 py-3 text-sm hover:bg-gray-800 cursor-pointer">
          CONTACT US
        </button>
      </div>
    </div>
  );
};

export default Help;
