import { FileImageOutlined, SendOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { AppContext } from "../../../Context/AppProvider";
import { AuthContext } from "../../../Context/AuthProvider";
import { collection } from "../../../enums/collection";
import { addDocument } from "../../../firebase/service";
import useFirestore from "../../../hooks/useFirestore";
import { Message as IMessage } from "../../../interfaces/Message";
import "./ChatWindowContent.css";
import Message from "./Message";
import { storage } from "../../../firebase/config";
import { messageType } from "../../../enums/messgaeType";

export default function ChatWindowContent() {
  const { user } = useContext(AuthContext);
  const { selectedRoomId } = useContext(AppContext);

  const [inputValue, setInputValue] = useState<string>("");
  const [form] = Form.useForm();
  const contentRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value?.trim());
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    handleUpload(file);
  };

  const handleUpload = (file: any) => {
    if (!file) return;

    const storageRef = storage.ref();
    const fileRef = storageRef.child(`${Date.now()}_${file.name}`);
    fileRef.put(file).then(() => {
      fileRef.getDownloadURL().then((url: string) => {
        const messageData: IMessage = {
          uid: user.uid,
          text: "",
          displayName: user.displayName,
          photoURL: user.photoURL,
          type: messageType.file,
          fileType: file.type,
          fileURL: url,
          fileName: file.name,
          roomId: selectedRoomId,
        };
        addDocument(collection.messages, messageData);
      });
    });
  };

  const handleUploadFile = () => {
    fileInputRef.current?.click();
  };

  const handleOnSubmit = () => {
    if (!inputValue) return;

    const messageData: IMessage = {
      uid: user.uid,
      text: inputValue,
      displayName: user.displayName,
      photoURL: user.photoURL,
      type: messageType.text,
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
    messagesCondition,
    1000
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
          return <Message key={message.id} message={message} />;
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
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <Button
          className="primary-button"
          type="primary"
          icon={<FileImageOutlined />}
          onClick={handleUploadFile}
        />
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
