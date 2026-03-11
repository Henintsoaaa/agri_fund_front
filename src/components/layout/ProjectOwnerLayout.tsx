import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import {
  LayoutDashboard,
  FolderPlus,
  Folders,
  ImagePlus,
  Bell,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

const navItems = [
  {
    title: "Tableau de bord",
    href: "/project-owner",
    icon: LayoutDashboard,
  },
  {
    title: "Mes Projets",
    href: "/project-owner/projects",
    icon: Folders,
    badge: 5,
  },
  {
    title: "Créer un Projet",
    href: "/project-owner/create-project",
    icon: FolderPlus,
  },
  {
    title: "Preuves",
    href: "/project-owner/proofs",
    icon: ImagePlus,
  },
  {
    title: "Notifications",
    href: "/notifications",
    icon: Bell,
  },
];

export default function ProjectOwnerLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-cream via-sage/10 to-olive/10">
      <Navbar title="AgriConnect" subtitle="Porteur de projet" />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="hidden lg:flex lg:flex-col lg:w-64 h-full border-r border-sage/30 bg-cream/50 backdrop-blur-sm ">
          <ScrollArea className="flex-1 px-3 py-6">
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;

                return (
                  <Button
                    key={item.href}
                    onClick={() => navigate(item.href)}
                    variant={isActive ? "default" : "ghost"}
                    className={cn(
                      "w-full justify-start gap-3 mb-1 relative",
                      isActive
                        ? "bg-forest text-cream hover:bg-forest/90"
                        : "text-forest hover:bg-olive/10",
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="flex-1 text-left">{item.title}</span>
                    {item.badge && (
                      <Badge
                        variant={isActive ? "secondary" : "default"}
                        className={cn(
                          "h-5 w-5 flex items-center justify-center p-0",
                          isActive
                            ? "bg-olive text-cream"
                            : "bg-forest text-cream",
                        )}
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </Button>
                );
              })}
            </nav>
          </ScrollArea>

          <Separator className="bg-sage/30" />

          <div className="p-4">
            <div className="bg-olive/10 rounded-lg p-3 border border-olive/20">
              <p className="text-xs font-semibold text-forest mb-1">Conseil</p>
              <p className="text-xs text-forest/70">
                Mettez à jour régulièrement vos preuves pour gagner la confiance
                des investisseurs.
              </p>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
