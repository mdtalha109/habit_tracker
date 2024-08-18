import AuthContext from 'presentation/context/authContext';
import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';


const PrivateRoute: React.FC = () => {
  const user = useContext(AuthContext)
  return user?.currentUser ? <Outlet /> : <Navigate to="/auth/login" />;
};

export default PrivateRoute;
