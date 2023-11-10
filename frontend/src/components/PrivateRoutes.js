import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux/es/hooks/useSelector';

const PrivateRoutes = () => {

    const { userInfo } = useSelector(state => state.auth);

    return (
        <>
            {
                userInfo ? (<Outlet />) : (<Navigate to={'/login'} replace></Navigate>)
            }
        </>

    )
}

export default PrivateRoutes
