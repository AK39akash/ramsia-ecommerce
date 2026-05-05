import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";
import { FiArrowLeft, FiChevronLeft } from "react-icons/fi";

const SearchPage = () => {
  const { products, search, setSearch, navigate } = useContext(ShopContext);

  const [activeCategory, setActiveCategory] = useState("ALL");
  const [recentSearches, setRecentSearches] = useState([]);

  const categories = [...new Set(products.map((p) => p.category))];

  const filteredProducts = products.filter((item) => {
    const matchesCategory =
      activeCategory === "ALL" || item.category === activeCategory;
    const matchesSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("recentSearches")) || [];
    setRecentSearches(stored);
  }, []);

  useEffect(() => {
    if (!search.trim()) return;

    const updated = [
      search,
      ...recentSearches.filter((item) => item !== search),
    ];

    setRecentSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
  }, [search]);

  return (
    <div className="min-h-screen bg-white mt-2 mb-30">
      {/* BACK AND SEARCH INPUT */}
      <div className="sticky top-0 px-2 mb-2 z-50 bg-white border-b border-gray-200">
        <div className="flex items-center gap-3 py-3">
          {/* BACK BUTTON */}
          <button onClick={() => navigate(-1)} className="text-2xl">
            <FiArrowLeft />
          </button>

          {/* SEARCH INPUT */}
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="flex-1 border px-4 py-2 rounded-full text-sm outline-none focus:border-black transition"
            autoFocus
          />
        </div>
      </div>

      {/* RECENT SEARCHES */}
      <div className="mb-4 px-4">
        <h3 className="text-[15px] font-bold text-center mb-4">
          RECENT SEARCHES
        </h3>

        <div className="flex gap-2.5 overflow-x-auto no-scrollbar px-1">
          {recentSearches.map((item, i) => (
            <span
              key={i}
              onClick={() => setSearch(item)}
              className="whitespace-nowrap border px-3 py-1 text-[13px] cursor-pointer hover:bg-black hover:text-white transition"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* TOP SEARCHES */}
      <div className="flex flex-col px-4 mb-4">
        <h3 className="font-bold mb-4 text-[17px] text-center">TOP SEARCHES</h3>

        <div className="flex gap-2.5 overflow-x-auto no-scrollbar px-1">
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
              onClick={() => setSearch(item)}
              className="whitespace-nowrap border px-3 py-1 text-xs hover:bg-black hover:text-white transition cursor-pointer"
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* CATEGORY */}
      <div className="flex flex-col px-4">
        
        <h3 className="font-bold mb-5 text-center text-base">TRENDING</h3>

        <div className="mb-6 flex gap-2 flex-wrap">
          <button
            onClick={() => setActiveCategory("ALL")}
            className={`px-3 py-1 text-xs ${
              activeCategory === "ALL" ? "bg-black text-white" : "border"
            }`}
          >
            ALL
          </button>

          {categories.map((cat, i) => (
            <button
              key={i}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1 text-xs ${
                activeCategory === cat ? "bg-black text-white" : "border"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* PRODUCTS */}
      <div className="grid grid-cols-2 gap-2 gap-y-6">
        {filteredProducts.map((item) => (
          <Link key={item._id} to={`/product/${item._id}`}>
            <div>
              <img
                src={item.images?.[0]?.url || "/placeholder.png"}
                className="w-full h-60 object-cover "
                alt=""
              />
              <div className="px-2">
                <p className="text-sm mt-2 line-clamp-1">{item.name}</p>
                <p className="text-sm font-semibold">${item.price}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
