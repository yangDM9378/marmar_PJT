import React from 'react';
import { Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Navbar from './components/navbar/Navbar';
import Footer from './components/common/Footer';
import SttProvider from './context/SttContext';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider QueryClientProvider client={queryClient}>
      <SttProvider>
        <Navbar />
        <div className="min-h-[70vh] mt-14">
          <Outlet />
        </div>
        <Footer />
      </SttProvider>
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  );
}

export default App;
