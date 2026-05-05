import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';
import { assets } from '../assets/admin_assets/assets';

const Orders = ({token}) => {

  const [orders, setOrders] = useState([]);


  const fetchAllOrders = async () => {

    if (!token) {
      return null;
    }

    try {

      const response = await axios.get(
        backendUrl + '/api/order/list',
        {}, 
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        } 
      );

      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
      
      
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
    
  }


  // ORDER STATUS
  const statusHandler = async (e, orderId) => {

    try {

      const response = await axios.put(
        backendUrl + '/api/order/status', 
        {orderId, status: e.target.value}, 
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        } 
      );

      if (response.data.success) {
        await fetchAllOrders();
      }
      
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
    
  }


  const paymentStatusHandler = async (e, orderId) => {

    try {

      const response = await axios.post(
        backendUrl + '/api/order/status',
        { orderId, paymentStatus: e.target.value },
        { 
          headers: { 
            Authorization: `Bearer ${token}`
          } 
        }
      );

      if (response.data.success) {
        await fetchAllOrders();
      }
      
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
    
  }


  useEffect(() => {
    if (token) fetchAllOrders();
  }, [token]);


  return (
    <div className='p-4'>

      <h2 className='text-2xl font-bold mb-4'>Orders</h2>

      <div className='flex flex-col gap-4'>

        {
          orders.map((order) => (

            <div 
              key={order._id}
              className='bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition'
            >

              {/* TOP */}
              <div className="flex justify-between items-center mb-3">

                <div className="flex items-center gap-3">

                  <img className='w-12' src={assets.parcel_icon} alt="" />
                  <div>
                    <p className='font-medium text-sm'>
                      Order ID: {order._id}
                    </p>
                    <p className='text-xs text-gray-500'>
                      {new Date(order.date).toLocaleDateString()}
                    </p>
                  </div>

                </div>

                <div className="flex flex-col items-center justify-center gap-1 text-right">

                  <p className='font-semibold text-sm'>
                    {currency}{order.amount}
                  </p>

                  <p className='text-xs bg-gray-200 px-2 py-1 rounded font-semibold'>
                    {order.paymentMethod}
                  </p>

                </div>

              </div>
              

              {/* ITEMS */}
              <div className="text-sm mb-3">
                {order.items.map((item, i) => (
                  <p key={i}>
                    {item.name} x {item.quantity} ({item.size})
                  </p>
                ))}
              </div>

              {/* CUSTOMER */}
              <div className='text-sm text-gray-600 mb-3'>
                <p className='font-medium'>{order.address.fullname}</p>
                <p>
                  {order.address.addressLine1}, {order.address.city}, {order.address.state}
                </p>
                <p>{order.address.phone}</p>
              </div>

              

              <div className="grid grid-cols-2 gap-3">

                  {/* ORDER STATUS */}
                  <select 
                    value={order.status} 
                    onChange={(e) => statusHandler(e, order._id)} 
                    className='p-2 border rounded-md text-sm'
                  >
                    <option value="Order Placed">Order Placed</option>
                    <option value="Processing">Processing</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Out for delivery">Out for delivery</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="Return Requested">Return Requested</option>
                    <option value="Return Approved">Return Approved</option>
                    <option value="Returned">Returned</option>
                  </select>

                  {/* PAYMENT STATUS */}
                  <select 
                    value={order.paymentStatus} 
                    onChange={(e) => paymentStatusHandler(e, order._id)} 
                    className='p-2 border rounded-md text-sm'
                  >
                    <option value="Pending">Pending</option>
                    <option value="Paid">Paid</option>
                    <option value="Failed">Failed</option>
                    <option value="Refunded">Refunded</option>
                  </select>

              </div>


            </div>
          ))
        }
      </div>
      
    </div>
  )
}

export default Orders
