import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Settings = () => {
  const { navigate, setToken, setCartItems } = useContext(ShopContext);

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
    navigate("/login");
  };

  const menuItems = [
    { name: "PRIVACY POLICY", action: () => navigate("/privacy-policy") },
    { name: "ABOUT US", action: () => navigate("/about") },
    {
      name: "TERMS & CONDITIONS",
      action: () => navigate("/terms-&-conditions"),
    },
    {
      name: "RETURN/EXCHANGE POLICY",
      action: () => navigate("/return-exchangePolicy"),
    },
    { name: "LOGOUT", action: () => setShowLogoutModal(true) },
    { name: "DELETE ACCOUNT", action: () => setShowDeleteModal(true) },
  ];

  return (
    <div className="h-full border border-gray-200 sm:py-5 sm:px-4">

      {/* MOBILE HEADER */}
      <div className="sticky top-0 z-50 bg-white border-b-2 border-gray-200 sm:hidden">
        <div className="flex items-center justify-between px-4 py-4">
          {/* BACK BUTTON */}
          <button onClick={() => navigate(-1)}>
            <FiChevronLeft className="w-7 h-7" />
          </button>

          {/* TITLE */}
          <h2 className="text-[17px] font-semibold tracking-wide">
            SETTINGS
          </h2>

          <div />
        </div>
      </div>

      <div className="flex flex-col justify-center items-center w-full">

        <h2 className="hidden sm:flex text-xl sm:text-xl text-center font-bold mb-6">
          Settings
        </h2>

        {/* MENU LIST */}
        <div className="flex flex-col mt-2 sm:mt-0 w-full px-4 sm:px-0">
          {menuItems.map((item, index) => (
            <div
              key={index}
              onClick={item.action}
              className="flex items-center justify-between py-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition"
            >
              <span
                className={`text-sm ${
                  item.name === "DELETE ACCOUNT"
                    ? "text-red-500"
                    : "text-gray-800"
                }`}
              >
                {item.name}
              </span>

              <FiChevronRight className="text-xl" />
            </div>
          ))}
        </div>

      </div>


      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white w-[90%] max-w-sm p-6 text-center rounded">
            <h2 className="text-lg font-semibold mb-3">Logout?</h2>

            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to logout?
            </p>

            <div className="flex gap-3 justify-center">
              <button
                onClick={() => {
                  handleLogout();
                  setShowLogoutModal(false);
                }}
                className="bg-black text-white px-5 py-2 text-sm cursor-pointer"
              >
                YES
              </button>

              <button
                onClick={() => setShowLogoutModal(false)}
                className="border px-5 py-2 text-sm cursor-pointer"
              >
                CANCEL
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white w-[90%] max-w-sm p-6 text-center rounded">
            <h2 className="text-lg font-semibold mb-3 text-red-500">
              Delete Account?
            </h2>

            <p className="text-sm text-gray-600 mb-6">
              This action is permanent and cannot be undone.
            </p>

            <div className="flex gap-3 justify-center">
              <button
                onClick={() => {
                  console.log("Delete account API here");
                  setShowDeleteModal(false);
                }}
                className="bg-red-500 text-white px-5 py-2 text-sm hover:bg-red-600 cursor-pointer"
              >
                DELETE
              </button>

              <button
                onClick={() => setShowDeleteModal(false)}
                className="border px-5 py-2 text-sm cursor-pointer"
              >
                CANCEL
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Settings;
