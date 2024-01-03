import React from 'react';
import './App.css';
import Login from '../components/Login/Login';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import ChatRoom from '../components/ChatRoom/ChatRoom';
import AuthProvider from '../Context/AuthProvider';
import AppProvider from '../Context/AppProvider';
import AddRoomModal from '../components/Modals/AddRoomModal';
import InviteMemberModal from '../components/Modals/InviteMemberModal';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/' element={<ChatRoom />} />
          </Routes>
          <AddRoomModal />
          <InviteMemberModal />
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
