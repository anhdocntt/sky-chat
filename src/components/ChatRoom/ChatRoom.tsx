import { Col, Row } from "antd";
import "./ChatRoom.css";
import SideBar from "./SideBar/SideBar";
import ChatWindow from "./ChatWindow/ChatWindow";

export default function ChatRoom() {
  return (
    <div className="chat-room-wrapper">
      <Row>
        <Col span={6}>
          <SideBar />
        </Col>
        <Col span={18}>
          <ChatWindow />
        </Col>
      </Row>
    </div>
  )
}
