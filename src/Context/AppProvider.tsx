import React, { useContext, useMemo, useState } from "react";
import { collection } from "../firebase/collection";
import useFirestore from "../hooks/useFirestore";
import { Room } from "../interfaces/Room";
import { AuthContext } from "./AuthProvider";
import { User } from "../interfaces/User";

interface AppProviderProps {
  children: React.ReactNode;
}

interface AppContextProps {
  rooms: Room[];
  members: User[];
  isAddRoomVisible: boolean;
  setIsAddRoomVisible: (isAddRoomVisible: boolean) => void;
  isInviteMemberVisible: boolean;
  setIsInviteMemberVisible: (isInviteMemberVisible: boolean) => void;
  selectedRoomId: string;
  setSelectedRoomId: (selectedRoomId: string) => void;
  selectedRoom: Room | undefined;
}

export const AppContext = React.createContext<AppContextProps>({
  rooms: [],
  members: [],
  isAddRoomVisible: false,
  setIsAddRoomVisible: () => {},
  isInviteMemberVisible: false,
  setIsInviteMemberVisible: () => {},
  selectedRoomId: "",
  setSelectedRoomId: () => {},
  selectedRoom: undefined,
});

export default function AppProvider(props: AppProviderProps) {
  const [isAddRoomVisible, setIsAddRoomVisible] = useState<boolean>(false);
  const [isInviteMemberVisible, setIsInviteMemberVisible] =
    useState<boolean>(false);
  const [selectedRoomId, setSelectedRoomId] = useState<string>("");

  const {
    user: { uid },
  } = useContext(AuthContext);

  const roomsCondition = useMemo(() => {
    return {
      fieldPath: "members",
      opStr: "array-contains",
      value: uid,
    };
  }, [uid]);

  const rooms: Room[] = useFirestore(collection.rooms, roomsCondition);

  const selectedRoom = useMemo(() => {
    return rooms.find((room) => room.id === selectedRoomId);
  }, [rooms, selectedRoomId]);

  const usersCondition = useMemo(() => {
    return {
      fieldPath: "uid",
      opStr: "in",
      value: selectedRoom?.members,
    };
  }, [selectedRoom?.members]);

  const members: User[] = useFirestore(collection.users, usersCondition);

  return (
    <AppContext.Provider
      value={{
        rooms,
        members,
        isAddRoomVisible,
        setIsAddRoomVisible,
        isInviteMemberVisible,
        setIsInviteMemberVisible,
        selectedRoomId,
        setSelectedRoomId,
        selectedRoom,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}
