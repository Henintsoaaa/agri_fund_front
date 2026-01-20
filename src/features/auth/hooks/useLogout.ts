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
    } catch (err: any) {
      // Si c'est une erreur 404 ou session inexistante, on continue quand même
      console.warn("Erreur de déconnexion (ignorée):", err);
    } finally {
      // Toujours nettoyer l'état local et rediriger
      setUser(null);
      navigate("/login");
      setIsLoading(false);
    }
  };

  return { logout, isLoading, error };
};
