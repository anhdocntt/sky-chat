import { ArrowLeftOutlined, UserAddOutlined } from "@ant-design/icons";
import { Avatar, Button, Tooltip } from "antd";
import { useContext } from "react";
import { useMedia } from "react-use";
import { AppContext } from "../../../Context/AppProvider";
import "./ChatWindowHeader.css";

export default function ChatWindowHeader() {
  const { members, selectedRoom, setIsInviteMemberVisible, setTab } =
    useContext(AppContext);
  const isSmall = useMedia("(max-width: 768px)");

  const handleInvite = () => {
    setIsInviteMemberVisible(true);
  };

  return (
    <div className="chat-window-header">
      <div className="chat-window-header-left">
        {isSmall && (
          <Button
            icon={<ArrowLeftOutlined />}
            className="back-icon"
            onClick={() => setTab(0)}
          />
        )}
        <div className="chat-window-header-info">
          <span className="label">{selectedRoom?.name}</span>
          <span className="desc">{selectedRoom?.desc}</span>
        </div>
      </div>
      <div className="chat-window-header-members">
        <Button
          className="primary-button"
          icon={<UserAddOutlined />}
          type="text"
          onClick={handleInvite}
        >
          Invite
        </Button>
        <Avatar.Group size={"small"} maxCount={3}>
          {members.map((member) => {
            return (
              <Tooltip title={member.displayName} key={member.id}>
                <Avatar src={member.photoURL}>
                  {member.photoURL
                    ? ""
                    : member.displayName?.charAt(0).toUpperCase()}
                </Avatar>
              </Tooltip>
            );
          })}
        </Avatar.Group>
      </div>
    </div>
  );
}
