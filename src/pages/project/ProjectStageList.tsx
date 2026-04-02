import ProjectStageCard from "@/components/project/ProjectStageCard";
import { useProject } from "@/features/project/hooks/useProject";
import { useAuthContext } from "@/features/auth/context/AuthContext";
import {
  ArrowLeftIcon,
  Plus,
  Target,
  TrendingUp,
  CheckCircle2,
  Trash2,
} from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { EditProjectStageDialog } from "@/components/project/EditProjectStageDialog";
import type { ProjectStage } from "@/features/project/types/project.types";

export default function ProjectStageList() {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const {
    useGetProjectById,
    deleteProjectStage,
    updateProjectStage,
    createProjectStage,
    isUpdatingProjectStage,
  } = useProject();
  const { data: project, isLoading } = useGetProjectById(projectId || "");

  const stages = project?.stages || [];

  const totalCollected = stages.reduce((sum, s) => sum + s.currentAmount, 0);
  const totalTarget = stages.reduce((sum, s) => sum + s.targetAmount, 0);
  const completedStages = stages.filter((s) => s.statut === "FUNDED").length;

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [stageToDelete, setStageToDelete] = useState<{
    id: string;
    title: string;
  } | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [stageToEdit, setStageToEdit] = useState<ProjectStage | null>(null);
  const [isCreateMode, setIsCreateMode] = useState(false);

  // Determine the correct return path based on user role
  const getReturnPath = () => {
    if (user?.role === "INVESTOR") {
      return "/investor";
    } else if (user?.role === "PROJECT_OWNER") {
      return "/project-owner";
    } else if (user?.role === "ADMIN") {
      return "/admin-dashboard";
    }
    return "/";
  };

  const handleEditStage = (stage: ProjectStage) => {
    setIsCreateMode(false);
    setStageToEdit(stage);
    setEditDialogOpen(true);
  };

  const handleAddStage = () => {
    setIsCreateMode(true);
    setStageToEdit({
      id: "",
      projectId: projectId || "",
      title: "",
      description: "",
      targetAmount: 0,
      currentAmount: 0,
      stageOrder: stages.length + 1,
      statut: "OPEN",
      image: "",
      isDeleted: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    setEditDialogOpen(true);
  };

  const handleDeleteStage = (stage: ProjectStage) => {
    setStageToDelete({ id: stage.id, title: stage.title });
    setDeleteDialogOpen(true);
  };

  const confirmDeleteStage = () => {
    if (stageToDelete) {
      deleteProjectStage({ projectStageId: stageToDelete.id });
      setDeleteDialogOpen(false);
      setStageToDelete(null);
    }
  };

  const handleSaveEdit = async (data: {
    title: string;
    description: string;
    targetAmount: number;
    image?: string;
  }) => {
    if (isCreateMode) {
      await createProjectStage({
        projectId: projectId || "",
        data: {
          title: data.title,
          description: data.description,
          targetAmount: data.targetAmount,
          image: data.image || "",
          stageOrder: 0, // Will be calculated in backend
        },
      });
      setEditDialogOpen(false);
      setStageToEdit(null);
      setIsCreateMode(false);
      return;
    }

    if (stageToEdit) {
      await updateProjectStage({ projectStageId: stageToEdit.id, data });
      setEditDialogOpen(false);
      setStageToEdit(null);
      setIsCreateMode(false);
    }
  };

  return (
    <div className="h-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 h-full">
        {/* Header */}
        <div className="flex flex-col gap-4">
          <Button
            variant="ghost"
            onClick={() => navigate(getReturnPath())}
            className="w-fit text-sage hover:text-forest hover:bg-sage/10 gap-2"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Retour au tableau de bord
          </Button>

          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold text-forest">
              {project?.title || "Étapes du projet"}
            </h1>
            <p className="text-sage text-lg">
              {user?.role === "PROJECT_OWNER"
                ? "Suivez l'avancement de votre projet étape par étape"
                : user?.role === "INVESTOR"
                  ? "Investissez dans les différentes étapes du projet"
                  : "Visualisez les étapes de financement du projet"}
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-16">
            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-sage/20 border-t-forest mb-4"></div>
            <p className="text-sage font-medium">Chargement des étapes...</p>
          </div>
        ) : stages.length > 0 ? (
          <>
            {/* Summary Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <Card className="bg-cream/50 border-sage/30 hover:shadow-lg transition-shadow ">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-forest">
                    Étapes Terminées
                  </CardTitle>
                  <CheckCircle2 className="h-5 w-5 text-olive" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-forest">
                    {completedStages}
                  </div>
                  <p className="text-xs text-sage mt-2">
                    Sur {stages.length} étapes
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-cream/50 border-sage/30 hover:shadow-lg transition-shadow ">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-forest">
                    Total Collecté
                  </CardTitle>
                  <TrendingUp className="h-5 w-5 text-olive" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-olive">
                    {totalCollected.toLocaleString("fr-FR")} MGA
                  </div>
                  <p className="text-xs text-sage mt-2">
                    {totalTarget > 0
                      ? Math.round((totalCollected / totalTarget) * 100)
                      : 0}
                    % de l'objectif
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-cream/50 border-sage/30 hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-forest">
                    Objectif Total
                  </CardTitle>
                  <Target className="h-5 w-5 text-olive" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-forest">
                    {totalTarget.toLocaleString("fr-FR")} MGA
                  </div>
                  <p className="text-xs text-sage mt-2">
                    Toutes étapes confondues
                  </p>
                </CardContent>
              </Card>
            </div>

            <Separator className="bg-sage/30" />

            {/* Stages List */}
            <Card className="bg-cream/50 border-sage/30 h-full py-3">
              <CardHeader>
                <CardTitle className="text-forest">Étapes du projet</CardTitle>
                <CardDescription className="text-sage">
                  {user?.role === "PROJECT_OWNER"
                    ? "Gérez les étapes de financement de votre projet"
                    : user?.role === "INVESTOR"
                      ? "Investissez étapes par étapes."
                      : "Visualisez les étapes de tous les projets"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-150">
                  <div className="grid grid-cols-1 gap-4 pr-2 sm:pr-4 md:grid-cols-2 xl:grid-cols-3">
                    {stages.map((stage) => {
                      const isLocked =
                        user?.role !== "PROJECT_OWNER" &&
                        stage.statut === "CLOSED";
                      return (
                        <div
                          key={stage.id}
                          className={`min-w-0 ${
                            isLocked
                              ? "relative pointer-events-none select-none opacity-60 grayscale-80 cursor-not-allowed"
                              : ""
                          }`}
                        >
                          <ProjectStageCard
                            projectId={projectId || ""}
                            stage={stage}
                            role={
                              user?.role === "INVESTOR"
                                ? "investor"
                                : user?.role === "ADMIN"
                                  ? "admin"
                                  : "owner"
                            }
                            onEdit={
                              user?.role !== "INVESTOR"
                                ? () => handleEditStage(stage as ProjectStage)
                                : undefined
                            }
                            onDelete={
                              user?.role !== "INVESTOR"
                                ? () => handleDeleteStage(stage as ProjectStage)
                                : undefined
                            }
                            onViewDetails={() => {}}
                          />
                          {isLocked && (
                            <div className="absolute inset-0 bg-gray-900/10 backdrop-blur-[0.5px]" />
                          )}
                        </div>
                      );
                    })}

                    {user?.role === "PROJECT_OWNER" && (
                      <Card
                        role="button"
                        tabIndex={0}
                        onClick={handleAddStage}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            handleAddStage();
                          }
                        }}
                        className="border-2 border-dashed border-sage/40 bg-cream/40 hover:bg-olive/5 hover:border-olive/60 transition-colors cursor-pointer"
                      >
                        <CardContent className="h-full min-h-60 flex flex-col items-center justify-center text-center p-6">
                          <div className="h-12 w-12 rounded-full bg-olive/15 flex items-center justify-center mb-3">
                            <Plus className="h-6 w-6 text-olive" />
                          </div>
                          <h3 className="text-forest font-semibold text-base">
                            Ajouter une étape
                          </h3>
                          <p className="text-sage text-sm mt-1">
                            Ouvrir le formulaire de l'étape
                          </p>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </>
        ) : (
          <Card className="bg-cream/50 border-sage/30">
            <CardContent className="py-12 text-center">
              <Plus className="h-16 w-16 mx-auto text-sage/50 mb-4" />
              <h3 className="text-lg font-semibold text-forest mb-2">
                Aucune étape définie
              </h3>
              <p className="text-sage mb-4">
                Ce projet n'a pas encore d'étapes de financement.
              </p>
              {user?.role === "PROJECT_OWNER" && (
                <Button
                  onClick={() => navigate("/project-owner/create-project")}
                  className="bg-forest text-cream hover:bg-forest/90"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Créer un nouveau projet avec étapes
                </Button>
              )}
              {user?.role === "INVESTOR" && (
                <p className="text-sm text-sage italic">
                  Le porteur de projet n'a pas encore défini d'étapes de
                  financement.
                </p>
              )}
            </CardContent>
          </Card>
        )}

        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-forest">
                Confirmer la suppression
              </DialogTitle>
              <DialogDescription className="text-sage">
                Êtes-vous sûr de vouloir supprimer l'étape "
                {stageToDelete?.title}" ? Cette action est irréversible.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="gap-2">
              <Button
                variant="outline"
                onClick={() => setDeleteDialogOpen(false)}
                className="border-sage/50 text-sage hover:bg-sage/10"
              >
                Annuler
              </Button>
              <Button
                variant="destructive"
                onClick={confirmDeleteStage}
                className="bg-destructive hover:bg-destructive/90"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Supprimer
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Stage Dialog */}
        {stageToEdit && (
          <EditProjectStageDialog
            open={editDialogOpen}
            onOpenChange={(open) => {
              setEditDialogOpen(open);
              if (!open) {
                setIsCreateMode(false);
                setStageToEdit(null);
              }
            }}
            stage={stageToEdit}
            mode={isCreateMode ? "create" : "update"}
            onSave={handleSaveEdit}
            isLoading={isUpdatingProjectStage}
          />
        )}
      </div>
    </div>
  );
}
