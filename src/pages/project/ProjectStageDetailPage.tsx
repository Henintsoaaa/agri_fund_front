import { useParams, useNavigate } from "react-router-dom";
import { useProject } from "@/features/project/hooks/useProject";
import ProjectStageCard from "@/components/project/ProjectStageCard";
import ProjectStageStats from "@/components/project/ProjectStageStats";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Plus } from "lucide-react";

export default function ProjectStageDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { useGetProjectById, getAllProjectStagesOfProject } = useProject();

  const { data: project, isLoading: isLoadingProject } = useGetProjectById(id!);
  const { data: stages, isLoading: isLoadingStages } =
    getAllProjectStagesOfProject(id!);

  if (isLoadingProject || isLoadingStages) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cream via-sage/5 to-olive/10 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-sage/20 border-t-forest mb-4"></div>
          <p className="text-sage font-medium">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cream via-sage/5 to-olive/10 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-forest mb-4">
              Projet non trouvé
            </h2>
            <Button onClick={() => navigate("/dashboard")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour au tableau de bord
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-sage/5 to-olive/10">
      <div className="container mx-auto px-4 py-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate("/dashboard")}
            className="text-forest hover:text-olive"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>
        </div>

        {/* Project Info */}
        <Card className="bg-gradient-to-br from-forest via-forest/95 to-olive border-none shadow-xl">
          <CardContent className="p-8 text-cream">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">{project.title}</h1>
                <p className="text-cream/90">{project.description}</p>
              </div>
              <Button
                onClick={() => navigate(`/add-stage/${project.id}`)}
                className="bg-cream text-forest hover:bg-cream/90"
              >
                <Plus className="h-4 w-4 mr-2" />
                Ajouter une étape
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <ProjectStageStats projectId={project.id} />

        {/* Stages List */}
        <Card className="border-none shadow-lg bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6 lg:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-forest">
                Étapes du projet
              </h2>
              {stages && stages.length > 0 && (
                <span className="text-sm text-sage font-medium">
                  {stages.length} {stages.length > 1 ? "étapes" : "étape"}
                </span>
              )}
            </div>

            {stages && stages.length > 0 ? (
              <div className="space-y-4">
                {stages.map((stage: any) => (
                  <ProjectStageCard
                    key={stage.id}
                    projectId={project.id}
                    stage={stage}
                    onViewDetails={(stageId: string) =>
                      navigate(`/stage/${stageId}`)
                    }
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="bg-sage/10 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                  <Plus className="h-12 w-12 text-sage" />
                </div>
                <h3 className="text-xl font-semibold text-forest mb-3">
                  Aucune étape pour ce projet
                </h3>
                <p className="text-sage mb-6">
                  Commencez par créer la première étape de votre projet
                </p>
                <Button
                  onClick={() => navigate(`/add-stage/${project.id}`)}
                  className="bg-forest text-cream hover:bg-olive"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Créer une étape
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
