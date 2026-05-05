import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Route, Routes } from "react-router-dom";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";
import Login from "./components/Login";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Edit from "./pages/Edit";
import axios from "axios";
import InactiveList from "./pages/InactiveList";
import Users from "./pages/Users";
import UserDetails from "./pages/UserDetails";



export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = '₹';

const App = () => {

  const [token, setToken] = useState("");


  useEffect(() => {

    const savedToken = localStorage.getItem("token");

    if (savedToken) {
      setToken(savedToken);

      axios.defaults.headers.common["Authorization"] = `Bearer ${savedToken}`;
    }

  }, [])


  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer />
      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Navbar setToken={setToken} />
          <hr className="text-gray-300" />
          <div className="flex w-full">
            <Sidebar />
            <div className="w-[70%] mx-auto ml-[max(5vw, 25px)] my-8 text-gray-600 text-base">
              <Routes>
                <Route path="/" element={<Orders token={token} />} />
                <Route path="/add" element={<Add token={token} />} />
                <Route path="/list" element={<List token={token} />} />
                <Route path="/orders" element={<Orders token={token} />} />
                <Route path="/edit/:id" element={<Edit token={token} />} />
                <Route path="/inactive" element={<InactiveList token={token} />} />
                <Route path="/users" element={<Users token={token} />} />
                <Route path="/users/:id" element={<UserDetails token={token} />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
