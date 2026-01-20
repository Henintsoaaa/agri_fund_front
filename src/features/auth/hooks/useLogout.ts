import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logoutApi } from "../api/auth.api";
import { useAuth } from "../context/AuthContext";

export const useLogout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const { setUser } = useAuth();

  const logout = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await logoutApi();

      // Clear user state
      setUser(null);

      // Redirect to login page
      navigate("/login");
    } catch (err: any) {
      console.error("Erreur de déconnexion:", err);
      setError(err?.response?.data?.message || "Échec de déconnexion");
    } finally {
      setIsLoading(false);
    }
  };

  return { logout, isLoading, error };
};
