import React from 'react';
import { Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Navbar from './components/navbar/Navbar';
import Footer from './components/common/Footer';
import SttProvider from './context/SttContext';
import SocketProvider from './context/SocketContext';
import ScrollToTop from './components/scroll/ScrollTop';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider QueryClientProvider client={queryClient}>
      <SocketProvider>
        <SttProvider>
          <ScrollToTop />
          <Navbar />
          <Outlet />
          <Footer />
        </SttProvider>
        <ReactQueryDevtools initialIsOpen />
      </SocketProvider>
    </QueryClientProvider>
  );
}

export default App;
