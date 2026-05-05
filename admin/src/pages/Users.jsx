import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Users = () => {

    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    const fetchUsers = async () => {

        try {

            const res = await axios.get(
                import.meta.env.VITE_BACKEND_URL + "/api/user/all-users",
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            if (res.data.success) {
                setUsers(res.data.users);
            }
            
        } catch (error) {
            console.log(error);
        }
        
    };


    useEffect(() => {
        fetchUsers();
    }, []);


    return (
        <div className='p-6'>

            <h2 className='text-2xl font-bold mb-6'>
                All Users
            </h2>

            {/* TABLE */}
            <div className="bg-white border border-gray-200">

                {/* HEADER */}
                <div className="grid grid-cols-5 bg-gray-100 p-3 text-sm font-medium">
                    <p className='flex justify-center'>Name</p>
                    <p className='flex justify-center'>Email</p>
                    <p className='flex justify-center'>Phone</p>
                    <p className='flex justify-center'>Joined</p>
                    <p className='flex items-center justify-center'>Actions</p>
                </div>

                {/* USERS */}
                {users.map((user) => (

                    <div
                        key={user._id}
                        className='grid grid-cols-5 p-3 text-sm border-t'
                    >
                        <p className='flex justify-center'>{user.name}</p>
                        <p className='flex justify-center'>{user.email}</p>
                        <p className='flex justify-center'>{user.phone || "-"}</p>
                        <p className='flex justify-center'>{new Date(user.createdAt).toDateString()}</p>

                        <button 
                            onClick={() => navigate(`/users/${user._id}`)}
                            className='text-blue-500 hover:underline cursor-pointer'
                        >
                            View
                        </button>

                    </div>

                ))}

            </div>
        
        </div>
    )
}

export default Users
