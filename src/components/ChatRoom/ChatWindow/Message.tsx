import React from 'react';
import "./Message.css";
import { Avatar, Typography } from 'antd';
import { formatRelative } from "date-fns";

type MessageParams = {
  text: string;
  name?: string | null;
  photoURL?: string | null;
  createAt?: number;
}

export default function Message(props: MessageParams) {
  const formatDate = (seconds: number | undefined) => {
    let formattedDate = '';

    if (seconds) {
      formattedDate = formatRelative(new Date(seconds * 1000), new Date());

      formattedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    }

    return formattedDate;
  }

  return (
    <div>
      <div>
        <Avatar src={props.photoURL}>
          {props.photoURL ? "" : props.name?.charAt(0).toUpperCase()}
        </Avatar>
        <Typography.Text>{props.name}</Typography.Text>
        <Typography.Text>{formatDate(props.createAt)}</Typography.Text>
      </div>
      <div>
        <Typography.Text>{props.text}</Typography.Text>
      </div>
    </div>
  )
}
