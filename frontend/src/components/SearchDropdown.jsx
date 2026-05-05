import { useContext, useEffect, useRef, useState } from "react"
import { ShopContext } from "../context/ShopContext"
import { Link, useLocation } from "react-router-dom"

const SearchDropdown = () => {

  const { showSearch, setShowSearch, products, search, setSearch, searchRef } = useContext(ShopContext)

  const [activeCategory, setActiveCategory] = useState("ALL");

  const [recentSearches, setRecentSearches] = useState([])


  const dropdownRef = useRef(null)

  const location = useLocation();
  const isHome = location.pathname === "/";


  const filteredProducts = (products || []).filter(product => {

    const matchesCategory = activeCategory === "ALL" || product.category === activeCategory;

    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());

    return matchesCategory && matchesSearch;

  })


  const categories = [...new Set(products.map(p => p.category))]


  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("recentSearches")) || []
    setRecentSearches(stored)
  }, [])


  useEffect(() => {

    if (!search.trim()) return

    setRecentSearches(prev => {

        const updated = [
            search,
            ...prev.filter(item => item !== search)
        ].slice(0, 5)

        localStorage.setItem("recentSearches", JSON.stringify(updated))

        return updated
    })

  }, [search])



  useEffect(() => {

    const handleClickOutside = (event) => {

      const clickedInsideDropdown = dropdownRef.current && dropdownRef.current.contains(event.target)

      const clickedInsideSearch = searchRef.current && searchRef.current.contains(event.target)

      if (clickedInsideSearch) return;

      if (!clickedInsideDropdown) {
        setShowSearch(false)
        setSearch("")
        setActiveCategory("ALL")
      }
      
    }

    if (showSearch) {
      document.addEventListener("click", handleClickOutside)
    }


    return () => {
      document.removeEventListener("click", handleClickOutside)
    } 

  }, [showSearch])


  useEffect(() => {
    setShowSearch(false);
  }, [location.pathname]);


  if (!showSearch) return null



  return (

    <>

      {showSearch && !isHome && (
        <div
          onClick={() => {
            setShowSearch(false);
            setSearch("");
            setActiveCategory("ALL");
          }}
          className="fixed inset-0 bg-black/20 z-30 transition-all duration-300"
        />
      )}
      
      <div className="fixed top-[80px] left-60 w-full z-40 flex justify-center">

        

        <div 
          ref={dropdownRef} 
          onClick={(e) => e.stopPropagation()}
          className="w-[90%] lg:w-[52%] bg-white shadow-lg h-[600px]"
        >

          <div className="grid grid-cols-2 gap-2 p-5 h-full">

            {/* LEFT SIDE */}
            <div className="pr-6 h-full flex flex-col justify-center items-center">

              {/* RECENT SEARCHES */}
              <div className="mb-8 flex flex-col items-center">

                  <h3 className="font-bold mb-4 text-base tracking-wide">RECENT SEARCHES</h3>

                  <div className="flex flex-wrap gap-2">

                      {recentSearches.length === 0 ? (
                          <p className="text-xs text-gray-400">No recent searches</p>
                      ) : (
                          recentSearches.map((item, index) => (

                              <span
                                  key={index}
                                  onClick={() => {
                                    setSearch(item);
                                    setShowSearch(false);
                                  }}
                                  className="border px-3 py-1 text-xs hover:bg-black hover:text-white transition cursor-pointer"
                              >
                                  {item}
                              </span>
                          ))
                      )}


                  </div>

              </div>


              {/* TOP SEARCHES */}
              <div className="flex flex-col items-center">

                  <h3 className="font-bold mb-4 text-base tracking-wide">TOP SEARCHES</h3>

                  <div className="flex flex-wrap gap-2 items-center justify-center">

                  {[
                      "Jeans",
                      "Shirts",
                      "Polo",
                      "T-Shirt",
                      "Formal Wear",
                      "Bootcut",
                      "Baggy Fit",
                      "Jackets",
                      "Sweaters",
                      "Overshirts",
                  ].map((item, index) => (

                      <button
                          key={index}
                          onClick={() => {
                            setSearch(item);
                            setShowSearch(false);
                          }}
                          className="border px-3 py-1 text-xs hover:bg-black hover:text-white transition cursor-pointer"
                      >
                          {item}
                      </button>

                  ))}

                  </div>

              </div>

            </div>


            {/* RIGHT SIDE */}
            <div className="h-full overflow-y-auto scroll-smooth custom-scroll">

              {/* STICKY HEADER */}
              <div className="sticky top-0 bg-white z-10 pb-3">

                  <h3 className="font-bold mb-5 text-center text-base">
                      TRENDING
                  </h3>

                  {/* CATEGORY TABS */}
                  <div className="flex gap-2 flex-wrap">

                  <button
                      onClick={() => setActiveCategory("ALL")} 
                      className={`px-3 py-1 text-xs rounded cursor-pointer ${activeCategory === "ALL" ? "bg-black text-white" : "border hover:bg-black hover:text-white transition"}`}>
                      ALL
                  </button>

                  {categories.map((cat, index) => (

                      <button
                          key={index}
                          onClick={() => setActiveCategory(cat)} 
                          className={`px-3 py-1 border text-xs hover:bg-black hover:text-white transition rounded cursor-pointer ${activeCategory === cat ? "bg-black text-white" : "border hover:bg-black hover:text-white"}`}
                      >
                          {cat}
                      </button>

                  ))}

                  </div>

              </div>



              {/* PRODUCTS */}
              <div className="grid grid-cols-2 gap-4 mt-4">

                {filteredProducts.map((item) => (

                  <Link 
                    key={item._id} 
                    to={`/product/${item._id}`}
                    onClick={() => {
                      setShowSearch(false);
                      setSearch("");
                      setActiveCategory("ALL");
                    }}
                  >

                    <div className="group">

                      <div className="overflow-hidden rounded">

                          <img
                          src={item.images?.[0]?.url}
                          className="w-full h-60 object-cover"
                          alt=""
                          />

                      </div>


                      <p className="text-sm mt-1 line-clamp-1">
                        {item.name}
                      </p>

                      <p className="text-sm font-semibold">
                        ${item.finalPrice || item.price}
                      </p>

                    </div>

                  </Link>

                ))}

              </div>

            </div>

          </div>

        </div>

      </div>
    
    </>

  )
}

export default SearchDropdown