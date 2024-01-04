import { useContext } from "react";
import { useMedia } from "react-use";
import { AppContext } from "../../Context/AppProvider";
import "./ChatRoom.css";
import ChatWindow from "./ChatWindow/ChatWindow";
import SideBar from "./SideBar/SideBar";

export default function ChatRoom() {
  const { tab } = useContext(AppContext);
  const isSmall = useMedia("(max-width: 768px)");

  return (
    <div className="chat-room-wrapper">
      {(!isSmall || tab === 0) && <SideBar />}
      {(!isSmall || tab === 1) && <ChatWindow />}
    </div>
  );
}
