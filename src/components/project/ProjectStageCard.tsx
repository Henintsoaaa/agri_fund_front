import { useState } from "react";
import { Edit, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import EditProjectStageModal from "./EditProjectStageModal";
import { useProject } from "@/features/project/hooks/useProject";
import type { ProjectStage } from "@/features/project/types/project.types";

interface ProjectStageCardProps {
  stage: ProjectStage;
  onEdit?: (stageId: string) => void;
  onDelete?: (stageId: string) => void;
  onViewDetails?: (stageId: string) => void;
}

export default function ProjectStageCard({
  stage,
  onEdit,
  onDelete,
}: ProjectStageCardProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const {
    updateProjectStage,
    isUpdatingProjectStage,
    deleteProjectStage,
    isDeletingProjectStage,
  } = useProject();

  const handleEditClick = () => {
    setIsEditModalOpen(true);
    onEdit?.(stage.id);
  };

  const handleDeleteClick = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleUpdate = (
    stageId: string,
    data: { title: string; description: string },
  ) => {
    updateProjectStage(
      { projectStageId: stageId, data },
      {
        onSuccess: () => {
          setIsEditModalOpen(false);
        },
      },
    );
  };

  const handleDeleteConfirm = () => {
    deleteProjectStage(
      { projectStageId: stage.id, isDeleted: true },
      {
        onSuccess: () => {
          setIsDeleteDialogOpen(false);
          onDelete?.(stage.id);
        },
      },
    );
  };

  const progressPercentage = (stage.collectedAmount / stage.targetAmount) * 100;

  const getStatusColor = (statut: string) => {
    switch (statut) {
      case "CLOSED":
        return "bg-grey-100 text-green-800";
      case "FUNDED":
        return "bg-blue-100 text-blue-800";
      case "OPEN":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (statut: string) => {
    switch (statut) {
      case "CLOSED":
        return "Fermee";
      case "FUNDED":
        return "Financée";
      case "OPEN":
        return "Ouverte";
      default:
        return statut;
    }
  };

  const getProgressColor = (statut: string) => {
    switch (statut) {
      case "CLOSED":
        return "bg-green-500";
      case "FUNDED":
        return "bg-blue-500";
      case "OPEN":
        return "bg-olive";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <Card className="border border-sage/10 hover:shadow-xl">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Stage Order Indicator */}
          <div className="flex items-center justify-center">
            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-olive text-cream text-lg font-bold">
              {stage.stageOrder}
            </div>
          </div>

          <div className="flex-1">
            <div className="flex flex-col sm:flex-row justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2 flex-wrap">
                  <h4 className="text-xl font-bold text-forest">
                    {stage.title}
                  </h4>
                  <Badge className={getStatusColor(stage.statut)}>
                    {getStatusLabel(stage.statut)}
                  </Badge>
                </div>
                <p className="text-sage mb-4">{stage.description}</p>
              </div>
            </div>

            {/* Progress */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-forest">
                  €{stage.collectedAmount.toLocaleString()} / €
                  {stage.targetAmount.toLocaleString()}
                </span>
                <span className="text-sm font-medium text-olive">
                  {Math.round(progressPercentage)}%
                </span>
              </div>
              <Progress
                value={progressPercentage}
                className="h-3"
                indicatorClassName={getProgressColor(stage.statut)}
              />
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3">
              <Button
                onClick={handleEditClick}
                className="bg-forest text-cream hover:bg-olive"
                size="sm"
              >
                <Edit className="h-4 w-4 mr-2" />
                Modifier
              </Button>
              <Button
                onClick={handleDeleteClick}
                variant="outline"
                className="border-red-300 text-red-600 hover:bg-red-50"
                size="sm"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Supprimer
              </Button>
            </div>
          </div>
        </div>
      </CardContent>

      {/* Edit Modal */}
      <EditProjectStageModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        stage={stage}
        onUpdate={handleUpdate}
        isUpdating={isUpdatingProjectStage}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action supprimera l'étape "{stage.title}". Cette action est
              irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeletingProjectStage}>
              Annuler
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              disabled={isDeletingProjectStage}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeletingProjectStage ? "Suppression..." : "Supprimer"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}
