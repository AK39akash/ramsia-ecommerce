import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";
import { toast } from "react-toastify";
import { FiChevronLeft } from "react-icons/fi";

const OrderConfirmation = () => {

  useEffect(() => {
    sessionStorage.removeItem("checkoutAccess");
    sessionStorage.removeItem("checkoutSesstionId");
  }, []);

  const location = useLocation();
  const {
    navigate,
    backendUrl,
    token,
    setCartItems,
    currency,
    checkoutSessionId,
    clearCheckoutSession,
  } = useContext(ShopContext);
  const [isPlacing, setIsPlacing] = useState(false);

  // Get data passed from PlaceOrder page
  const { formData, orderItems, amount, subtotal, shippingFee, method } =
    location.state || {};

  const validSession = sessionStorage.getItem("orderConfirmationValid");

  // If no state or direct access, redirect back to cart
  if (!formData || !orderItems || !validSession) {
    return (
      <div className="border-t border-gray-300 pt-35 flex flex-col items-center gap-4">
        <p className="text-gray-500">Order session expired or access denied.</p>
        <button
          onClick={() => navigate("/cart", { replace: true })}
          className="bg-black text-white px-8 py-2.5 rounded-lg mt-4 cursor-pointer"
        >
          Go to Cart
        </button>
      </div>
    );
  }

  

  const confirmOrder = async () => {
    setIsPlacing(true);
    try {
      let orderData = {
        address: formData,
        items: orderItems,
        amount: amount,
      };

      if (method === "cod") {
        const response = await axios.post(
          backendUrl + "/api/order/place",
          orderData,
          { 
            headers: { 
              Authorization: `Bearer ${token}` 
            } 
          },
        );

        if (response.data.success) {
          setCartItems({});
          clearCheckoutSession();

          sessionStorage.removeItem("checkoutAccess");
          sessionStorage.removeItem("checkoutForm");
          sessionStorage.removeItem("checkoutSessionId");

          toast.success("Order placed successfully!");
          // Replace to remove confirmation from history
          sessionStorage.setItem("checkoutCompleted", "true");
          navigate("/success?cod=true", {
            replace: true,
            state: { fromCheckout: true },
          });
        } else {
          toast.error(response?.data?.message);
        }
      } else if (method === "stripe") {
        const response = await axios.post(
          backendUrl + "/api/order/stripe",
          orderData,
          { 
            headers: { 
              Authorization: `Bearer ${token}` 
            } 
          },
        );
        if (response.data.success) {
          const { session_url, orderId } = response.data;
          // Use replace to remove this confirmation page from history
          // This prevents the user from hitting "Back" into a payment redirect loop


          sessionStorage.setItem("pendingStripeOrder", orderId)

          window.history.replaceState(null, "", "/cart");

          window.location.href = session_url;

          sessionStorage.removeItem("checkoutAccess");
          sessionStorage.removeItem("checkoutForm");
          sessionStorage.removeItem("checkoutSessionId");
        } else {
          toast.error(response?.data?.message);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsPlacing(false);
    }
  };



  

  
  

  useEffect(() => {
    return () => {
      sessionStorage.removeItem("orderConfirmationValid");
      sessionStorage.setItem("resetCheckoutForm", "true");
    };
  }, []);


  



  return (
    <div className="sm:pt-10 lg:pt-15 mb-30 sm:mb-20 sm:flex sm:flex-col sm:items-center">

      {/* MOBILE HEADER */}
      <div className="sticky top-0 z-50 bg-white border-b-2 border-gray-200 sm:hidden">
        <div className="flex items-center justify-between px-3 py-4">

          {/* BACK BUTTON */}
          <button onClick={() => navigate(-1)}>
            <FiChevronLeft className="w-7 h-7" />
          </button>

          {/* TITLE */}
          <h2 className="text-[16px] font-semibold tracking-wide">ORDER SUMMARY</h2>

          <div/>

          
        </div>
      </div>

      <div className="hidden sm:block text-2xl sm:text-3xl font-semibold text-center mt-12 sm:mt-0 mb-12 sm:mb-10">
        <Title text1={"ORDER"} text2={"SUMMARY"} />
      </div>

      <div className="sm:max-w-3xl w-full px-4 mt-10 sm:mt-0 lg:mx-auto">
        {/* Delivery Address & Payment Method - Side by Side */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          {/* Delivery Address */}
          <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
              📍 Delivery Address
            </h3>
            <p className="text-gray-800 font-medium">
              {formData.firstName} {formData.lastName}
            </p>
            <p className="text-gray-600 text-sm mt-1">{formData.street}</p>
            <p className="text-gray-600 text-sm">
              {formData.city}, {formData.state} {formData.zipcode}
            </p>
            <p className="text-gray-600 text-sm">{formData.country}</p>
            <div className="mt-3 pt-3 border-t border-gray-200">
              <p className="text-gray-600 text-sm">📧 {formData.email}</p>
              <p className="text-gray-600 text-sm">📞 {formData.phone}</p>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
              💳 Payment Method
            </h3>
            <div className="flex items-center gap-3 mt-2">
              <div className="w-10 h-10 bg-white rounded-lg border border-gray-200 flex items-center justify-center">
                {method === "cod" ? (
                  <span className="text-lg">💵</span>
                ) : (
                  <span className="text-lg">💳</span>
                )}
              </div>
              <div>
                <p className="text-gray-800 font-medium">
                  {method === "cod" ? "Cash on Delivery" : "Stripe Payment"}
                </p>
                <p className="text-xs text-gray-500">
                  {method === "cod"
                    ? "Pay when you receive your order"
                    : "You will be redirected to Stripe"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-gray-50 rounded-xl border border-gray-200 mb-8 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-200">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
              🛒 Order Items ({orderItems.length})
            </h3>
          </div>
          <div className="divide-y divide-gray-200">
            {orderItems.map((item, index) => (
              <div key={index} className="flex items-center gap-4 px-5 py-4">
                <img
                  src={item.image || "/placeholder.png"}
                  alt=""
                  className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {item.name}
                  </p>
                  <div className="flex gap-3 mt-1">
                    <span className="text-xs text-gray-500 bg-white px-2 py-0.5 rounded border border-gray-200">
                      Size: {item.size}
                    </span>
                    <span className="text-xs text-gray-500 bg-white px-2 py-0.5 rounded border border-gray-200">
                      Qty: {item.quantity}
                    </span>
                  </div>
                </div>
                <p className="text-sm font-semibold text-gray-800">
                  {currency}
                  {(item.finalPrice || item.price) * item.quantity}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Price Summary */}
        <div className="bg-gray-50 rounded-xl p-5 border border-gray-200 mb-8">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
            Price Details
          </h3>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-sm text-gray-600">
              <p>Subtotal ({orderItems.length} items)</p>
              <p>
                {currency}
                {subtotal}
              </p>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <p>Shipping Fee</p>
              <p>
                {currency}
                {shippingFee}
              </p>
            </div>
            <hr className="my-2 border-gray-200" />
            <div className="flex justify-between text-lg font-semibold text-gray-800">
              <p>Total Amount</p>
              <p>
                {currency}
                {amount}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => {
              if (!isPlacing) confirmOrder();
            }}
            disabled={isPlacing}
            className="flex-1 bg-black text-white py-3 rounded-md font-medium text-sm cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors hover:bg-gray-900"
          >
            {isPlacing
              ? "Processing..."
              : method === "cod"
                ? "✓ CONFIRM ORDER"
                : "→ PROCEED TO PAYMENT"}
          </button>
          <button
            onClick={() => {
              sessionStorage.setItem("resetCheckoutForm", "true");
              navigate("/place-order", {
                replace: true,
                state: { fromCart: true, checkoutSessionId },
              });
            }}
            disabled={isPlacing}
            className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-md font-medium text-sm cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            ← GO BACK & EDIT
          </button>
        </div>
      </div>

    </div>
  );
};

export default OrderConfirmation;
