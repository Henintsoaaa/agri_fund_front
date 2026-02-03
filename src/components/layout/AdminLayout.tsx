import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Sprout, LogOut, LayoutDashboard } from "lucide-react";

export default function AdminLayout() {
  const { logout } = useAuth();
  const handleLogout = () => {
    logout();
  };
  return (
    <div className="bg-forest text-cream shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3">
            <Sprout className="h-8 w-8 text-olive" />
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-cream">
                AgriConnect
              </h1>
              <p className="text-xs text-sage hidden sm:block">
                Administration
              </p>
            </div>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="bg-olive/20 text-cream border-olive hover:bg-olive hover:text-cream gap-2"
            size="sm"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Déconnexion</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
