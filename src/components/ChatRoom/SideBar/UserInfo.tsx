import React from 'react';
import "./UserInfo.css";
import { Avatar, Button, Typography } from 'antd';

export default function UserInfo() {
  return (
    <div>
      <div>
        <Avatar>A</Avatar>
        <Typography.Text>Anh Do</Typography.Text>
      </div>
      <Button>Logout</Button>
    </div>
  )
}
