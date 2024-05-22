import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Pages/Home';
import SignIn from './Components/Pages/SignIn';
import { AuthProvider } from './auth';
import ProtectedRoute from './ProtectedRoute';
import Profile from './Components/Pages/Profile';
import LitterMap from './Components/Pages/LitterMap'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>

  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route index element={<Home/>}/>
        <Route path={'sign-in'} element={<SignIn/>}/>
        <Route path={'littermap'} element={<LitterMap/>}/>
        <Route path={'profile'} element={<ProtectedRoute><Profile/></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);


