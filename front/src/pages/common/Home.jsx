import React from 'react';
import useAuth from '../../hooks/queries/useAuth';

export default function Home() {
  const { useUserCheck } = useAuth();
  const { data: user } = useUserCheck();

  return (
    <div>
      Home <div>{user && user.name}</div>
    </div>
  );
}
