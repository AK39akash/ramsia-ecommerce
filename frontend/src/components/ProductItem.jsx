import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const ProductItem = ({ id, image = [], name, price, variant }) => {

  const { currency } = useContext(ShopContext);

  const displayImage = image?.[0] || "/placeholder.png"

  return (
    <Link
      onClick={() => window.scrollTo(0, 0)}
      className="text-gray-700 cursor-pointer group"
      to={`/product/${id}`}
    >

      <div className="overflow-hidden relative">

        {/* IMAGE */}
        <img
          className="w-full transition duration-500 group-hover:scale-105 ease-out h-75 lg:h-90 object-cover"
          src={displayImage}
          alt={name}
        />

        {/* VARIANT BESTSELLER BADGE */}
        {variant?.bestseller && (
          <span className="absolute top-2 left-2 bg-black text-white text-[10px] px-2 py-1 rounded">
            BESTSELLER
          </span>
        )}
    

      </div>

      {/* CONTENT */}
      <div className="px-2 py-2 lg:px-3">

        {/* NAME */}
        <p className="text-sm font-medium line-clamp-1">
          {name}
        </p>

        

        {/* PRICE */}
        <p className="text-sm sm:text-[15px] lg:text-base font-semibold mt-1">
          {currency}{price}
        </p>

      </div>

    </Link>

  );
};

export default ProductItem;
