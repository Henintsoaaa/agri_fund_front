import { useAuthContext } from "@/features/auth/context/AuthContext";
import AdminLayout from "./AdminLayout";
import InvestorLayout from "./InvestorLayout";
import ProjectOwnerLayout from "./ProjectOwnerLayout";
import { Outlet } from "react-router-dom";

export default function DynamicLayoutWrapper() {
  const { user } = useAuthContext();

  // Afficher le layout approprié selon le rôle
  if (user?.role === "ADMIN") {
    return <AdminLayout />;
  } else if (user?.role === "PROJECT_OWNER") {
    return <ProjectOwnerLayout />;
  } else if (user?.role === "INVESTOR") {
    return <InvestorLayout />;
  }

  // Fallback: pas de layout
  return <Outlet />;
}
