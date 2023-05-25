import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectUsers } from '../redux/slices/usersSlice';

type ProctectedRouteElementProps = {
  element: any;
};

const ProctectedRouteElement: React.FC<ProctectedRouteElementProps> = ({ element: Component }) => {
  const { loggedIn } = useSelector(selectUsers);
  return loggedIn ? <Component /> : <Navigate to="/" />;
};

export default ProctectedRouteElement;
