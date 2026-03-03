import { useState } from "react";
import { Trash2, Edit } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import EditProjectStageModal from "./EditProjectStageModal";
import { useProject } from "@/features/project/hooks/useProject";
import type { ProjectStage } from "@/features/project/types/project.types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";

interface UpdateProjectStageProps {
  stages: ProjectStage[];
}

export default function UpdateProjectStage({
  stages,
}: UpdateProjectStageProps) {
  const [selectedStage, setSelectedStage] = useState<ProjectStage | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [stageToDelete, setStageToDelete] = useState<ProjectStage | null>(null);

  const {
    updateProjectStage,
    isUpdatingProjectStage,
    deleteProjectStage,
    isDeletingProjectStage,
  } = useProject();

  const handleEdit = (stage: ProjectStage) => {
    setSelectedStage(stage);
    setIsEditModalOpen(true);
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
          setSelectedStage(null);
        },
      },
    );
  };

  const handleDeleteClick = (stage: ProjectStage) => {
    setStageToDelete(stage);
  };

  const handleDeleteConfirm = () => {
    if (stageToDelete) {
      deleteProjectStage(
        { projectStageId: stageToDelete.id },
        {
          onSuccess: () => {
            setStageToDelete(null);
          },
        },
      );
    }
  };

  const activeStages = stages.filter((stage) => !stage.isDeleted);

  return (
    <div className="space-y-4">
      {activeStages.map((stage) => (
        <Card
          key={stage.id}
          className="border-2 border-olive/20 bg-gradient-to-br from-white to-sage/5 shadow-md hover:shadow-lg transition-all duration-200"
        >
          <CardContent className="p-5 lg:p-6 space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-sage/20">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-olive text-cream flex items-center justify-center font-bold">
                  {stage.stageOrder}
                </div>
                <h4 className="font-bold text-lg text-forest">
                  Étape {stage.stageOrder}
                </h4>
              </div>
              <div className="flex gap-2">
                <Button
                  type="button"
                  onClick={() => handleEdit(stage)}
                  variant="ghost"
                  size="sm"
                  className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 transition-colors duration-200"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  onClick={() => handleDeleteClick(stage)}
                  variant="ghost"
                  size="sm"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors duration-200"
                  disabled={isDeletingProjectStage}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <h5 className="font-semibold text-forest">Titre</h5>
              <p className="text-gray-700">{stage.title}</p>
            </div>

            <div className="space-y-2">
              <h5 className="font-semibold text-forest">Description</h5>
              <p className="text-gray-700">{stage.description}</p>
            </div>

            <div className="space-y-2">
              <h5 className="font-semibold text-forest">Montant cible</h5>
              <p className="text-gray-700">
                {stage.targetAmount.toLocaleString()} Ar
              </p>
            </div>

            <div className="space-y-2">
              <h5 className="font-semibold text-forest">Montant collecté</h5>
              <p className="text-gray-700">
                {stage.currentAmount.toLocaleString()} Ar
              </p>
            </div>

            <div className="space-y-2">
              <h5 className="font-semibold text-forest">Statut</h5>
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                  stage.statut === "OPEN"
                    ? "bg-green-100 text-green-800"
                    : stage.statut === "FUNDED"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-gray-100 text-gray-800"
                }`}
              >
                {stage.statut === "OPEN"
                  ? "Ouvert"
                  : stage.statut === "FUNDED"
                    ? "Financé"
                    : "Fermé"}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}

      <EditProjectStageModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedStage(null);
        }}
        stage={selectedStage}
        onUpdate={handleUpdate}
        isUpdating={isUpdatingProjectStage}
      />

      <AlertDialog
        open={!!stageToDelete}
        onOpenChange={() => setStageToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action supprimera l'étape "{stageToDelete?.title}". Cette
              action est irréversible.
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
    </div>
  );
}
