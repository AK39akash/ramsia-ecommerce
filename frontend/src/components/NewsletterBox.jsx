import React from 'react'

const NewsletterBox = () => {

    const onSubmitHandler = (e) => {
        e.preventDefault();
    }
    return (
        <div className='text-center px-4 sm:mt-22 sm:mt-24 lg:mt-0 mb-28 md:mb-30 lg:mb-40'>

            <p className='text-lg sm:text-2xl lg:text-2xl font-semibold text-gray-800'>Subscribe now & get 20% off</p>

            <p className='text-gray-500 text-sm lg:text-base'>
                Sign up for exclusive early access to new arrivals and special offers.
            </p>

            <form onSubmit={onSubmitHandler} className='w-full sm:w-2/3 lg:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
                <input className='w-full sm:flex-1 outline-none' type="email" placeholder='Enter your email' required />
                <button className='bg-black text-white text-xs sm:text-sm tracking-wide sm:tracking-widest px-5 sm:px-7 lg:px-10 py-3 sm:py-3.5 lg:py-4 cursor-pointer' type='submit'>SUBSCRIBE</button>
            </form>
        
        </div>
    )
}

export default NewsletterBox
