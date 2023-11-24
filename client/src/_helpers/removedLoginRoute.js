import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';


export default function RemoveLoginRoute() {
    const { isAuthenticated } = useSelector((state) => state.auth);

    if(isAuthenticated) return <Navigate to="/" />

    // authorized so return outlet for child routes
    return <Outlet />;
}