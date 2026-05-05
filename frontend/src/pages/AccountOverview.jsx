import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { FiGift, FiHeart, FiMapPin, FiPackage } from "react-icons/fi";
import { HiCash } from "react-icons/hi";
import { FaChevronRight, FaRupeeSign, FaStar } from "react-icons/fa";

const AccountOverview = () => {

    const { navigate } = useContext(ShopContext);

    const userName = "Akash";
    const totalTarget = 5000;
    const currentAmount = 0;

    const progress = (currentAmount / totalTarget) * 100;

    const menuItems = [
        { name: "PROFILE", path: "/profile" },
        { name: "ORDERS", path: "/orders" },
        { name: "WISHLIST", path: "/wishlist" },
        { name: "ADDRESSES", path: "/addresses" },
        { name: "REFUNDS", path: "/refunds" },
        { name: "GIFT CARDS", path: "/gift-cards" },
        { name: "RATE AND REVIEW", path: "/reviews" },
        { name: "SETTINGS", path: "/settings" },
        { name: "ONLINE ORDERING HELP", path: "/help" },
    ]

    return (

        <div className="flex flex-col gap-4 sm:gap-6 pb-17 sm:pb-5">

            {/* TOP GRADIENT SECTION */}
            <div className="relative overflow-hidden text-white px-5 lg:px-4 pt-8 pb-8 sm:pt-5 sm:pb-5 md:pt-6 md:pb-6 lg:pt-10 lg:pb-12 bg-gradient-to-br bg-[linear-gradient(135deg,#000,#111,#000)] shadow-[0_0_40px_rgba(255,255,255,0.05)] from-black via-gray-900 to-black">

                {/* TOP ROW */}
                <div className="flex justify-between items-center sm:mb-4 mb-6">
                    <h2 className="text-md lg:text-xl font-light lg:font-medium">
                        Welcome <span className="font-semibold text-lg">{userName}</span>
                    </h2>

                    <h2 className="text-lg font-semibold tracking-wide">
                        RAMSIA
                    </h2>
                </div>

                {/* BENEFITS */}
                <div className="flex flex-col gap-3 text-sm md:text-[15px] lg:text-base mb-8 sm:mb-6">

                    <div className="flex items-center gap-2">
                        <FiGift/>
                        <span>Join the exclusive X club</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <HiCash />
                        <span>Assured cashback on every order</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <FiGift/>
                        <span>Win free gifts for order streaks</span>
                    </div>

                </div>

                {/* PROGRESS TEXT */}
                <p className="text-sm font-light lg:font-medium mb-1 sm:mb-2">
                    Shop ₹{totalTarget - currentAmount} more to become a X member.{" "}
                    <span className="underline cursor-pointer">
                        More Details
                    </span>
                </p>

                {/* PROGRESS BAR */}
                <div className="w-full h-1.5 lg:h-2 bg-gray-700 rounded-full mb-2">
                    <div
                        className="h-2 bg-white rounded-full transition-all"
                        style={{ width: `${progress}` }}
                    ></div>
                </div>

                {/* SCALE */}
                <div className="flex justify-between text-xs text-gray-300">
                    <span>₹0</span>
                    <span>₹{totalTarget}</span>
                </div>

            </div>

            {/* ACTION CARDS */}
            <div className="sm:grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-4 hidden ">

                {/* CARD COMPONENT */}
                {[
                    {
                        name: "Orders",
                        desc: "Track and manage your purchases",
                        icon: <FiPackage/>,
                        path: "/orders",
                    },
                    {
                        name: "Wishlist",
                        desc: "Save items for later",
                        icon: <FiHeart/>,
                        path: "/wishlist"
                    },
                    {
                        name: "Refunds",
                        desc: "Check refund status",
                        icon: <HiCash/>,
                        path: "/refunds"
                    },
                    {
                        name: "Gift Cards",
                        desc: "View your gift balance",
                        icon: <FiGift/>,
                        path: "/gift-cards"
                    },
                    {
                        name: "Rate & Review",
                        desc: "Review your purchases",
                        icon: <FaStar/>,
                        path: "/reviews",
                    },
                    {
                        name: "Addresses",
                        desc: "Manage delivery addresses",
                        icon: <FiMapPin/>,
                        path: "/addresses"
                    }
                ].map((item, index) => (
                    <div
                        key={index}
                        onClick={() => navigate(item.path)}
                        className="border border-gray-200 sm:px-6 sm:py-8 md:py-9 lg:p-14 flex flex-col items-center text-center cursor-pointer hover:shadow-md transition"
                    >
                        <div className="text-2xl lg:text-[26px] mb-2">{item.icon}</div>

                        <p className="font-semibold text-base lg:text-lg mb-1">{item.name}</p>

                        <p className="text-sm lg:text-md">
                            {item.desc}
                        </p>

                    </div>
                ))}

            </div>

            {/* MOBILE MENU */}
            <div className="block sm:hidden bg-white">

                {menuItems.map((item, index) => (
                    <div
                        key={index}
                        onClick={() => navigate(item.path)}
                        className="flex justify-between items-center px-4 py-4 cursor-pointer"
                    >

                        <span className="text-[14.5px]">
                            {item.name}
                        </span>

                        <FaChevronRight className="w-2.5 h-5" />
                        

                    </div>
                ))}

            </div>

        </div>
        
    )
};

export default AccountOverview;