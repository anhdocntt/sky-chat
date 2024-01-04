export interface Message {
  id?: string;
  text: string;
  uid?: string;
  displayName?: string | null;
  photoURL?: string | null;
  roomId: string;
  createdAt?: any;
}
