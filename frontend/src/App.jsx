import React, { lazy, Suspense, useContext, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import ProtectedRoute from './components/ProtectedRoute'
import MainLayout from './layouts/MainLayout';
import axios from "axios";

import 'react-toastify/dist/ReactToastify.css';
import Loader from './components/Loader';
import { ShopContext } from './context/ShopContext';
import AccountLayout from './layouts/AccountLayout';
import SearchMenu_Mobile_Layout from './layouts/SearchMenu_Mobile_Layout';


// Lazy loading pages 
const Home = lazy(() => import("./pages/Home"));
const Collection = lazy(() => import("./pages/Collection"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Product = lazy(() => import("./pages/Product"));
const Cart = lazy(() => import("./pages/Cart"));
const Login = lazy(() => import("./pages/Login"));
const PlaceOrder = lazy(() => import("./pages/PlaceOrder"));
const Orders = lazy(() => import("./pages/Orders"));
const Profile = lazy(() => import("./pages/Profile"));
const OrderConfirmation = lazy(() => import("./pages/OrderConfirmation"));
const Success = lazy(() => import("./pages/Success"));
const Cancel = lazy(() => import("./pages/Cancel"));
const NotFound = lazy(() => import("./pages/NotFound"));
const SearchPage = lazy(() => import("./pages/SearchPage"));
const Shop = lazy(() => import("./pages/Shop"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
const AccountOverview = lazy(() => import("./pages/AccountOverview"));
const Addresses = lazy(() => import("./pages/Addresses"));
const Refunds = lazy(() => import("./pages/Refunds"));
const RateAndReview = lazy(() => import("./pages/RateAndReview"));
const Settings = lazy(() => import("./pages/Settings"));
const Help = lazy(() => import("./pages/Help"));
const OrderDetails = lazy(() => import("./pages/OrderDetails"));
const GiftCards = lazy(() => import("./pages/GiftCards"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsConditions = lazy(() => import("./pages/Terms"));
const Returns = lazy(() => import("./pages/Returns"));


const App = () => {


  const { backendUrl } = useContext(ShopContext);


  useEffect(() => {

    const handleReturnFromStripe = async () => {

      const orderId = sessionStorage.getItem("pendingStripeOrder");

      if (!orderId || orderId === "undefined") return;

      console.log("Trying to cancel:", orderId);

      try {

        await axios.post(
          backendUrl + "/api/order/cancel",
          { orderId },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          }
        );

        console.log("Cancelled from App");
        
      } catch (error) {
        console.log(error);
      }

      sessionStorage.removeItem("pendingStripeOrder");
      
    };

    window.addEventListener("pageshow", handleReturnFromStripe);

    return () => {
      window.removeEventListener("pageshow", handleReturnFromStripe);
    }

  }, []);


  return (

    <>

      <ToastContainer position='top-right' autoClose={3000} />

      <Suspense fallback={<Loader />} >

        <Routes>

          {/* Layout Wrapper */}
          <Route element={<MainLayout />}>

            {/* Public Routes */}
            <Route path='/' element={<Home />} />
            <Route path='/collection' element={<Collection />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/product/:productId' element={<Product />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/login' element={<Login />} />
            
            <Route path='/privacy-policy' element={<PrivacyPolicy />} />
            <Route path='/terms-&-conditions' element={<TermsConditions />} />
            <Route path='/return-exchangePolicy' element={<Returns />} />
            
            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path='/place-order' element={<PlaceOrder />} />
              <Route path='/order-confirmation' element={<OrderConfirmation />} />
              <Route path='/success' element={<Success />} />
              <Route path='/cancel' element={<Cancel />} />
              <Route path='/gift-cards' element={<GiftCards />} />
            </Route>

          </Route>

          


          <Route element={<SearchMenu_Mobile_Layout /> }>

            <Route path='/search' element={<SearchPage />} />
            <Route path='/shop' element={<Shop />} />
          
          </Route>

          <Route element={<AccountLayout/>} >

            <Route element={<ProtectedRoute />} >

              <Route path='/account' element={<AccountOverview />} />
              <Route path='/wishlist' element={<Wishlist />} />
              <Route path='/orders' element={<Orders />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/addresses' element={<Addresses />} />
              <Route path='/refunds' element={<Refunds />} />
              <Route path='/reviews' element={<RateAndReview />} />
              <Route path='/settings' element={<Settings />} />
              <Route path='/help' element={<Help />} />
              <Route path='/order/:id' element={<OrderDetails />} />

            </Route>

          </Route>

        <Route path='*' element={<NotFound />} />

        </Routes>

      </Suspense>

    </>
    
  )
}

export default App
