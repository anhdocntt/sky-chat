import React from 'react';
import "./SideBar.css";
import { Col, Row } from 'antd';
import UserInfo from './UserInfo';
import RoomList from './RoomList';

export default function SideBar() {
  return (
    <Row>
      <Col span={24}>
        <UserInfo />
      </Col>
      <Col span={24}>
        <RoomList />
      </Col>
    </Row>
  )
}
