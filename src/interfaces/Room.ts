export interface Room {
  id?: string;
  name: string;
  desc: string;
  members: (string | undefined)[];
}