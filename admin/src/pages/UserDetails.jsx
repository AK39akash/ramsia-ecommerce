import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom'

const UserDetails = () => {

    const { id } = useParams(); 
    const [data, setData] = useState(null);

    const fetchUser = async () => {

        try {

            const res = await axios.get(
                import.meta.env.VITE_BACKEND_URL + `/api/user/details/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            if (res.data.success) {
                setData(res.data);
            }
            
        } catch (error) {
            console.log(error);
            
        }
        
    };


    useEffect(() => {
        fetchUser();
    }, []);


    if (!data) return <p className='p-6'>Loading...</p>

    const { user, orders } = data;

    const totalSpent = orders.reduce(
        (sum, o) => sum + (o.amount || 0),
        0
    );


    return (
        <div className='p-6 flex flex-col gap-6'>

            {/* USER INFO */}
            <div className="bg-white border p-5 rounded">

                <h2 className='text-lg font-semibold mb-4'>
                    User Details
                </h2>

                <div className="grid grid-cols-2 gap-4 text-sm">

                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Phone:</strong> {user.phone || "-"}</p>
                    <p><strong>Joined:</strong> {new Date(user.createdAt).toDateString()}</p>

                </div>

            </div>

            {/* SUMMARY */}
            <div className="bg-white border p-5 rounded flex gap-10">

                <div>
                    <p className='text-gray-500 text-sm'>Total Orders</p>
                    <p className='text-xl font-semibold'>{orders.length}</p>
                </div>

                <div>
                    <p className='text-gray-500 text-sm'>Total Spent</p>
                    <p className='text-xl font-semibold'>₹{totalSpent}</p>
                </div>

            </div>

            {/* ORDERS */}
            <div className='bg-white border p-5 rounded'>

                <h2 className='text-lg font-semibold mb-4'>
                    Orders
                </h2>

                {orders.length === 0 ? (
                    <p className='text-gray-500'>No Orders</p>
                ) : (
                    <div className="flex flex-col gap-4">

                        {orders.map((order) => (
                            <div
                                key={order._id}
                                className='border p-4 flex justify-between items-center'
                            >

                                <div>
                                    <p className='text-sm font-medium'>
                                        Order ID: {order._id}
                                    </p>

                                    <p className='text-xs text-gray-500'>
                                        {new Date(order.createdAt).toDateString()}
                                    </p>
                                </div>

                                <div className='text-right'>
                                    <p className='text-sm font-medium'>
                                        ₹{order.amount}
                                    </p>
                                    <p className='text-xs text-gray-500'>
                                        {order.status}
                                    </p>
                                </div>

                            </div>
                        ))}

                    </div>
                )}

            </div>
        
        </div>
    )
}

export default UserDetails
