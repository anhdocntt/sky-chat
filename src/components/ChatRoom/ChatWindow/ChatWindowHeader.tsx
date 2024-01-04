import React, { useContext, useMemo } from 'react';
import "./ChatWindowHeader.css";
import { Avatar, Button, Tooltip } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import { AppContext } from '../../../Context/AppProvider';
import { Room } from '../../../interfaces/Room';
import { generateKeywords } from '../../../firebase/service';

export default function ChatWindowHeader() {
  const { members, selectedRoom, setIsInviteMemberVisible } = useContext(AppContext);

  const handleInvite = () => {
    setIsInviteMemberVisible(true);
  }

  return (
    <div className='chat-window-header'>
      <div className='chat-window-header-info'>
        <span className='label'>{selectedRoom?.name}</span>
        <span className='desc'>{selectedRoom?.desc}</span>
      </div>
      <div className='chat-window-header-members'>
        <Button className='primary-button' icon={<UserAddOutlined />} type='text' onClick={handleInvite}>Invite</Button>
        <Avatar.Group size={"small"} maxCount={3}>
          {members.map(member => {
            return (
              <Tooltip title={member.displayName} key={member.id}>
                <Avatar src={member.photoURL}>{member.photoURL ? "" : member.displayName?.charAt(0).toUpperCase()}</Avatar>
              </Tooltip>
            )
          })}
        </Avatar.Group>
      </div>
    </div>
  )
}
