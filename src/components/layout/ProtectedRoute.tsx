import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "@/features/auth/context/AuthContext";
import LoadingScreen from "./LoadingScreen";

interface ProtectedRouteProps {
  allowedRoles?: string[];
}

export default function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { user, isLoadingAuth } = useAuthContext();

  // Attendre que l'authentification soit chargée
  if (isLoadingAuth) {
    return <LoadingScreen />;
  }

  // Si pas d'utilisateur connecté, rediriger vers login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Si des rôles sont spécifiés, vérifier que l'utilisateur a le bon rôle
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/not-found" replace />;
  }

  return <Outlet />;
}
