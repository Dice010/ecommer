"use client";

import { useContext, createContext, ReactNode } from "react";
import { useAuthState } from "./useAuthState";

type IAuthContext = ReturnType<typeof useAuthState>;

type props = {
  children: ReactNode;
};

const AuthContext = createContext<undefined | IAuthContext>(undefined);

export function AuthProvider({ children }: props) {
  const { user, Login, Logout } = useAuthState();

  return (
    <AuthContext.Provider value={{ user, Login, Logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("Sử dụng bên trong Provider");
  }

  return context;
}
