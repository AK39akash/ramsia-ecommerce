import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollection = () => {

    const { products } = useContext(ShopContext);

    const [latestProducts, setLatestProducts] = useState([]);


    useEffect(() => {

        if (!products || products.length === 0) {
            setLatestProducts([]);
            return;
        }
        
        setLatestProducts(products.slice(0, 10));
        
    }, [products])


    return (
        <div className='mt-10 sm:mt-13 lg:mt-16 mb-10'>

            {/* Heading */}
            <div className='text-center pb-8 lg:pb-10'>

                <div className='inline-block group'>

                    <h2 className='text-xl lg:text-[26px] font-bold tracking-wide'>
                        <Title  text1={'NEW'} text2={'&'} text3={'POPULAR'} />
                    </h2>

                    {/* ANIMATED UNDERLINE */}
                    <span className='block h-[2px] bg-black mt-2 mx-auto w-10 sm:w-0 sm:group-hover:w-full transition-all duration-500 animate-underline '></span>

                </div>

                
            </div>


            {/* RENDERING PRODUCTS */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 gap-y-1 lg:gap-y-5">

                {
                    latestProducts.map((item) => (

                        <ProductItem 
                            key={item._id} 
                            id={item._id} 
                            image={item.images?.map(img => img.url) || []} 
                            name={item.name} 
                            price={item.finalPrice || item.price}
                        />
                    ) )
                }

            </div>
            
        
        </div>
    )
}

export default LatestCollection
