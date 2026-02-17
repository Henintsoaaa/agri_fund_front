import { useAuth } from "@/features/auth/hooks/useAuth";
import { Sprout, LogOut, MessageCircle, Bell, Settings } from "lucide-react";
import { Outlet } from "react-router-dom";

export default function ProjectOwnerLayout() {
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
  };
  return (
    <div className="w-full">
      <header className="bg-forest shadow-lg w-full flex justify-center md:px-56 lg:px-96">
        <div className="container">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Sprout className="h-8 w-8 text-cream" />
              <h1 className="text-xl font-bold text-cream">
                AgriConnect Madagascar
              </h1>
              <span className="text-xs px-2 py-1 rounded-full bg-olive text-cream">
                Porteur de Projet
              </span>
            </div>

            <div className="flex items-center space-x-3">
              <button className="p-2 text-sage hover:text-cream hover:bg-olive rounded-full transition-colors duration-200">
                <MessageCircle className="h-5 w-5" />
              </button>
              <button className="p-2 text-sage hover:text-cream hover:bg-olive rounded-full transition-colors duration-200">
                <Bell className="h-5 w-5" />
              </button>
              <div className="relative group">
                <div className="h-8 w-8 bg-olive rounded-full flex items-center justify-center cursor-pointer">
                  <span className="text-cream text-sm font-medium">
                    {user?.name
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase() || "U"}
                  </span>
                </div>

                <div className="absolute right-0 top-10 w-48 bg-white rounded-lg shadow-xl border border-sage/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="p-3 border-b border-sage/10">
                    <p className="font-medium text-forest">
                      {user?.name || "Utilisateur"}
                    </p>
                    <p className="text-sm text-sage">
                      {user?.email || "email@example.com"}
                    </p>
                  </div>
                  <div className="py-2">
                    <button className="w-full px-4 py-2 text-left text-sage hover:bg-sage/10 hover:text-olive transition-colors duration-200 flex items-center space-x-2">
                      <Settings className="h-4 w-4" />
                      <span>Paramètres</span>
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left text-sage hover:bg-sage/10 hover:text-olive transition-colors duration-200 flex items-center space-x-2"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Se déconnecter</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <Outlet />
    </div>
  );
}
