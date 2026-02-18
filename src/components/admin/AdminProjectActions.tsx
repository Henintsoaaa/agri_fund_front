import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
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
import { MoreVertical, Play, Users, CheckCircle, Ban } from "lucide-react";
import { useProject } from "@/features/project/hooks/useProject";
import ProjectInvestorsDialog from "./ProjectInvestorsDialog";

interface AdminProjectActionsProps {
  project: any;
}

export default function AdminProjectActions({
  project,
}: AdminProjectActionsProps) {
  const { suspendProject, activateProject } = useProject();
  const [showActivateDialog, setShowActivateDialog] = useState(false);
  const [showSuspendDialog, setShowSuspendDialog] = useState(false);
  const [showInvestorsDialog, setShowInvestorsDialog] = useState(false);

  const handleActivate = () => {
    activateProject(project.id);
    setShowActivateDialog(false);
  };

  const handleSuspend = () => {
    suspendProject(project.id);
    setShowSuspendDialog(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "text-green-600";
      case "DRAFT":
        return "text-amber-600";
      case "COMPLETED":
        return "text-blue-600";
      case "SUSPENDED":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "Actif";
      case "DRAFT":
        return "Brouillon";
      case "COMPLETED":
        return "Complété";
      case "SUSPENDED":
        return "Suspendu";
      default:
        return status;
    }
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <span
          className={`text-sm font-medium ${getStatusColor(project.statut)}`}
        >
          {getStatusLabel(project.statut)}
        </span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Actions Admin</DropdownMenuLabel>
            <DropdownMenuSeparator />

            {/* Activer (pour DRAFT uniquement) */}
            {project.statut === "DRAFT" && (
              <DropdownMenuItem
                onClick={() => setShowActivateDialog(true)}
                className="cursor-pointer"
              >
                <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                <span>Activer le projet</span>
              </DropdownMenuItem>
            )}

            {/* Réactiver (pour SUSPENDED uniquement) */}
            {project.statut === "SUSPENDED" && (
              <DropdownMenuItem
                onClick={() => setShowActivateDialog(true)}
                className="cursor-pointer"
              >
                <Play className="mr-2 h-4 w-4 text-green-600" />
                <span>Réactiver le projet</span>
              </DropdownMenuItem>
            )}

            {/* Suspendre (pour ACTIVE uniquement) */}
            {project.statut === "ACTIVE" && (
              <DropdownMenuItem
                onClick={() => setShowSuspendDialog(true)}
                className="cursor-pointer text-red-600"
              >
                <Ban className="mr-2 h-4 w-4" />
                <span>Suspendre le projet</span>
              </DropdownMenuItem>
            )}

            <DropdownMenuSeparator />

            {/* Voir les investisseurs */}
            <DropdownMenuItem
              onClick={() => setShowInvestorsDialog(true)}
              className="cursor-pointer"
            >
              <Users className="mr-2 h-4 w-4 text-olive" />
              <span>Voir les investisseurs</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Dialogue d'activation */}
      <AlertDialog
        open={showActivateDialog}
        onOpenChange={setShowActivateDialog}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {project.statut === "DRAFT" ? "Activer" : "Réactiver"} le projet
            </AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir{" "}
              {project.statut === "DRAFT" ? "activer" : "réactiver"} le projet "
              {project.title}" ?{" "}
              {project.statut === "DRAFT" &&
                "Il sera visible par tous les investisseurs."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleActivate}
              className="bg-green-600 hover:bg-green-700"
            >
              Confirmer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Dialogue de suspension */}
      <AlertDialog open={showSuspendDialog} onOpenChange={setShowSuspendDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Suspendre le projet</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir suspendre le projet "{project.title}" ?
              Il ne sera plus visible par les investisseurs.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleSuspend}
              className="bg-red-600 hover:bg-red-700"
            >
              Suspendre
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Dialogue des investisseurs */}
      <ProjectInvestorsDialog
        project={project}
        open={showInvestorsDialog}
        onOpenChange={setShowInvestorsDialog}
      />
    </>
  );
}
