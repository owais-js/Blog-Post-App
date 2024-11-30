import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const PublicRoute = ({ redirectTo }) => {
  const { currentuser } = useAuth();
  return currentuser ? <Navigate to={redirectTo} /> : <Outlet />;
};

export default PublicRoute;
