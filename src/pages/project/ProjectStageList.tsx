import ProjectStageCard from "@/components/project/ProjectStageCard";
import { useProject } from "@/features/project/hooks/useProject";
import { ArrowLeftIcon, Plus } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ProjectStageList() {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { useGetProjectById } = useProject();
  const { data: project, isLoading } = useGetProjectById(projectId || "");

  const stages = project?.stages || [];

  const handleEditStage = (stageId: string) => {
    // TODO: Implement edit functionality
    console.log("Edit stage:", stageId);
  };

  const handleDeleteStage = (stageId: string) => {
    // TODO: Implement delete functionality
    console.log("Delete stage:", stageId);
  };

  const handleViewDetails = (stageId: string) => {
    // TODO: Implement view details functionality
    console.log("View details:", stageId);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-cream via-sage/5 to-olive/10 px-36">
      <div className="p-6 sm:p-8 lg:p-12">
        {/* Header */}
        <div className="mb-8">
          <button
            className="flex items-center space-x-2 text-sage hover:text-forest mb-4 group transition-colors duration-200"
            onClick={() => navigate("/project-owner")}
          >
            <div className="p-2 rounded-full group-hover:bg-sage/10 transition-colors duration-200">
              <ArrowLeftIcon className="h-5 w-5" />
            </div>
            <span className="font-medium">Retour au tableau de bord</span>
          </button>
          <Card className="border-none shadow-xl bg-linear-to-br from-forest via-forest/95 to-olive relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMDUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
            <CardContent className="p-6 lg:p-8 text-cream relative z-10">
              <h1 className="text-3xl lg:text-4xl font-bold mb-3">
                {project?.title || "Étapes du projet"}
              </h1>
              <p className="text-cream/90 text-lg">
                Suivez l'avancement de votre projet étape par étape
              </p>
            </CardContent>
          </Card>
        </div>

        {isLoading ? (
          <div className="text-center py-16">
            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-sage/20 border-t-forest mb-4"></div>
            <p className="text-sage font-medium">Chargement des étapes...</p>
          </div>
        ) : stages.length > 0 ? (
          <>
            {/* Stages List */}
            <div className="space-y-5 mb-8">
              {stages.map((stage) => (
                <div
                  key={stage.id}
                  className="transform transition-all duration-200 hover:scale-[1.01]"
                >
                  <ProjectStageCard
                    stage={stage}
                    onEdit={handleEditStage}
                    onDelete={handleDeleteStage}
                    onViewDetails={handleViewDetails}
                  />
                </div>
              ))}
            </div>

            {/* Summary */}
            <Card className="bg-linear-to-br from-sage/20 via-olive/10 to-sage/10 border-none shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-olive/10 rounded-full blur-3xl"></div>
              <CardContent className="p-8 lg:p-10 text-center relative z-10">
                <h2 className="text-2xl lg:text-3xl font-bold text-forest mb-6">
                  Avancement global
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-md">
                    <p className="text-4xl font-bold text-forest mb-2">
                      {stages.filter((s) => s.statut === "CLOSED").length}
                    </p>
                    <p className="text-sage font-medium">Étapes terminées</p>
                  </div>
                  <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-md">
                    <p className="text-4xl font-bold text-forest mb-2">
                      €
                      {stages
                        .reduce((sum, s) => sum + s.collectedAmount, 0)
                        .toLocaleString()}
                    </p>
                    <p className="text-sage font-medium">Total collecté</p>
                  </div>
                  <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-md">
                    <p className="text-4xl font-bold text-forest mb-2">
                      €
                      {stages
                        .reduce((sum, s) => sum + s.targetAmount, 0)
                        .toLocaleString()}
                    </p>
                    <p className="text-sage font-medium">Objectif total</p>
                  </div>
                </div>
                <p className="text-sage text-lg leading-relaxed max-w-2xl mx-auto">
                  Gérez les étapes de votre projet pour suivre l'avancement et
                  atteindre vos objectifs agricoles.
                </p>
              </CardContent>
            </Card>
          </>
        ) : (
          <Card className="border-none shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-12 text-center">
              <div className="bg-sage/10 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                <Plus className="h-12 w-12 text-sage" />
              </div>
              <h3 className="text-2xl font-semibold text-forest mb-3">
                Aucune étape définie
              </h3>
              <p className="text-sage mb-6 max-w-md mx-auto">
                Ce projet n'a pas encore d'étapes de financement. Commencez par
                ajouter votre première étape.
              </p>
              <Button
                className="bg-forest text-cream hover:bg-olive hover:scale-105 transition-all duration-200 shadow-lg"
                size="lg"
              >
                <Plus className="h-5 w-5 mr-2" />
                Ajouter des étapes
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
