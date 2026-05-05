import React from 'react'
import Navbar from '../components/Navbar'
import AccountSidebar from '../components/AccountSidebar'
import { Outlet } from 'react-router-dom'

const AccountLayout = () => {

    return (
        <div className='flex flex-col h-screen'>

            {/* NAVBAR */}
            <Navbar/>

            {/* SPACER FOR FIXED NAVBAR */}
            <div className='h-17 hidden sm:block '></div>

            {/* Main section */}
            <div className="flex flex-1 overflow-hidden gap-5 sm:px-4 md:px-5 lg:px-6 sm:pt-4 lg:pt-5">

                {/* SIDEBAR */}
                <div className="hidden sm:block md:w-62 lg:w-84">
                    <AccountSidebar />
                </div>

                {/* CONTENT */}
                <div className="flex-1 overflow-y-auto">
                    <Outlet/>
                </div>

            </div>
        
        </div>
    )
}

export default AccountLayout
