import ProjectOwnerLayout from "@/components/layout/ProjectOwnerLayout";
import ProjectStageCard from "@/components/project/ProjectStageCard";
import { useProject } from "@/features/project/hooks/useProject";
import { ArrowLeftIcon } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ProjectStageList() {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { useGetProjectById, deleteProjectStage } = useProject();
  const { data: project, isLoading } = useGetProjectById(projectId || "");

  const stages = project?.stages || [];

  const handleEditStage = (stageId: string) => {
    // TODO: Open edit modal/form
    console.log("Edit stage:", stageId);
  };

  const handleDeleteStage = (stageId: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette étape ?")) {
      deleteProjectStage(stageId);
    }
  };

  const handleViewDetails = (stageId: string) => {
    // TODO: Navigate to stage details page or open modal
    console.log("View details:", stageId);
  };

  return (
    <div className="space-y-8">
      <ProjectOwnerLayout />
      <div className="p-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex items-center space-x-3">
            <button
              className="p-2 text-sage hover:text-cream hover:bg-olive rounded-full transition-colors duration-200"
              onClick={() => navigate("/project-owner-dashboard")}
            >
              <ArrowLeftIcon className="h-6 w-6 text-sage mb-2 cursor-pointer" />
            </button>
            <div>
              <h2 className="text-2xl font-bold text-forest mb-2">
                {project?.title || "Étapes du projet"}
              </h2>
              <p className="text-sage">
                Suivez l'avancement de votre projet étape par étape
              </p>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-8">
            <p className="text-sage">Chargement des étapes...</p>
          </div>
        ) : stages.length > 0 ? (
          <>
            {/* Stages List */}
            <div className="space-y-6 mb-8">
              {stages.map((stage) => (
                <ProjectStageCard
                  key={stage.id}
                  stage={stage}
                  onEdit={handleEditStage}
                  onDelete={handleDeleteStage}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>

            {/* Summary */}
            <Card className="bg-sage/10 border border-sage/20">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold text-forest mb-4">
                  Avancement global
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-forest">
                      {stages.filter((s) => s.statut === "CLOSED").length}
                    </p>
                    <p className="text-sage">Étapes terminées</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-forest">
                      €
                      {stages
                        .reduce((sum, s) => sum + s.collectedAmount, 0)
                        .toLocaleString()}
                    </p>
                    <p className="text-sage">Total collecté</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-forest">
                      €
                      {stages
                        .reduce((sum, s) => sum + s.targetAmount, 0)
                        .toLocaleString()}
                    </p>
                    <p className="text-sage">Objectif total</p>
                  </div>
                </div>
                <p className="text-sage">
                  Gérez les étapes de votre projet pour suivre l'avancement et
                  atteindre vos objectifs agricoles.
                </p>
              </CardContent>
            </Card>
          </>
        ) : (
          <Card className="border border-sage/10">
            <CardContent className="p-8 text-center">
              <p className="text-sage mb-4">
                Ce projet n'a pas encore d'étapes définies
              </p>
              <Button className="bg-forest text-cream hover:bg-olive">
                Ajouter des étapes
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
