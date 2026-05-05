import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SearchBar from '../components/SearchBar'
import { Outlet, useLocation } from 'react-router-dom'
import SearchDropdown from '../components/SearchDropdown'

const SearchMenu_Mobile_Layout = () => {



    return (
        <div className='flex flex-col min-h-screen sm:pb-0  sm:px-[5vw] md:px-[0vw] lg:px-[0.7vw]'>

            <Navbar/>

            <SearchDropdown/>


            {/* Main Content */}
            <main className='grow'>
                <Outlet/>
            </main>

        </div>
    )
}

export default SearchMenu_Mobile_Layout
