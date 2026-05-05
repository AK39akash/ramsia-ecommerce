import React, { useState } from "react";
import { FiChevronLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const GiftCards = () => {
  const [code, setCode] = useState("");

  const navigate = useNavigate();

  const handleRedeem = () => {
    if (!code) return;
    console.log("Redeem:", code);

    setCode("");
  };

  return (
    <div className="bg-gray-100 min-h-screen sm:py-6 sm:px-6 flex flex-col sm:flex-row justify-center">

      {/* MOBILE HEADER */}
      <div className="sticky top-0 z-50 bg-white border-b-2 border-gray-200 sm:hidden">
        <div className="flex items-center justify-between px-4 py-4">
          {/* BACK BUTTON */}
          <button onClick={() => navigate(-1)}>
            <FiChevronLeft className="w-7 h-7" />
          </button>

          {/* TITLE */}
          <h2 className="text-[17px] font-semibold tracking-wide">GIFT CARD</h2>

          <div/>

         
        </div>
      </div>

      <div className="w-full sm:max-w-3xl flex flex-col gap-4 mt-10 px-2 sm:px-0 sm:pt-0 mb-20">

        {/* BALANCE CARD */}
        <div className="bg-black text-white rounded-xl p-6 flex justify-between items-center">
          <div>
            <p className="text-sm opacity-80">Gift Card Balance</p>
            <h2 className="sm:text-2xl text-lg font-semibold mt-1">₹0</h2>
          </div>

          <p className="text-sm opacity-70">RAMSIA</p>
        </div>

        {/* REDEEM SECTION */}
        <div className="bg-white rounded-xl p-4">
          <p className="font-medium mb-3">Redeem Gift Card</p>

          <div className="flex gap-2">
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter gift card code"
              className="flex-1 border px-4 py-1.5 sm:py-2 text-sm outline-none"
            />

            <button
              onClick={handleRedeem}
              className="bg-black text-white px-4 py-2 text-sm"
            >
              APPLY
            </button>
          </div>
        </div>

        {/* AVAILABLE CARDS */}
        <div className="bg-white rounded-xl p-4">
          <p className="font-medium mb-4">Available Gift Cards</p>

          <div className="flex flex-col gap-3">
            {[500, 1000, 2000].map((amount, i) => (
              <div
                key={i}
                className="border rounded-md p-4 flex justify-between items-center hover:shadow-sm transition"
              >
                <div>
                  <p className="font-medium text-md">₹{amount} Gift Card</p>
                  <p className="text-sm text-gray-500">Perfect for gifting</p>
                </div>

                <button className="border px-4 py-1.5 sm:text-sm text-[13px] rounded-full hover:bg-gray-100 bg-black sm:bg-white sm:text-black text-white">
                  BUY
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* INFO */}
        <div className="bg-white rounded-xl p-4">
          <p className="font-medium mb-2">About Gift Cards</p>

          <ul className="text-sm text-gray-600 flex flex-col gap-1">
            <li>• Valid for all products</li>
            <li>• Non-refundable</li>
            <li>• Cannot be exchanged for cash</li>
            <li>• Valid for 12 months</li>
          </ul>
        </div>
      </div>

    </div>
  );
};

export default GiftCards;
