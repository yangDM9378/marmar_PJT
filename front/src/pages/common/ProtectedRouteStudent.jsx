import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../../hooks/queries/useAuth';

export default function ProtectedRouteStudent({ children }) {
  const { useStudentCheck } = useAuth();
  const { data: student } = useStudentCheck();
  if (!student) {
    return <Navigate to="/" replace />;
  }
  return children;
}
