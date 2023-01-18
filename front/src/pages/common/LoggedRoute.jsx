/* eslint-disable react/prop-types */
import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../../hooks/queries/useAuth';

export default function LoggedRoute({ children }) {
  const { useUserCheck } = useAuth();
  const { data: user } = useUserCheck();
  if (user) {
    return <Navigate to="/" replace />;
  }
  return children;
}
