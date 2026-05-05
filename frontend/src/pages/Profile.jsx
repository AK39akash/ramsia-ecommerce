import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import Title from "../components/Title";
import { FiChevronLeft, FiSearch } from "react-icons/fi";

const Profile = () => {
  const { token, backendUrl, navigate, setToken, setCartItems } =
    useContext(ShopContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  // Original values for cancel
  const [originalName, setOriginalName] = useState("");
  const [originalEmail, setOriginalEmail] = useState("");
  const [originalPhone, setOriginalPhone] = useState("");

  const fetchProfile = async () => {
    try {
      const response = await axios.get(backendUrl + "/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        setName(response.data.user.name);
        setEmail(response.data.user.email);
        setPhone(response.data.user.phone)
        setOriginalName(response.data.user.name);
        setOriginalEmail(response.data.user.email);
        setOriginalPhone(response.data.user.phone)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsFetching(false);
    }
  };

  const handleSave = async () => {
    // Client-side validation
    if (name.length < 3) {
      toast.error("Name must be at least 3 characters long");
      return;
    }

    if (!/^[0-9]{10}$/.test(phone)) {
      toast.error("Enter valid 10 digit phone number");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.put(
        backendUrl + "/user/profile",
        { name, email, phone },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.data.success) {
        toast.success(response.data.message);

        setOriginalName(response.data.user.name);
        setOriginalEmail(response.data.user.email);
        setOriginalPhone(response.data.user.phone);

        setIsEditing(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setName(originalName);
    setEmail(originalEmail);
    setPhone(originalPhone);
    setIsEditing(false);
  };


  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    fetchProfile();
  }, [token]);


  if (isFetching) {
    return (
      <div className="border-t border-gray-300 pt-16 flex justify-center">
        <p className="text-gray-500">Loading profile...</p>
      </div>
    );
  }


  return (
    <div className="h-full border border-gray-200">

      {/* MOBILE HEADER */}
      <div className="sticky top-0 z-50 bg-white border-b-2 border-gray-200 sm:hidden">
        <div className="flex items-center justify-between px-4 py-4">
          {/* BACK BUTTON */}
          <button onClick={() => navigate(-1)}>
            <FiChevronLeft className="w-7 h-7" />
          </button>

          {/* TITLE */}
          <h2 className="text-[17px] font-bold tracking-wide">
            PROFILE
          </h2>

          <div/>

          
        </div>
      </div>

      <div className="flex justify-center w-full">

        <div className="w-full max-w-2xl p-4 md:p-5 lg:p-4">

          {/* HEADING */}
          <h2 className="hidden sm:block text-lg lg:text-xl font-bold text-center mb-12">
            PROFILE
          </h2>

        

          {/* FIELDS */}
          <div className="flex flex-col gap-5 mt-10 sm:mt-0">
            {/* NAME */}
            <div>
              {isEditing ? (
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border px-4 py-2 mt-1 outline-none"
                />
              ) : (
                <p className="border border-gray-300 text-gray-500 px-4 py-2 mt-1 text-sm font-medium bg-gray-100/80">{name}</p>
              )}
            </div>

            {/* PHONE (NEW) */}
            <div>
              {isEditing ? (
                <input
                  placeholder="Enter phone number"
                  className="w-full border px-4 py-2 mt-1 outline-none"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              ) : (
                <p className="border border-gray-300 text-gray-500 px-4 py-2 mt-1 text-sm font-medium bg-gray-100/80">
                  {phone || "Not added"}
                </p>
              )}
            </div>

            {/* EMAIL */}
            <div>
              {isEditing ? (
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border px-4 py-2 mt-1 outline-none"
                />
              ) : (
                <p className="border border-gray-300 text-gray-500 px-4 py-2 mt-1 text-sm font-medium bg-gray-100/80">{email}</p>
              )}
            </div>
          </div>

          {/* BUTTONS */}
          <div className="hidden sm:flex justify-center gap-3 mt-20 w-full">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  disabled={isLoading}
                  className="bg-black hover:bg-slate-950 text-white px-6 py-3 text-md font-semibold w-1/2 cursor-pointer"
                >
                  {isLoading ? "Saving..." : "SAVE CHANGES"}
                </button>

                <button
                  onClick={handleCancel}
                  className="border hover:bg-gray-100 cursor-pointer px-6 py-3 font-semibold text-md w-1/2"
                >
                  CANCEL
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-black hover:bg-gray-950 text-white px-6 py-3 text-md font-semibold tracking-wide cursor-pointer w-full"
              >
                EDIT PROFILE
              </button>
            )}
          </div>

        </div>
      </div>


      {/* MOBILE FIXED BUTTON */}
      <div className="sm:hidden fixed bottom-14 left-0 w-full bg-white px-4 py-3">

        {isEditing ? (
          <div className="flex gap-3">

            <button
              onClick={handleSave}
              disabled={isLoading}
              className="bg-black text-white py-3 text-sm font-semibold flex-1"
            >
              {isLoading ? "Saving..." : "SAVE"}
            </button>

            <button
              onClick={handleCancel}
              className="border py-3 text-sm font-semibold flex-1 tracking-widest"
            >
              CANCEL
            </button>

          </div>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-black text-white w-full py-3 text-sm font-semibold"
          >
            EDIT PROFILE
          </button>
        )}

      </div>

    </div>
  );
};

export default Profile;
