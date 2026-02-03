import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import {
  loginApi,
  registerApi,
  logoutApi,
  changePasswordApi,
  requestPasswordResetApi,
  resetPasswordApi,
} from "../api/auth.api";
import type { LoginPayload } from "../types/auth.types";

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user, setUser } = useAuthContext();
  const navigate = useNavigate();

  const login = async (payload: LoginPayload) => {
    setIsLoading(true);
    setError(null);

    try {
      const loginResponse = await loginApi(payload);
      console.log("Login response:", loginResponse);

      setUser(loginResponse.data.user);

      // Redirection selon le rôle de l'utilisateur
      if (loginResponse.data.user.role === "ADMIN") {
        navigate("/admin-dashboard");
      } else if (loginResponse.data.user.role === "INVESTOR") {
        navigate("/");
      } else if (loginResponse.data.user.role === "PROJECT_OWNER") {
        navigate("/");
      } else {
        navigate("/");
      }
    } catch (err: any) {
      console.error("Erreur de connexion:", err);
      setError(err?.response?.data?.message || "Échec de connexion");
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (payload: any) => {
    setIsLoading(true);
    setError(null);

    try {
      const registerResponse = await registerApi(payload);
      console.log("Register response:", registerResponse);

      setUser(registerResponse.data.user);
      navigate("/");
    } catch (err: any) {
      console.error("Erreur d'inscription:", err);
      setError(err?.response?.data?.message || "Échec de l'inscription");
    } finally {
      setIsLoading(false);
    }
  };

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
    user,
    login,
    register,
    logout,
    requestPasswordReset,
    resetPassword,
    changePassword,
    isLoading,
    error,
  };
};
