import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Pages/Home';
import SignIn from './Components/Pages/SignIn';
// import { AuthProvider } from './auth';
import ProtectedRoute from './ProtectedRoute';
import Profile from './Components/Pages/Profile';
import LitterMap from './Components/Pages/LitterMap'
import StaffList from './Components/Pages/StaffList';
import { AuthProvider } from './authContext'; 

import supabase from './supabase';
// @ts-ignore
// import { Provider } from 'react-supabase'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>

  // <Provider value={supabase}>
  <AuthProvider> 
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home/>}/>
          <Route path={'sign-in'} element={<SignIn/>}/>
          <Route path={'littermap'} element={<LitterMap/>}/>
          <Route path={'staffList'} element={<StaffList/>}/>
          {/* <Route path={'profile'} element={<ProtectedRoute><Profile/></ProtectedRoute>} /> */}
          <Route path={'profile'} element={<Profile/>} />
        </Routes>
      </BrowserRouter>
    </>
  </AuthProvider> 
  // </Provider>
);


