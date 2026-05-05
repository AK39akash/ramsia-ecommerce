import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { FiSearch } from "react-icons/fi";

const Shop = () => {
  const { navigate } = useContext(ShopContext);

  return (
    <div className="min-h-screen bg-white pt-5 pb-20">
      {/* SEARCH BAR */}
      <div
        onClick={() => navigate("/search")}
        className="flex items-center gap-3 border border-gray-400 rounded-full mx-4 px-4 py-3 mb-6 cursor-pointer"
      >
        <FiSearch className="text-gray-500 text-xl" />
        <p className="text-sm text-gray-500">Search products...</p>
      </div>

      <div className="flex gap-2 px-4 pb-3 overflow-x-auto">
        <img
          alt="LATE CHECKOUT"
          loading="lazy"
          width="100"
          height="100"
          src="https://d2d5n4ft74bagm.cloudfront.net/media/shop-menu-top-banners/1b47d081-efcf-46fb-9604-275efda441ee/1775539884.jpeg?w=90"
        />

        <img
          alt="BISMIL"
          loading="lazy"
          width="100"
          height="100"
          decoding="async"
          data-nimg="1"
          src="https://d2d5n4ft74bagm.cloudfront.net/media/shop-menu-top-banners/2750ce4e-322f-4229-a2cb-e884d6c13511/1775539852.jpeg?w=90"
        />

        <img
          alt="GRIND"
          loading="lazy"
          width="100"
          height="100"
          decoding="async"
          data-nimg="1"
          src="https://d2d5n4ft74bagm.cloudfront.net/media/shop-menu-top-banners/72f132a7-3ebb-4860-a7cb-cdc7f8b8784a/1775539835.jpeg?w=90"
        />

        <img
          alt="Legacy"
          loading="lazy"
          width="100"
          height="100"
          decoding="async"
          data-nimg="1"
          src="https://d2d5n4ft74bagm.cloudfront.net/media/shop-menu-top-banners/6518775e-a99d-4034-9ee5-93d50fb524df/1775539821.jpeg?w=90"
        />
      </div>

      {/* Menu Items */}
      <div className="flex flex-col px-4">

        <div 
            onClick={() => navigate("/collection?category=Men")}
            className="py-2.5 font-normal cursor-pointer"
        >
            MENS
        </div>

        <div 
            onClick={() => navigate("/collection?category=Women")}
            className="py-2.5 font-normal cursor-pointer"
        >
            WOMENS
        </div>

        <div
            onClick={() => navigate("/collection?category=Boy")} 
            className="py-2.5 font-normal cursor-pointer"
        >
            BOYS
        </div>

        <div 
            onClick={() => navigate("/collection?category=Girl")}
            className="py-2.5 font-normal cursor-pointer"
        >
            GIRLS
        </div>

        <div 
            onClick={() => navigate("/collection")}
            className="py-2.5 font-normal cursor-pointer"
        >
            VIEW ALL
        </div>

        <div 
            onClick={() => navigate("/collection?bestseller=true")}
            className="py-2.5 font-normal cursor-pointer"
        >
            BESTSELLERS
        </div>

        <div 
            onClick={() => navigate("/collection?subCategory=Shirts")}
            className="py-2.5 font-normal cursor-pointer"
        >
            SHIRTS
        </div>

        <div 
            onClick={() => navigate("/collection?subCategory=T-Shirts")}
            className="py-2.5 font-normal cursor-pointer"
        >
            T-SHIRTS
        </div>

        <div 
            onClick={() => navigate("/collection?subCategory=Jeans")}
            className="py-2.5 font-normal cursor-pointer"
        >
            JEANS
        </div>

        <div 
            onClick={() => navigate("/collection?subCategory=Trousers")}
            className="py-2.5 font-normal cursor-pointer"
        >
            TROUSERS
        </div>

      </div>
    </div>
  );
};

export default Shop;
