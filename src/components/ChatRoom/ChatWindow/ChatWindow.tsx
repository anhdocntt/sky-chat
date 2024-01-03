import React, { useContext } from 'react';
import "./ChatWindow.css";
import ChatWindowHeader from './ChatWindowHeader';
import ChatWindowContent from './ChatWindowContent';
import { AppContext } from '../../../Context/AppProvider';

export default function ChatWindow() {
  const { selectedRoom } = useContext(AppContext);

  return (
    <div>
      {selectedRoom
      ? <React.Fragment>
          <ChatWindowHeader />
          <ChatWindowContent />
        </React.Fragment>
      : <div>Please choose room</div>
      }
    </div>
  )
}
