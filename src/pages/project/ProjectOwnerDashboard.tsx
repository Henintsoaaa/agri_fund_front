import { useEffect } from "react";
import { useProject } from "@/features/project/hooks/useProject";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FolderKanban,
  Plus,
  TrendingUp,
  Users,
  DollarSign,
  Target,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getImageUrl } from "@/lib/utils/image";

export default function ProjectOwnerDashboard() {
  const { myProjects, isLoadingMyProjects, refetchMyProjects } = useProject();
  const navigate = useNavigate();

  useEffect(() => {
    refetchMyProjects();
  }, [refetchMyProjects]);

  const getStatutColor = (statut: string) => {
    switch (statut) {
      case "ACTIVE":
        return "bg-olive text-cream";
      case "DRAFT":
        return "bg-sage text-cream";
      case "COMPLETED":
        return "bg-forest text-cream";
      case "SUSPENDED":
        return "bg-destructive text-cream";
      default:
        return "bg-sage text-cream";
    }
  };

  const getStatutLabel = (statut: string) => {
    switch (statut) {
      case "ACTIVE":
        return "Actif";
      case "DRAFT":
        return "Brouillon";
      case "COMPLETED":
        return "Terminé";
      case "SUSPENDED":
        return "Suspendu";
      default:
        return statut;
    }
  };

  // Calculate statistics
  const stats = {
    totalProjects: myProjects?.length || 0,
    activeProjects:
      myProjects?.filter((p) => p.statut === "ACTIVE").length || 0,
    totalStages:
      myProjects?.reduce((acc, p) => acc + (p.stages?.length || 0), 0) || 0,
    totalFunding:
      myProjects?.reduce(
        (acc, p) =>
          acc +
          (p.stages?.reduce((s, stage) => s + stage.targetAmount, 0) || 0),
        0,
      ) || 0,
    totalCollected:
      myProjects?.reduce(
        (acc, p) =>
          acc +
          (p.stages?.reduce((s, stage) => s + stage.currentAmount, 0) || 0),
        0,
      ) || 0,
  };

  const progressPercentage =
    stats.totalFunding > 0
      ? Math.round((stats.totalCollected / stats.totalFunding) * 100)
      : 0;

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-forest">
            Mes Projets Agricoles
          </h1>
          <p className="text-sage text-lg">
            Gérez et suivez l'évolution de vos projets
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-cream/50 border-sage/30 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-forest">
                Projets Totaux
              </CardTitle>
              <FolderKanban className="h-5 w-5 text-olive" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-forest">
                {stats.totalProjects}
              </div>
              <p className="text-xs text-sage mt-2">
                {stats.activeProjects} actifs
              </p>
            </CardContent>
          </Card>

          <Card className="bg-cream/50 border-sage/30 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-forest">
                Étapes Totales
              </CardTitle>
              <Target className="h-5 w-5 text-olive" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-forest">
                {stats.totalStages}
              </div>
              <p className="text-xs text-sage mt-2">Toutes phases confondues</p>
            </CardContent>
          </Card>

          <Card className="bg-cream/50 border-sage/30 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-forest">
                Objectif Total
              </CardTitle>
              <DollarSign className="h-5 w-5 text-olive" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-forest">
                {stats.totalFunding.toLocaleString("fr-FR")} MGA
              </div>
              <p className="text-xs text-sage mt-2">Sur tous les projets</p>
            </CardContent>
          </Card>

          <Card className="bg-cream/50 border-sage/30 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-forest">
                Fonds Collectés
              </CardTitle>
              <TrendingUp className="h-5 w-5 text-olive" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-olive">
                {stats.totalCollected.toLocaleString("fr-FR")} MGA
              </div>
              <div className="mt-2">
                <Progress value={progressPercentage} className="h-2" />
                <p className="text-xs text-sage mt-1">
                  {progressPercentage}% de l'objectif
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Separator className="bg-sage/30" />

        {/* Projects List */}
        <Card className="bg-cream/50 border-sage/30">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-forest">Mes Projets</CardTitle>
                <CardDescription className="text-sage">
                  Vue d'ensemble de tous vos projets
                </CardDescription>
              </div>
              <Button
                onClick={() => navigate("/create-project")}
                className="bg-forest hover:bg-forest/90 text-cream gap-2"
              >
                <Plus className="h-4 w-4" />
                Nouveau Projet
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {isLoadingMyProjects ? (
              <div className="text-center py-12 text-sage">
                Chargement de vos projets...
              </div>
            ) : !myProjects || myProjects.length === 0 ? (
              <div className="text-center py-12">
                <FolderKanban className="h-16 w-16 mx-auto text-sage/50 mb-4" />
                <h3 className="text-lg font-semibold text-forest mb-2">
                  Aucun projet pour le moment
                </h3>
                <p className="text-sage mb-4">
                  Créez votre premier projet agricole
                </p>
                <Button
                  onClick={() => navigate("/create-project")}
                  className="bg-forest hover:bg-forest/90 text-cream"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Créer un projet
                </Button>
              </div>
            ) : (
              <ScrollArea className="h-150">
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 pr-4">
                  {myProjects.map((project) => {
                    const projectTotalTarget =
                      project.stages?.reduce(
                        (acc, stage) => acc + stage.targetAmount,
                        0,
                      ) || 0;
                    const projectTotalCollected =
                      project.stages?.reduce(
                        (acc, stage) => acc + stage.currentAmount,
                        0,
                      ) || 0;
                    const projectProgress =
                      projectTotalTarget > 0
                        ? Math.round(
                            (projectTotalCollected / projectTotalTarget) * 100,
                          )
                        : 0;

                    return (
                      <Card
                        key={project.id}
                        className="bg-cream border-sage/30 hover:shadow-lg transition-shadow overflow-hidden group"
                      >
                        {/* Project Image */}
                        <div className="relative h-48 overflow-hidden bg-linear-to-br from-olive/20 to-sage/20">
                          {project.image ? (
                            <img
                              src={getImageUrl(project.image)}
                              alt={project.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <FolderKanban className="h-16 w-16 text-olive/50" />
                            </div>
                          )}
                          <Badge
                            className={`absolute top-3 right-3 ${getStatutColor(
                              project.statut,
                            )}`}
                          >
                            {getStatutLabel(project.statut)}
                          </Badge>
                        </div>

                        <CardHeader className="pb-3">
                          <CardTitle className="text-forest line-clamp-1">
                            {project.title}
                          </CardTitle>
                          <CardDescription className="text-sage line-clamp-2">
                            {project.description}
                          </CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-4">
                          {/* Stats */}
                          <div className="grid grid-cols-2 gap-3">
                            <div className="flex items-center gap-2 text-sm">
                              <Target className="h-4 w-4 text-olive" />
                              <span className="text-forest">
                                {project.stages?.length || 0} étapes
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Users className="h-4 w-4 text-olive" />
                              <span className="text-forest">
                                0 investisseurs
                              </span>
                            </div>
                          </div>

                          {/* Progress */}
                          <div>
                            <div className="flex justify-between text-sm mb-2">
                              <span className="text-forest font-semibold">
                                {projectTotalCollected.toLocaleString("fr-FR")}{" "}
                                MGA
                              </span>
                              <span className="text-sage">
                                / {projectTotalTarget.toLocaleString("fr-FR")}{" "}
                                MGA
                              </span>
                            </div>
                            <Progress value={projectProgress} className="h-2" />
                            <p className="text-xs text-sage mt-1">
                              {projectProgress}% financé
                            </p>
                          </div>

                          <Separator className="bg-sage/30" />

                          {/* Actions */}
                          <div className="flex gap-2">
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="flex-1 border-olive/50 hover:bg-olive/10"
                                  onClick={() =>
                                    navigate(`/project-stage/${project.id}`)
                                  }
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Voir les détails</p>
                              </TooltipContent>
                            </Tooltip>

                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="flex-1 border-olive/50 hover:bg-olive/10"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Modifier</p>
                              </TooltipContent>
                            </Tooltip>

                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="flex-1 border-destructive/50 hover:bg-destructive/10"
                                >
                                  <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Supprimer</p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </ScrollArea>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
