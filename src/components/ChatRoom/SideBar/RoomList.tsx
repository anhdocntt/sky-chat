import React from 'react';
import "./RoomList.css";
import { Button, Collapse, Typography } from 'antd';
import { PlusSquareOutlined } from '@ant-design/icons';

const { Panel } = Collapse;

export default function RoomList() {
  return (
    <Collapse defaultActiveKey={["listRooms"]}>
      <Panel key={"listRooms"} header={"List of chat rooms"}>
        <Typography.Link>Room 1</Typography.Link>
        <Typography.Link>Room 2</Typography.Link>
        <Typography.Link>Room 3</Typography.Link>
        <Button type='text' icon={<PlusSquareOutlined />}>Add room</Button>
      </Panel>
    </Collapse>
  )
}
