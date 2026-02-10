import { Edit, Trash2, Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
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
  onViewDetails,
}: ProjectStageCardProps) {
  const progressPercentage = (stage.collectedAmount / stage.targetAmount) * 100;

  const getStatusColor = (statut: string) => {
    switch (statut) {
      case "CLOSED":
        return "bg-green-100 text-green-800";
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
        return "Terminée";
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
    <Card className="border border-sage/10 hover:shadow-xl transition-all duration-200">
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
                onClick={() => onEdit?.(stage.id)}
                className="bg-forest text-cream hover:bg-olive"
                size="sm"
              >
                <Edit className="h-4 w-4 mr-2" />
                Modifier
              </Button>
              <Button
                onClick={() => onViewDetails?.(stage.id)}
                variant="outline"
                className="border-sage text-sage hover:border-olive hover:text-olive"
                size="sm"
              >
                <Eye className="h-4 w-4 mr-2" />
                Voir détails
              </Button>
              <Button
                onClick={() => onDelete?.(stage.id)}
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
    </Card>
  );
}
