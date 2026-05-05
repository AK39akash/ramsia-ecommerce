import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

const InactiveList = ({ token }) => {
  const [list, setList] = useState([]);

  // FETCH INACTIVE PRODUCTS
  const fetchInactive = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list-admin", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        const inactive = response.data.products.filter((p) => !p.isActive);
        setList(inactive);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // RESTORE PRODUCT
  const restoreProduct = async (id) => {
    try {
      const response = await axios.put(
        `${backendUrl}/api/product/restore/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data.success) {
        toast.success("Product Restored");

        setList((prev) => prev.filter((item) => item._id !== id));
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // HARD DELETE
  const hardDelete = async (id) => {
    try {
      const confirmDelete = window.confirm("Delete permanently?");
      if (!confirmDelete) return;

      const response = await axios.delete(
        `${backendUrl}/api/product/hard-delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data.success) {
        toast.success("Product Deleted Permanently");

        setList((prev) => prev.filter((item) => item._id !== id));
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };


//   DELETE ALL PRODUCTS
  const deleteAllInactive = async () => {

    try {

        const confirmDelete = window.confirm(
            "Delete ALL inactive products permanently?"
        )

        if (!confirmDelete) return;

        const response = await axios.delete(
            backendUrl + "/api/product/delete-inactive",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        if (response.data.success) {
            toast.success("All inactive products deleted");

            setList([]);
            
        } else {
            toast.error(response.data.message);
        }
        
    } catch (error) {
        toast.error(error.response?.data?.message || error.message);
    }
    
  }

  useEffect(() => {
    fetchInactive();
  }, []);

  return (
    <div className="p-4">

        <div className="flex items-center justify-between mb-4">

            <h2 className="text-2xl font-bold">Inactive Products</h2>

            <button
                onClick={deleteAllInactive}
                disabled={list.length === 0}
                className={`px-4 py-2 text-sm rounded-md transition ${
                    list.length === 0
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-red-600 text-white hover:bg-red-700 cursor-pointer"
                }`}
            >
                Delete All
            </button>


        </div>

      {/* HEADER */}
      <div className="hidden md:grid grid-cols-[80px_2fr_1fr_1fr_120px] items-center px-3 py-2 bg-gray-100 border rounded-lg text-sm font-medium">
        <p>Image</p>
        <p>Name</p>
        <p>Category</p>
        <p>Price</p>
        <p className="text-center">Action</p>
      </div>

      {/* LIST */}
      <div className="flex flex-col gap-3 mt-2">
        {list.map((item) => {
          const firstImage = item.images?.[0]?.url;

          return (
            <div
              key={item._id}
              onClick={() => setSelectedProduct(item)}
              className="grid grid-cols-[80px_2fr_1fr_1fr_1fr] items-center gap-2 p-3 border rounded-lg shadow-sm hover:shadow-md transition"
            >
              {/* IMAGE */}
              <img
                src={firstImage}
                alt=""
                className="w-14 h-14 object-cover rounded-md border"
              />

              {/* NAME */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <p className="font-medium">{item.name}</p>

                  {/* ACTIVE / INACTIVE BADGE */}
                  {item.isActive ? (
                    <span className="text-xs bg-green-500 text-white px-2 py-1 rounded">
                      Active
                    </span>
                  ) : (
                    <span className="text-xs bg-red-500 text-white px-2 py-1 rounded">
                      Inactive
                    </span>
                  )}
                </div>

                {/* EXTRA INFO */}
                <p className="text-xs text-gray-500">
                  {item.color?.name} | {item.sizes?.length} sizes
                </p>
              </div>

              {/* CATEGORY */}
              <p className="text-sm">{item.category}</p>

              {/* PRICE */}
              <p className="text-sm font-medium">
                {currency}{item.finalPrice}
              </p>

              {/* ACTION */}
              <div className="flex gap-2 justify-end">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    restoreProduct(item._id);
                  }}
                  className="px-3 py-1 text-sm bg-green-500 text-white rounded-md hover:bg-green-600 transition cursor-pointer"
                >
                  Restore
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    hardDelete(item._id)
                  }}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InactiveList;
