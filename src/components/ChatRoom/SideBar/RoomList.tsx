import { PlusSquareOutlined } from "@ant-design/icons";
import { Button, Collapse, Typography } from "antd";
import { useContext } from "react";
import { AppContext } from "../../../Context/AppProvider";
import "./RoomList.css";

const { Panel } = Collapse;

export default function RoomList() {
  const { rooms, setIsAddRoomVisible, setSelectedRoomId } =
    useContext(AppContext);

  const handleRoomClick = (roomId: string | undefined) => {
    roomId && setSelectedRoomId(roomId);
  };

  const handleOpenAddRoomModal = () => {
    setIsAddRoomVisible(true);
  };

  return (
    <Collapse className="room-list-wrapper" defaultActiveKey={["listRooms"]}>
      <Panel key={"listRooms"} header={"List of chat rooms"}>
        {rooms.map((room) => {
          return (
            <Typography.Link
              key={room.id}
              onClick={() => handleRoomClick(room.id)}
            >
              {room.name}
            </Typography.Link>
          );
        })}
        <Button
          className="primary-button"
          type="text"
          icon={<PlusSquareOutlined />}
          onClick={handleOpenAddRoomModal}
        >
          Add room
        </Button>
      </Panel>
    </Collapse>
  );
}
