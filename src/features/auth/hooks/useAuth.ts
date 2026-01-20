import { useState } from "react";
import { useAuth as useAuthContext } from "../context/AuthContext";
import {
  changePasswordApi,
  requestPasswordResetApi,
  resetPasswordApi,
} from "../api/auth.api";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setUser } = useAuthContext();

  const navigate = useNavigate();

  const requestPasswordReset = async (email: string, redirectTo: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const requestPasswordPasswordResponse = await requestPasswordResetApi(
        email,
        redirectTo,
      );
      setUser(requestPasswordPasswordResponse.data.user);
      navigate("/reset-password");
    } catch (err: any) {
      console.error(
        "Erreur de demande de réinitialisation du mot de passe:",
        err,
      );
      setError(
        err?.response?.data?.message ||
          "Échec de la demande de réinitialisation du mot de passe",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (token: string, newPassword: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const resetPasswordResponse = await resetPasswordApi(token, newPassword);
      setUser(resetPasswordResponse.data.user);
      navigate("/login");
    } catch (err: any) {
      console.error("Erreur de réinitialisation du mot de passe:", err);
      setError(
        err?.response?.data?.message ||
          "Échec de la réinitialisation du mot de passe",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const changePassword = async (
    currentPassword: string,
    newPassword: string,
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      await changePasswordApi(currentPassword, newPassword);

      navigate("/");
    } catch (err: any) {
      console.error("Erreur de changement de mot de passe:", err);
      setError(
        err?.response?.data?.message || "Échec du changement de mot de passe",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return {
    resetPassword,
    requestPasswordReset,
    changePassword,
    isLoading,
    error,
  };
};
