import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
import CartTotal from "../components/CartTotal";
import { toast } from "react-toastify";
import axios from "axios";
import { FiChevronLeft, FiHeart, FiSearch, FiTrash, FiTrash2 } from "react-icons/fi";
import { replace } from "react-router-dom";

const Cart = () => {
  const {
    products,
    currency,
    cartItems,
    updateQuantity,
    navigate,
    token,
    startCheckoutSession,
    clearCheckoutSession,
    backendUrl,
  } = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);
  const [isCartReady, setIsCartReady] = useState(false);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item],
            });
          }
        }
      }

      setCartData(tempData);
      setIsCartReady(true);
    }
  }, [cartItems, products]);


  if (!isCartReady) {
    return null;
  }


  if (cartData.length === 0) {
    return (

      <div className="lg:pt-0 lg:mb-40 sm:mt-30 sm:flex sm:flex-col sm:items-center">
        
        {/* MOBILE HEADER */}
        <div className="sticky top-0 z-50 bg-white border-b-2 border-gray-200 sm:hidden">
          <div className="flex items-center justify-between px-4 py-4">
            {/* BACK BUTTON */}
            <button onClick={() => navigate(-1)}>
              <FiChevronLeft className="w-7 h-7" />
            </button>

            {/* TITLE */}
            <h2 className="text-[16px] font-semibold tracking-wide">CART</h2>

            {/* SEARCH ICON */}
            <button onClick={() => navigate("/search")}>
              <FiSearch className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="mt-15 sm:mt-0 flex flex-col lg:w-1/2 text-center px-4">

          <div className="text-gray-700 opacity-80">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.2}
              stroke="currentColor"
              className="w-34 sm:w-38 lg:w-45 mx-auto"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 7h12l-1 12H7L6 7Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 7V5a3 3 0 0 1 6 0v2"
              />
            </svg>
          </div>

          {/* TITLE */}
          <h2 className="text-xl sm:text-2xl font-semibold tracking-wide mb-10 ">
            YOUR BAG IS EMPTY
          </h2>

          <div className="flex flex-col justify-center">
            {/* SUBTEXT */}
            <div className="items-center justify-center mb-2 hidden sm:flex">
              <p className="text-gray-500 text-sm max-w-md leading-relaxed">
                Looks like you haven't added anything to your bag yet. Start
                exploring our latest collections and find something you love.
              </p>
            </div>

            {/* SUBTEXT */}
            <div className="flex items-center justify-center px-4 mb-3 sm:hidden">
              <p className="text-gray-600 text-[14px] max-w-md leading-tight sm:hidden">
                Your cart is ready to roll, but it's feeling a bit empyty
                without some stylish finds.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate("/collection")}
                className="bg-black w-full text-white font-semibold sm:font-bold px-6 py-3 sm:py-4 text-[15px] sm:text-md tracking-wide hover:bg-gray-800 transition cursor-pointer"
              >
                START SHOPPING
              </button>

              <button
                onClick={() => navigate("/wishlist")}
                className="border w-full border-black font-semibold sm:font-bold px-6 py-3 sm:py-4 text-[15px] sm:text-md tracking-wide hover:bg-gray-300 transition cursor-pointer"
              >
                ADD FROM WISHLIST
              </button>
            </div>

          </div>

        </div>
      </div>
    );
  }


  return (

    
    <div className="sm:pt-8 lg:pt-10 mb-20 flex flex-col sm:justify-center sm:items-center">

      {/* MOBILE HEADER */}
      <div className="sticky top-0 z-50 bg-white border-b-2 border-gray-200 sm:hidden">
        <div className="flex items-center justify-between px-4 py-4">
          {/* BACK BUTTON */}
          <button onClick={() => navigate(-1)}>
            <FiChevronLeft className="w-7 h-7" />
          </button>

          {/* TITLE */}
          <h2 className="text-[16px] font-semibold tracking-wide">CART</h2>

          {/* SEARCH ICON */}
          <button onClick={() => navigate("/wishlist")}>
            <FiHeart className="w-6 h-6" />
          </button>
        </div>
      </div>


      <div className="flex flex-col sm:flex-row sm:gap-4 lg:gap-6 mt-2 sm:mt-0 sm:px-4 lg:mx-20 lg:max-w-5xl w-full">

        {/* LEFT - CART ITEMS */}
        <div className="flex-1 flex flex-col gap-4">

          {cartData.map((item, index) => {
            const productData = products.find(
              (product) => product._id === item._id
            );

            if (!productData) return null;
            

            return (

              <div
                key={index}
                className="bg-white sm:rounded-xl sm:p-2 lg:p-3 flex gap-4 sm:shadow-sm sm:hover:shadow-md h-full transition"
              >

                {/* IMAGE */}
                <img 
                  src={productData.images?.[0]?.url} 
                  className="w-26 h-34 sm:w-28 md:w-36 lg:w-38 sm:h-38 md:h-56 object-cover"
                />

                {/* RIGHT CONTENT */}
                <div className="flex flex-col flex-1 justify-between pt-2 pr-4 sm:pt-0 sm:pr-0">

                  {/* TOP */}
                  <div className="flex justify-between">

                    <div>
                      <p className="text-[15px] sm:text-base font-semibold leading-tight">
                        {productData.name}
                      </p>

                      {/* SIZE + COLOR */}
                      <div className="text-xs sm:text-sm text-gray-600 sm:text-gray-500 mt-1 flex gap-2 flex-wrap">
                        <span className="bg-gray-200/80 sm:bg-gray-100 px-2 py-0.5 rounded">
                          Size: {item.size}
                        </span>

                        {productData.color?.name && (
                          <span className="flex items-center gap-1">
                            <span
                              className="w-3 h-3 rounded-full border"
                              style={{ backgroundColor: productData.color?.code }}
                            />
                            {productData.color?.name}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* DELETE */}
                    <button
                      onClick={() => updateQuantity(item._id, item.size, 0)}
                      className="lg:text-gray-400 hover:text-black text-lg transition cursor-pointer"
                    >
                      <FiTrash2/>
                    </button>

                  </div>

                  {/* BOTTOM */}
                  <div className="flex justify-between items-center mt-4 sm:pb-4 lg:pb-1">

                    {/* QUANTITY */}
                    <div className="flex items-center">
                      <span className="text-sm">Qty:</span>

                      <select
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(item._id, item.size, Number(e.target.value))
                        }
                        className="px-0.5 py-0.5 text-xs sm:text-sm focus:outline-none cursor-pointer"
                      >
                        {[...Array(10)].map((_, i) => (
                          <option key={i + 1}>{i + 1}</option>
                        ))}
                      </select>
                    </div>

                    {/* PRICE */}
                    <p className="text-sm sm:text-base font-medium sm:font-semibold">
                      {currency}{productData.finalPrice || productData.price}
                    </p>

                  </div>

                </div>

              </div>

            )

          })}

        </div>

        {/* RIGHT - PRICE DETAILS */}
        <div className="w-full sm:w-[280px] md:w-[300px] lg:w-[350px]">

          <div className="bg-white sm:rounded-xl p-5 sm:shadow-sm sticky top-24">

            <CartTotal />

            <button
              onClick={() => {
                if (cartData.length === 0) {
                  toast.error("Your cart is empty");
                } else if (!token) {
                  toast.error("Please login", {
                    onClose: () => navigate("/login"),
                  });
                } else {
                  const sessionId = startCheckoutSession();
                  navigate("/place-order", {
                    state: { checkoutSessionId: sessionId },
                  });
                }
              }}
              className="bg-black text-white w-full mt-4 py-3 text-sm rounded hover:bg-gray-900 transition cursor-pointer font-semibold"
            >
              PROCEED TO CHECKOUT
            </button>

          </div>
          
        </div>
        
      </div>

      <hr className="mt-10 text-gray-300 sm:hidden" />

      <div className="mt-10 sm:mt-15 sm:mx-10 lg:mx-20 w-full">

        <h2 className="text-2xl text-center font-semibold mb-6">
          Similar Products
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">

          {products.slice(0, 5).map((item) => (
            <div key={item._id} className="bg-white rounded-lg p-2 shadow-sm hover:shadow-md transition">

              <img 
                src={item.images?.[0]?.url} 
                className="w-full h-55 sm:h-70 md:h-75 lg:h-80 rounded"
              />

              <p className="text-sm mt-2 line-clamp-1">
                {item.name}
              </p>

              <p className="text-sm font-medium">
                {currency}{item.price}
              </p>

              <button
                onClick={() => updateQuantity(item._id, item.sizes?.[0]?.size, 1)}
                className="w-full mt-2 bg-black text-white text-xs font-semibold py-2.5 rounded hover:bg-gray-900 cursor-pointer"
              >
                ADD TO CART
              </button>

            </div>
          ))}

        </div>

      </div>

      

    </div>
  );
};

export default Cart;
