import { Avatar, Typography } from "antd";
import { formatRelative } from "date-fns";
import { useContext, useMemo } from "react";
import { AuthContext } from "../../../Context/AuthProvider";
import "./Message.css";
import { messageType } from "../../../enums/messgaeType";
import FilePreview from "../../FileReview/FileReview";

type MessageParams = {
  uid?: string;
  type: messageType;
  fileURL?: string;
  text: string;
  name?: string | null;
  photoURL?: string | null;
  fileType?: string;
  createAt?: number;
};

export default function Message(props: MessageParams) {
  const {
    user: { uid },
  } = useContext(AuthContext);

  const formatDate = (seconds: number | undefined) => {
    let formattedDate = "";

    if (seconds) {
      formattedDate = formatRelative(new Date(seconds * 1000), new Date());

      formattedDate =
        formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    }

    return formattedDate;
  };

  const isCurrentUser = useMemo(() => {
    return uid === props.uid;
  }, [props.uid, uid]);

  return (
    <div className={`message-wrapper${isCurrentUser ? " current-user" : ""}`}>
      <div className="message-info">
        <Avatar src={props.photoURL}>
          {props.photoURL ? "" : props.name?.charAt(0).toUpperCase()}
        </Avatar>
        <Typography.Text className="label-text">{props.name}</Typography.Text>
        <Typography.Text className="time-text">
          {formatDate(props.createAt)}
        </Typography.Text>
      </div>
      {props.type === messageType.text ? (
        <div className="message-text">
          <Typography.Text>{props.text}</Typography.Text>
        </div>
      ) : (
        <div className="message-text">
          <FilePreview fileURL={props.fileURL} fileType={props.fileType} />
        </div>
      )}
    </div>
  );
}
