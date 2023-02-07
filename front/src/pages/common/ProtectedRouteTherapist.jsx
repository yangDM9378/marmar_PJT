import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRouteTherapist({ children }) {
  if (!localStorage.getItem('therapist')) {
    return <Navigate to="/" replace />;
  }
  return children;
}
