import React from 'react';
import "./ChatWindow.css";
import ChatWindowHeader from './ChatWindowHeader';
import ChatWindowContent from './ChatWindowContent';

export default function ChatWindow() {
  return (
    <div>
      <ChatWindowHeader />
      <ChatWindowContent />
    </div>
  )
}
