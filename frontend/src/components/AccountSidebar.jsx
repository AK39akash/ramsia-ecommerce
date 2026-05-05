import React from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom'

const AccountSidebar = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        { name: "OVERVIEW", path: "/account" },
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
        <div className='hidden sm:block h-[calc(100vh-80px)] sticky top-[80px]'>

            {/* CONTAINER */}
            <div className="border border-gray-300 h-full overflow-y-auto scroll-smooth pb-4 lg:pb-0">

                {/* MENU */}
                <div className="flex flex-col gap-2 lg:gap-3">

                    {menuItems.map((item, index) => {
                        const isActive = location.pathname === item.path;

                        return (
                            <div
                                key={index}
                                onClick={() => navigate(item.path)}
                                className={`cursor-pointer px-4 py-3.5 text-sm font-medium flex items-center justify-between tracking-wide transition ${
                                    isActive
                                        ? "bg-black text-white"
                                        : "text-black hover:bg-gray-100"
                                }`}
                            >
                                <span>
                                    {item.name}
                                </span>

                                {index !== 0 && <FaChevronRight />}


                            </div>
                        )
                    })}

                </div>
                
            </div>
        
        </div>
    )
}

export default AccountSidebar
