import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../../hooks/queries/useAuth';

export default function ProtectedRouteTherapist({ children }) {
  const { useTherapistCheck } = useAuth();
  const { data: therapist } = useTherapistCheck();
  if (!therapist) {
    return <Navigate to="/" replace />;
  }
  return children;
}
