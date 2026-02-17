import { Calendar, TrendingUp, Target, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useProject } from "@/features/project/hooks/useProject";
import type { Project } from "@/features/project/types/project.types";

interface ProjectCardProps {
  project: Project;
  onClick?: () => void;
}

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  const { useCountProjectStages } = useProject();
  const { data: stagesCount } = useCountProjectStages(project.id);
  const getStatusColor = (statut: string) => {
    switch (statut) {
      case "ACTIVE":
        return "bg-green-100 text-green-800";
      case "DRAFT":
        return "bg-yellow-100 text-yellow-800";
      case "COMPLETED":
        return "bg-blue-100 text-blue-800";
      case "SUSPENDED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (statut: string) => {
    switch (statut) {
      case "ACTIVE":
        return "En cours";
      case "DRAFT":
        return "Brouillon";
      case "COMPLETED":
        return "Terminé";
      case "SUSPENDED":
        return "Suspendu";
      default:
        return "Inconnu";
    }
  };

  return (
    <Card
      onClick={onClick}
      className="border border-sage/10 hover:shadow-lg transition-shadow duration-200 cursor-pointer"
    >
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {project.image && (
            <img
              src={project.image}
              alt={project.title}
              className="w-full lg:w-48 h-32 object-cover rounded-lg"
            />
          )}

          <div className="flex-1">
            <div className="flex flex-col sm:flex-row justify-between items-start mb-4">
              <div className="flex-1">
                <h4 className="text-xl font-bold text-forest mb-2">
                  {project.title}
                </h4>
                <p className="text-sage mb-2 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex items-center space-x-4 text-sm text-sage/80">
                  <span className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {new Date(project.createdAt).toLocaleDateString("fr-FR")}
                    </span>
                  </span>
                  {project.category && (
                    <Badge variant="secondary" className="text-xs">
                      {project.category}
                    </Badge>
                  )}
                </div>
              </div>

              <Badge
                className={`mt-4 sm:mt-0 ${getStatusColor(project.statut)}`}
              >
                {getStatusLabel(project.statut)}
              </Badge>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="flex items-center space-x-2 p-2 bg-forest/5 rounded-lg">
                <div className="p-2 bg-forest/10 rounded">
                  <Target className="h-4 w-4 text-forest" />
                </div>
                <div>
                  <p className="text-sm font-bold text-forest">
                    {stagesCount?.total || project.stages?.length || 0}
                  </p>
                  <p className="text-xs text-sage">Étapes</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 p-2 bg-green-50 rounded-lg">
                <div className="p-2 bg-green-100 rounded">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-green-600">
                    {stagesCount?.funded || 0}
                  </p>
                  <p className="text-xs text-sage">Terminées</p>
                </div>
              </div>
            </div>

            {/* Action indicator */}
            <div className="flex justify-end">
              <span className="text-sm text-olive font-medium flex items-center space-x-1">
                <span>Voir les étapes</span>
                <TrendingUp className="h-4 w-4" />
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
