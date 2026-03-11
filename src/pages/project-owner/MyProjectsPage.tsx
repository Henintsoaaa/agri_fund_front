import { useEffect, useState } from "react";
import { useProject } from "@/features/project/hooks/useProject";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FolderKanban, Loader2, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import ProjectCard from "@/components/project/ProjectCard";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function MyProjectsPage() {
  const { myProjects, isLoadingMyProjects, refetchMyProjects } = useProject();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const navigate = useNavigate();

  console.log("MyProjectsPage rendered", { myProjects, isLoadingMyProjects });

  useEffect(() => {
    refetchMyProjects();
  }, [refetchMyProjects]);

  // Filter projects based on search and tab
  const filteredProjects = myProjects?.filter((project) => {
    const matchesSearch = project.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    if (activeTab === "all") return matchesSearch;
    if (activeTab === "active")
      return matchesSearch && project.statut === "ACTIVE";
    if (activeTab === "draft")
      return matchesSearch && project.statut === "DRAFT";
    if (activeTab === "completed")
      return matchesSearch && project.statut === "COMPLETED";
    if (activeTab === "suspended")
      return matchesSearch && project.statut === "SUSPENDED";

    return matchesSearch;
  });

  const projectCounts = {
    all: myProjects?.length || 0,
    active: myProjects?.filter((p) => p.statut === "ACTIVE").length || 0,
    draft: myProjects?.filter((p) => p.statut === "DRAFT").length || 0,
    completed: myProjects?.filter((p) => p.statut === "COMPLETED").length || 0,
    suspended: myProjects?.filter((p) => p.statut === "SUSPENDED").length || 0,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-sage/10 to-olive/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-forest">Mes Projets</h1>
            <p className="text-sage text-lg mt-1">
              Gérez tous vos projets agricoles
            </p>
          </div>
          <Button
            onClick={() => navigate("/project-owner/create-project")}
            className="bg-forest hover:bg-forest/90 text-cream"
          >
            <FolderKanban className="h-4 w-4 mr-2" />
            Créer un projet
          </Button>
        </div>

        {/* Search Bar */}
        <Card className="bg-cream/50 border-sage/30">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-sage" />
              <Input
                placeholder="Rechercher un projet..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-sage/30 bg-cream"
              />
            </div>
          </CardContent>
        </Card>

        {/* Projects Section */}
        <Card className="bg-cream/50 border-sage/30">
          <CardHeader>
            <CardTitle className="text-forest text-2xl">
              Liste des Projets
            </CardTitle>
            <CardDescription className="text-sage">
              {projectCounts.all} projet(s) au total
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="space-y-6"
            >
              <TabsList className="bg-olive/10">
                <TabsTrigger value="all">
                  Tous ({projectCounts.all})
                </TabsTrigger>
                <TabsTrigger value="active">
                  Actifs ({projectCounts.active})
                </TabsTrigger>
                <TabsTrigger value="draft">
                  Brouillons ({projectCounts.draft})
                </TabsTrigger>
                <TabsTrigger value="completed">
                  Complétés ({projectCounts.completed})
                </TabsTrigger>
                <TabsTrigger value="suspended">
                  Suspendus ({projectCounts.suspended})
                </TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="space-y-4">
                {isLoadingMyProjects ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-olive" />
                  </div>
                ) : !filteredProjects || filteredProjects.length === 0 ? (
                  <div className="text-center py-12">
                    <FolderKanban className="h-16 w-16 mx-auto mb-4 text-sage opacity-50" />
                    <p className="text-sage text-lg mb-2">
                      {searchQuery
                        ? "Aucun projet trouvé"
                        : activeTab === "all"
                          ? "Vous n'avez pas encore de projets"
                          : `Aucun projet ${
                              activeTab === "active"
                                ? "actif"
                                : activeTab === "draft"
                                  ? "brouillon"
                                  : activeTab === "completed"
                                    ? "complété"
                                    : "suspendu"
                            }`}
                    </p>
                    {!searchQuery && activeTab === "all" && (
                      <Button
                        onClick={() =>
                          navigate("/project-owner/create-project")
                        }
                        className="bg-forest hover:bg-forest/90 text-cream mt-4"
                      >
                        Créer votre premier projet
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredProjects.map((project) => (
                      <ProjectCard
                        key={project.id}
                        project={project}
                        role="owner"
                      />
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
