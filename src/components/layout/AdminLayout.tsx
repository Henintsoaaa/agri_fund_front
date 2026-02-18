import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  BarChart3,
  Settings,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useQueryState } from "nuqs";

const navItems = [
  {
    title: "Tableau de bord",
    href: "/admin-dashboard",
    icon: LayoutDashboard,
    type: "route" as const,
  },
  {
    title: "Utilisateurs",
    section: "users",
    icon: Users,
    type: "section" as const,
  },
  {
    title: "Projets",
    section: "projects",
    icon: FolderKanban,
    type: "section" as const,
  },
  {
    title: "Statistiques",
    href: "/admin/stats",
    icon: BarChart3,
    type: "route" as const,
  },
  {
    title: "Rapports",
    href: "/admin/reports",
    icon: FileText,
    type: "route" as const,
  },
  {
    title: "Paramètres",
    href: "/admin/settings",
    icon: Settings,
    type: "route" as const,
  },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [section, setSection] = useQueryState("section");

  const handleNavigation = (item: (typeof navItems)[number]) => {
    if (item.type === "section") {
      // For section navigation, first ensure we're on the dashboard
      if (location.pathname !== "/admin-dashboard") {
        navigate(`/admin-dashboard?section=${item.section}`);
      } else {
        // Update query param and scroll
        setSection(item.section);

        // Scroll to section
        setTimeout(() => {
          const element = document.getElementById(item.section);
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 100);
      }
    } else {
      // For route navigation, navigate normally
      setSection(null); // Clear section when navigating to a different route
      setTimeout(() => {
        const element = document.getElementById("top");
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
      navigate(item.href);
    }
  };

  const isItemActive = (item: (typeof navItems)[number]) => {
    if (item.type === "section") {
      return (
        location.pathname === "/admin-dashboard" && section === item.section
      );
    }
    // For dashboard route, only active if no section is selected
    if (item.href === "/admin-dashboard") {
      console.log("section0", section);

      return location.pathname === item.href && section === null;
    }
    return location.pathname === item.href;
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-cream via-sage/10 to-olive/10">
      <Navbar title="AgriConnect" subtitle="Administration" />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="hidden lg:flex lg:flex-col lg:w-64 border-r border-sage/30 bg-cream/50 backdrop-blur-sm h-full">
          <ScrollArea className="flex-1 px-3 py-6">
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = isItemActive(item);

                return (
                  <Button
                    key={item.title}
                    onClick={() => handleNavigation(item)}
                    variant={isActive ? "default" : "ghost"}
                    className={cn(
                      "w-full justify-start gap-3 mb-1",
                      isActive
                        ? "bg-forest text-cream hover:bg-forest/90"
                        : "text-forest hover:bg-olive/10",
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.title}</span>
                  </Button>
                );
              })}
            </nav>
          </ScrollArea>

          <Separator className="bg-sage/30" />

          <div className="p-4">
            <div className="bg-olive/10 rounded-lg p-3 border border-olive/20">
              <p className="text-xs font-semibold text-forest mb-1">Astuce</p>
              <p className="text-xs text-forest/70">
                Utilisez les filtres pour trouver rapidement les utilisateurs ou
                projets.
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
