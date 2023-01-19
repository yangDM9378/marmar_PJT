import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App';
// eslint-disable-next-line
import reportWebVitals from './reportWebVitals';
import Home from './pages/common/Home';
import NotFound from './pages/common/NotFound';
import SignIn from './pages/user/SignIn';
import SpeechTherapyClass from './pages/program/SpeechTherapyClass';
import SuffixTherapyClass from './pages/program/SuffixTherapyClass';
import DoctorMypage from './pages/mypage/DoctorMypage';
import UserMypage from './pages/mypage/UserMypage';
import LoginRequiredPage from './pages/dev/LoginRequiredPage';
import ProtectedRoute from './pages/common/ProtectedRoute';
import LoggedRoute from './pages/common/LoggedRoute';
import SignUpUser from './pages/user/SignUpUser';
import SignUpDoc from './pages/user/SignUpDoc';
import SignUp from './pages/user/SignUp';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // 최상위 경로에서는 App.js를 보여준다.
    errorElement: <NotFound />, // 페이지가 존재하지 않을 경우에는 NotFound.jsx를 보여준다.
    // App이라는 부모 컴포넌트 안에 outlet을 사용하여 children을 보여준다.
    children: [
      { index: true, path: '/', element: <Home /> },
      {
        path: '/SignIn',
        element: (
          <LoggedRoute>
            <SignIn />
          </LoggedRoute>
        ),
      },
      { path: '/SignUp', element: <SignUp /> },
      { path: '/SignUpUser', element: <SignUpUser /> },
      { path: '/SignUpDoc', element: <SignUpDoc /> },
      { path: '/SpeechTherapyClass', element: <SpeechTherapyClass /> },
      { path: '/SuffixTherapyClass', element: <SuffixTherapyClass /> },
      { path: '/DoctorMypage', element: <DoctorMypage /> },
      { path: '/UserMypage', element: <UserMypage /> },
      {
        path: '/LoginRequiredPage',
        element: (
          <ProtectedRoute>
            <LoginRequiredPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
