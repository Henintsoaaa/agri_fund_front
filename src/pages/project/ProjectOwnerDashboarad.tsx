import ProjectOwnerLayout from "@/components/layout/ProjectOwnerLayout";
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
    <div>
      <ProjectOwnerLayout />

      <div className="space-y-8 p-12">
        {/* Hero Section */}
        <Card className="bg-gradient-to-r from-forest to-olive border-none">
          <CardContent className="p-8 text-cream">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 max-w-full">
              <div className="max-w-2xl">
                <h2 className="text-3xl font-bold mb-4">
                  Bienvenue dans votre espace agriculteur
                </h2>
                <p className="text-lg mb-6 text-cream/90">
                  Gérez vos projets, communiquez avec vos investisseurs et
                  développez votre activité agricole.
                </p>
              </div>
              <Button
                onClick={() => navigate("/create-project")}
                className="bg-cream text-forest hover:bg-sage hover:text-cream shadow-lg"
                size="lg"
              >
                <Plus className="h-5 w-5 mr-2" />
                Nouveau projet
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
        <Card className="border border-sage/10">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold text-forest mb-6">Mes projets</h3>

            {isLoadingMyProjects ? (
              <div className="text-center py-8">
                <p className="text-sage">Chargement des projets...</p>
              </div>
            ) : myProjects && myProjects.length > 0 ? (
              <div className="space-y-6">
                {myProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onClick={() => navigate(`/project-stage/${project.id}`)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-sage mb-4">
                  Vous n'avez pas encore de projets
                </p>
                <Button
                  onClick={() => navigate("/create-project")}
                  className="bg-forest text-cream hover:bg-olive"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Créer votre premier projet
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-sage/10 border border-sage/20">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold text-forest mb-4">
              Développez votre activité
            </h3>
            <p className="text-sage mb-6 max-w-2xl mx-auto">
              Créez de nouveaux projets, communiquez avec vos investisseurs et
              développez votre réseau professionnel.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => navigate("/create-project")}
                className="bg-forest text-cream hover:bg-olive"
              >
                Créer un nouveau projet
              </Button>
              <Button
                variant="outline"
                className="border-forest text-forest hover:bg-forest hover:text-cream"
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
