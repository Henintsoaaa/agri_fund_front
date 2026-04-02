import { useState, useEffect } from "react";
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
  DollarSign,
  Target,
  Trash2,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { EditProjectDialog } from "../../components/project/EditProjectDialog";
import ProjectCard from "@/components/project/ProjectCard";
import type { Project } from "@/features/project/types/project.types";

export default function ProjectOwnerDashboard() {
  const {
    myProjects,
    isLoadingMyProjects,
    refetchMyProjects,
    deleteProject,
    updateProject,
    isUpdatingProject,
  } = useProject();
  const navigate = useNavigate();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<{
    id: string;
    title: string;
  } | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);

  useEffect(() => {
    refetchMyProjects();
  }, [refetchMyProjects]);

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

  const handleDeleteProject = (projectId: string, projectTitle: string) => {
    setProjectToDelete({ id: projectId, title: projectTitle });
    setDeleteDialogOpen(true);
  };

  const confirmDeleteProject = () => {
    if (projectToDelete) {
      deleteProject(projectToDelete.id);
      setDeleteDialogOpen(false);
      setProjectToDelete(null);
    }
  };

  const handleEditProject = (project: Project) => {
    setProjectToEdit(project);
    setEditDialogOpen(true);
  };

  const handleSaveEdit = async (data: {
    title: string;
    description: string;
    image?: string;
  }) => {
    if (projectToEdit) {
      await updateProject({ projectId: projectToEdit.id, data });
      setEditDialogOpen(false);
      setProjectToEdit(null);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-forest">
            Mes Projets Agricoles
          </h1>
          <p className="text-sage text-lg">
            Gérez et suivez l'evolution de vos projets
          </p>
        </div>

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
                Etapes Totales
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
                Fonds Collectes
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
                onClick={() => navigate("/project-owner/create-project")}
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
                  Creez votre premier projet agricole
                </p>
                <Button
                  onClick={() => navigate("/project-owner/create-project")}
                  className="bg-forest hover:bg-forest/90 text-cream"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Creer un projet
                </Button>
              </div>
            ) : (
              <ScrollArea className="h-150">
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 pr-4">
                  {myProjects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      role="owner"
                      onEdit={() => handleEditProject(project)}
                      onDelete={() =>
                        handleDeleteProject(project.id, project.title)
                      }
                    />
                  ))}
                </div>
              </ScrollArea>
            )}
          </CardContent>
        </Card>

        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-forest">
                Confirmer la suppression
              </DialogTitle>
              <DialogDescription className="text-sage">
                Etes-vous sur de vouloir supprimer le projet "
                {projectToDelete?.title}" ? Cette action est irreversible.
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
                onClick={confirmDeleteProject}
                className="bg-destructive hover:bg-destructive/90"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Supprimer
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {projectToEdit && (
          <EditProjectDialog
            open={editDialogOpen}
            onOpenChange={setEditDialogOpen}
            project={projectToEdit}
            onSave={handleSaveEdit}
            isLoading={isUpdatingProject}
          />
        )}
      </div>
    </div>
  );
}
