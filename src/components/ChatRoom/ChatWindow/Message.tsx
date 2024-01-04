import React, { useContext, useMemo } from 'react';
import "./Message.css";
import { Avatar, Typography } from 'antd';
import { formatRelative } from "date-fns";
import { AuthContext } from '../../../Context/AuthProvider';

type MessageParams = {
  uid?: string;
  text: string;
  name?: string | null;
  photoURL?: string | null;
  createAt?: number;
}

export default function Message(props: MessageParams) {
  const { user: { uid } } = useContext(AuthContext);

  const formatDate = (seconds: number | undefined) => {
    let formattedDate = '';

    if (seconds) {
      formattedDate = formatRelative(new Date(seconds * 1000), new Date());

      formattedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    }

    return formattedDate;
  }

  const isCurrentUser = useMemo(() => {
    return uid === props.uid;
  }, [props.uid, uid]);

  return (
    <div className={`message-wrapper${isCurrentUser ? " current-user" : ""}`}>
      <div className='message-info'>
        <Avatar src={props.photoURL}>
          {props.photoURL ? "" : props.name?.charAt(0).toUpperCase()}
        </Avatar>
        <Typography.Text className='label-text'>{props.name}</Typography.Text>
        <Typography.Text className='time-text'>{formatDate(props.createAt)}</Typography.Text>
      </div>
      <div className='message-text'>
        <Typography.Text>{props.text}</Typography.Text>
      </div>
    </div>
  )
}
