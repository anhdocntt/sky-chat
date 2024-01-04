import React, { useContext, useMemo, useState } from 'react';
import "./ChatWindowContent.css";
import { Button, Form, Input } from 'antd';
import Message from './Message';
import { AuthContext } from '../../../Context/AuthProvider';
import { AppContext } from '../../../Context/AppProvider';
import { Message as IMessage } from '../../../interfaces/Message';
import { addDocument } from '../../../firebase/service';
import { collection } from '../../../firebase/collection';
import useFirestore from '../../../hooks/useFirestore';

export default function ChatWindowContent() {
  const { user } = useContext(AuthContext);
  const { selectedRoomId } = useContext(AppContext);

  const [inputValue, setInputValue] = useState<string>("");
  const [form] = Form.useForm();

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const handleOnSubmit = () => {
    const messageData: IMessage = {
      uid: user.uid,
      text: inputValue,
      displayName: user.displayName,
      photoURL: user.photoURL,
      roomId: selectedRoomId,
    }
    addDocument(collection.messages, messageData);

    form.resetFields(["message"]);
  };

  const messagesCondition = useMemo(() => {
    return {
      fieldPath: "roomId",
      opStr: "==",
      value: selectedRoomId,
    }
  }, [selectedRoomId]);

  const messages: IMessage[] = useFirestore(collection.messages, messagesCondition);

  return (
    <div>
      <div>
        {messages.map(message => {
          return (
            <Message
              key={message.id}
              name={message.displayName}
              photoURL={message.photoURL}
              text={message.text}
              createAt={message.createdAt?.seconds}
            />
          )
        })}
      </div>
      <Form form={form}>
        <Form.Item name="message">
          <Input
            placeholder='Type your message...'
            bordered={false}
            autoComplete='off'
            onChange={handleInputChange}
            onPressEnter={handleOnSubmit}
          />
        </Form.Item>
        <Button type='primary' onClick={handleOnSubmit}>Send</Button>
      </Form>
    </div>
  )
}
