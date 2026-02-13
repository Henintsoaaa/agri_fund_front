import ProjectCard from "@/components/project/ProjectCard";
import ProjectStatsCard from "@/components/project/ProjectStatsCard";
import { useProject } from "@/features/project/hooks/useProject";
import { Users, TrendingUp, Plus, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function ProjectOwnerDashboard() {
  const navigate = useNavigate();
  const { myProjects, isLoadingMyProjects } = useProject();

  const totalStats = {
    totalInvestors: 0, // TODO: Calculate from actual data
    activeProjects:
      myProjects?.filter((p) => p.statut === "ACTIVE").length || 0,
    totalProjects: myProjects?.length || 0,
  };

  const stats = [
    {
      label: "Projets actifs",
      value: totalStats.activeProjects.toString(),
      icon: TrendingUp,
      color: "bg-olive",
    },
    {
      label: "Total projets",
      value: totalStats.totalProjects.toString(),
      icon: BarChart3,
      color: "bg-forest",
    },
    {
      label: "Investisseurs",
      value: totalStats.totalInvestors.toString(),
      icon: Users,
      color: "bg-sage",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-cream via-sage/5 to-olive/10">
      <div className="space-y-8 p-6 sm:p-8 lg:p-12 max-w-7xl mx-auto">
        {/* Hero Section */}
        <Card className="bg-linear-to-br from-forest via-forest/95 to-olive border-none shadow-2xl overflow-hidden relative">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMDUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
          <CardContent className="p-8 lg:p-10 text-cream relative z-10">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
              <div className="max-w-2xl">
                <h1 className="text-3xl lg:text-4xl font-bold mb-3 tracking-tight">
                  Bienvenue dans votre espace agriculteur
                </h1>
                <p className="text-base lg:text-lg text-cream/90 leading-relaxed">
                  Gérez vos projets, communiquez avec vos investisseurs et
                  développez votre activité agricole.
                </p>
              </div>
              <Button
                onClick={() => navigate("/create-project")}
                className="bg-cream text-forest hover:bg-cream/90 hover:scale-105 shadow-xl transition-all duration-200 font-semibold"
                size="lg"
              >
                <Plus className="h-5 w-5 mr-2" />
                Nouveau projet
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <ProjectStatsCard
              key={index}
              label={stat.label}
              value={stat.value}
              icon={stat.icon}
              color={stat.color}
            />
          ))}
        </div>

        {/* Projects List */}
        <Card className="border-none shadow-lg bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6 lg:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-forest">Mes projets</h2>
              {myProjects && myProjects.length > 0 && (
                <span className="text-sm text-sage font-medium">
                  {myProjects.length}{" "}
                  {myProjects.length > 1 ? "projets" : "projet"}
                </span>
              )}
            </div>

            {isLoadingMyProjects ? (
              <div className="text-center py-16">
                <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-sage/20 border-t-forest mb-4"></div>
                <p className="text-sage font-medium">
                  Chargement de vos projets...
                </p>
              </div>
            ) : myProjects && myProjects.length > 0 ? (
              <div className="space-y-4">
                {myProjects.map((project) => (
                  <div
                    key={project.id}
                    className="transform transition-all duration-200 hover:scale-[1.01]"
                  >
                    <ProjectCard
                      project={project}
                      onClick={() => navigate(`/project-stage/${project.id}`)}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 px-4">
                <div className="bg-sage/10 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                  <BarChart3 className="h-12 w-12 text-sage" />
                </div>
                <h3 className="text-xl font-semibold text-forest mb-3">
                  Aucun projet pour le moment
                </h3>
                <p className="text-sage mb-6 max-w-md mx-auto">
                  Commencez votre aventure agricole en créant votre premier
                  projet
                </p>
                <Button
                  onClick={() => navigate("/create-project")}
                  className="bg-forest text-cream hover:bg-olive hover:scale-105 transition-all duration-200 shadow-lg"
                  size="lg"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Créer votre premier projet
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-linear-to-br from-sage/20 via-olive/10 to-sage/10 border-none shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-olive/10 rounded-full blur-3xl"></div>
          <CardContent className="p-8 lg:p-10 text-center relative z-10">
            <h2 className="text-2xl lg:text-3xl font-bold text-forest mb-4">
              Développez votre activité
            </h2>
            <p className="text-sage mb-8 max-w-2xl mx-auto leading-relaxed">
              Créez de nouveaux projets, communiquez avec vos investisseurs et
              développez votre réseau professionnel.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => navigate("/create-project")}
                className="bg-forest text-cream hover:bg-olive hover:scale-105 transition-all duration-200 shadow-lg font-semibold"
                size="lg"
              >
                <Plus className="h-5 w-5 mr-2" />
                Créer un nouveau projet
              </Button>
              <Button
                variant="outline"
                className="border-2 border-forest text-forest hover:bg-forest hover:text-cream hover:scale-105 transition-all duration-200 font-semibold"
                size="lg"
              >
                Publier sur le marché
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
