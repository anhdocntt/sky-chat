import React, { useContext, useMemo, useState } from "react";
import { collection } from "../firebase/collection";
import useFirestore from "../hooks/useFirestore";
import { Room } from "../interfaces/Room";
import { AuthContext } from "./AuthProvider";

interface AppProviderProps {
  children: React.ReactNode;
}

interface AppContextProps {
  rooms: Room[];
  isAddRoomVisible: boolean;
  setIsAddRoomVisible: (isAddRoomVisible: boolean) => void;
}

export const AppContext = React.createContext<AppContextProps>({
  rooms: [],
  isAddRoomVisible: false,
  setIsAddRoomVisible: () => {},
});

export default function AppProvider(props: AppProviderProps) {
  const [isAddRoomVisible, setIsAddRoomVisible] = useState<boolean>(false);

  const { user: { uid } } = useContext(AuthContext);

  const roomsCondition = useMemo(() => {
    return {
      fieldPath: "members",
      opStr: "array-contains",
      value: uid,
    }
  }, [uid]);
  
  const rooms: Room[] = useFirestore(collection.rooms, roomsCondition);
  console.log({rooms})

  return (
    <AppContext.Provider value={{ rooms, isAddRoomVisible, setIsAddRoomVisible }}>
      {props.children}
    </AppContext.Provider>
  )
};
