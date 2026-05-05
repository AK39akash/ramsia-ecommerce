import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext';

const NotFound = () => {

    const { navigate } = useContext(ShopContext);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center mt-40 lg:mt-0 px-6">

      <h1 className='text-8xl font-bold text-red-500 mb-4'>404</h1>

      <p className='text-2xl font-semibold text-gray-700 mb-2'>
        Page Not Found
      </p>

      <p className='text-gray-500 mb-8'>
        The page you are looking for does not exist or has been moved.
      </p>

      <button
        onClick={() => navigate('/', { replace: true })}
        className="bg-black text-white py-3 px-10 rounded-xl hover:bg-gray-800 transition cursor-pointer"
      >
        Go to Home
      </button>

    </div>
  )
}


export default NotFound;
