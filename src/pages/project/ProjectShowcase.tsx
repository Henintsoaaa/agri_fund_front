import { useState } from "react";
import { useProject } from "@/features/project/hooks/useProject";
import { useInvestment } from "@/features/investment/hooks/useInvestment";
import ProjectCard from "@/components/project/ProjectCard";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Search, Filter, TrendingUp, Users } from "lucide-react";

export default function ProjectShowcase() {
  const {
    allProjects: publicProjects,
    isLoadingAllProjects: isLoadingPublicProjects,
  } = useProject();
  const { myInvestments } = useInvestment();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const getProjectTotals = (project: {
    stages?: Array<{ targetAmount: number; currentAmount: number }>;
  }) => {
    const totalTarget =
      project.stages?.reduce((acc, stage) => acc + stage.targetAmount, 0) || 0;
    const totalCollected =
      project.stages?.reduce((acc, stage) => acc + stage.currentAmount, 0) || 0;

    return { totalTarget, totalCollected };
  };

  const filteredProjects = publicProjects?.filter((project) => {
    const matchesSearch = project.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    const { totalTarget, totalCollected } = getProjectTotals(project);
    const progress =
      totalTarget > 0 ? Math.round((totalCollected / totalTarget) * 100) : 0;

    if (filterStatus === "almost-funded")
      return progress >= 70 && progress < 100;
    if (filterStatus === "trending") return totalCollected > 0;
    if (filterStatus === "new") {
      const createdAt = new Date(project.createdAt);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return createdAt >= thirtyDaysAgo;
    }

    return true;
  });

  const totalRaisedAllProjects =
    publicProjects?.reduce(
      (projectSum, project) =>
        projectSum +
        (project.stages?.reduce(
          (stageSum, stage) => stageSum + stage.currentAmount,
          0,
        ) || 0),
      0,
    ) || 0;

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-forest">
            Explorer les Projets
          </h1>
          <p className="text-sage text-lg">
            Découvrez des opportunités d'investissement agricole
          </p>
        </div>

        <Card className="bg-cream/50 border-sage/30 h-full">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-sage" />
                <Input
                  placeholder="Rechercher un projet..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-sage/30 bg-cream selection:bg-olive selection:text-cream"
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full md:w-48 border-sage/30 bg-cream">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filtrer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les projets</SelectItem>
                  <SelectItem value="trending">Tendance</SelectItem>
                  <SelectItem value="new">Nouveaux</SelectItem>
                  <SelectItem value="almost-funded">
                    Presque financés
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-cream border-olive/35 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-olive/15 border border-olive/30">
                <TrendingUp className="h-6 w-6 text-olive" />
              </div>
              <div>
                <p className="text-2xl font-bold text-forest">
                  {publicProjects?.length || 0}
                </p>
                <p className="text-sm text-olive">Projets actifs</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-cream border-sage/35 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-sage/15 border border-sage/35">
                <Users className="h-6 w-6 text-sage" />
              </div>
              <div>
                <p className="text-2xl font-bold text-forest">
                  {myInvestments?.length || 0}
                </p>
                <p className="text-sm text-sage">Mes investissements</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-cream border-forest/35 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-forest/10 border border-forest/25">
                <TrendingUp className="h-6 w-6 text-forest" />
              </div>
              <div>
                <p className="text-2xl font-bold text-forest">
                  {totalRaisedAllProjects.toLocaleString("fr-FR")} MGA
                </p>
                <p className="text-sm text-sage">Fonds levés</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Separator className="bg-sage/30" />

        <div>
          {isLoadingPublicProjects ? (
            <div className="text-center py-12 text-sage">
              Chargement des projets...
            </div>
          ) : !filteredProjects || filteredProjects.length === 0 ? (
            <Card className="bg-cream/50 border-sage/30">
              <CardContent className="p-12 text-center">
                <Search className="h-16 w-16 mx-auto text-sage/50 mb-4" />
                <h3 className="text-lg font-semibold text-forest mb-2">
                  Aucun projet trouvé
                </h3>
                <p className="text-sage">
                  Modifiez vos critères de recherche ou revenez plus tard
                </p>
              </CardContent>
            </Card>
          ) : (
            <ScrollArea className="h-200">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pr-4">
                {filteredProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    role="investor"
                  />
                ))}
              </div>
            </ScrollArea>
          )}
        </div>
      </div>
    </div>
  );
}
