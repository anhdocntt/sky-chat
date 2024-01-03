import React from 'react';
import './App.css';
import Login from '../Login/Login';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import ChatRoom from '../ChatRoom/ChatRoom';
import AuthProvider from '../../Context/AuthProvider';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<ChatRoom />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
