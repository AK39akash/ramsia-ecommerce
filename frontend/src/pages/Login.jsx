import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import { FiChevronLeft, FiSearch } from "react-icons/fi";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");

  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Added State for Errors and Loading
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    general: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validateField = (fieldName, value) => {
    if (!isTouched) return;

    let errorMsg = "";

    if (fieldName === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value) && value.length > 0) {
        errorMsg = "Please enter a valid email address.";
      }
    }

    if (currentState === "Sign Up") {
      if (fieldName === "name") {
        if (value.length > 0 && value.length < 3) {
          errorMsg = "Name must be at least 3 characters long.";
        }
      }
      if (fieldName === "password") {
        if (value.length > 0 && value.length < 8) {
          errorMsg = "Password must be at least 8 characters long.";
        }
      }
    }

    setErrors((prev) => ({ ...prev, [fieldName]: errorMsg, general: "" }));
  };

  // Clear or show specific error when user types
  const handleInputChange = (setter, fieldName) => (e) => {
    const val = e.target.value;
    setter(val);
    validateField(fieldName, val);
  };

  const validateForm = () => {
    let isValid = true;
    let newErrors = { name: "", email: "", password: "", general: "" };

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address.";
      isValid = false;
    }

    if (currentState === "Sign Up") {
      // Validate name for Signup
      if (name.length < 3) {
        newErrors.name = "Name must be at least 3 characters long.";
        isValid = false;
      }

      // Validate password for Signup
      if (password.length < 8) {
        newErrors.password = "Password must be at least 8 characters long.";
        isValid = false;
      }
    }

    setIsTouched(true);
    setErrors(newErrors);
    return isValid;
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({ name: "", email: "", password: "", general: "" });

    try {

      let response;

      if (currentState === "Sign Up") {
        
        const response = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
        });

        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        } else {
          // map generic backend error to form fields
          if (response?.data?.message?.toLowerCase().includes("name")) {
            setErrors((prev) => ({ ...prev, name: response.data.message }));
          } else if (
            response?.data?.message?.toLowerCase().includes("exists")
          ) {
            toast.error(response.data.message);
          } else if (response?.data?.message?.toLowerCase().includes("email")) {
            setErrors((prev) => ({ ...prev, email: response.data.message }));
          } else {
            setErrors((prev) => ({
              ...prev,
              general: response?.data?.message,
            }));
          }
        }
      } else {
        const response = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });

        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        } else {
          toast.error(response?.data?.message);
        }
      }
    } catch (error) {
      const backendMsg = error.response?.data?.message || error.message;

      if (currentState === "Login") {
        toast.error(backendMsg);
      } else if (backendMsg.toLowerCase().includes("name")) {
        setErrors((prev) => ({ ...prev, name: backendMsg }));
      } else if (backendMsg.toLowerCase().includes("exists")) {
        toast.error(backendMsg);
      } else if (backendMsg.toLowerCase().includes("email")) {
        setErrors((prev) => ({ ...prev, email: backendMsg }));
      } else if (
        backendMsg.toLowerCase().includes("password") ||
        backendMsg.toLowerCase().includes("credentials")
      ) {
        setErrors((prev) => ({ ...prev, general: backendMsg }));
      } else {
        toast.error(backendMsg);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  // Handle switching modes
  const handleStateSwap = (newState) => {
    setCurrentState(newState);
    setErrors({ name: "", email: "", password: "", general: "" });
    setIsTouched(false);
  };

  return (
    <div className="sm:mt-30 lg:mb-40">

      {/* MOBILE HEADER */}
      <div className="sticky top-0 z-50 bg-white border-b-2 border-gray-200 sm:hidden">
        <div className="flex items-center justify-between px-4 py-4">
          {/* BACK BUTTON */}
          <button onClick={() => navigate(-1)}>
            <FiChevronLeft className="w-7 h-7" />
          </button>

          {/* TITLE */}
          <div className="flex-1 flex justify-center items-center">
            <h1 className="text-base uppercase text-center font-medium tracking-wide">{currentState}</h1>
          </div>

          {/* SEARCH ICON */}
          <button className="hidden" onClick={() => navigate("/search")}>
            <FiSearch className="w-6 h-6" />
          </button>
          
        </div>
      </div>

      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col items-center w-[80%] sm:w-[90%] sm:max-w-96 m-auto mt-20 sm:mt-0 gap-4 text-gray-800"
      >
        <div className="hidden sm:inline-flex items-center gap-2 mb-4 mt-10">
          <p className="prata-regular text-3xl">{currentState}</p>
          <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
        </div>

        {errors.general && (
          <div className="w-full bg-red-50 text-red-500 text-sm p-3 border border-red-200 rounded text-center">
            {errors.general}
          </div>
        )}

        {currentState === "Login" ? (
          ""
        ) : (
          <div className="w-full">
            <input
              value={name}
              onChange={handleInputChange(setName, "name")}
              type="text"
              className={`w-full px-3 py-2 border ${errors.name ? "border-red-500" : "border-gray-800"} outline-none`}
              placeholder="Name"
              required
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>
        )}

        <div className="w-full">
          <input
            value={email}
            onChange={handleInputChange(setEmail, "email")}
            type="email"
            className={`w-full px-3 py-2 border ${errors.email ? "border-red-500" : "border-gray-800"} outline-none`}
            placeholder="Email"
            required
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        <div className="w-full relative">
          <input
            value={password}
            onChange={handleInputChange(setPassword, "password")}
            type={showPassword ? "text" : "password"}
            className={`w-full px-3 py-2 border ${errors.password ? "border-red-500" : "border-gray-800"} outline-none`}
            placeholder="Password"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-800 cursor-pointer"
          >
            {showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            )}
          </button>
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
          )}
        </div>

        <div className="w-full flex flex-col items-start text-sm mt-[-8px] gap-2">
          <p className="cursor-pointer text-gray-500 hover:text-black transition-colors">
            Forgot your password?
          </p>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="bg-black cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-12 py-2.5 font-semibold mt-4 transition-colors rounded-md text-md sm:text-base"
        >
          {isLoading
            ? "Processing..."
            : currentState === "Login"
              ? "Sign In"
              : "Sign Up"}
        </button>

        {currentState === "Login" ? (
          <p className="text-gray-600 text-md">
            Don't have an account?{" "}
            <span
              onClick={() => handleStateSwap("Sign Up")}
              className="cursor-pointer font-medium text-black hover:underline"
            >
              Sign Up
            </span>
          </p>
        ) : (
          <p className="text-gray-600 text-md">
            Already have an account?{" "}
            <span
              onClick={() => handleStateSwap("Login")}
              className="cursor-pointer font-medium text-black hover:underline"
            >
              Login Here
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
