import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/frontend_assets/assets'
import { useLocation } from 'react-router-dom'

const SearchBar = () => {

  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext)

  const [visible, setVisible] = useState(false)

  const location = useLocation()

  useEffect(() => {
    if (location.pathname.includes('collection')) {
      setVisible(true)
    } else {
      setVisible(false)
    }
  }, [location])

  return showSearch && visible ? (

    <div className="border-t border-b bg-gray-50 py-6 flex justify-center">

      <div className="relative w-[90%] sm:w-[60%] lg:w-[40%]">

        {/* Search Icon */}
        <img
          src={assets.search_icon}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-4 opacity-60"
          alt=""
        />

        {/* Input */}
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search products..."
          className="w-full pl-10 pr-10 py-3 rounded-full border border-gray-300 focus:border-black outline-none text-sm bg-white shadow-sm"
        />

        {/* Clear Button */}
        {search && (
          <img
            onClick={() => setSearch('')}
            src={assets.cross_icon}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-3 cursor-pointer opacity-70 hover:opacity-100"
            alt=""
          />
        )}

      </div>

    </div>

  ) : null
}

export default SearchBar