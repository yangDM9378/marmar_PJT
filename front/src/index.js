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
import TherapistMypage from './pages/mypage/TherapistMypage';
import StudentMypage from './pages/mypage/StudentMypage';
import LoginRequiredPage from './pages/dev/LoginRequiredPage';
import OpenVidu from './pages/onClass/OpenVidu';
import ProtectedRoute from './pages/common/ProtectedRoute';
import LoggedRoute from './pages/common/LoggedRoute';
import SignUpStudent from './pages/user/SignUpStudent';
import SignUpTherapist from './pages/user/SignUpTherapist';
import SignUp from './pages/user/SignUp';
import registerServiceWorker from './registerServiceWorker';
import ClockDifficulty from './pages/program/clock/ClockDifficulty';
import ClockProgram from './pages/program/clock/ClockProgram';
import WordDifficulty from './pages/program/word/WordDifficulty';
import WordProgram from './pages/program/word/WordProgram';
import PictureDifficulty from './pages/program/picture/PictureDifficulty';
import PictureProgram from './pages/program/picture/PictureProgram';
import FindId from './pages/user/FindId';
import FindPw from './pages/user/FindPw';
import Program from './pages/onClass/Program';
import ProtectedRouteTherapist from './pages/common/ProtectedRouteTherapist';
import ProtectedRouteStudent from './pages/common/ProtectedRouteStudent';
import Evaluation from './components/onClass/evaluation/Evaluation';
import Info from './pages/common/Info';
import StudentClassEnd from './pages/onClass/StudentClassEnd';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // 최상위 경로에서는 App.js를 보여준다.
    errorElement: <NotFound />, // 페이지가 존재하지 않을 경우에는 NotFound.jsx를 보여준다.
    // App이라는 부모 컴포넌트 안에 outlet을 사용하여 children을 보여준다.
    children: [
      // Home
      { index: true, path: '/', element: <Home /> },
      // Info
      { path: '/Info', element: <Info /> },
      // Login
      {
        path: '/SignIn',
        element: (
          <LoggedRoute>
            <SignIn />
          </LoggedRoute>
        ),
      },
      {
        path: '/Login/FindId',
        element: (
          <LoggedRoute>
            <FindId />
          </LoggedRoute>
        ),
      },
      {
        path: '/Login/FindPw',
        element: (
          <LoggedRoute>
            <FindPw />
          </LoggedRoute>
        ),
      },
      {
        path: '/LoginRequiredPage',
        element: (
          <ProtectedRoute>
            <LoginRequiredPage />
          </ProtectedRoute>
        ),
      },

      // Sign up
      { path: '/SignUp', element: <SignUp /> },
      { path: '/SignUpStudent', element: <SignUpStudent /> },
      { path: '/SignUpTherapist', element: <SignUpTherapist /> },

      // My page
      {
        path: '/TherapistMypage',
        element: (
          <ProtectedRouteTherapist>
            <TherapistMypage />
          </ProtectedRouteTherapist>
        ),
      },
      {
        path: '/StudentMypage',
        element: (
          <ProtectedRouteStudent>
            <StudentMypage />
          </ProtectedRouteStudent>
        ),
      },

      // Openvidu
      {
        path: '/OpenVidu',
        element: (
          <ProtectedRoute>
            <OpenVidu />
          </ProtectedRoute>
        ),
      },
      {
        path: '/StudentClassEnd',
        element: (
          <ProtectedRouteStudent>
            <StudentClassEnd />
          </ProtectedRouteStudent>
        ),
      },

      // Program
      { path: '/Program', element: <Program /> },
      { path: '/WordDifficulty', element: <WordDifficulty /> },
      { path: '/WordProgram', element: <WordProgram /> },
      { path: '/ClockDifficulty', element: <ClockDifficulty /> },
      { path: '/ClockProgram', element: <ClockProgram /> },
      { path: '/PictureDifficulty', element: <PictureDifficulty /> },
      { path: '/PictureProgram', element: <PictureProgram /> },

      // Evaluation
      { path: '/Evaluation', element: <Evaluation /> },
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router} />);
// registerServiceWorker();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
