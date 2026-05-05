import React, { useContext, useEffect, useRef, useState } from "react";
import { assets } from "../assets/frontend_assets/assets";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { FiGrid, FiHome, FiMenu, FiSearch, FiShoppingBag, FiUser, FiHeart } from "react-icons/fi";

import { HiHome } from "react-icons/hi";
import { FaChevronLeft } from "react-icons/fa";



const Navbar = () => {

  const [visible, setVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const [inputValue, setInputValue] = useState("");

  const searchRef = useRef(null);
  const inputRef = useRef(null);

  const location = useLocation();

  const { search, setSearch, getCartCount, navigate, token, setToken, setCartItems, showSearch, setShowSearch, getWishlistCount } =
    useContext(ShopContext);

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
  };

  // Navbar shrink on scroll
  useEffect(() => {

    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);

  }, []);

  return (
    <>
      {/* NAVBAR */}
      <div
        className={`hidden sm:block fixed top-0 left-0 w-full z-50 transition-all duration-300 
        ${scrolled ? "py-3 backdrop-blur-md bg-white/70 shadow-md" : "py-3 bg-white border-b border-gray-300"}
        `}
      >

        <div className="flex items-center justify-between px-4 sm:px-6">

          {/* LEFT MENU ICON */}
          <img
            onClick={() => setVisible(true)}
            src={assets.menu_icon}
            className="w-6 cursor-pointer"
            alt=""
          />

          {/* CENTER LOGO */}
          <Link
            to="/"
            className="absolute sm:left-2/6 lg:left-1/2 -translate-x-1/2 flex items-center gap-3"
          >

            {/* Logo Icon */}
            <div className="w-7 h-7 flex items-center justify-center rounded-full bg-black text-white text-lg font-bold group-hover:scale-110 transition">
                R
            </div>

            {/* Brand Name */}
            <h1 className="sm:text-[26px] lg:text-3xl font-semibold tracking-[0.10em] text-gray-900">
                Ramsia
            </h1>
            
          </Link>

          {/* RIGHT ICONS */}
          <div className="flex items-center lg:px-4 sm:gap-4 md:gap-5 lg:gap-6">

            {/* SEARCH INPUT */}
            <div 
              ref={searchRef}
              onClick={(e) => e.stopPropagation()}
              className="hidden sm:flex items-center border border-gray-400 rounded-full px-3 sm:py-2 md:py-2.5 bg-gray-50/60 focus-within:border-black transition"
            >

                <img
                    src={assets.search_icon}
                    className="w-4 "
                    alt=""
                />

                <input
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value) }
                    onClick={(e) => {
                      e.stopPropagation();

                      if (showSearch) {
                        setShowSearch(false)
                        setSearch("")
                        setInputValue("");
                        inputRef.current?.blur();
                      } else {
                        setShowSearch(true)
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {

                        if (!inputValue.trim()) return;

                        setSearch(inputValue);
                        setShowSearch(true);
                        
                      }
                    }}
                    type="text"
                    placeholder="Search products..."
                    className="ml-2 sm:w-35 md:w-40 lg:w-45 outline-none bg-transparent text-sm"
                />


            </div>


            {/* PROFILE */}
            <div
              onClick={() => (token ? navigate("/account") : navigate("/login"))}
              className="flex flex-col items-center cursor-pointer"
            >
              <FiUser className="text-2xl text-gray-900"/>
            </div>
            


            {/* CART */}
            <Link to="/cart" className="relative">

              <img src={assets.cart_icon} className="w-5" alt="" />

              <p className="absolute -right-1.5 -top-1 w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[10px] font-semibold">
                {getCartCount() || 0}
              </p>

            </Link>

            {/* WISHLIST */}
            <Link to="/wishlist" className="relative sm:hidden lg:inline">
              <FiHeart className="w-6 h-6 text-gray-900 hover:text-black transition"/>

              <span className="absolute -right-2 -top-1 w-4 text-center leading-4 bg-black text-white rounded-full text-[10px] font-semibold">
                {getWishlistCount() || 0}
              </span>
            </Link>

          </div>

        </div>
      </div>


      {/* MOBILE BOTTOM NAVBAR */}
      <div className="sm:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 z-50">

        <div className="flex justify-between items-center px-6 py-4 text-xs">

          {/* HOME */}
          <Link 
            to="/" 
            className="flex flex-col items-center gap-1"
          >
            
            {location.pathname === "/" ? (
              <HiHome className="text-2xl text-black" />
            ) : (
              <FiHome className="text-xl text-gray-900" />
            )}
          </Link>

          {/* MENU + SEARCH */}
          <div
            onClick={() => navigate('/shop')}
            className="flex flex-col items-center gap-1 cursor-pointer"
          >
            <div className="relative w-6 h-6 flex items-center justify-center">
              <FiMenu className="text-xl" />
              <FiSearch className="absolute top-0 right-0 text-[15px] bg-white rounded-full p-[1px]" />
            </div>
          </div>

          {/* NEW */}
          <Link to="/collection" className="flex flex-col items-center gap-1">
              
                <span className={`text-sm font-semibold tracking-widest  ${location.pathname === "/collection" ? "text-black" : "text-gray-700"}`}>
                  NEW
                </span>   
              
          </Link>

          {/* CART */}
          <Link to="/cart" className="relative flex flex-col items-center gap-1">
              
              <FiShoppingBag
                className={`text-xl ${
                  location.pathname === "/cart" ? "text-black" : "text-gray-900"
                }`}
              />

              <span className="absolute top-0 right-2 bg-black text-white text-[8px] w-4 h-4 flex items-center justify-center rounded-full">
                {getCartCount()}
              </span>

          </Link>

          {/* PROFILE */}
          <div
            onClick={() => (token ? navigate("/account") : navigate("/login"))}
            className="flex flex-col items-center gap-1 cursor-pointer"
          >
            <FiUser className="text-xl text-gray-900"/>
          </div>

        </div>

      </div>

      {/* OVERLAY */}
      {visible && (
        <div
          onClick={() => setVisible(false)}
          className="fixed inset-0 bg-black/50 z-60 transition-opacity duration-300"
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`fixed top-0 left-0 bottom-0 bg-white transition-all duration-300 z-70 overflow-hidden shadow-xl 
        ${visible ? "w-[460px]" : "w-0"}
        `}
      >

        <div className="flex flex-col text-gray-700">

          <div
            className="flex cursor-pointer items-center justify-between p-4"
          >
            <div
              onClick={() => setVisible(false)}
            >
              <FaChevronLeft/>

            </div>

            <div>
              <h2 className="font-bold">CATEGORIES</h2>
            </div>

            <div></div>

          </div>

          <div className="flex p-4 gap-2">
            <img alt="LATE CHECKOUT" loading="lazy" width="100" height="100" src="https://d2d5n4ft74bagm.cloudfront.net/media/shop-menu-top-banners/1b47d081-efcf-46fb-9604-275efda441ee/1775539884.jpeg?w=90" />

            <img alt="BISMIL" loading="lazy" width="100" height="100" decoding="async" data-nimg="1" src="https://d2d5n4ft74bagm.cloudfront.net/media/shop-menu-top-banners/2750ce4e-322f-4229-a2cb-e884d6c13511/1775539852.jpeg?w=90"/>

            <img alt="GRIND" loading="lazy" width="100" height="100" decoding="async" data-nimg="1" src="https://d2d5n4ft74bagm.cloudfront.net/media/shop-menu-top-banners/72f132a7-3ebb-4860-a7cb-cdc7f8b8784a/1775539835.jpeg?w=90"/>

            <img alt="Legacy" loading="lazy" width="100" height="100" decoding="async" data-nimg="1" src="https://d2d5n4ft74bagm.cloudfront.net/media/shop-menu-top-banners/6518775e-a99d-4034-9ee5-93d50fb524df/1775539821.jpeg?w=90"/>
          </div>

          <NavLink
            onClick={() => setVisible(false)}
            className="py-3 pl-6 hover:bg-gray-100"
            to="/collection?category=Men"
          >
            MENS
          </NavLink>

          <NavLink
            onClick={() => setVisible(false)}
            className="py-3 pl-6 hover:bg-gray-100"
            to="/collection?category=Women"
          >
            WOMENS
          </NavLink>

          <NavLink
            onClick={() => setVisible(false)}
            className="py-3 pl-6 hover:bg-gray-100"
            to="/collection?category=Boy"
          >
            BOYS
          </NavLink>

          <NavLink
            onClick={() => setVisible(false)}
            className="py-3 pl-6 hover:bg-gray-100"
            to="/collection?category=Girl"
          >
            GIRLS
          </NavLink>

          <NavLink
            onClick={() => setVisible(false)}
            className="py-3 pl-6 hover:bg-gray-100"
            to="/collection"
          >
            VIEW ALL
          </NavLink>

          <NavLink
            onClick={() => setVisible(false)}
            className="py-3 pl-6 hover:bg-gray-100"
            to="/collection?bestseller=true"
          >
            BESTSELLERS
          </NavLink>

          <NavLink
            onClick={() => setVisible(false)}
            className="py-3 pl-6 hover:bg-gray-100"
            to="/collection?subCategory=Shirts"
          >
            SHIRTS
          </NavLink>

          <NavLink
            onClick={() => setVisible(false)}
            className="py-3 pl-6 hover:bg-gray-100"
            to="/collection?subCategory=T-Shirts"
          >
            T-SHIRTS
          </NavLink>

          <NavLink
            onClick={() => setVisible(false)}
            className="py-3 pl-6 hover:bg-gray-100"
            to="/collection?subCategory=Jeans"
          >
            JEANS
          </NavLink>

          <NavLink
            onClick={() => setVisible(false)}
            className="py-3 pl-6 hover:bg-gray-100"
            to="/collection?subCategory=Trousers"
          >
            TROUSERS
          </NavLink>

        </div>

      </div>

      
    </>
  );
};

export default Navbar;