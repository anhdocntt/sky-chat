import { messageType } from "../enums/messgaeType";

export interface Message {
  id?: string;
  text: string;
  uid?: string;
  displayName?: string | null;
  photoURL?: string | null;
  roomId: string;
  type: messageType;
  fileType?: string;
  fileURL?: string;
  createdAt?: any;
}
