import React from 'react'
import { Outlet, Navigate } from 'react-router-dom';
import useAuth from "../utils/AuthContext";

const ProtectedRoute = () => {
    const { user } = useAuth();
    
    return user.loggedIn && user.role === "Admin" ? <Outlet /> : <Navigate to="/AddBarber" />
}

export default ProtectedRoute;