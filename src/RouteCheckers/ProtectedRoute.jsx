import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const ProtectedRoute = ({ redirectTo }) => {
  const { currentuser } = useAuth();
  return currentuser ? <Outlet /> : <Navigate to={redirectTo} />;
};

export default ProtectedRoute;
