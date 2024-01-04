import { SendOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { AppContext } from "../../../Context/AppProvider";
import { AuthContext } from "../../../Context/AuthProvider";
import { collection } from "../../../firebase/collection";
import { addDocument } from "../../../firebase/service";
import useFirestore from "../../../hooks/useFirestore";
import { Message as IMessage } from "../../../interfaces/Message";
import "./ChatWindowContent.css";
import Message from "./Message";

export default function ChatWindowContent() {
  const { user } = useContext(AuthContext);
  const { selectedRoomId } = useContext(AppContext);

  const [inputValue, setInputValue] = useState<string>("");
  const [form] = Form.useForm();
  const contentRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value?.trim());
  };

  const handleOnSubmit = () => {
    if (!inputValue) return;

    const messageData: IMessage = {
      uid: user.uid,
      text: inputValue,
      displayName: user.displayName,
      photoURL: user.photoURL,
      roomId: selectedRoomId,
    };
    addDocument(collection.messages, messageData);

    setInputValue("");
    form.resetFields(["message"]);
  };

  const messagesCondition = useMemo(() => {
    return {
      fieldPath: "roomId",
      opStr: "==",
      value: selectedRoomId,
    };
  }, [selectedRoomId]);

  const messages: IMessage[] = useFirestore(
    collection.messages,
    messagesCondition
  );

  useEffect(() => {
    setTimeout(() => {
      if (contentRef.current) {
        contentRef.current.scrollIntoView({
          behavior: "smooth",
          block: "end",
          inline: "nearest",
        });
      }
    }, 0);
  }, [messages]);

  return (
    <div className="chat-window-content">
      <div className="chat-window-messages">
        {messages.map((message) => {
          return (
            <Message
              key={message.id}
              uid={message.uid}
              name={message.displayName}
              photoURL={message.photoURL}
              text={message.text}
              createAt={message.createdAt?.seconds}
            />
          );
        })}
        <div ref={contentRef} />
      </div>
      <Form className="chat-window-content-button" form={form}>
        <Form.Item name="message">
          <Input
            autoFocus
            placeholder="Type your message..."
            autoComplete="off"
            onChange={handleInputChange}
            onPressEnter={handleOnSubmit}
          />
        </Form.Item>
        <Button
          className="primary-button"
          type="primary"
          icon={<SendOutlined />}
          onClick={handleOnSubmit}
        />
      </Form>
    </div>
  );
}
