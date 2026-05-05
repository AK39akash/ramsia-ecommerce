import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SearchBar from '../components/SearchBar'
import { Outlet, useLocation } from 'react-router-dom'
import SearchDropdown from '../components/SearchDropdown'

const MainLayout = () => {

  const location = useLocation();

  const hideFooterRoutes = ['/cart', '/place-order', '/order-confirmation', 'success', '/cancel', '/login', '/signup', '/about', '/contact', '/success', '/cancel', '/wishlist', '/gift-cards', '/privacy-policy', '/terms-&-conditions', '/return-exchangePolicy', '/collection'];

  const hideFooter = hideFooterRoutes.includes(location.pathname);

  return (
    <div className='flex flex-col min-h-screen sm:pb-0  sm:px-[0vw] md:px-[0vw] lg:px-[0.7vw]'>

      <Navbar/>

      <div className='sm:h-[65px] lg:h-[66px]'></div>

      <SearchDropdown/>


      {/* Main Content */}
      <main className='grow'>
        <Outlet/>
      </main>

      
      {!hideFooter && <Footer />}

    </div>
  )
}

export default MainLayout
