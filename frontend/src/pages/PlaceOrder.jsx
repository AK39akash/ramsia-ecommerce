import React, { useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/frontend_assets/assets";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import { FiChevronLeft } from "react-icons/fi";

const PlaceOrder = () => {
  const location = useLocation();
  const [method, setMethod] = useState("cod");

  const {
    navigate,
    token,
    cartItems,
    getCartAmount,
    delivery_fee,
    products,
    checkoutSessionId,
  } = useContext(ShopContext);

  const savedForm = sessionStorage.getItem("checkoutForm");

  sessionStorage.removeItem("successVisited");

  const [formData, setFormData] = useState(
    savedForm
      ? JSON.parse(savedForm)
      : {
          firstName: "",
          lastName: "",
          email: "",
          street: "",
          city: "",
          state: "",
          zipcode: "",
          country: "",
          phone: "",
        },
  );

  useEffect(() => {
    const access = sessionStorage.getItem("checkoutAccess");

    if (access) {
      sessionStorage.setItem("checkoutForm", JSON.stringify(formData));
    }
  }, [formData]);

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((data) => ({ ...data, [name]: value }));
  };



  useEffect(() => {
    if (sessionStorage.getItem("resetCheckoutForm")) {
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: "",
      });

      sessionStorage.removeItem("resetCheckoutForm");
      sessionStorage.removeItem("checkoutForm");
    }
  }, []);

  useEffect(() => {
    const access = sessionStorage.getItem("checkoutAccess");

    if (!access) {
      console.log("No access, but allowing back navigation");
      return;
    }

    if (!token && !localStorage.getItem("token")) {
      navigate("/login");
      return;
    }
  }, [token]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      let orderItems = [];

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            
            const product = products.find((p) => p._id === items);

            if (product) {
              orderItems.push({
                productId: product._id,
                name: product.name,
                image: product.images?.[0]?.url || "",
                price: product.finalPrice || product.price,
                size: item,
                quantity: cartItems[items][item],
              });
            }

          }
        }
      }

      const subtotal = getCartAmount();
      const shippingFee = subtotal === 0 ? 0 : delivery_fee;
      const totalAmount = subtotal + shippingFee;

      // Navigate to confirmation page with order data
      sessionStorage.setItem("orderConfirmationValid", "true");

      navigate("/order-confirmation", {
        state: {
          formData,
          orderItems,
          amount: totalAmount,
          subtotal,
          shippingFee,
          method,
          fromCheckout: true, // Used for route protection
          checkoutSessionId, // Pass session ID forward
        },
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    sessionStorage.removeItem("orderConfirmationValid");
    sessionStorage.setItem("resetCheckoutForm", "true");
  }, []);

  return (
    <div className="flex flex-col sm:pt-10 lg:pt-0 sm:items-center sm:justify-center pb-20 lg:pb-0">

      {/* MOBILE HEADER */}
      <div className="sticky top-0 z-50 bg-white border-b-2 border-gray-200 sm:hidden">
        <div className="flex items-center justify-between px-3 py-4">
          {/* BACK BUTTON */}
          <button onClick={() => navigate(-1)}>
            <FiChevronLeft className="w-7 h-7" />
          </button>

          {/* TITLE */}
          <h2 className="text-[16px] font-semibold tracking-wide">PLACE ORDER</h2>

          <div></div>

          
        </div>
      </div>

      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col lg:flex-row sm:justify-center sm:items-center lg:items-center justify-evenly gap-6 min-h-[80vh]"
      >
        {/* LEFT SIDE */}
        <div className="flex flex-col gap-4 w-full px-4 sm:px-0 sm:max-w-120 pt-5 sm:pt-0">

          <div className="text-xl font-medium sm:text-2xl mt-3 mb-3 sm:mb-5 ">
            <Title text1={"DELIVERY"} text2={"INFORMATION"} />
          </div>

          <div className="flex  gap-3">
            <input
              required
              onChange={onChangeHandler}
              name="firstName"
              value={formData.firstName}
              className="border border-gray-400 rounded py-1.5 px-3.5 w-full"
              type="text"
              placeholder="First name"
            />
            <input
              required
              onChange={onChangeHandler}
              name="lastName"
              value={formData.lastName}
              className="border border-gray-400 rounded py-1.5 px-3.5 w-full"
              type="text"
              placeholder="Last name"
            />
          </div>

          <input
            required
            onChange={onChangeHandler}
            name="email"
            value={formData.email}
            className="border border-gray-400 rounded py-1.5 px-3.5 w-full"
            type="email"
            placeholder="Email address"
          />
          <input
            required
            onChange={onChangeHandler}
            name="street"
            value={formData.street}
            className="border border-gray-400 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Street"
          />

          <div className="flex  gap-3">
            <input
              required
              onChange={onChangeHandler}
              name="city"
              value={formData.city}
              className="border border-gray-400 rounded py-1.5 px-3.5 w-full"
              type="text"
              placeholder="City"
            />
            <input
              required
              onChange={onChangeHandler}
              name="state"
              value={formData.state}
              className="border border-gray-400 rounded py-1.5 px-3.5 w-full"
              type="text"
              placeholder="State"
            />
          </div>

          <div className="flex  gap-3">
            <input
              required
              onChange={onChangeHandler}
              name="zipcode"
              value={formData.zipcode}
              className="border border-gray-400 rounded py-1.5 px-3.5 w-full"
              type="number"
              placeholder="Zipcode"
            />
            <input
              required
              onChange={onChangeHandler}
              name="country"
              value={formData.country}
              className="border border-gray-400 rounded py-1.5 px-3.5 w-full"
              type="text"
              placeholder="Country"
            />
          </div>

          <input
            required
            onChange={onChangeHandler}
            name="phone"
            value={formData.phone}
            className="border border-gray-400 rounded py-1.5 px-3.5 w-full"
            type="number"
            placeholder="Phone"
          />
        </div>

        <hr className="sm:hidden mt-5 text-gray-300 border-t-2" />

        {/* RIGHT SIDE */}
        <div className=" mt-4 px-4 sm:px-0">

          <div className="sm:mt-4 min-w-80 sm:min-w-md">
            <CartTotal />
          </div>

          <div className="sm:mt-12 mt-8 font-semibold">
            <Title text1={"PAYMENT"} text2={"METHOD"} />

            {/* PAYMENT METHOD SELECTION */}
            <div className="flex gap-3 sm:mt-6 mt-4 flex-col lg:flex-row">
              <div
                onClick={() => setMethod("stripe")}
                className="flex items-center gap-3 border border-gray-300 p-3 lg:p-2  px-3 cursor-pointer"
              >
                <p
                  className={`min-w-3.5 h-3.5 border border-gray-300 rounded-full ${method === "stripe" ? "bg-green-400" : ""}`}
                ></p>
                <img src={assets.stripe_logo} className="h-5 mx-4" alt="" />
              </div>

              <div
                onClick={() => setMethod("cod")}
                className="flex items-center gap-3 border border-gray-300 p-3 lg:p-2 px-3 cursor-pointer"
              >
                <p
                  className={`min-w-3.5 h-3.5 border border-gray-300 rounded-full ${method === "cod" ? "bg-green-400" : ""}`}
                ></p>
                <p className="text-gray-500 text-sm font-medium mx-4">
                  CASH ON DELIVERY
                </p>
              </div>
            </div>

            <div className="w-full lg:text-end mt-4">
              <button
                type="submit"
                className="bg-black hover:bg-gray-900 w-full text-white font-semibold px-16 lg:py-3 py-3.5 sm:text-sm sm:tracking-wide tracking-widest cursor-pointer"
              >
                PLACE ORDER
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PlaceOrder;
