import { Avatar, Typography } from "antd";
import { formatRelative } from "date-fns";
import { useContext, useMemo } from "react";
import { AuthContext } from "../../../Context/AuthProvider";
import { messageType } from "../../../enums/messgaeType";
import { Message as IMessage } from "../../../interfaces/Message";
import FilePreview from "../../FileReview/FileReview";
import "./Message.css";

type MessageParams = {
  message: IMessage;
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
    return uid === props.message.uid;
  }, [props.message.uid, uid]);

  return (
    <div className={`message-wrapper${isCurrentUser ? " current-user" : ""}`}>
      <div className="message-info">
        <Avatar src={props.message.photoURL}>
          {props.message.photoURL
            ? ""
            : props.message.displayName?.charAt(0).toUpperCase()}
        </Avatar>
        <Typography.Text className="label-text">
          {props.message.displayName}
        </Typography.Text>
        <Typography.Text className="time-text">
          {formatDate(props.message.createdAt?.seconds)}
        </Typography.Text>
      </div>
      {props.message.type === messageType.text ? (
        <div className="message-text">
          <Typography.Text>{props.message.text}</Typography.Text>
        </div>
      ) : (
        <div className="message-text message-file">
          <FilePreview
            fileURL={props.message.fileURL}
            fileType={props.message.fileType}
            fileName={props.message.fileName}
          />
        </div>
      )}
    </div>
  );
}
