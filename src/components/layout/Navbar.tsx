import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Sprout, LogOut, User, Settings } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "@/features/auth/context/AuthContext";
import { NotificationDropdown } from "@/components/notification/NotificationDropdown";

interface NavbarProps {
  title: string;
  subtitle?: string;
  showNotifications?: boolean;
}

export default function Navbar({
  title,
  subtitle,
  showNotifications = true,
}: NavbarProps) {
  const { logout } = useAuth();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getInitials = (name?: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getRoleLabel = (role?: string) => {
    switch (role) {
      case "ADMIN":
        return "Administrateur";
      case "PROJECT_OWNER":
        return "Porteur de projet";
      case "INVESTOR":
        return "Investisseur";
      default:
        return "Utilisateur";
    }
  };

  return (
    <nav className="bg-forest text-cream shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo et Titre */}
          <div className="flex items-center space-x-3">
            <Sprout className="h-8 w-8 text-olive" />
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-cream">
                {title}
              </h1>
              {subtitle && (
                <p className="text-xs text-sage hidden sm:block">{subtitle}</p>
              )}
            </div>
          </div>

          {/* Actions utilisateur */}
          <div className="flex items-center gap-3">
            {/* Notifications */}
            {showNotifications && <NotificationDropdown />}

            {/* Menu utilisateur */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 hover:bg-olive/20"
                >
                  <Avatar className="h-8 w-8 border-2 border-olive">
                    <AvatarImage src={user?.image || undefined} />
                    <AvatarFallback className="bg-olive text-cream">
                      {getInitials(user?.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium text-cream">
                      {user?.name || "Utilisateur"}
                    </p>
                    <p className="text-xs text-sage">
                      {getRoleLabel(user?.role)}
                    </p>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 bg-cream border-sage"
              >
                <DropdownMenuLabel className="text-forest">
                  Mon compte
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-sage/30" />
                <DropdownMenuItem className="cursor-pointer hover:bg-olive/10">
                  <User className="mr-2 h-4 w-4 text-forest" />
                  <span className="text-forest">Profil</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer hover:bg-olive/10">
                  <Settings className="mr-2 h-4 w-4 text-forest" />
                  <span className="text-forest">Paramètres</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-sage/30" />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer hover:bg-destructive/10 focus:bg-destructive/10"
                >
                  <LogOut className="mr-2 h-4 w-4 text-destructive" />
                  <span className="text-destructive">Déconnexion</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}
