import { createContext, useContext, useState, useEffect } from "react";
import type { AuthUser } from "../types/auth.types";
import { getSessionApi } from "../api/auth.api";

interface AuthContextType {
  user: AuthUser | null;
  setUser: (user: AuthUser | null) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await getSessionApi();
        if (response.data?.user) {
          setUser(response.data.user);
        }
      } catch (error) {
        // Session is invalid or doesn't exist
        console.log("No valid session found");
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used inside AuthProvider");
  }
  return context;
};
