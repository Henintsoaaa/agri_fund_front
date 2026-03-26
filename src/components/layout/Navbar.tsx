import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
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
import {
  Sprout,
  LogOut,
  User,
  Settings,
  Menu,
  LayoutDashboard,
  Users,
  FolderKanban,
  Bell,
  BarChart3,
  FileText,
  FolderPlus,
  Folders,
  Search,
  Wallet,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "@/features/auth/context/AuthContext";
import { NotificationDropdown } from "@/components/notification/NotificationDropdown";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface NavbarProps {
  title: string;
  subtitle?: string;
  showNotifications?: boolean;
}

type MobileNavItem = {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
};

export default function Navbar({
  title,
  subtitle,
  showNotifications = true,
}: NavbarProps) {
  const { logout } = useAuth();
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getMobileNavItems = (role?: string): MobileNavItem[] => {
    switch (role) {
      case "ADMIN":
        return [
          {
            title: "Tableau de bord",
            href: "/admin-dashboard",
            icon: LayoutDashboard,
          },
          {
            title: "Utilisateurs",
            href: "/admin-dashboard?section=users",
            icon: Users,
          },
          {
            title: "Projets",
            href: "/admin-dashboard?section=projects",
            icon: FolderKanban,
          },
          {
            title: "Notifications",
            href: "/notifications",
            icon: Bell,
          },
          {
            title: "Statistiques",
            href: "/admin/stats",
            icon: BarChart3,
          },
          {
            title: "Rapports",
            href: "/admin/reports",
            icon: FileText,
          },
          {
            title: "Parametres",
            href: "/admin/settings",
            icon: Settings,
          },
        ];
      case "PROJECT_OWNER":
        return [
          {
            title: "Tableau de bord",
            href: "/project-owner",
            icon: LayoutDashboard,
          },
          {
            title: "Mes Projets",
            href: "/project-owner/projects",
            icon: Folders,
          },
          {
            title: "Creer un Projet",
            href: "/project-owner/create-project",
            icon: FolderPlus,
          },
          {
            title: "Notifications",
            href: "/notifications",
            icon: Bell,
          },
        ];
      case "INVESTOR":
        return [
          {
            title: "Tableau de bord",
            href: "/investor",
            icon: LayoutDashboard,
          },
          {
            title: "Explorer les Projets",
            href: "/project-show",
            icon: Search,
          },
          {
            title: "Mes Investissements",
            href: "/investor/investments",
            icon: Wallet,
          },
          {
            title: "Notifications",
            href: "/notifications",
            icon: Bell,
          },
        ];
      default:
        return [];
    }
  };

  const mobileNavItems = getMobileNavItems(user?.role);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleProfileNavigation = () => {
    switch (user?.role) {
      case "ADMIN":
        navigate("/admin-dashboard");
        return;
      case "PROJECT_OWNER":
        navigate("/project-owner");
        return;
      case "INVESTOR":
        navigate("/investor");
        return;
      default:
        navigate("/");
    }
  };

  const handleSettingsNavigation = () => {
    switch (user?.role) {
      case "ADMIN":
        navigate("/admin/settings");
        return;
      case "PROJECT_OWNER":
        navigate("/project-owner/projects");
        return;
      case "INVESTOR":
        navigate("/investor/stats");
        return;
      default:
        navigate("/");
    }
  };

  const isNavItemActive = (href: string) => {
    if (href.includes("?")) {
      return `${location.pathname}${location.search}` === href;
    }
    return location.pathname === href;
  };

  const handleMobileNavigation = (href: string) => {
    setIsMenuOpen(false);

    if (href.startsWith("/admin-dashboard?section=")) {
      const section = href.split("section=")[1];
      if (location.pathname === "/admin-dashboard" && section) {
        if (`${location.pathname}${location.search}` !== href) {
          navigate(href);
        }

        setTimeout(() => {
          const element = document.getElementById(section);
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 120);
        return;
      }
    }

    navigate(href);
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
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-cream hover:bg-olive/20"
              onClick={() => setIsMenuOpen(true)}
              aria-label="Ouvrir le menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <SheetContent
              side="left"
              className="w-72 border-sage/30 bg-cream p-0"
            >
              <SheetHeader className="px-5 pt-6 pb-3 text-left">
                <SheetTitle className="text-forest">Navigation</SheetTitle>
                <SheetDescription className="text-forest/70">
                  {getRoleLabel(user?.role)}
                </SheetDescription>
              </SheetHeader>

              <div className="px-3 pb-6">
                <nav className="space-y-1">
                  {mobileNavItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = isNavItemActive(item.href);

                    return (
                      <Button
                        key={item.href}
                        onClick={() => handleMobileNavigation(item.href)}
                        variant={isActive ? "default" : "ghost"}
                        className={cn(
                          "w-full justify-start gap-3",
                          isActive
                            ? "bg-forest text-cream hover:bg-forest/90"
                            : "text-forest hover:bg-olive/10",
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Button>
                    );
                  })}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
          {/* Logo et Titre */}
          <div className="flex items-center space-x-3">
            <Sprout className="h-8 w-8 text-olive hidden md:block" />
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
                <DropdownMenuItem
                  onClick={handleProfileNavigation}
                  className="cursor-pointer hover:bg-olive/10"
                >
                  <User className="mr-2 h-4 w-4 text-forest" />
                  <span className="text-forest">Profil</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleSettingsNavigation}
                  className="cursor-pointer hover:bg-olive/10"
                >
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
