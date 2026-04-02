import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Eye,
  Edit,
  Trash2,
  Target,
  Users,
  FolderKanban,
  ChevronDown,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getImageUrl } from "@/lib/utils/image";

interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    description: string;
    image?: string;
    statut: string;
    stages?: Array<{
      targetAmount: number;
      currentAmount: number;
      statut: string;
    }>;
  };
  role?: "admin" | "owner" | "investor";
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onActivate?: (id: string) => void;
  onSuspend?: (id: string) => void;
}

export default function ProjectCard({
  project,
  role = "investor",
  onEdit,
  onDelete,
  onActivate,
  onSuspend,
}: ProjectCardProps) {
  const navigate = useNavigate();

  // Get correct route based on role
  const getProjectStageRoute = (projectId: string) => {
    if (role === "admin") {
      return `/admin/projects/${projectId}`;
    }
    return `/project-stage/${projectId}`;
  };

  const getStatutColor = (statut: string) => {
    switch (statut) {
      case "ACTIVE":
        return "bg-olive text-cream";
      case "DRAFT":
        return "bg-sage text-cream";
      case "COMPLETED":
        return "bg-forest text-cream";
      case "SUSPENDED":
        return "bg-destructive text-cream";
      default:
        return "bg-sage text-cream";
    }
  };

  const getStatutLabel = (statut: string) => {
    switch (statut) {
      case "ACTIVE":
        return "Actif";
      case "DRAFT":
        return "Brouillon";
      case "COMPLETED":
        return "Terminé";
      case "SUSPENDED":
        return "Suspendu";
      default:
        return statut;
    }
  };

  const totalTarget =
    project.stages?.reduce((acc, stage) => acc + stage.targetAmount, 0) || 0;
  const totalCollected =
    project.stages?.reduce((acc, stage) => acc + stage.currentAmount, 0) || 0;
  const progress =
    totalTarget > 0 ? Math.round((totalCollected / totalTarget) * 100) : 0;

  const handleStatusChange = (nextStatus: "DRAFT" | "ACTIVE" | "SUSPENDED") => {
    if (nextStatus === "ACTIVE" && onActivate) {
      onActivate(project.id);
    }

    if (nextStatus === "SUSPENDED" && onSuspend) {
      onSuspend(project.id);
    }
  };

  return (
    <Card className="bg-cream border-sage/30 overflow-hidden group hover:shadow-lg transition-shadow">
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-linear-to-br from-olive/20 to-sage/20">
        {project.image ? (
          <img
            src={getImageUrl(project.image)}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <FolderKanban className="h-16 w-16 text-olive/50" />
          </div>
        )}
        {role === "admin" ? (
          <div className="absolute top-3 right-3 flex items-center gap-2">
            <Badge className={getStatutColor(project.statut)}>
              {getStatutLabel(project.statut)}
            </Badge>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  type="button"
                  size="icon"
                  variant="secondary"
                  className="h-7 w-7 bg-cream/90 hover:bg-cream text-forest"
                >
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-cream border-sage/30"
              >
                <DropdownMenuItem
                  disabled={project.statut === "ACTIVE" || !onActivate}
                  onClick={() => handleStatusChange("ACTIVE")}
                  className="text-forest"
                >
                  Activer
                </DropdownMenuItem>
                <DropdownMenuItem
                  disabled={project.statut === "SUSPENDED" || !onSuspend}
                  onClick={() => handleStatusChange("SUSPENDED")}
                  className="text-destructive"
                >
                  Suspendre
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <Badge
            className={`absolute top-3 right-3 ${getStatutColor(project.statut)}`}
          >
            {getStatutLabel(project.statut)}
          </Badge>
        )}
      </div>

      <CardHeader>
        <CardTitle className="text-forest line-clamp-1">
          {project.title}
        </CardTitle>
        <CardDescription className="text-sage line-clamp-2">
          {project.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 text-sm">
            <Target className="h-4 w-4 text-olive" />
            <span className="text-forest">
              {project.stages?.length || 0} étapes
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Users className="h-4 w-4 text-olive" />
            <span className="text-forest">0 investisseurs</span>
          </div>
        </div>

        {role !== "investor" && (
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-forest font-semibold">
                {totalCollected.toLocaleString("fr-FR")} MGA
              </span>
              <span className="text-sage">
                / {totalTarget.toLocaleString("fr-FR")} MGA
              </span>
            </div>
            <Progress value={progress} className="h-2" />
            <p className="text-xs text-sage mt-1">{progress}% financé</p>
          </div>
        )}

        <Separator className="bg-sage/30" />

        <div className="flex gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="flex-1 border-olive/50 hover:bg-olive/10"
                onClick={() => navigate(getProjectStageRoute(project.id))}
              >
                <Eye className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Voir les détails</p>
            </TooltipContent>
          </Tooltip>

          {onEdit && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="flex-1 border-olive/50 hover:bg-olive/10"
                  onClick={() => onEdit(project.id)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Modifier</p>
              </TooltipContent>
            </Tooltip>
          )}

          {onDelete && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="flex-1 border-destructive/50 hover:bg-destructive/10"
                  onClick={() => onDelete(project.id)}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Supprimer</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
