import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { registerApi } from "../api/auth.api";

export const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const { setUser } = useAuth();

  const register = async (payload: any) => {
    setIsLoading(true);
    setError(null);

    try {
      const RegisterResponse = await registerApi(payload);
      console.log("Register response:", RegisterResponse);

      setUser(RegisterResponse.data.user);
      navigate("/");
    } catch (err: any) {
      console.error("Erreur d'inscription:", err);
      setError(err?.response?.data?.message || "Échec de l'inscription");
    } finally {
      setIsLoading(false);
    }
  };

  return { register, isLoading, error };
};
