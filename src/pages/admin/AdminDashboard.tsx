import { useEffect, useState } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import UserTable from "@/components/admin/UserTable";
import CreateUserDialog from "@/components/admin/CreateUserDialog";
import { useUser } from "@/features/user/hooks/useUser";
import { useProject } from "@/features/project/hooks/useProject";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  TrendingUp,
  DollarSign,
  Target,
  Activity,
} from "lucide-react";
import ProjectCard from "@/components/project/ProjectCard";

export default function AdminDashboard() {
  const {
    users,
    loading,
    error,
    fetchUsers,
    createUser,
    editUser,
    deleteUser,
    getStats,
  } = useUser();
  const { allProjects, isLoadingAllProjects } = useProject();
  const [activeTab, setActiveTab] = useState("all");
  const [projectTab, setProjectTab] = useState("all");
  const [mainView, setMainView] = useState<"overview" | "users" | "projects">(
    "overview",
  );

  useEffect(() => {
    fetchUsers(activeTab);
  }, [activeTab]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const handleProjectTabChange = (value: string) => {
    setProjectTab(value);
  };

  const stats = getStats();

  // Filtrer les projets selon l'onglet sélectionné
  const filteredProjects = () => {
    if (!allProjects) return [];

    switch (projectTab) {
      case "active":
        return allProjects.filter((p) => p.statut === "ACTIVE");
      case "draft":
        return allProjects.filter((p) => p.statut === "DRAFT");
      case "completed":
        return allProjects.filter((p) => p.statut === "COMPLETED");
      case "suspended":
        return allProjects.filter((p) => p.statut === "SUSPENDED");
      default:
        return allProjects;
    }
  };

  // Mock statistics globales (à remplacer par de vraies données)
  const globalStats = {
    totalProjects: allProjects?.length || 0,
    activeProjects:
      allProjects?.filter((p) => p.statut === "ACTIVE").length || 0,
    totalFunding: 458000, // Mock
    totalInvestments: 342000, // Mock
    averageROI: 18.5, // Mock
    successRate: 76, // Mock
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-sage/10 to-olive/10">
      <AdminLayout />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-forest">
              Tableau de bord Admin
            </h1>
            <p className="text-sage mt-1 text-sm sm:text-base">
              Vue d'ensemble de la plateforme AgriConnect
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <Tabs value={mainView} onValueChange={(v) => setMainView(v as any)}>
          <TabsList className="bg-white/80 backdrop-blur shadow-lg border border-sage/20 p-1">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-olive data-[state=active]:text-cream flex items-center gap-2"
            >
              <LayoutDashboard className="h-4 w-4" />
              <span className="hidden sm:inline">Vue d'ensemble</span>
            </TabsTrigger>
            <TabsTrigger
              value="users"
              className="data-[state=active]:bg-olive data-[state=active]:text-cream flex items-center gap-2"
            >
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Utilisateurs</span>
            </TabsTrigger>
            <TabsTrigger
              value="projects"
              className="data-[state=active]:bg-olive data-[state=active]:text-cream flex items-center gap-2"
            >
              <FolderKanban className="h-4 w-4" />
              <span className="hidden sm:inline">Projets</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6 mt-6">
            {/* Global Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-white/90 backdrop-blur border-sage/20 hover:shadow-xl transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-sage">
                    Total Projets
                  </CardTitle>
                  <FolderKanban className="h-4 w-4 text-olive" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-forest">
                    {globalStats.totalProjects}
                  </div>
                  <p className="text-xs text-sage mt-1">
                    {globalStats.activeProjects} actifs
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur border-sage/20 hover:shadow-xl transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-sage">
                    Financement Total
                  </CardTitle>
                  <Target className="h-4 w-4 text-olive" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-forest">
                    €{globalStats.totalFunding.toLocaleString()}
                  </div>
                  <p className="text-xs text-sage mt-1">Objectifs cumulés</p>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur border-sage/20 hover:shadow-xl transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-sage">
                    Investissements
                  </CardTitle>
                  <DollarSign className="h-4 w-4 text-olive" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-forest">
                    €{globalStats.totalInvestments.toLocaleString()}
                  </div>
                  <p className="text-xs text-sage mt-1">
                    {(
                      (globalStats.totalInvestments /
                        globalStats.totalFunding) *
                      100
                    ).toFixed(0)}
                    % du total
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur border-sage/20 hover:shadow-xl transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-sage">
                    Utilisateurs
                  </CardTitle>
                  <Users className="h-4 w-4 text-olive" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-forest">
                    {stats.total}
                  </div>
                  <p className="text-xs text-sage mt-1">
                    {stats.active} actifs
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur border-sage/20 hover:shadow-xl transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-sage">
                    ROI Moyen
                  </CardTitle>
                  <TrendingUp className="h-4 w-4 text-olive" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-forest">
                    {globalStats.averageROI}%
                  </div>
                  <p className="text-xs text-sage mt-1">
                    Retour sur investissement
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur border-sage/20 hover:shadow-xl transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-sage">
                    Taux de Succès
                  </CardTitle>
                  <Activity className="h-4 w-4 text-olive" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-forest">
                    {globalStats.successRate}%
                  </div>
                  <p className="text-xs text-sage mt-1">Projets complétés</p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white/90 backdrop-blur border-sage/20">
                <CardHeader>
                  <CardTitle className="text-forest">Gestion Rapide</CardTitle>
                  <CardDescription className="text-sage">
                    Accès rapide aux fonctionnalités principales
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <button
                    onClick={() => setMainView("users")}
                    className="w-full py-2 px-4 bg-olive text-cream rounded-lg hover:bg-forest transition-colors flex items-center gap-2 justify-center"
                  >
                    <Users className="h-4 w-4" />
                    Gérer les utilisateurs
                  </button>
                  <button
                    onClick={() => setMainView("projects")}
                    className="w-full py-2 px-4 bg-sage text-cream rounded-lg hover:bg-olive transition-colors flex items-center gap-2 justify-center"
                  >
                    <FolderKanban className="h-4 w-4" />
                    Gérer les projets
                  </button>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur border-sage/20">
                <CardHeader>
                  <CardTitle className="text-forest">
                    Activité Récente
                  </CardTitle>
                  <CardDescription className="text-sage">
                    Dernières actions sur la plateforme
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-sage">
                    <p>• Nouveau projet créé il y a 2h</p>
                    <p>• 3 nouveaux investisseurs inscrits</p>
                    <p>• Projet "Riziculture Bio" financé à 95%</p>
                    <p>• Validation en attente: 2 projets</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6 mt-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-forest">
                  Gestion des Utilisateurs
                </h2>
                <p className="text-sage text-sm">
                  Gérez tous les utilisateurs de la plateforme
                </p>
              </div>
              <CreateUserDialog onCreate={createUser} />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg shadow-sm">
                {error}
              </div>
            )}

            {/* Users Table with Tabs */}
            <Card className="bg-white/90 backdrop-blur border-sage/20">
              <CardContent className="pt-6">
                <Tabs value={activeTab} onValueChange={handleTabChange}>
                  <div className="overflow-x-auto mb-4">
                    <TabsList className="bg-sage/10">
                      <TabsTrigger
                        value="all"
                        className="data-[state=active]:bg-olive data-[state=active]:text-cream"
                      >
                        Tous
                      </TabsTrigger>
                      <TabsTrigger
                        value="active"
                        className="data-[state=active]:bg-olive data-[state=active]:text-cream"
                      >
                        Actifs
                      </TabsTrigger>
                      <TabsTrigger
                        value="inactive"
                        className="data-[state=active]:bg-olive data-[state=active]:text-cream"
                      >
                        Inactifs
                      </TabsTrigger>
                      <TabsTrigger
                        value="deleted"
                        className="data-[state=active]:bg-olive data-[state=active]:text-cream"
                      >
                        Supprimés
                      </TabsTrigger>
                      <TabsTrigger
                        value="project-owners"
                        className="data-[state=active]:bg-olive data-[state=active]:text-cream"
                      >
                        Porteurs
                      </TabsTrigger>
                      <TabsTrigger
                        value="investors"
                        className="data-[state=active]:bg-olive data-[state=active]:text-cream"
                      >
                        Investisseurs
                      </TabsTrigger>
                    </TabsList>
                  </div>

                  <TabsContent value={activeTab}>
                    <UserTable
                      users={users}
                      onEdit={editUser}
                      onDelete={deleteUser}
                      loading={loading}
                    />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-6 mt-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-forest">
                  Gestion des Projets
                </h2>
                <p className="text-sage text-sm">
                  Gérez tous les projets de la plateforme
                </p>
              </div>
            </div>

            {/* Project Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-white/90 backdrop-blur border-sage/20">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-sm text-sage">Total</p>
                    <p className="text-2xl font-bold text-forest">
                      {globalStats.totalProjects}
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white/90 backdrop-blur border-sage/20">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-sm text-sage">Actifs</p>
                    <p className="text-2xl font-bold text-olive">
                      {globalStats.activeProjects}
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white/90 backdrop-blur border-sage/20">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-sm text-sage">Brouillons</p>
                    <p className="text-2xl font-bold text-amber-600">
                      {allProjects?.filter((p) => p.statut === "DRAFT").length}
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white/90 backdrop-blur border-sage/20">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-sm text-sage">Complétés</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {
                        allProjects?.filter((p) => p.statut === "COMPLETED")
                          .length
                      }
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Projects Grid */}
            <Card className="bg-white/90 backdrop-blur border-sage/20">
              <CardContent className="pt-6">
                <Tabs value={projectTab} onValueChange={handleProjectTabChange}>
                  <div className="overflow-x-auto mb-4">
                    <TabsList className="bg-sage/10">
                      <TabsTrigger
                        value="all"
                        className="data-[state=active]:bg-olive data-[state=active]:text-cream"
                      >
                        Tous
                      </TabsTrigger>
                      <TabsTrigger
                        value="active"
                        className="data-[state=active]:bg-olive data-[state=active]:text-cream"
                      >
                        Actifs
                      </TabsTrigger>
                      <TabsTrigger
                        value="draft"
                        className="data-[state=active]:bg-olive data-[state=active]:text-cream"
                      >
                        Brouillons
                      </TabsTrigger>
                      <TabsTrigger
                        value="completed"
                        className="data-[state=active]:bg-olive data-[state=active]:text-cream"
                      >
                        Complétés
                      </TabsTrigger>
                      <TabsTrigger
                        value="suspended"
                        className="data-[state=active]:bg-olive data-[state=active]:text-cream"
                      >
                        Suspendus
                      </TabsTrigger>
                    </TabsList>
                  </div>

                  <TabsContent value={projectTab}>
                    {isLoadingAllProjects ? (
                      <div className="text-center py-8 text-sage">
                        Chargement des projets...
                      </div>
                    ) : filteredProjects().length > 0 ? (
                      <div className="space-y-4">
                        {filteredProjects().map((project) => (
                          <ProjectCard
                            key={project.id}
                            project={project}
                            onClick={() => {
                              // Navigation vers les détails du projet
                              console.log("Project clicked:", project.id);
                            }}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-sage">
                        Aucun projet dans cette catégorie
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
