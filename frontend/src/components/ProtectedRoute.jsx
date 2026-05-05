import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const ProtectedRoute = () => {
    const { token } = useContext(ShopContext);

    // If there's no token in context or local storage, redirect to login
    if (!token && !localStorage.getItem('token')) {
        return <Navigate to="/login" replace />;
    }

    // Otherwise, render the child routes
    return <Outlet />;
};

export default ProtectedRoute;
