import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from 'presentation/context/authContext';

const PublicRoute: React.FC = () => {
  const user = useContext(AuthContext)
  return user?.currentUser ? <Navigate to="/" /> : <Outlet /> ;
};

export default PublicRoute;
