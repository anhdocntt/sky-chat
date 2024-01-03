import React from 'react';
import "./Message.css";
import { Avatar, Typography } from 'antd';
import { format } from "date-fns";

type MessageParams = {
  text: string;
  name: string;
  imageUrl: string | null;
  createAt: number;
}

export default function Message(props: MessageParams) {
  return (
    <div>
      <div>
        <Avatar src={props.imageUrl}>A</Avatar>
        <Typography.Text>{props.name}</Typography.Text>
        <Typography.Text>{format(props.createAt, "HH:mm")}</Typography.Text>
      </div>
      <div>
        <Typography.Text>{props.text}</Typography.Text>
      </div>
    </div>
  )
}
