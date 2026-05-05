import React, { useState } from "react";
import { FiChevronLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Refunds = () => {
  // 🔥 TEMP DATA (replace with backend later)
  const [refunds] = useState([]);

  const navigate = useNavigate();

  return (
    <div className="min-h-full flex flex-col border border-gray-200 sm:p-5">
      {/* MOBILE HEADER */}
      <div className="sticky top-0 z-50 bg-white border-b-2 border-gray-200 sm:hidden">
        <div className="flex items-center justify-between px-4 py-4">
          {/* BACK BUTTON */}
          <button onClick={() => navigate(-1)}>
            <FiChevronLeft className="w-7 h-7" />
          </button>

          {/* TITLE */}
          <h2 className="text-[17px] font-semibold tracking-wide">REFUNDS</h2>

          <div />
        </div>
      </div>

      {/* TITLE */}
      <h2 className="hidden sm:block text-xl sm:text-xl text-center font-bold">
        Refunds
      </h2>

      <div className="flex-1 flex justify-center items-center">

        {/* EMPTY STATE */}
        {refunds.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center px-4">
            {/* ICON */}
            <div className="text-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.2}
                stroke="currentColor"
                className="w-24 h-24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8c-2.21 0-4 1.79-4 4m8 0a4 4 0 0 0-4-4m0 0V4m0 4v8m0 0h4m-4 0H8"
                />
              </svg>
            </div>

            {/* TITLE */}
            <h2 className="text-lg font-semibold mb-2">NO REFUNDS YET</h2>

            {/* SUBTEXT */}
            <p className="text-gray-500 text-[13px] sm:text-sm mb-6 max-w-xs sm:max-w-[360px] lg:max-w-sm">
              Any refunded orders will appear here. Once processed, you’ll be
              able to track them easily.
            </p>
          </div>
        ) : (
          /* REFUND LIST */
          <div className="flex flex-col gap-4">
            {refunds.map((refund, index) => (
              <div
                key={index}
                className="border border-gray-200 p-4 flex justify-between items-center"
              >
                {/* LEFT */}
                <div>
                  <p className="font-medium">Order #{refund.orderId}</p>

                  <p className="text-sm text-gray-500 mt-1">{refund.date}</p>
                </div>

                {/* CENTER */}
                <div className="text-sm text-gray-600">₹{refund.amount}</div>

                {/* RIGHT STATUS */}
                <div
                  className={`text-xs px-3 py-1 rounded-full ${
                    refund.status === "Completed"
                      ? "bg-green-100 text-green-600"
                      : refund.status === "Processing"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-red-100 text-red-600"
                  }`}
                >
                  {refund.status}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Refunds;
