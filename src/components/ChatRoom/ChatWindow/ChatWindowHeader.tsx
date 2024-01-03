import React from 'react';
import "./ChatWindowHeader.css";
import { Avatar, Button, Tooltip } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';

export default function ChatWindowHeader() {
  return (
    <div>
      <div>
        <span>Room 1</span>
        <span>This is room 1</span>
      </div>
      <div>
        <Button icon={<UserAddOutlined />} type='text'>Add</Button>
        <Avatar.Group size={"small"} maxCount={2}>
          <Tooltip title="A">
            <Avatar>A</Avatar>
          </Tooltip>
          <Tooltip title="B">
            <Avatar>B</Avatar>
          </Tooltip>
          <Tooltip title="C">
            <Avatar>C</Avatar>
          </Tooltip>
          <Tooltip title="D">
            <Avatar>D</Avatar>
          </Tooltip>
        </Avatar.Group>
      </div>
    </div>
  )
}
