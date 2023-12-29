import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { history } from './history';

// export { PrivateRoute };

export default function PrivateRoute() {
    const { isAuthenticated } = useSelector((state) => state.auth);
   

    if (!isAuthenticated) {
        // not logged in so redirect to login page with the return url
        return <Navigate login={true} to="/auth/login" state={{ from: history.location }} />
    }
    

    // authorized so return outlet for child routes
    return <Outlet />;
}