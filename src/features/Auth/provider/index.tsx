import React, { createContext, useContext } from "react";
import { AuthApiInterface } from "../model";
import { FirebaseAuthService } from "@/config/services";

const AuthContext = createContext<AuthApiInterface | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const authService: AuthApiInterface = new FirebaseAuthService();

  return (
    <AuthContext.Provider value={authService}>{children}</AuthContext.Provider>
  );
};

export const useAuth = (): AuthApiInterface => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
