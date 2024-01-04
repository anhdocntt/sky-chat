import React, { useContext, useEffect } from 'react';
import "./UserInfo.css";
import { Avatar, Button, Typography } from 'antd';
import { auth, db } from '../../../firebase/config';
import { collection } from '../../../firebase/collection';
import { AuthContext } from '../../../Context/AuthProvider';

export default function UserInfo() {
  const { user: {
    displayName,
    photoURL
  } } = useContext(AuthContext);

  const handleLogout = () => {
    auth.signOut();
  };

  return (
    <div className='user-info-wrapper'>
      <div className='user-info'>
        <Avatar src={photoURL}>{photoURL ? "" : displayName?.charAt(0).toUpperCase()}</Avatar>
        <Typography.Text>{displayName}</Typography.Text>
      </div>
      <Button className='primary-button' onClick={handleLogout}>Logout</Button>
    </div>
  )
}
