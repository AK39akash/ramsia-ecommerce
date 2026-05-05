import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const List = ({token}) => {

  const [list, setList] = useState([]);

  const navigate = useNavigate();

  const [selectedProduct, setSelectedProduct] = useState(null);

  const [filterCategory, setFilterCategory] = useState("All");
  const [filterSubCategory, setFilterSubCategory] = useState("All");


  const fetchList = async () => {

    try {

      const response = await axios.get(
        backendUrl + '/api/product/list', 
        { 
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message)
      }

      
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
    
  }


  const toggleActive = async (id) => {

    try {

      const response = await axios.put(
        `${backendUrl}/api/product/remove/${id}`, 
        {}, 
        {
          headers: {
            Authorization: `Bearer ${token}`
          }} )

      if (response.data.success) {
        toast.success("Product Deactivated");

        await fetchList();
      } else {
        toast.error(response.data.message);
      }
      
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
    
  }


  const filteredList = list.filter((item) => {

    if (filterCategory !== "All" && item.category !== filterCategory) {
      return false;
    }

    if (filterSubCategory !== "All" && item.subCategory !== filterSubCategory) {
      return false;
    }

    return true;

  });


  useEffect(() => {
    fetchList();
  }, [])



  return (
    <div className='p-4'>

      <h2 className='text-2xl font-bold mb-4'>All Products</h2>

      <div className='flex justify-between'>

        <div className='flex flex-wrap gap-4 mb-4'>

          {/* CATEGORY FILTER */}
          <select
            value={filterCategory}
            onChange={(e) => {
              setFilterCategory(e.target.value)
              setFilterSubCategory("All");
            }}
            className='border px-4 py-2 rounded cursor-pointer'
          >
            <option value="All">All Categories</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Boy">Boy</option>
            <option value="Girl">Girl</option>
          </select>

          {/* SUBCATEGORY FILTER */}
          <select
            value={filterSubCategory}
            onChange={(e) => setFilterSubCategory(e.target.value)}
            className='border px-4 py-2 rounded cursor-pointer'
          >
            <option value="All">All SubCategories</option>

            {filterCategory === "Men" && (
              <>
                <option value="T-Shirts">T-Shirts</option>
                <option value="Shirts">Shirts</option>
                <option value="Jackets">Jackets</option>
                <option value="Jeans">Jeans</option>
                <option value="Trousers">Trousers</option>
              </>
            )}

            {filterCategory === "Women" && (
              <>
                <option value="Top">Top</option>
                <option value="Jackets">Jackets</option>
                <option value="Palazzo">Palazzo</option>
              </>
            )}

            {filterCategory === "Boy" && (
              <>
                <option value="T-Shirts">T-Shirts</option>
                <option value="Shirts">Shirts</option>
                <option value="Jeans">Jeans</option>
              </>
            )}

            {filterCategory === "Girl" && (
              <>
                <option value="Top">Top</option>
                <option value="Trousers">Trousers</option>
              </>
            )}

          </select>

        </div>

        <div>

          <button
            onClick={() => {
              setFilterCategory("All");
              setFilterSubCategory("All");
            }}
            className='bg-black text-white px-4 py-2 hover:underline cursor-pointer rounded hover:bg-gray-900'
          >
            Clear Filters
          </button>

        </div>


      </div>


      {/* HEADER */}
      <div className="hidden md:grid grid-cols-[80px_2fr_1fr_1fr_120px] items-center px-3 py-2 bg-gray-100 border rounded-lg text-sm font-medium">

        <p>Image</p>
        <p>Name</p>
        <p>Category</p>
        <p>Price</p>
        <p className='text-center'>Action</p>

      </div>

      {/* LIST */}
      <div className="flex flex-col gap-3 mt-2">

        {filteredList.map((item) => {

          const firstImage = item.images?.[0]?.url;

          return (
            <div
              key={item._id}
              onClick={() => setSelectedProduct(item)}
              className='grid grid-cols-[80px_2fr_1fr_1fr_1fr] items-center gap-2 p-3 border rounded-lg shadow-sm hover:shadow-md transition'
            >

              {/* IMAGE */}
              <img 
                src={firstImage} 
                alt="" 
                className='w-14 h-14 object-cover rounded-md border'
              />

              {/* NAME */}
              <div className='flex flex-col gap-1'>

                <div className="flex items-center gap-2">

                  <p className='font-medium'>{item.name}</p>

                  {/* ACTIVE / INACTIVE BADGE */}
                  {item.isActive ? (
                    <span className='text-xs bg-green-500 text-white px-2 py-1 rounded'>
                      Active
                    </span>
                  ) : (
                    <span className='text-xs bg-red-500 text-white px-2 py-1 rounded'>
                      Inactive
                    </span>
                  )}

                </div>

                {/* EXTRA INFO */}
                <p className='text-xs text-gray-500'>
                  {item.color?.name} | {item.sizes?.length} sizes
                </p>

              </div>

              {/* CATEGORY */}
              <p className='text-sm'>{item.category}</p>

              {/* PRICE */}
              <p className='text-sm font-medium'>
                {currency}{item.finalPrice}
                {item.discount > 0 && (
                  <span className='text-xs text-gray-400 line-through ml-2'>
                    {currency}{item.price}
                  </span>
                )}
              </p>

              
              {/* ACTION */}
              <div className='flex gap-2 justify-end'>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleActive(item._id);
                  }}
                  className='px-3 py-1 text-sm bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition cursor-pointer'
                >
                  Deactivate
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/edit/${item._id}`);
                  }}
                  className='px-3 py-1 bg-blue-500 text-white rounded cursor-pointer'
                >
                  Edit
                </button>

              </div>

            </div>
          )
        })}

      </div>

      {selectedProduct && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setSelectedProduct(null)}
        >

          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-[95%] max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl p-6 relative shadow-2xl animate-fadeIn">

            <div className="flex justify-between items-center mb-4 border-b pb-3">

              {/* TITLE */}
              <h2 className='text-xl font-semibold'>
                {selectedProduct.name}
              </h2>

              {/* CLOSE BUTTON */}
              <button
                onClick={() => setSelectedProduct(null)}
                className='text-xl text-gray-500 hover:text-black cursor-pointer'
              >
                ✕
              </button>

            </div>

            


            <div className="text-sm">

                <p className='text-lg font-semibold'>
                  {currency}{selectedProduct.finalPrice}

                  {selectedProduct.discount > 0 && (
                    <span className='text-sm text-gray-400 line-through ml-2'>
                      {currency} {selectedProduct.price}
                    </span>
                  )}
                </p>

            </div>


            <div className='mb-6'>
              <p className='text-[13px]'>ID: {selectedProduct.groupId}</p>
            </div>


            
            <div className="flex flex-col gap-6">

              {/* IMAGES */}
              <div className="grid grid-cols-8 gap-3 mb-6">

                {selectedProduct.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img.url} 
                    className='w-24 h-24 object-cover rounded-lg border hover:scale-105 transition' 
                  />
                ))}
              </div>

              

              <div className="flex flex-col items-stretch gap-6">
              
                {/* PRODUCT DETAILS */}
                <div className="grid grid-cols-2 gap-4 text-sm bg-gray-50 p-4 rounded-lg mb-6">

                  <p><strong>Category:</strong> {selectedProduct.category}</p>
                  <p><strong>SubCategory:</strong> {selectedProduct.subCategory}</p>
                  <p><strong>Color:</strong> {selectedProduct.color?.name}</p>
                  <p><strong>Fit:</strong> {selectedProduct.fit}</p>
                  <p><strong>Pattern:</strong> {selectedProduct.pattern}</p>
                  <p><strong>Collar:</strong> {selectedProduct.collar}</p>
                  <p><strong>Sleeve:</strong> {selectedProduct.sleeve}</p>
                  <p><strong>Bestseller: </strong> {selectedProduct.bestseller ? "True" : "False"}</p>
                </div>

                {/* SIZES */}
                <div className="border rounded-lg overflow-hidden">
                  
                  <div className="grid grid-cols-[1fr_1fr_1fr] bg-gray-100 p-2 text-sm font-medium text-center">

                    <p className='font-medium'>Size</p>
                    <p className='font-medium'>Stock</p>
                    <p className='font-medium'>SKU</p>

                  </div>


                  {selectedProduct.sizes.map((size, i) => (
                    <div
                      key={i}
                      className='grid grid-cols-3 p-2 text-sm border-t text-center'
                    >
                      <p>{size.size}</p>
                      <p>{size.stock}</p>
                      <p>{size.sku}</p>
                    </div>
                  ))}

                </div>

              </div>

              

            </div>

          </div>

        </div>
      )}
      
    </div>
  )
}

export default List
