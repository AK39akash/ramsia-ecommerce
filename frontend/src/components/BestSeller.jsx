import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {

    const {products} = useContext(ShopContext);

    const [bestSeller, setBestSeller] = useState([]);


    useEffect(() => {
        
        if (!products || products.length === 0) {
            setBestSeller([]);
            return;
        }

        const best = products.filter(product => product.bestseller);

        setBestSeller(best.slice(0, 5));

    }, [products])


    return (
        <div className='mt-14 lg:mt-18'>

            {/* HEADING */}
            <div className='text-center pb-8 lg:pb-10'>
            
                <div className='inline-block group'>
            
                    <h2 className='text-xl lg:text-[26px] font-bold tracking-wide'>
                        <Title text1={'BEST'} text2={''} text3={'SELLERS'} />
                    </h2>
            
                    {/* ANIMATED UNDERLINE */}
                    <span className='block h-[2px] bg-black mt-2 mx-auto w-10 sm:w-0 sm:group-hover:w-full transition-all duration-500 animate-underline '></span>
            
                </div>
            
                            
            </div>


            {/* RENDERING PRODUCTS */}
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 gap-y-1 lg:gap-y-5">

                {
                    bestSeller.map((item, index) => (
                        <ProductItem 
                            key={index} 
                            id={item._id} 
                            image={item.images?.map(img => img.url) || []} 
                            name={item.name} 
                            price={item.finalPrice || item.price} 
                        />
                    ))
                }

            </div>

        
        </div>
    )
}

export default BestSeller
