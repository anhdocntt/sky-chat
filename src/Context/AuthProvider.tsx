import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";
import React, { useEffect, useMemo, useState } from "react";
import { Spin } from "antd";
import { User } from "../interfaces/User";
import useFirestore from "../hooks/useFirestore";
import { collection } from "../firebase/collection";

interface AuthProviderProps {
  children: React.ReactNode;
}

interface AuthContextProps {
  user: User;
}

export const AuthContext = React.createContext<AuthContextProps>({ user: {} });

export default function AuthProvider(props: AuthProviderProps) {
  const [user, setUser] = useState<User>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const user = auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, uid, email, photoURL } = user;
        setUser({ displayName, uid, email, photoURL });
        setIsLoading(false);
        navigate("/");
        return;
      }

      setIsLoading(false);
      navigate("login");
    });

    return () => {
      user();
    };
  }, [navigate]);

  const usersCondition = useMemo(() => {
    return {
      fieldPath: "uid",
      opStr: "==",
      value: user?.uid,
    };
  }, [user?.uid]);

  const users: User[] = useFirestore(collection.users, usersCondition);

  useEffect(() => {
    if (!users || !users.length) return;

    setTimeout(() => {
      setUser({
        ...user,
        displayName: users[0].displayName,
        photoURL: users[0].photoURL,
      });
    }, 0);
  }, [users]);

  return (
    <AuthContext.Provider value={{ user }}>
      {isLoading ? <Spin /> : props.children}
    </AuthContext.Provider>
  );
}
