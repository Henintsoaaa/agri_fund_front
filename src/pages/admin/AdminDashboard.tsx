import { useEffect, useState } from "react";
import { useUser } from "@/features/user/hooks/useUser";
import { useProject } from "@/features/project/hooks/useProject";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  FolderKanban,
  TrendingUp,
  DollarSign,
  Target,
  Activity,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import UserTable from "@/components/admin/UserTable";
import CreateUserDialog from "@/components/admin/CreateUserDialog";
import ProjectCard from "@/components/project/ProjectCard";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQueryState } from "nuqs";

export default function AdminDashboard() {
  const {
    users,
    loading,
    fetchUsers,
    createUser,
    editUser,
    deleteUser,
    getStats,
  } = useUser();
  const { allProjects, isLoadingAllProjects } = useProject();
  const [activeTab, setActiveTab] = useState("all");
  const [projectTab, setProjectTab] = useState("all");
  const [section, setSection] = useQueryState("section", {
    defaultValue: "users",
  });

  useEffect(() => {
    fetchUsers(activeTab);
  }, [activeTab]);

  const stats = getStats();

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

  const globalStats = {
    totalProjects: allProjects?.length || 0,
    activeProjects:
      allProjects?.filter((p) => p.statut === "ACTIVE").length || 0,
    totalFunding: 458000,
    totalInvestments: 342000,
    averageROI: 18.5,
    successRate: 76,
  };

  return (
    <div className="min-h-screen">
      <div
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8"
        id="top"
      >
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-forest">
            Tableau de bord Administration
          </h1>
          <p className="text-sage text-lg">
            Gérez votre plateforme AgriConnect en temps réel
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-cream/50 border-sage/30 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-forest">
                Utilisateurs Totaux
              </CardTitle>
              <Users className="h-5 w-5 text-olive" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-forest">
                {stats.total}
              </div>
              <div className="flex gap-2 mt-2">
                <Badge variant="outline" className="text-xs border-olive/50">
                  <Activity className="h-3 w-3 mr-1" />
                  {stats.active} actifs
                </Badge>
                <Badge variant="outline" className="text-xs border-sage/50">
                  {stats.inactive} inactifs
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-cream/50 border-sage/30 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-forest">
                Projets Totaux
              </CardTitle>
              <FolderKanban className="h-5 w-5 text-olive" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-forest">
                {globalStats.totalProjects}
              </div>
              <div className="flex gap-2 mt-2">
                <Badge variant="outline" className="text-xs border-olive/50">
                  {globalStats.activeProjects} actifs
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-cream/50 border-sage/30 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-forest">
                Financement Total
              </CardTitle>
              <DollarSign className="h-5 w-5 text-olive" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-forest">
                {globalStats.totalFunding.toLocaleString("fr-FR")} €
              </div>
              <p className="text-xs text-sage mt-2">
                {globalStats.totalInvestments.toLocaleString("fr-FR")} €
                collectés
              </p>
            </CardContent>
          </Card>

          <Card className="bg-cream/50 border-sage/30 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-forest">
                Porteurs de Projet
              </CardTitle>
              <Users className="h-5 w-5 text-olive" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-forest">
                {stats.projectOwners}
              </div>
              <p className="text-xs text-sage mt-2">
                {stats.projectOwners} actifs
              </p>
            </CardContent>
          </Card>

          <Card className="bg-cream/50 border-sage/30 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-forest">
                ROI Moyen
              </CardTitle>
              <TrendingUp className="h-5 w-5 text-olive" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-olive">
                +{globalStats.averageROI}%
              </div>
              <p className="text-xs text-sage mt-2">Sur 12 derniers mois</p>
            </CardContent>
          </Card>

          <Card className="bg-cream/50 border-sage/30 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-forest">
                Taux de Succès
              </CardTitle>
              <Target className="h-5 w-5 text-olive" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-olive">
                {globalStats.successRate}%
              </div>
              <p className="text-xs text-sage mt-2">Projets financés</p>
            </CardContent>
          </Card>
        </div>

        <Separator className="bg-sage/30" />

        {/* Tabs for Users and Projects */}
        <Tabs value={section} onValueChange={setSection} className="space-y-6">
          <TabsList className="bg-cream/50 border border-sage/30">
            <TabsTrigger
              value="users"
              className="data-[state=active]:bg-forest data-[state=active]:text-cream"
            >
              <Users className="h-4 w-4 mr-2" />
              Utilisateurs
            </TabsTrigger>
            <TabsTrigger
              value="projects"
              className="data-[state=active]:bg-forest data-[state=active]:text-cream"
            >
              <FolderKanban className="h-4 w-4 mr-2" />
              Projets
            </TabsTrigger>
          </TabsList>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-4" id="users">
            <Card className="bg-cream/50 border-sage/30">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-forest">
                      Gestion des Utilisateurs
                    </CardTitle>
                    <CardDescription className="text-sage">
                      Gérez les comptes et permissions utilisateurs
                    </CardDescription>
                  </div>
                  <CreateUserDialog onCreate={createUser} />
                </div>
              </CardHeader>
              <CardContent>
                <Tabs
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="space-y-4"
                >
                  <TabsList className="bg-olive/10">
                    <TabsTrigger value="all">Tous</TabsTrigger>
                    <TabsTrigger value="active">Actifs</TabsTrigger>
                    <TabsTrigger value="inactive">Inactifs</TabsTrigger>
                    <TabsTrigger value="project-owners">Porteurs</TabsTrigger>
                    <TabsTrigger value="investors">Investisseurs</TabsTrigger>
                  </TabsList>

                  <ScrollArea className="h-150">
                    <UserTable
                      users={users}
                      loading={loading}
                      onEdit={editUser}
                      onDelete={deleteUser}
                    />
                  </ScrollArea>
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-4" id="projects">
            <Card className="bg-cream/50 border-sage/30">
              <CardHeader>
                <CardTitle className="text-forest">
                  Gestion des Projets
                </CardTitle>
                <CardDescription className="text-sage">
                  Gérez et modérez les projets agricoles
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs
                  value={projectTab}
                  onValueChange={setProjectTab}
                  className="space-y-4"
                >
                  <TabsList className="bg-olive/10">
                    <TabsTrigger value="all">Tous</TabsTrigger>
                    <TabsTrigger value="active">Actifs</TabsTrigger>
                    <TabsTrigger value="draft">Brouillons</TabsTrigger>
                    <TabsTrigger value="completed">Terminés</TabsTrigger>
                    <TabsTrigger value="suspended">Suspendus</TabsTrigger>
                  </TabsList>

                  <ScrollArea className="h-150">
                    {isLoadingAllProjects ? (
                      <div className="text-center py-12 text-sage">
                        Chargement des projets...
                      </div>
                    ) : filteredProjects().length === 0 ? (
                      <div className="text-center py-12 text-sage">
                        Aucun projet trouvé
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 pr-4">
                        {filteredProjects().map((project) => (
                          <ProjectCard key={project.id} project={project} />
                        ))}
                      </div>
                    )}
                  </ScrollArea>
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
