import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import RelatedProducts from "../components/RelatedProducts";
import { FiChevronLeft, FiChevronRight, FiChevronsRight, FiCrosshair, FiHeart, FiShoppingCart } from "react-icons/fi";
import { toast } from "react-toastify";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart, getCartCount, navigate, addToWishlist, removeFromWishlist, wishlist } = useContext(ShopContext);

  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);

  const [size, setSize] = useState("");

  const [showGallery, setShowGallery] = useState(false);

  const [isScrolled, setIsScrolled] = useState(false);


  const isWishlisted = productData && wishlist.includes(productData._id);


  const location = useLocation();
  const query = new URLSearchParams(location.search);


  const fetchProductData = () => {

    if (!products || products.length === 0) return;

    const item = products.find(p => p._id === productId);

    if (!item) return;

    setProductData(item);

    if (item.images?.length > 0) {
      setImage(item.images[0].url);
      setCurrentIndex(0);
    }
    
  };

  const nextImage = () => {
    if (!productData?.images?.length) return;

    const nextIndex = (currentIndex + 1) % productData.images.length;
    setCurrentIndex(nextIndex);
    setImage(productData.images[nextIndex].url);
  };

  const prevImage = () => {
    if (!productData?.images?.length) return;

    const prevIndex = (currentIndex - 1 + productData.images.length) % productData.images.length;

    setCurrentIndex(prevIndex);
    setImage(productData.images[prevIndex].url);
  }


  const handleTouchStart = (e) => {
    setTouchStartX(e.targetTouches[0].clientX);
  }

  const handleTouchMove = (e) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    const distance = touchStartX - touchEndX;

    // swipe threshold
    if (distance > 50) {
      nextImage();
    } else if (distance < -50) {
      prevImage();
    }
  }


  const handleWishlistToggle = () => {
    if (!productData) return;

    if (wishlist.includes(productData._id)) {
      removeFromWishlist(productData._id);
      toast.info("Removed from wishlist");
    } else {
      addToWishlist(productData._id);
      toast.success("Added to wishlist")
    }
  }



  useEffect(() => {
    fetchProductData();
  }, [productId, products]);


  useEffect(() => {
    if (showGallery) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showGallery])


  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  return productData ? (
    <div className="transition-opacity ease-in duration-500 opacity-100  sm:mt-4 mb-20  lg:mb-40">


      {/* MOBILE HEADER */}
      <div className={`fixed top-0 left-0 w-full z-50 sm:hidden transition-all duration-300 border-none ${isScrolled ? "bg-white border-b border-gray-300 shadow-sm" : "bg-transparent" }`}>

        <div className={`flex items-center justify-between px-6 ${isScrolled ? "py-4" : "py-6"}`}>
          {/* BACK BUTTON */}
          <button onClick={() => navigate(-1)}>
            <FiChevronLeft className="w-8 h-8" />
          </button>

          

          {/* SEARCH ICON */}
          <button 
            onClick={() => navigate("/cart")}
            className="relative"
          >
            <FiShoppingCart className="w-6 h-6" />
            <p className="absolute left-[-5px] -top-1 w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
              {getCartCount()}
            </p>
          </button>

        </div>
      </div>

      {/* PRODUCT DATA */}
      <div className="flex gap-6 sm:gap-4 lg:gap-12 flex-col sm:flex-row sm:pr-2 lg:pr-0">

        {/* Product images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="lg:flex lg:flex-col overflow-x-auto lg:overflow-y-scroll justify-between lg:justify-normal sm:w-[18.7%] w-full hidden">
            {productData?.images.map((item, index) => (
              <img
                onClick={() => {
                  setImage(item.url);
                  setCurrentIndex(index);
                }}
                src={item.url}
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                alt=""
              />
            ))}
          </div>

          <div className="w-full h-full relative">

            {/* LEFT ARROW */}
            <button 
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 shadow rounded-full p-2 sm:opacity-100 sm:group-hover:opacity-100 transition hidden sm:block cursor-pointer"
            >
              <FiChevronLeft className="w-6 h-6 text-white"/>
            </button>

            {/* IMAGE */}
            <img 
              className="w-full aspect-4/5 object-cover transition duration-300 cursor-pointer" 
              src={image} 
              alt="" 
              onClick={() => setShowGallery(true)}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            />

            {/* RIGHT ARROW */}
            <button 
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 shadow rounded-full p-2 rotate-180 sm:opacity-100 sm:group-hover:opacity-100 transition hidden sm:block cursor-pointer"
            >
              <FiChevronLeft className="w-6 h-6 text-white"/>
            </button>

            <button
              onClick={handleWishlistToggle}
              className="absolute top-20 right-6 "
            >
              <FiHeart 
                className={`text-xl transition cursor-pointer ${
                  isWishlisted 
                    ? "text-red-500 fill-red-500" 
                    : "text-black"
                }`} 
              />
            </button>

            {/* DOT INDICATORS */}

            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 sm:hidden">

              {productData?.images.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex ? "bg-white w-6" : "bg-gray-100"}`}
                ></div>
              ))}

            </div>

          </div>
        </div>

        {/* PRODUCT INFORMATION */}
        <div className="flex-1 px-4 sm:px-0">

          <h1 className="text-[22px] font-medium sm:font-medium lg:text-2xl mt-2">{productData.name}</h1>

          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_dull_icon} alt="" className="w-3" />
            <p className="pl-1 sm:pl-2 text-sm sm:text-md">(122)</p>
          </div>

          <div className="mt-4">

            <div className="flex gap-2 overflow-x-auto">

              <p className="mt-3 text-sm">
                Color: {productData.color?.name}
              </p>
              
            </div>
          </div>

          <p className="mt-3 lg:mt-5 text-2xl lg:text-3xl font-medium">
            {currency}
            {productData.finalPrice || productData.price}
          </p>
          <p className="mt-3 lg:mt-5 text-[15px] lg:text-md text-gray-500 md:w-4/5">
            {productData.description}
          </p>

          <div className="flex flex-col items-center sm:items-start gap-4 sm:gap-3 lg:gap-4 my-8 sm:my-6 lg:my-8">
            <p className="font-medium sm:font-normal">SIZES</p>
            <div className="flex gap-3">
              {productData?.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item.size)}
                  className={`border cursor-pointer  px-3 ${
                    size === item.size ? "bg-black text-white" : ""
                  }`}
                  key={index}
                >
                  {item.size}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => addToCart(productData._id, size)}
            className="bg-black w-full lg:w-fit text-white sm:px-8 sm:py-3 py-4 text-md font-medium active:bg-gray-700 cursor-pointer"
          >
            ADD TO CART
          </button>

          <hr className="mt-8 sm:w-4/5 text-gray-300" />

          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original Product</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      <hr className="mt-15 text-gray-300" />

      {/* DESCRIPTION & REVIEW SECTION */}
      <div className="mt-15 px-5 sm:px-10">

        <div className="flex">
          <b className="border w-full border-gray-300 px-5 py-3 text-sm">
            Description
          </b>
          <p className="border w-full border-gray-300 px-5 py-3 text-sm">
            Reviews (122)
          </p>
        </div>

        <div className="flex flex-col gap-4 border border-gray-300 px-6 py-6 text-sm text-gray-500">
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia
            voluptates soluta vitae quia, dolores iste. Quo, vitae, magni,
            officia nostrum ea sint distinctio accusamus minus fugiat
            voluptatibus amet id sit? Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Quos, temporibus! Lorem ipsum dolor sit, amet
            consectetur adipisicing elit. Dicta nam itaque molestiae aperiam
            sunt. Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Dicta, repudiandae.
          </p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Beatae
            nihil, modi non accusamus cumque, nostrum sint nobis blanditiis illo
            sequi iusto excepturi nisi eligendi rerum provident quis id
            accusantium asperiores?
          </p>
        </div>
      </div>

      {/* DISPLAY RELATED PRODUCTS */}
      <div className="">
        <RelatedProducts
          category={productData.category}
          subCategory={productData.subCategory}
          currentProductId={productData._id}
        />
      </div>


      {/* GALLERY MODAL */}
      {showGallery && (
        <div className="fixed inset-0 z-100 bg-white flex items-center justify-center">

          <div className="relative inset-0">

            {/* CLOSE BUTTON */}
            <button
              onClick={() => setShowGallery(false)}
              className="absolute top-5 left-5 text-black text-2xl sm:text-3xl cursor-pointer"
            >
              ✕
            </button>

            {/* LEFT ARROW */}
            <button
              onClick={prevImage}
              className="absolute left-5 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full text-xl sm:text-2xl cursor-pointer"
            >
              <FiChevronLeft/>
            </button>

            {/* IMAGE */}
            <img 
              src={image} 
              alt="" 
              className="h-screen w-full object-contain"
            />

            {/* RIGHT ARROW */}
            <button
              onClick={nextImage}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-white bg-black/50 p-2 rounded-full text-xl sm:text-2xl cursor-pointer"
            >
              <FiChevronRight/>
            </button>

          </div>





        </div>
      )}

    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
