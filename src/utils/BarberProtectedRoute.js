import React from 'react'
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from "../utils/AuthContext";

const ProtectedRoute = () => {
    const { user } = useAuth();
    
    return user.loggedIn ? <Outlet /> : <Navigate to="/singleAppointment" />
}

export default ProtectedRoute;