import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/frontend_assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';
import { FiChevronDown, FiChevronLeft, FiHeart, FiMinus, FiPlus, FiPlusCircle, FiSearch, FiShoppingBag } from 'react-icons/fi';
import { useLocation } from 'react-router-dom';
import Footer from '../components/Footer';

const Collection = () => {

  const {products, search, showSearch, navigate, getCartCount, getWishlistCount} = useContext(ShopContext);

  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);

  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [showBestseller, setshowBestSeller] = useState(false);
  const [sortType, setSortType] = useState('relevant')
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 5000]);

  const location = useLocation();

  const title = 
    showBestseller
      ? "BESTSELLERS"
      : category[0] || subCategory[0] || "VIEW ALL";

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    const categoryParam = params.get("category");
    const subCategoryParam = params.get("subCategory");
    const bestsellerParam = params.get("bestseller");

    // RESET
    setCategory([]);
    setSubCategory([]);
    setshowBestSeller(false);

    if (bestsellerParam === "true") {
      setshowBestSeller(true);
    }
    else if (categoryParam) {
      setCategory([categoryParam]);
    }
    else if (subCategoryParam) {
      setSubCategory([subCategoryParam]);
    }

  }, [location.search]);


  const [openSection, setOpenSection] = useState({
    category: false,
    subCategory: false,
    colors: false,
    sizes: false,
    priceRange: false
  })

  const filterCount = category.length + subCategory.length + colors.length + sizes.length;

  const toggleSection = (section) => {
    setOpenSection(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }


  const toggleCategory = (e) => {

    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value))
    }
    else {
      setCategory(prev => [...prev, e.target.value])
    }

  }


  const toggleSubCategory = (e) => {

    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value))
    }
    else {
      setSubCategory(prev => [...prev, e.target.value])
    }

  }

  const applyFilter = (e) => {

    let productsCopy = [...products];

    // SEARCH
    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    }

    // CATEGORY
    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }

    // SUBCATEGORY
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
    }

    // COLOR FILTER
    if (colors.length > 0) {
      productsCopy = productsCopy.filter(item => 
        colors.includes(item.color?.name)
      );
    }

    // SIZE FILTER
    if (sizes.length > 0) {
      productsCopy = productsCopy.filter(item => 
        item.sizes?.some(s => sizes.includes(s.size))
      );
    }

    if (showBestseller) {
      productsCopy = productsCopy.filter(item => item.bestseller);
    }

    // PRICE FILTER
    productsCopy = productsCopy.filter(item => {
      const price = item.finalPrice || item.price;
      return price >= priceRange[0] && price <= priceRange[1];
    });

    setFilterProducts(productsCopy);

  }


  const sortProduct = () => {

    let fpCopy = [...filterProducts];

    switch (sortType) {
      case 'low-high':
        setFilterProducts(
          [...fpCopy].sort((a,b) => 
            (a.finalPrice || a.price) - (b.finalPrice || b.price)
          )
        );
        break;

      case 'high-low':
        setFilterProducts(
          [...fpCopy].sort((a,b) => 
            (b.finalPrice || b.price) - (a.finalPrice || a.price) 
          )
        );
        break;
    
      default:
        applyFilter();
        break;
    }
  }

  
  useEffect(() => {
    applyFilter();
  }, [category, subCategory, colors, sizes, priceRange, search, showSearch, products])


  useEffect(() => {
    sortProduct();
  }, [sortType])


  return (
    
    <div className='flex flex-col sm:flex-row w-full lg:mt-0 mb-0 md:mb-0 lg:mb-0'>

      {/* MOBILE HEADER */}
      <div className='sticky top-0 z-50 bg-white border-b-2 border-gray-200 sm:hidden'>

        <div className='flex items-center justify-between px-3 py-4'>

          <div className='flex items-center gap-2'>

            {/* BACK BUTTON */}
            <button onClick={() => navigate(-1)}>
              <FiChevronLeft className='w-7 h-7'/>
            </button>

            {/* TITLE */}
            <h2 className='font-semibold tracking-wide'>
              {title}
            </h2>

          </div>


          <div className='flex items-center gap-6 px-2'>

            {/* SEARCH ICON */}
            <button onClick={() => navigate('/search')}>
              <FiSearch className='w-6 h-6'/>
            </button>

            <button 
              onClick={() => navigate("/cart")} 
              className='relative'
            >
              <FiShoppingBag className='text-xl'/>

              <p className="absolute -right-1.5 -top-1 w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[9px] font-semibold">
                {getCartCount() || 0}
              </p>
            </button>

            <button
              onClick={() => navigate("/wishlist")} 
              className='relative'
            >
              <FiHeart className='text-xl'/>

              <span className="absolute -right-2 -top-1 w-4 text-center leading-4 bg-black text-white rounded-full text-[9px] font-semibold">
                {getWishlistCount() || 0}
              </span>
            </button>

          </div>



        </div>

      </div>

      {/* FILTER OPTIONS */}
      <div className='hidden sm:flex flex-col sm:w-[220px] md:w-[240px] lg:w-[320px] flex-shrink-0 sticky top-[70px] self-start h-fit'>

        <div className='py-2 sm:px-3 lg:pl-2 lg:pr-4'>

          <p onClick={() => setShowFilter(!showFilter)} className='hidden sm:flex md:text-lg lg:text-xl font-bold items-center cursor-pointer gap-2'>
            FILTERS
            <img className={`h-3 sm:hidden transition ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
          </p>

          <div className="flex-1 overflow-y-auto">

            {/* CATEGORY FILTER */}
            <div className='border border-gray-300 mt-3'>

              {/* HEADER */}
              <div
                onClick={() => toggleSection("category")}
                className='flex justify-between items-center px-5 py-3 cursor-pointer'
              >
                <p className='text-sm font-medium'>CATEGORIES</p>
                {openSection.category ? <FiMinus className='w-5 h-5'/> : <FiPlusCircle className='w-5 h-5'/>}

              </div>

              {/* CONTENT */}

              <div className={`${openSection.category ? "block": "hidden"} px-5 pb-3`}>

                <div className='flex flex-wrap gap-2'>

                  {["Men", "Women", "Boy", "Girl"].map((item) => (
                    <button
                      key={item}
                      onClick={() => {
                        if (category.includes(item)) {
                          setCategory(prev => prev.filter(c => c !== item));
                        } else {
                          setCategory(prev => [...prev, item]);
                        }
                      }}
                      className={`px-3 py-1 text-xs border rounded-full transition ${category.includes(item)
                        ? "bg-black text-white border-black"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                  
                </div>

              </div>


            </div>


            {/* SUBCATEGORY FILTER */}
            <div className="border border-gray-300 my-3" >

              {/* HEADER */}
              <div
                onClick={() => toggleSection("subCategory")}
                className='flex justify-between items-center px-5 py-3 cursor-pointer'
              > 
                <p className='text-sm font-medium'>TYPE</p>
                {openSection.subCategory ? <FiMinus className='w-5 h-5' /> : <FiPlusCircle className='w-5 h-5' />}
              </div>

              {/* CONTENT */}
              <div className={`${openSection.subCategory ? "block" : "hidden"} px-5 pb-3`}>

                <div className='flex flex-wrap gap-2'>

                  {["T-Shirts", "Shirts", "Jeans", "Trousers", "Top", "Palazzo", "Jackets"].map((item) => (
                    <button
                      key={item}
                      onClick={() => {
                        if (subCategory.includes(item)) {
                          setSubCategory(prev => prev.filter(c => c !== item));
                        } else {
                          setSubCategory(prev => [...prev, item]);
                        }
                      }}
                      className={`px-3 py-1 text-xs border rounded-full transition ${subCategory.includes(item)
                        ? "bg-black text-white border-black"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                  
                </div>

              </div>

            </div>


            {/* COLOR FILTER */}
            <div className="border border-gray-300 my-3">

              {/* HEADER */}
              <div
                onClick={() => toggleSection("colors")}
                className='flex justify-between items-center px-5 py-3 cursor-pointer'
              > 
                <p className='text-sm font-medium'>COLOR</p>
                {openSection.colors ? <FiMinus className='w-5 h-5' /> : <FiPlusCircle className='w-5 h-5' />}
              </div>

              {/* CONTENT */}
              <div className={`${openSection.colors ? "block" : "hidden"} px-5 pb-3`}>

                <div className='flex flex-wrap gap-2'>

                  {["Black", "White", "Red", "Blue"].map((c) => (
                    <button
                      key={c}
                      onClick={() => {
                        if (colors.includes(c)) {
                          setColors(prev => prev.filter(x => x !== c));
                        } else {
                          setColors(prev => [...prev, c]);
                        }
                      }}
                      className={`px-3 py-1 text-xs border rounded-full transition ${colors.includes(c)
                        ? "bg-black text-white border-black"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                  
                </div>

              </div>

            </div>

            {/* SIZE FILTER UI */}
            <div className="border border-gray-300 my-3">

              {/* HEADER */}
              <div
                onClick={() => toggleSection("sizes")}
                className='flex justify-between items-center px-5 py-3 cursor-pointer'
              > 
                <p className='text-sm font-medium'>SIZE</p>
                {openSection.sizes ? <FiMinus className='w-5 h-5' /> : <FiPlusCircle className='w-5 h-5' />}
              </div>

              {/* CONTENT */}
              <div className={`${openSection.sizes ? "block" : "hidden"} px-5 pb-3`}>

                <div className='flex flex-wrap gap-2'>

                  {["S", "M", "L", "XL"].map((size) => (
                    <button
                      key={size}
                      onClick={() => {
                        if (sizes.includes(size)) {
                          setSizes(prev => prev.filter(x => x !== size));
                        } else {
                          setSizes(prev => [...prev, size]);
                        }
                      }}
                      className={`px-3 py-1 text-xs border rounded-full transition ${sizes.includes(size)
                        ? "bg-black text-white border-black"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                  
                </div>

              </div>

            </div>


            {/* PRICE SLIDER */}
            <div className="border border-gray-300 my-3">

              {/* HEADER */}
              <div
                onClick={() => toggleSection("priceRange")}
                className='flex justify-between items-center px-5 py-3 cursor-pointer'
              > 
                <p className='text-sm font-medium'>PRICE</p>
                {openSection.priceRange ? <FiMinus className='w-5 h-5' /> : <FiPlusCircle className='w-5 h-5' />}
              </div>

              {/* CONTENT */}
              <div className={`${openSection.priceRange ? "block" : "hidden"} px-5 pb-3`}>

                <input 
                  type="range" 
                  min="0"
                  max="5000"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([0, Number(e.target.value)])
                  }
                  className='w-full'
                />

                <p className='text-xs mt-1'>
                  ₹0 - ₹{priceRange[1]}
                </p>

              </div>

            </div>

          </div>

        </div>


        <div className="flex gap-2 pl-2 pr-4 py-2 bg-white">

          <button
            onClick={() => {
              setCategory([]);
              setSubCategory([]);
              setColors([])
              setSizes([])
              setPriceRange([0, 5000])
            }}
            className="border sm:text-md lg:text-lg sm:py-1 md:py-1.5 lg:py-2 font-semibold w-full cursor-pointer"
          >
            Clear
          </button>

          <button className='bg-black text-white sm:text-sm md:text-md lg:text-lg font-semibold sm:py-1 md:py-1.5 lg:py-2 w-full cursor-pointer'>
            {filterCount > 0 ? `${filterCount} FILTERS` : 'FILTER'}

          </button>

        </div>


      </div>


      {/* RIGHT SIDE */}
      <div className='flex-1 min-w-0 sm:pt-2 lg:pt-1'>

        {/* MOBILE: FILTER + SORT */}
        <div className='flex items-center justify-between sm:hidden px-2 py-4'>

          {/* FILTER BUTTON */}
          <button
            onClick={() => setShowFilter(!showFilter)}
            className='flex items-center gap-2 text-sm font-medium border px-3 py-1 rounded'
          >
            FILTER
            <img
              className={`h-3 transition ${showFilter ? "rotate-90" : ""}`}
              src={assets.dropdown_icon} 
              alt="" 
            />
          </button>

          {/* SORT */}
          <select
            onChange={(e) => setSortType(e.target.value)}
            className='border font-medium text-sm px-2 py-1 rounded'
          >
            <option value="relevant">Relevant</option>
            <option value="low-high">Low → High</option>
            <option value="high-low">High → Low</option>
          </select>

        </div>


        {/* MOBILE FILTER PANEL */}
        <div className={`sm:hidden mt-3 px-2 ${showFilter ? "block" : "hidden"}`}>

          {/* CATEGORY */}
          <div className='border border-gray-300 p-3 mb-3 rounded'>

            <p className='mb-2 text-sm font-medium'>CATEGORIES</p>

            <div className='flex flex-col gap-2 text-sm text-gray-700'>
              <label className='flex gap-2'>
                <input type="checkbox" value="Men" onChange={toggleCategory} /> Men
              </label>
              <label className='flex gap-2'>
                <input type="checkbox" value="Women" onChange={toggleCategory} /> Women
              </label>
              <label className='flex gap-2'>
                <input type="checkbox" value="Kids" onChange={toggleCategory} /> Kids
              </label>
            </div>

          </div>


          {/* SUBCATEGORY */}
          <div className='border border-gray-300 p-3 rounded'>

            <p className='mb-2 text-sm font-medium'>TYPE</p>

            <div className='flex flex-col gap-2 text-sm text-gray-700'>
              <label className='flex gap-2'>
                <input type="checkbox" value="Topwear" onChange={toggleSubCategory} /> Topwear
              </label>
              <label className='flex gap-2'>
                <input type="checkbox" value="Bottomwear" onChange={toggleSubCategory} /> Bottomwear
              </label>
              <label className='flex gap-2'>
                <input type="checkbox" value="Winterwear" onChange={toggleSubCategory} /> Winterwear
              </label>
            </div>

          </div>

        </div>

        {/* DESKTOP: TITLE + SORT */}
        <div className='hidden sm:flex justify-between text-base sm:text-2xl sm:mb-5 lg:mb-6'>

          <div className='flex items-center font-bold uppercase gap-2'>
            <h1>{title}</h1>
            <p className='w-8 sm:w-12 lg:w-20 h-[1px] sm:h-[2px] bg-gray-500'></p>
          </div>

          {/* PRODUCTS SORT */}
          <select onChange={(e) => setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2 md:py-1.5 lg:py-2'>
            <option value="relavent">Sort by: Relavent</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>

        </div>

        {/* MAP PRODUCTS */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-y-2 lg:gap-y-4 mb-8 sm:mb-5 lg:mb-5">

          {
            (filterProducts || []).map((item, index) => (
              <ProductItem 
                key={index} 
                id={item._id} 
                image={item.images?.map(img => img.url) || []} 
                name={item.name} 
                price={item.finalPrice || item.price} 
              />
            ))
          }

        </div>

        <div className='hidden sm:block'>

          <Footer/>
        </div>

      </div>

      {/* MOBILE FOOTER */}
      <div className='block sm:hidden'>
        <Footer/>
      </div>
      
    </div>
  )
}

export default Collection








































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































