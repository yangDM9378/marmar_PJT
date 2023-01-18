import React from 'react';
import { Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Navbar from './components/navbar/Navbar';
import Footer from './components/common/Footer';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider QueryClientProvider client={queryClient}>
      <Navbar />
      <Outlet />
      <Footer />
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  );
}

export default App;
