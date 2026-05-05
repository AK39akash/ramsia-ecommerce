import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';

const CartTotal = () => {

    const { currency, delivery_fee, getCartAmount} = useContext(ShopContext);

    const hideFooterRoutes = ['/cart'];

    const hideFooter = hideFooterRoutes.includes(location.pathname);

    return (
        <div className='w-full'>

            <div className='text-xl sm:text-[22px] md:text-2xl text-center sm:text-start font-semibold'>
                {!hideFooter && <Title text1={'CART'} text2={'TOTAL'}/>}
                {hideFooter && <Title text1={'PRICE'} text2={'DETAILS'} />}
            </div>

            <div className='flex flex-col gap-2 mt-6 text-sm'>

                <div className='flex justify-between'>
                    <p>Subtotal</p>
                    <p>{currency} {getCartAmount()}.00</p>
                </div>

                <hr />

                <div className='flex justify-between'>
                    <p>Shipping Fee</p>
                    <p>{currency} {getCartAmount() === 0 ? 0 : delivery_fee}.00</p>
                </div>

                <hr />

                <div className='flex justify-between'>
                    <b>Total</b>
                    <b>{currency} {getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}.00</b>
                </div>

            </div>
        
        </div>
    )
}

export default CartTotal
