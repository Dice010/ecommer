"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useAuthState } from "./useAuthState";

type AuthContextType = ReturnType<typeof useAuthState>;

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const authValues = useAuthState();

  return (
    <AuthContext.Provider value={authValues}>
      {/* Hiển thị màn hình chờ nếu đang trong quá trình check trạng thái đăng nhập */}
      {!authValues.isLoading ? (
        children
      ) : (
        <div className="loading-screen">Đang tải...</div>
      )}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth phải được sử dụng bên trong một AuthProvider");
  }
  return context;
}
