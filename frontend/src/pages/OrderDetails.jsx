import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { FiChevronLeft } from "react-icons/fi";

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { backendUrl, token, currency } = useContext(ShopContext);

  const [order, setOrder] = useState(null);

  const [rating, setRating] = useState(0);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/order/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.data.success) {
          setOrder(res.data.order);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrder();
  }, [id]);

  if (!order) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="md:border md:border-gray-200 pb-20 sm:pb-0 lg:p-6 flex flex-col gap-6 sm:items-center bg-gray-100">

      {/* MOBILE HEADER */}
      <div className="sticky top-0 z-50 bg-white border-b-2 border-gray-200 sm:hidden">
        <div className="flex items-center justify-between px-4 py-4">
          {/* BACK BUTTON */}
          <button onClick={() => navigate(-1)}>
            <FiChevronLeft className="w-7 h-7" />
          </button>

          {/* TITLE */}
          <h2 className="text-[17px] font-bold tracking-wide">ORDERS</h2>

          <div />
        </div>
      </div>

      <div className="w-full max-w-3xl flex flex-col p-4 md:p-5 lg:p-4 gap-4 bg-gray-100">
        {/* PRODUCT TOP */}
        <div className="bg-white rounded-xl p-4 flex gap-4">
          <img
            src={order.items[0]?.image}
            className="w-20 h-28 md:w-22 lg:w-24 lg:h-32 object-cover rounded"
            alt=""
          />

          <div className="flex flex-col justify-between flex-1">
            <div>
              <p className="font-medium text-sm sm:text-base">
                {order.items[0]?.name}
              </p>

              <p className="text-sm text-gray-500 mt-1">
                Size: {order.items[0]?.size} | Qty: {order.items[0]?.quantity}
              </p>
            </div>

            <p className="font-semibold text-sm sm:text-md">
              {currency}
              {order.items[0]?.finalPrice || order.items[0]?.price}
            </p>
          </div>
        </div>

        {/* STATUS TIMELINE */}
        <div className="bg-white rounded-xl p-4">
          <p className="font-medium mb-4">Order Status</p>

          <div className="relative flex justify-between items-center">
            {/* LINE */}
            <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-gray-200 -translate-y-1/2" />

            {/* ACTIVE LINE */}
            <div
              className="absolute top-1/2 left-0 h-[2px] bg-black -translate-y-1/2 transition-all duration-700"
              style={{
                width: `${
                  (["Placed", "Processing", "Shipped", "Delivered"].indexOf(
                    order.status,
                  ) +
                    1) *
                  25
                }%`,
              }}
            />

            {["Placed", "Processing", "Shipped", "Delivered"].map((step, i) => {
              const isActive =
                ["Placed", "Processing", "Shipped", "Delivered"].indexOf(
                  order.status,
                ) >= i;

              return (
                <div key={i} className="flex flex-col items-center z-10">
                  <div
                    className={`w-4 h-4 rounded-full border-2 ${
                      isActive
                        ? "bg-black border-black"
                        : "bg-white border-gray-300"
                    }`}
                  />

                  <p
                    className={`mt-2 text-xs ${isActive ? "font-medium" : "text-gray-400"}`}
                  >
                    {step}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* REVIEW SECTION */}
        <div className="bg-white rounded-xl p-4">
          <p className="font-medium mb-3">Rate & Review</p>

          <div className="flex justify-between items-center">
            {/* STARS */}
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => setRating(star)}
                  className={`text-2xl cursor-pointer transition ${
                    star <= rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>

            <button className="text-sm underline cursor-pointer">
              WRITE REVIEW
            </button>
          </div>
        </div>

        {/* DELIVERY DETAILS */}
        <div className="bg-white rounded-xl p-4">
          <p className="font-medium mb-2">Delivery Details</p>

          <p className="text-sm text-gray-600">{order.address?.name}</p>
          <p className="text-sm text-gray-600">{order.address?.street}</p>
          <p className="text-sm text-gray-600">
            {order.address?.city}, {order.address?.state} -{" "}
            {order.address?.pincode}
          </p>
        </div>

        {/* PRICE DETAILS */}
        <div className="bg-white rounded-xl p-4">
          <p className="font-medium mb-3">Price Details</p>

          <div className="flex justify-between text-sm mb-2">
            <span>Item Total</span>
            <span>
              {currency}
              {order.amount}
            </span>
          </div>

          <div className="flex justify-between text-sm mb-2">
            <span>Delivery Charges</span>
            <span>Free</span>
          </div>

          <div className="flex justify-between font-medium mt-3">
            <span>Total</span>
            <span>
              {currency}
              {order.amount}
            </span>
          </div>

          <div className="mt-4 pt-3 border-t">
            <button
              onClick={() => window.print()}
              className="w-full bg-black text-white py-2 text-sm rounded hover:bg-gray-800 cursor-pointer"
            >
              DOWNLOAD INVOICE
            </button>
          </div>
        </div>

        {/* OTHER ITEMS */}
        {order.items.length > 1 && (
          <div className="bg-white rounded-xl p-4">
            <p className="font-medium mb-3">Other Items in this Order</p>

            <div className="flex flex-col gap-3">
              {order.items.slice(1).map((item, i) => (
                <div key={i} className="flex gap-3">
                  <img src={item.image} className="w-16 h-20 object-cover" />
                  <div>
                    <p className="text-sm">{item.name}</p>
                    <p className="text-xs text-gray-500">
                      {currency}
                      {item.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CONTACT */}
        <div className="bg-white rounded-xl p-4">
          <p className="font-medium mb-2">Need Help?</p>

          <p className="text-sm text-gray-600">Call: +91 9815878073</p>
          <p className="text-sm text-gray-600">Email: support@ramsia.com</p>
        </div>

        {/* ORDER INFO */}
        <div className="bg-white rounded-xl p-4">
          <p className="font-medium mb-2">Order Info</p>

          <p className="text-sm text-gray-600">Order ID: {order._id}</p>

          <p className="text-sm text-gray-600">
            Date: {new Date(order.date).toDateString()}
          </p>
        </div>

        {/* ACTIONS */}
        <div className="flex gap-3 w-full">
          {/* CANCEL */}
          {!["Delivered", "Shipped", "Cancelled"].includes(order.status) && (
            <button className="bg-red-500 hover:bg-red-600 hover:underline text-white px-5 py-2 text-sm rounded cursor-pointer w-1/2">
              CANCEL ORDER
            </button>
          )}

          {/* BACK */}
          <button
            onClick={() => navigate(-1)}
            className="border px-5 py-2 text-sm rounded cursor-pointer w-1/2 bg-gray-100 lg:bg-white hover:bg-gray-100"
          >
            GO BACK
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
