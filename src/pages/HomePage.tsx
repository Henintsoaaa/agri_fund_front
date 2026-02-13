import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/useAuth";

export default function HomePage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else if (user.role === "ADMIN") {
      navigate("/admin-dashboard");
    } else if (user.role === "PROJECT_OWNER") {
      navigate("/project-owner");
    } else {
      // For investors, redirect to a different page when implemented
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-sage">Redirection...</p>
    </div>
  );
}
