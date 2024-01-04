import { Avatar, Button, Typography } from "antd";
import { useContext } from "react";
import { AuthContext } from "../../../Context/AuthProvider";
import { auth } from "../../../firebase/config";
import "./UserInfo.css";

export default function UserInfo() {
  const {
    user: { displayName, photoURL },
  } = useContext(AuthContext);

  const handleLogout = () => {
    auth.signOut();
  };

  return (
    <div className="user-info-wrapper">
      <div className="user-info">
        <Avatar src={photoURL}>
          {photoURL ? "" : displayName?.charAt(0).toUpperCase()}
        </Avatar>
        <Typography.Text>{displayName}</Typography.Text>
      </div>
      <Button className="primary-button" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
}
