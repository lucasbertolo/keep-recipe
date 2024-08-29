import React, { createContext, useContext } from "react";
import { FirebaseAuthService, useFirebaseSession } from "@/config/services";

const AuthContext = createContext<Auth.Provider | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const authService: Auth.Actions = new FirebaseAuthService();
  const session = useFirebaseSession();

  return (
    <AuthContext.Provider value={{ ...authService, session }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): Auth.Provider => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
