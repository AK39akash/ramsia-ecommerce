import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams, useNavigate, useLocation, replace } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { FiChevronLeft } from "react-icons/fi";

const Success = () => {
  const { backendUrl, token, setCartItems, navigate, getCartCount } =
    useContext(ShopContext);

  const [searchParams] = useSearchParams();

  const orderId = searchParams.get("orderId");

  const isCOD = searchParams.get("cod") === "true";

  const isValidAccess = isCOD || orderId;


  useEffect(() => {

    if (isCOD) {
      setPaymentType("cod");
    } else if (orderId) {
      setPaymentType("stripe");
    }

  }, [isCOD, orderId]);


  if (!isValidAccess) {
    return (
      <div className="flex flex-col justify-center items-center text-center mt-40 lg:mt-25 lg:mb-40 px-6">
        <div className="bg-white flex flex-col items-center max-w-md w-full">
          <div className="text-red-500 text-7xl sm:text-8xl mb-8">✗</div>

          <h1 className="text-3xl sm:text-4xl font-bold text-red-500 mb-3">
            Invalid Order Session
          </h1>

          <p className="text-gray-600 text-[15px] sm:text-md mb-8">
            Either the order doesn't exist or the session has expired.
          </p>

          <button
            onClick={() => navigate("/", { replace: true })}
            className="bg-black text-white py-3 px-8 sm:py-4 sm:px-10 rounded-xl hover:bg-gray-800 font-bold transition cursor-pointer"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  const [loading, setLoading] = useState(true);
  const [paymentType, setPaymentType] = useState(null);

  useEffect(() => {
    setCartItems({});
    getCartCount();
    setLoading(false);
  }, []);

  useEffect(() => {
    return () => {
      sessionStorage.removeItem("checkoutCompleted");
    };
  }, []);

  


  useEffect(() => {

    const alreadyVisited = sessionStorage.getItem("successVisited");
  
    if (alreadyVisited) {
      
      navigate("/cart", { replace: true });

    } else {
      sessionStorage.setItem("successVisited", "true");
    }
  }, []);

  

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-lg">
        Please wait while we process your order...
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center text-center px-4 sm:px-6">

      {/* MOBILE HEADER */}
      <div className="sticky top-0 z-50 bg-white border-b-2 border-gray-200 sm:hidden w-full">
        <div className="flex items-center justify-between px-3 py-4">
          {/* BACK BUTTON */}
          <button onClick={() => navigate(-1)}>
            <FiChevronLeft className="w-7 h-7" />
          </button>
        </div>
      </div>

      <div className="bg-white shadow-xl rounded-2xl p-5 sm:p-8 lg:p-10 max-w-xs sm:max-w-md w-full mx-6 sm:mx-0">

        <div className="text-green-500 text-5xl sm:text-6xl mb-4">✓</div>

        {/* STRIPE SUCCESS */}
        {paymentType === "stripe" && (
          <>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-3">
              Order Confirmed Successfully
            </h1>
            <p className="text-gray-600 text-sm sm:text-md mb-8 sm:mb-6 lg:mb-8">
              Your payment has been confirmed and your order has been placed
              successfully.
            </p>
            
          </>
        )}

        {/* COD SUCCESS */}
        {paymentType === "cod" && (
          <>
            <h1 className="text-[22px] sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-3">
              Order Placed Successfully
            </h1>
            <p className="text-gray-600 text-sm lg:text-md mb-5 sm:mb-8">
              Thank you for shopping with us. Your order has been placed and
              will be processed shortly.
            </p>
          </>
        )}

        <div className="flex flex-col items-center gap-2 lg:gap-3">
          <button
            onClick={() => {
              // sessionStorage.removeItem("orderSuccessShown");
              navigate("/orders", { replace: true });
            }}
            className="bg-black w-full sm:w-[90%] lg:w-full text-[15px] sm:text-md text-white py-3 rounded-lg hover:bg-gray-800 transition cursor-pointer"
          >
            View My Orders
          </button>

          <button
            onClick={() => {
              // sessionStorage.removeItem("orderSuccessShown");
              navigate("/", { replace: true });
            }}
            className="border w-full sm:w-[90%] lg:w-full border-gray-300 text-[15px] sm:text-md mt-2 bg-gray-50 py-3 rounded-lg hover:bg-gray-100 transition cursor-pointer"
          >
            Continue Shopping
          </button>
        </div>

      </div>
    </div>
  );
};

export default Success;
