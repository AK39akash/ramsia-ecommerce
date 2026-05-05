import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { FiChevronLeft, FiSearch } from "react-icons/fi";
import { toast } from "react-toastify";

const Orders = () => {
  const { backendUrl, token, currency, navigate, products } =
    useContext(ShopContext);

  const [orderData, setOrderData] = useState([]);

  const [cancelOrderId, setCancelOrderId] = useState(null);

  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Latest");

  useEffect(() => {
    if (!token && !localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [token, navigate]);

  const loadOrderData = async () => {
    try {
      const savedToken = token || localStorage.getItem("token");

      if (!savedToken) return;

      const response = await axios.get(backendUrl + "/api/order/userOrders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        let allItems = [];

        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            allItems.push({
              ...item,
              status: order.status,
              paymentMethod: order.paymentMethod,
              date: order.date,
              orderId: order._id,
            });
          });
        });

        setOrderData(allItems.reverse());
      }
    } catch (error) {
      console.log(error);
    }
  };

  

  const filteredOrders = orderData
    .filter((item) => {
      if (filter === "All") return true;
      return item.status === filter;
    })
    .sort((a, b) => {
      if (sort === "Latest") {
        return new Date(b.date) - new Date(a.date);
      }
      if (sort === "Oldest") {
        return new Date(a.date) - new Date(b.date);
      }

      return 0;
    });

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="min-h-full border flex flex-col border-gray-200 sm:p-4 md:p-6 lg:p-6">

      {/* MOBILE HEADER */}
      <div className="sticky top-0 z-50 bg-white border-b-2 border-gray-200 sm:hidden">
        <div className="flex items-center justify-between px-4 py-4">
          {/* BACK BUTTON */}
          <button onClick={() => navigate(-1)}>
            <FiChevronLeft className="w-7 h-7" />
          </button>

          {/* TITLE */}
          <h2 className="text-[17px] font-bold tracking-wide">ORDERS</h2>

          <div/>

        </div>
      </div>

      <div className="text-lg md:text-xl lg:text-[28px] font-bold mb-10 sm:flex justify-center hidden">
        <h2>ORDERS</h2>
      </div>

      <div className="flex items-center justify-center">

        <div className="lg:w-3xl w-full sm:w-full flex mb-4 md:mb-6 lg:mb-4 mt-10 px-5 sm:px-0 sm:mt-0 md:px-0 gap-4">

          {/* FILTERS */}
          <div className="flex gap-6 overflow-x-auto lg:pb-2 flex-1">
            {["All", "Processing", "Shipped", "Delivered", "Cancelled"].map(
              (item) => (
                <button
                  key={item}
                  onClick={() => setFilter(item)}
                  className={`text-md whitespace-nowrap hover:border-b-2 transition cursor-pointer ${
                    filter === item ? "border-b-2" : "text-gray-600 border-gray-600"
                  }`}
                >
                  {item}
                </button>
              ),
            )}
          </div>

          {/* SORT DROPDOWN */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border px-3 py-1 lg:py-2 text-sm outline-none cursor-pointer"
          >
            <option value="Latest">Latest</option>
            <option value="Oldest">Oldest</option>
          </select>

        </div>

      </div>

        {filteredOrders.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
          
            <div className="flex flex-col items-center justify-center text-center max-w-3xl">
              {/* ICON */}
              <div className="text-gray-300 lg:mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.2}
                  stroke="currentColor"
                  className="w-24 h-28 md:w-30 md:h-30 lg:w-40 lg:h-40"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 6h12M10 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm6 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                  />
                </svg>
              </div>

              {/* TITLE */}
              <h2 className="text-lg sm:text-xl font-bold mb-3 lg:mb-3">
                NO ORDERS YET!
              </h2>

              {/* SUBTEXT */}
              <p className="text-gray-500 text-[13px] md:px-8 lg:px-0 lg:text-sm mb-1">
                Looks like you haven't placed any orders. Start exploring and shop
                your favorite items now.
              </p>

              {/* BUTTON */}
              <button
                onClick={() => navigate("/collection")}
                className="bg-black text-white px-6 py-3 text-md font-semibold hover:bg-gray-900 cursor-pointer transition w-full lg:w-2xl"
              >
                START SHOPPING
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 p-2 sm:p-0">

            {filteredOrders.map((item, index) => (
              
              <div
                key={index}
                onClick={() =>
                  navigate(`/order/${item.orderId}`, { state: { item } })
                }
                className="w-full max-w-3xl border border-gray-300 p-2 lg:p-4 flex flex-col gap-4 hover:shadow-md transition cursor-pointer"
              >
                {/* TOP ROW */}
                <div className="flex gap-3 md:gap-4">
                  {/* IMAGE */}
                  <img
                    src={item.image || "/placeholder.png"}
                    className="w-18 h-22 sm:w-20 sm:h-24 md:h-28 lg:w-24 lg:h-28 object-cover"
                    alt=""
                  />
  
                  {/* DETAILS */}
                  <div className="flex flex-col flex-1">
  
                    {/* NAME + PRICE */}
                    <div className="flex justify-between pr-2">
                      <p className="font-medium text-sm md:text-[15px] lg:text-base">
                        {item.name}
                      </p>
  
                      <p className="font-semibold text-sm md:text-[15px] lg:text-base">
                        {currency}
                        {item.finalPrice || item.price}
                      </p>
                    </div>
  
                    {/* META */}
                    <p className="text-sm mt-1">
                      Size: {item.size} | Qty: {item.quantity}
                    </p>
  
                    <p className="lg:text-sm md:text-[13px] text-xs">
                      {new Date(item.date).toDateString()}
                    </p>
  
                    <p className="md:text-[13px] lg:text-sm text-xs">{item.paymentMethod}</p>
  
                    <p className="text-xs mt-1">Order ID: {item.orderId}</p>
                  </div>
                </div>
  
                {/* BOTTOM ROW */}
                <div className="flex justify-between items-center">
                  {/* STATUS */}
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        item.status === "Delivered"
                          ? "bg-green-500"
                          : item.status === "Processing"
                            ? "bg-yellow-500"
                            : item.status === "Cancelled"
                              ? "bg-red-500"
                              : item.status === "Pending"
                                ? "bg-yellow-500"
                                : item.status === "Confirmed"
                                  ? "bg-green-300"
                                  : item.status === "Order Placed"
                                    ? "bg-yellow-500"
                                    : "bg-gray-500"
                      }`}
                    />
  
                    <p className="text-sm font-medium">{item.status}</p>
                  </div>
  
                  {/* ACTIONS */}
                  <div className="flex gap-2">
                    {/* CANCEL BUTTON */}
                    {!["Cancelled", "Delivered", "Shipped"].includes(
                      item.status,
                    ) && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setCancelOrderId(item.orderId);
                        }}
                        className="lg:border lg:bg-red-500 lg:text-white text-blue-800 underline lg:no-underline lg:hover:underline lg:px-3 lg:py-1.5 text-xs lg:text-sm hover:bg-red-600 cursor-pointer"
                      >
                        CANCEL
                      </button>
                    )}
  
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        loadOrderData();
                      }}
                      className="border bg-black text-white px-3 py-1.5 text-xs md:text-[13px] lg:text-sm hover:bg-gray-900 cursor-pointer"
                    >
                      TRACK
                    </button>
  
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      className="border bg-black text-white px-3 py-1.5 text-xs md:text-[13px] lg:text-sm hover:bg-gray-900 cursor-pointer"
                    >
                      BUY AGAIN
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
          </div>
        )}

      <div className="lg:px-5 mt-20 sm:mt-0 flex flex-col items-center gap-4 w-full">
      </div>

      {cancelOrderId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white w-[90%] max-w-sm p-6 text-center">
            {/* TITLE */}
            <h2 className="text-lg font-semibold mb-3">Cancel Order?</h2>

            {/* TEXT */}
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to cancel this order? This action cannot be
              undone.
            </p>

            {/* ACTIONS */}
            <div className="flex gap-3 justify-center">
              {/* CONFIRM */}
              <button
                onClick={async () => {
                  await handleCancelOrder(cancelOrderId);
                  setCancelOrderId(null);
                }}
                className="bg-red-500 text-white px-5 py-2 text-sm hover:bg-red-600 cursor-pointer"
              >
                YES, CANCEL
              </button>

              {/* CANCEL */}
              <button
                onClick={() => setCancelOrderId(null)}
                className="border px-5 py-2 text-sm cursor-pointer"
              >
                NO
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
