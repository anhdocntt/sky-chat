import React from 'react';
import "./ChatWindowContent.css";
import { Button, Form, Input } from 'antd';
import Message from './Message';

export default function ChatWindowContent() {
  return (
    <div>
      <div>
        <Message
          name='Anh Do'
          imageUrl={null}
          text='Hello'
          createAt={Date.now() - 120000}
        />
        <Message
          name='Anh Do 2'
          imageUrl={null}
          text='Hi'
          createAt={Date.now() - 60000}
        />
        <Message
          name='Anh Do'
          imageUrl={null}
          text='Welcome'
          createAt={Date.now()}
        />
      </div>
      <Form>
        <Form.Item>
          <Input placeholder='Type your message...' bordered={false} autoComplete='off' />
        </Form.Item>
        <Button type='primary'>Send</Button>
      </Form>
    </div>
  )
}
