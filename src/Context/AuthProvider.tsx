import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";
import React, { useEffect, useState } from "react";
import { Spin } from "antd";

interface User {
  displayName?: string | null;
  email?: string | null;
  uid?: string;
  photoURL?: string | null;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

interface AuthContextProps {
  user: User;
}

export const AuthContext = React.createContext<AuthContextProps>({ user: {} });

export default function AuthProvider(props: AuthProviderProps) {
  const [user, setUser] = useState<User>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = auth.onAuthStateChanged((user) => {
      console.log({user})
      if (user) {
        const { displayName, uid, email, photoURL } = user;
        setUser({ displayName, uid, email, photoURL });
        setIsLoading(false);
        navigate("/");
      }
      else {
        navigate("login");
      }
    });

    return () => {
      user();
    }
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ user }}>
      {isLoading ? <Spin /> : props.children}
    </AuthContext.Provider>
  )
};
