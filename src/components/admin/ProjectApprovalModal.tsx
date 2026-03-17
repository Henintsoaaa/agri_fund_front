import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle,
  XCircle,
  Loader2,
  AlertTriangle,
  Calendar,
  User,
  DollarSign,
  Target,
} from "lucide-react";
import { useProject } from "@/features/project/hooks/useProject";
import { getImageUrl } from "@/lib/utils/image";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ProjectApprovalModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectId: string;
}

export default function ProjectApprovalModal({
  open,
  onOpenChange,
  projectId,
}: ProjectApprovalModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const { useGetProjectById, activateProject, suspendProject } = useProject();
  const { data: project, isLoading } = useGetProjectById(projectId);

  const handleApprove = async () => {
    setIsProcessing(true);
    try {
      await activateProject(projectId);
      onOpenChange(false);
    } catch (error) {
      console.error("Error approving project:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSuspend = async () => {
    if (
      !confirm(
        "Êtes-vous sûr de vouloir suspendre ce projet ? Les investisseurs seront notifiés.",
      )
    ) {
      return;
    }

    setIsProcessing(true);
    try {
      await suspendProject(projectId);
      onOpenChange(false);
    } catch (error) {
      console.error("Error suspending project:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const getStatutBadge = (statut: string) => {
    switch (statut) {
      case "DRAFT":
        return <Badge className="bg-amber-500 text-white">En attente</Badge>;
      case "ACTIVE":
        return <Badge className="bg-green-500 text-white">Actif</Badge>;
      case "SUSPENDED":
        return <Badge className="bg-red-500 text-white">Suspendu</Badge>;
      case "COMPLETED":
        return <Badge className="bg-blue-500 text-white">Complété</Badge>;
      default:
        return <Badge>{statut}</Badge>;
    }
  };

  if (isLoading) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-2xl">
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-olive" />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (!project) {
    return null;
  }

  const totalTarget =
    project.stages?.reduce(
      (acc: number, stage: any) => acc + stage.targetAmount,
      0,
    ) || 0;
  const totalCollected =
    project.stages?.reduce(
      (acc: number, stage: any) => acc + stage.currentAmount,
      0,
    ) || 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl text-forest flex items-center justify-between">
            Validation du projet
            {getStatutBadge(project.statut)}
          </DialogTitle>
          <DialogDescription className="text-sage">
            Examinez les détails du projet avant de l'approuver ou de le
            suspendre
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="space-y-6">
            {/* Image du projet */}
            {project.image && (
              <div className="w-full h-48 rounded-lg overflow-hidden">
                <img
                  src={getImageUrl(project.image)}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Informations principales */}
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-forest">
                  {project.title}
                </h3>
                <p className="text-sage mt-2">{project.description}</p>
              </div>

              <Separator className="bg-sage/30" />

              {/* Métadonnées */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4 text-olive" />
                  <span className="text-sage">
                    ID Porteur: {project.ownerId}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-olive" />
                  <span className="text-sage">
                    Créé le:{" "}
                    {new Date(project.createdAt).toLocaleDateString("fr-FR")}
                  </span>
                </div>
              </div>

              <Separator className="bg-sage/30" />

              {/* Statistiques financières */}
              <div className="space-y-3">
                <h4 className="font-semibold text-forest flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-olive" />
                  Objectifs financiers
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-cream/50 p-3 rounded-lg border border-sage/20">
                    <p className="text-xs text-sage mb-1">Objectif total</p>
                    <p className="text-lg font-semibold text-forest">
                      {totalTarget.toLocaleString("fr-FR")} MGA
                    </p>
                  </div>
                  <div className="bg-cream/50 p-3 rounded-lg border border-sage/20">
                    <p className="text-xs text-sage mb-1">Déjà collecté</p>
                    <p className="text-lg font-semibold text-olive">
                      {totalCollected.toLocaleString("fr-FR")} MGA
                    </p>
                  </div>
                </div>
              </div>

              {/* Étapes du projet */}
              {project.stages && project.stages.length > 0 && (
                <>
                  <Separator className="bg-sage/30" />
                  <div className="space-y-3">
                    <h4 className="font-semibold text-forest flex items-center gap-2">
                      <Target className="h-5 w-5 text-olive" />
                      Étapes de financement ({project.stages.length})
                    </h4>
                    <div className="space-y-2">
                      {project.stages.map((stage: any, index: number) => (
                        <div
                          key={stage.id}
                          className="bg-cream/50 p-3 rounded-lg border border-sage/20"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <p className="font-medium text-forest">
                                Étape {index + 1}: {stage.title}
                              </p>
                              <p className="text-xs text-sage mt-1">
                                {stage.description}
                              </p>
                            </div>
                            <div className="text-right ml-4">
                              <p className="text-sm font-semibold text-forest">
                                {stage.targetAmount.toLocaleString("fr-FR")} MGA
                              </p>
                              <Badge variant="outline" className="text-xs mt-1">
                                {stage.statut}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Avertissement si suspendu */}
              {project.statut === "SUSPENDED" && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-red-700">
                    <AlertTriangle className="h-5 w-5" />
                    <p className="font-semibold">Projet suspendu</p>
                  </div>
                  <p className="text-sm text-red-600 mt-2">
                    Ce projet est actuellement suspendu et n'est pas visible aux
                    investisseurs.
                  </p>
                </div>
              )}
            </div>
          </div>
        </ScrollArea>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isProcessing}
            className="border-sage/30 hover:bg-sage/10"
          >
            Fermer
          </Button>

          {project.statut === "DRAFT" && (
            <>
              <Button
                variant="destructive"
                onClick={handleSuspend}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <XCircle className="h-4 w-4 mr-2" />
                )}
                Rejeter
              </Button>
              <Button
                onClick={handleApprove}
                disabled={isProcessing}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                {isProcessing ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <CheckCircle className="h-4 w-4 mr-2" />
                )}
                Approuver et activer
              </Button>
            </>
          )}

          {project.statut === "ACTIVE" && (
            <Button
              variant="destructive"
              onClick={handleSuspend}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <XCircle className="h-4 w-4 mr-2" />
              )}
              Suspendre le projet
            </Button>
          )}

          {project.statut === "SUSPENDED" && (
            <Button
              onClick={handleApprove}
              disabled={isProcessing}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              {isProcessing ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <CheckCircle className="h-4 w-4 mr-2" />
              )}
              Réactiver le projet
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
