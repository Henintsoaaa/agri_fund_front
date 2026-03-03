import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Eye,
  Edit,
  Trash2,
  MoreVertical,
  Target,
  Users,
  CheckCircle2,
  XCircle,
  Clock,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

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

  const openStages =
    project.stages?.filter((s) => s.statut === "OPEN").length || 0;
  const fundedStages =
    project.stages?.filter((s) => s.statut === "FUNDED").length || 0;

  return (
    <Card className="bg-cream border-sage/30  overflow-hidden group">
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-olive/20 to-sage/20">
        <img
          src={project.image || "/placeholder-project.jpg"}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <Badge
          className={`absolute top-3 left-3 ${getStatutColor(project.statut)}`}
        >
          {getStatutLabel(project.statut)}
        </Badge>

        {/* Admin/Owner Actions */}
        {(role === "admin" || role === "owner") && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                type="button"
                size="icon"
                variant="ghost"
                className="absolute top-3 right-3 bg-cream/90 hover:bg-cream text-forest"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-cream">
              <DropdownMenuLabel className="text-forest">
                Actions
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-sage/30" />
              <DropdownMenuItem
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  navigate(`/project-stage/${project.id}`);
                }}
                className="cursor-pointer hover:bg-olive/10"
              >
                <Eye className="mr-2 h-4 w-4 text-forest" />
                <span className="text-forest">Voir détails</span>
              </DropdownMenuItem>
              {onEdit && (
                <DropdownMenuItem
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onEdit(project.id);
                  }}
                  className="cursor-pointer hover:bg-olive/10"
                >
                  <Edit className="mr-2 h-4 w-4 text-forest" />
                  <span className="text-forest">Modifier</span>
                </DropdownMenuItem>
              )}
              {role === "admin" && (
                <>
                  {project.statut === "DRAFT" && onActivate && (
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onActivate(project.id);
                      }}
                      className="cursor-pointer hover:bg-olive/10"
                    >
                      <CheckCircle2 className="mr-2 h-4 w-4 text-olive" />
                      <span className="text-olive">Activer</span>
                    </DropdownMenuItem>
                  )}
                  {project.statut === "ACTIVE" && onSuspend && (
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onSuspend(project.id);
                      }}
                      className="cursor-pointer hover:bg-destructive/10"
                    >
                      <XCircle className="mr-2 h-4 w-4 text-destructive" />
                      <span className="text-destructive">Suspendre</span>
                    </DropdownMenuItem>
                  )}
                </>
              )}
              {onDelete && (
                <>
                  <DropdownMenuSeparator className="bg-sage/30" />
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onDelete(project.id);
                    }}
                    className="cursor-pointer hover:bg-destructive/10"
                  >
                    <Trash2 className="mr-2 h-4 w-4 text-destructive" />
                    <span className="text-destructive">Supprimer</span>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
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
        {/* Stages Summary */}
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1">
            <Target className="h-3 w-3 text-olive" />
            <span className="text-forest">
              {project.stages?.length || 0} étapes
            </span>
          </div>
          {openStages > 0 && (
            <Badge
              variant="outline"
              className="border-olive/50 text-olive text-xs"
            >
              <Clock className="h-3 w-3 mr-1" />
              {openStages} ouvertes
            </Badge>
          )}
          {fundedStages > 0 && (
            <Badge
              variant="outline"
              className="border-sage/50 text-sage text-xs"
            >
              {fundedStages} financées
            </Badge>
          )}
        </div>

        {/* Progress */}
        {role !== "investor" && (
          <div className="block">
            <div className="flex justify-between text-sm mb-2">
              <span className="font-semibold text-forest">
                {totalCollected.toLocaleString("fr-FR")} MGA
              </span>
              <span className="text-sage">
                / {totalTarget.toLocaleString("fr-FR")} MGA
              </span>
            </div>
            <Progress value={progress} className="h-2" />
            <div className="flex justify-between items-center mt-1">
              <span className="text-xs text-sage">{progress}% financé</span>
              <div className="flex items-center gap-1 text-xs text-sage">
                <Users className="h-3 w-3" />
                <span>0 investisseurs</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter>
        <Button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            navigate(`/project-stage/${project.id}`);
          }}
          className="w-full bg-forest hover:bg-forest/90 text-cream group-hover:bg-olive transition-colors"
        >
          <Eye className="h-4 w-4 mr-2" />
          Voir les détails
        </Button>
      </CardFooter>
    </Card>
  );
}
