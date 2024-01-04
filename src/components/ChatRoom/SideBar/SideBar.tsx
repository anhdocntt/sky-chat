import Logo from "../../../assets/images/logo-small.png";
import RoomList from "./RoomList";
import "./SideBar.css";
import UserInfo from "./UserInfo";

export default function SideBar() {
  return (
    <div className="sidebar-wrapper">
      <UserInfo />
      <RoomList />
      <div className="logo-wrapper">
        <img src={Logo} alt="Sky Chat" className="logo" />
      </div>
    </div>
  );
}
