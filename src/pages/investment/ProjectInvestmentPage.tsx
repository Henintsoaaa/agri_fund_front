import { useParams, useNavigate } from "react-router-dom";
import { useProject } from "@/features/project/hooks/useProject";
import { ProjectStageInvestmentCard } from "@/components/invest/ProjectStageInvestmentCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, MapPin } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export default function ProjectInvestmentPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { useProjectById } = useProject();

  const {
    data: project,
    isLoading: isLoadingProject,
    refetch: refetchProject,
  } = useProjectById(projectId!);

  const statusConfig = {
    DRAFT: { label: "Brouillon", variant: "outline" as const },
    ACTIVE: { label: "Actif", variant: "default" as const },
    COMPLETED: { label: "Terminé", variant: "secondary" as const },
    SUSPENDED: { label: "Suspendu", variant: "destructive" as const },
  };

  if (isLoadingProject) {
    return (
      <div className="container mx-auto py-8 space-y-6">
        <Skeleton className="h-12 w-64" />
        <Skeleton className="h-64 w-full" />
        <div className="grid gap-6 md:grid-cols-2">
          <Skeleton className="h-96" />
          <Skeleton className="h-96" />
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="container mx-auto py-8">
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-lg font-medium text-muted-foreground">
              Projet non trouvé
            </p>
            <Button
              variant="outline"
              onClick={() => navigate("/investor/projects")}
              className="mt-4"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour aux projets
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const status =
    statusConfig[project.statut as keyof typeof statusConfig] ||
    statusConfig.DRAFT;
  const sortedStages =
    project.stages
      ?.filter((stage: any) => !stage.isDeleted)
      .sort((a: any, b: any) => a.stageOrder - b.stageOrder) || [];

  return (
    <div className="container mx-auto py-8 space-y-6">
      {/* Back Button */}
      <Button variant="ghost" onClick={() => navigate("/investor/projects")}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Retour aux projets
      </Button>

      {/* Project Header */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <CardTitle className="text-3xl">{project.title}</CardTitle>
                <Badge variant={status.variant}>{status.label}</Badge>
              </div>
              <CardDescription className="text-base mt-2">
                {project.description}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>
                Créé le{" "}
                {format(new Date(project.createdAt), "dd MMMM yyyy", {
                  locale: fr,
                })}
              </span>
            </div>
            {project.category && (
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{project.category}</span>
              </div>
            )}
          </div>

          {project.image && (
            <div className="mt-6">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Stages Section */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Stages d'Investissement</h2>
        {sortedStages.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {sortedStages.map((stage: any) => (
              <ProjectStageInvestmentCard
                key={stage.id}
                stage={stage}
                onInvestmentSuccess={() => refetchProject()}
              />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-lg font-medium text-muted-foreground">
                Aucun stage d'investissement disponible pour ce projet
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Investment Guide */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-lg">Comment investir ?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>1. Choisissez un stage d'investissement qui vous intéresse</p>
          <p>2. Cliquez sur "Investir dans ce stage"</p>
          <p>3. Saisissez le montant que vous souhaitez investir</p>
          <p>
            4. Choisissez votre mode de paiement (Carte, PayPal, ou Virement)
          </p>
          <p>5. Confirmez votre investissement</p>
          <p className="text-muted-foreground mt-4">
            Vous pourrez suivre tous vos investissements dans votre tableau de
            bord
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
