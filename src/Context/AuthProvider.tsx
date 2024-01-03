import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";
import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import { User } from "../interfaces/User";

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
      console.log({user})
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
    }
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ user }}>
      {isLoading ? <Spin /> : props.children}
    </AuthContext.Provider>
  )
};
