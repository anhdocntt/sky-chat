import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppProvider from "../Context/AppProvider";
import AuthProvider from "../Context/AuthProvider";
import ChatRoom from "../components/ChatRoom/ChatRoom";
import Login from "../components/Login/Login";
import AddRoomModal from "../components/Modals/AddRoomModal";
import InviteMemberModal from "../components/Modals/InviteMemberModal";
import "./App.css";
import SignUpModal from "../components/Modals/SignUpModal";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<ChatRoom />} />
          </Routes>
          <AddRoomModal />
          <InviteMemberModal />
          <SignUpModal />
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
