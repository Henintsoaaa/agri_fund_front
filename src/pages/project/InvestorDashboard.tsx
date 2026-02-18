import { ArrowRight, DollarSign, Leaf, TrendingUp, Users } from "lucide-react";
import InvestorProjectCard from "@/components/project/InvestorProjectCard";
import { useProject } from "@/features/project/hooks/useProject";
import type { Project } from "@/features/project/types/project.types";
import { useAuthContext } from "@/features/auth/context/AuthContext";

export default function InvestorDashboard() {
  const userType = "investor";
  const { allProjects, isLoadingAllProjects, allProjectsError } = useProject();
  const { user } = useAuthContext();

  console.log("Debug InvestorDashboard:", {
    user,
    userRole: user?.role,
    allProjects,
    isLoadingAllProjects,
    allProjectsError,
    projectsLength: allProjects?.length,
  });

  // Calculate project progress and funding from stages
  const getProjectStats = (project: Project) => {
    if (!project.stages || project.stages.length === 0) {
      return { progress: 0, funding: "0", collected: "0" };
    }

    const totalTarget = project.stages.reduce(
      (sum, stage) => sum + stage.targetAmount,
      0,
    );
    const totalCollected = project.stages.reduce(
      (sum, stage) => sum + stage.collectedAmount,
      0,
    );
    const progress = totalTarget > 0 ? (totalCollected / totalTarget) * 100 : 0;

    return {
      progress: Math.round(progress),
      funding: `€${totalTarget.toLocaleString()}`,
      collected: `€${totalCollected.toLocaleString()}`,
    };
  };

  // Get status label
  const getStatusLabel = (project: Project) => {
    const stats = getProjectStats(project);
    if (stats.progress >= 90) return "Presque financé";
    if (stats.progress >= 50) return "Opportunité";
    if (stats.progress > 0) return "Investissement actif";
    return "Nouveau projet";
  };

  // Calculate ROI (mocked for now - would need real investment data)
  const getROI = (project: Project) => {
    const stats = getProjectStats(project);
    if (stats.progress > 70) return "20-25%";
    if (stats.progress > 40) return "15-20%";
    return "10-15%";
  };
  const stats = [
    {
      label: "Projets investis",
      value: "8",
      icon: TrendingUp,
      color: "bg-olive",
    },
    {
      label: "Total investi",
      value: "€45,000",
      icon: DollarSign,
      color: "bg-forest",
    },
    { label: "Rendement moyen", value: "17.3%", icon: Users, color: "bg-sage" },
    {
      label: "Agriculteurs soutenus",
      value: "12",
      icon: Leaf,
      color: "bg-olive",
    },
  ];
  return (
    <div className="flex justify-center w-full">
      <div className="space-y-8 px-48 py-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-forest to-olive rounded-2xl p-8 text-cream">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold mb-4">
              Découvrez les opportunités d'investissement
            </h2>
            <p className="text-lg mb-6 text-cream/90">
              Investissez dans des projets agricoles durables et soutenez le
              développement rural de Madagascar.
            </p>
            <button className="bg-cream text-forest px-6 py-3 rounded-lg font-semibold hover:bg-sage hover:text-cream transition-all duration-200 shadow-lg">
              "Découvrir les projets
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg border border-sage/10 hover:shadow-xl transition-shadow duration-200"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-sage mb-1">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-bold text-forest">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <IconComponent className="h-6 w-6 text-cream" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Projects */}
        <div className="bg-white rounded-xl shadow-lg border border-sage/10 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-forest">
              Projets recommandés
            </h3>
            <button className="flex items-center space-x-2 text-olive hover:text-forest transition-colors">
              <span className="text-sm font-medium">Voir tout</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoadingAllProjects ? (
              <div className="col-span-3 text-center py-8 text-sage">
                Chargement des projets...
              </div>
            ) : allProjectsError ? (
              <div className="col-span-3 text-center py-8 text-red-500">
                Erreur lors du chargement des projets
              </div>
            ) : allProjects && allProjects.length > 0 ? (
              allProjects.slice(0, 6).map((project) => {
                const stats = getProjectStats(project);
                return (
                  <InvestorProjectCard
                    key={project.id}
                    id={parseInt(project.id.slice(-6), 16) || 1}
                    title={project.title}
                    farmer="Propriétaire du projet"
                    location={project.category || "Madagascar"}
                    funding={stats.funding}
                    progress={stats.progress}
                    image={
                      project.image ||
                      "https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=300"
                    }
                    status={getStatusLabel(project)}
                    roi={getROI(project)}
                    userType={userType}
                  />
                );
              })
            ) : (
              <div className="col-span-3 text-center py-8 text-sage">
                Aucun projet disponible pour le moment
                <br />
                <small className="text-xs">
                  (allProjects: {allProjects ? "existe" : "null/undefined"},
                  length: {allProjects?.length || 0})
                </small>
              </div>
            )}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-sage/10 rounded-xl p-8 text-center border border-sage/20">
          <h3 className="text-2xl font-bold text-forest mb-4">
            "Prêt à faire la différence ?
          </h3>
          <p className="text-sage mb-6 max-w-2xl mx-auto">
            "Rejoignez notre communauté d'investisseurs visionnaires et soutenez
            l'agriculture durable à Madagascar.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-forest text-cream px-6 py-3 rounded-lg font-semibold hover:bg-olive transition-colors duration-200">
              "Explorer les projets
            </button>
            <button className="border border-forest text-forest px-6 py-3 rounded-lg font-semibold hover:bg-forest hover:text-cream transition-all duration-200">
              "Voir mes investissements
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
