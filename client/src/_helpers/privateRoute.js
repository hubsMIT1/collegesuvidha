import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { history } from './history';

// export { PrivateRoute };

export default function PrivateRoute() {
    const { isAuthenticated } = useSelector((state) => state.auth);
    const {userData} = useSelector((state)=>state.user)
    console.log(userData?.isAdmin)

    if (!isAuthenticated && !userData.isAdmin) {
        // not logged in so redirect to login page with the return url
        return <Navigate to="/" />
    }
    

    // authorized so return outlet for child routes
    return <Outlet />;
}