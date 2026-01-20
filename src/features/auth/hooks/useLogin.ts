import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../api/auth.api";
import { useAuth } from "../context/AuthContext";
import type { LoginPayload } from "../types/auth.types";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const { setUser } = useAuth();

  const login = async (payload: LoginPayload) => {
    setIsLoading(true);
    setError(null);

    try {
      // Better Auth retourne 204 No Content avec un cookie de session
      const loginResponse = await loginApi(payload);
      console.log("Login response:", loginResponse);

      //  Rediriger vers / pour  chaque type d'utilisateur

      setUser(loginResponse.data.user);
      if (loginResponse.data.user.role === "ADMIN") {
        navigate("/");
      } else if (loginResponse.data.user.role === "INVESTITOR") {
        navigate("/");
      } else if (loginResponse.data.user.role === "PROJECT_OWNER") {
        navigate("/");
      } else navigate("/");
    } catch (err: any) {
      console.error("Erreur de connexion:", err);
      setError(err?.response?.data?.message || "Échec de connexion");
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};
