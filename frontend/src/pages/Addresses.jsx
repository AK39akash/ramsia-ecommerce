import React, { useState } from "react";
import { FiChevronLeft, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Addresses = () => {
  const [addresses, setAddresses] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  // HANDLE INPUT
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ADD ADDRESS
  const handleAdd = () => {
    if (!form.name || !form.address) return;

    setAddresses([...addresses, { ...form, id: Date.now() }]);
    setForm({
      name: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
    });
    setShowForm(false);
  };

  // DELETE
  const handleDelete = (id) => {
    setAddresses(addresses.filter((addr) => addr.id !== id));
  };

  return (
    <div className="min-h-full border border-gray-200 flex flex-col sm:p-5 pb-20 sm:pb-0">

      {/* MOBILE HEADER */}
      <div className="sticky top-0 z-50 bg-white border-b-2 border-gray-200 sm:hidden">
        <div className="flex items-center justify-between px-4 py-4">
          {/* BACK BUTTON */}
          <button onClick={() => navigate(-1)}>
            <FiChevronLeft className="w-7 h-7" />
          </button>

          {/* TITLE */}
          <h2 className="text-[17px] font-semibold tracking-wide">ADDRESSES</h2>

          {/* ADD BUTTON */}
          <button
            onClick={() => setShowForm(true)}
            className="text-sm font-semibold cursor-pointer transition"
          >
            ADD
          </button>

          
        </div>
      </div>

      <div className="sm:flex hidden justify-between items-center w-full mb-5 sm:mb-0">
        <div className="flex"></div>

        {/* TITLE */}
        <h2 className="text-xl sm:text-xl font-bold flex-1 text-center">
          ADDRESS
        </h2>

        {/* ADD BUTTON */}
        <button
          onClick={() => setShowForm(true)}
          className="border px-3 py-1.5 bg-black text-white text-sm hover:bg-gray-900 cursor-pointer transition"
        >
          + ADD
        </button>
      </div>

      {/* FORM */}
      {showForm && (
        <div className="flex sm:items-center sm:justify-center">
          <div className="border sm:max-w-2xl w-full p-4 mx-4 sm:mx-0 mt-4 md:mt-6 lg:mt-10 mb-6 grid gap-3 sm:grid-cols-2">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="border p-1.5 sm:p-2"
            />
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="border p-1.5 sm:p-2"
            />

            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Address"
              className="border p-1.5 sm:p-2 sm:col-span-2"
            />

            <input
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="City"
              className="border p-1.5 sm:p-2"
            />
            <input
              name="state"
              value={form.state}
              onChange={handleChange}
              placeholder="State"
              className="border p-1.5 sm:p-2"
            />

            <input
              name="pincode"
              value={form.pincode}
              onChange={handleChange}
              placeholder="Pincode"
              className="border p-1.5 sm:p-2"
            />

            <div className="flex gap-3 sm:col-span-2">
              <button
                onClick={handleAdd}
                className="bg-black w-1/2 hover:bg-gray-900 text-white px-6 py-2 cursor-pointer"
              >
                SAVE
              </button>

              <button
                onClick={() => setShowForm(false)}
                className="border w-1/2 px-6 py-2 hover:bg-gray-100 cursor-pointer"
              >
                CANCEL
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADDRESS LIST */}
      {addresses.length === 0 ? (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-500 text-center sm:text-lg sm:pr-14">No saved addresses</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4 mt-5 sm:mt-0 w-full px-4 sm:px-0">

          <h2 className="text-center text-[17px] font-bold mt-4 mb-2 sm:pr-12">OTHER SAVED ADDRESS</h2>

          {addresses.map((addr) => (
            <div className="flex flex-col w-full items-center justify-center">
              <div key={addr.id} className="flex w-full lg:w-3xl justify-between border-3 border-gray-300 mx-4 sm:mx-0 p-3 sm:p-4">

                <div>

                  <p className="font-medium">
                    {addr.name} | {addr.phone}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">{addr.address}</p>
                  <p className="text-sm text-gray-600">
                    {addr.city}, {addr.state} - {addr.pincode}
                  </p>

                  {/* ACTIONS */}
                  <div className="flex gap-4 mt-3 text-[13px] sm:text-sm">
                    <button className="text-white font-bold hover:underline border border-black bg-black px-3 py-1 cursor-pointer">
                      EDIT
                    </button>
                    
                  </div>

                </div>

                <div>

                  <button
                    onClick={() => handleDelete(addr.id)}
                    className="text-lg cursor-pointer"
                  >
                    <FiTrash2/>
                  </button>
                </div>


              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default Addresses;
