import { createContext, useContext, useState, useEffect } from "react";
import type { AuthUser } from "../types/auth.types";
import { api } from "@/lib/api/axios";

interface AuthContextType {
  user: AuthUser | null;
  setUser: (user: AuthUser | null) => void;
  isLoadingAuth: boolean;
  refetchSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  // Récupérer la session au chargement
  const fetchSession = async () => {
    try {
      const response = await api.get("/auth/session");
      console.log("Session fetched:", response.data);
      if (response.data?.user) {
        setUser(response.data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Failed to fetch session:", error);
      // Si pas de session, on reste avec user = null
      setUser(null);
    } finally {
      setIsLoadingAuth(false);
    }
  };

  useEffect(() => {
    fetchSession();
  }, []);

  const refetchSession = async () => {
    setIsLoadingAuth(true);
    await fetchSession();
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, isLoadingAuth, refetchSession }}
    >
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
