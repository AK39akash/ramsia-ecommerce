import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "../components/ProductItem";
import {
  FiChevronLeft,
  FiDelete,
  FiSearch,
  FiShoppingBag,
  FiShoppingCart,
} from "react-icons/fi";
import {
  FaClosedCaptioning,
  FaCross,
  FaTrash,
  FaTrashAlt,
} from "react-icons/fa";
import { toast } from "react-toastify";

const Wishlist = () => {
  const {
    wishlist = [],
    products,
    navigate,
    removeFromWishlist,
    addToCart,
    getCartCount,
  } = useContext(ShopContext);

  if (!products || products.length === 0) {
    return null;
  }

  const wishlistProducts = products.filter((p) => wishlist.includes(p._id));

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");

  return (
    <div className="min-h-full flex flex-col border border-gray-200 sm:p-5 pb-20 sm:pb-0">

      {/* MOBILE HEADER */}
      <div className="sticky top-0 z-50 bg-white border-b-2 border-gray-200 sm:hidden">
        <div className="flex items-center justify-between px-4 py-4">
          {/* BACK BUTTON */}
          <button onClick={() => navigate(-1)}>
            <FiChevronLeft className="w-7 h-7" />
          </button>

          {/* TITLE */}
          <h2 className="text-[17px] font-semibold tracking-wide">WISHLIST</h2>

          {/* SEARCH ICON */}
          <button onClick={() => navigate("/search")}>
            <FiShoppingBag className="w-6 h-6" />

            <span className="absolute top-4 right-3 bg-black text-white text-[8px] w-4 h-4 flex items-center justify-center rounded-full">
              {getCartCount()}
            </span>
          </button>
        </div>
      </div>

      <h2 className="hidden sm:block text-lg text-center sm:text-xl px-4 font-bold">
        WISHLIST
      </h2>

      {wishlistProducts.length === 0 ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center justify-center text-center px-4">
            {/* ICON */}
            <div className="text-gray-300 mb-3 sm:mb-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.2}
                stroke="currentColor"
                className="w-28 h-28 md:w-24 md:h-24 lg:w-30 lg:h-30 mx-auto"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 21s-6.716-4.534-9.193-7.01A5.5 5.5 0 0 1 12 5.5a5.5 5.5 0 0 1 9.193 8.49C18.716 16.466 12 21 12 21Z"
                />
              </svg>
            </div>

            {/* TITLE */}
            <h2 className="text-lg lg:text-xl font-semibold tracking-wide sm:mb-3">
              YOUR WISHLIST IS EMPTY
            </h2>

            {/* SUBTEXT */}
            <p className="text-gray-500 text-xs md:text-sm lg:text-base px-10 sm:px-5 lg:px-0 mb-2 lg:mb-0">
              Save your favorite items here and revisit them anytime before they
              sell out.
            </p>

            {/* BUTTON */}
            <button
              onClick={() => navigate("/")}
              className="bg-black text-white lg:w-1/2 px-5 lg:px-6 py-3 lg:py-4 text-sm md:text-[15px] lg:text-base sm:font-medium tracking-wide hover:bg-gray-800 transition cursor-pointer rounded sm:rounded-none"
            >
              START WISHLISTING
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col lg:items-center sm:gap-4 sm:mt-6 ">
          {wishlistProducts.map((item) => (
            <div
              key={item._id}
              className="w-full lg:max-w-xl sm:border sm:border-gray-200 p-2 flex gap-4 sm:items-stretch"
            >
              {/* IMAGE */}
              <img
                src={item.images?.[0]?.url}
                alt=""
                className="w-26 h-36 sm:w-36 sm:h-48 object-cover"
              />

              {/* RIGHT CONTENT */}
              <div className="flex flex-col flex-1 justify-between sm:pr-2 pr-4">
                {/* TOP ROW */}
                <div className="flex justify-between items-start pt-2">
                  <p className="text-[13px] md:text-[15px] lg:text-base font-medium pr-5 line-clamp-2">
                    {item.name}
                  </p>

                  {/* DELETE BUTTON */}
                  <button
                    onClick={() => removeFromWishlist(item._id)}
                    className="lg:text-gray-500 hover:text-black lg:text-lg md:text-base text-sm cursor-pointer"
                  >
                    <FaTrashAlt />
                  </button>
                </div>

                {/* BOTTOM ROW */}
                <div className="flex justify-between items-center pb-2">
                  {/* MOVE TO BAG */}
                  <button
                    onClick={() => {
                      setSelectedProduct(item);
                      setSelectedSize("");
                    }}
                    className="bg-black text-white text-[11px] sm:text-[13px] px-2.5 sm:px-3 py-1.5 sm:py-2 hover:bg-gray-800 transition cursor-pointer rounded"
                  >
                    MOVE TO BAG
                  </button>

                  {/* PRICE */}
                  <div className="text-md sm:text-base font-medium">
                    ₹{item.finalPrice || item.price}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedProduct && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white w-[90%] max-w-md p-6 relative">
            {/* CLOSE */}
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-3 right-3 text-lg cursor-pointer"
            >
              ✕
            </button>

            {/* TITLE */}
            <h2 className="text-lg font-semibold mb-4">Select Size</h2>

            {/* PRODUCT NAME */}
            <p className="text-sm text-gray-600 mb-4">{selectedProduct.name}</p>

            {/* SIZES */}
            <div className="flex gap-2 flex-wrap mb-6">
              {selectedProduct.sizes?.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedSize(s.size)}
                  className={`border px-4 py-2 text-sm cursor-pointer ${
                    selectedSize === s.size
                      ? "bg-black text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {s.size}
                </button>
              ))}
            </div>

            {/* ADD BUTTON */}
            <button
              onClick={async () => {
                if (!selectedSize) {
                  return toast.error("Please select a size");
                }

                await addToCart(selectedProduct._id, selectedSize);

                await removeFromWishlist(selectedProduct._id);

                setSelectedProduct(null);
                setSelectedSize("");
              }}
              className="bg-black text-white w-full py-3 text-sm font-medium hover:bg-gray-800 cursor-pointer"
            >
              ADD TO BAG
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
