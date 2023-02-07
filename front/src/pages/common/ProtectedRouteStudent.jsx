import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRouteStudent({ children }) {
  if (!localStorage.getItem('student')) {
    return <Navigate to="/" replace />;
  }
  return children;
}
