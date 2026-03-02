import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  Target,
  DollarSign,
  TrendingUp,
  Users,
  Calendar,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import InvestmentModal from "../invest/InvestmentModal";

interface ProjectStageCardProps {
  stage: {
    id: string;
    title: string;
    description: string;
    image?: string;
    targetAmount: number;
    collectedAmount: number;
    stageOrder: number;
    statut: string;
    createdAt: string;
  };
  role?: "admin" | "owner" | "investor";
  onInvest?: (stageId: string) => void;
  onViewDetails?: (stageId: string) => void;
  onEdit?: (stageId: string) => void;
  onDelete?: (stageId: string) => void;
}

export default function ProjectStageCard({
  stage,
  role = "investor",
  onInvest,
  onViewDetails,
  onEdit,
  onDelete,
}: ProjectStageCardProps) {
  const [isInvestModalOpen, setIsInvestModalOpen] = useState(false);

  const progress =
    stage.targetAmount > 0
      ? Math.round((stage.collectedAmount / stage.targetAmount) * 100)
      : 0;
  console.log(role);

  const getStatutColor = (statut: string) => {
    switch (statut) {
      case "OPEN":
        return "bg-olive text-cream";
      case "FUNDED":
        return "bg-forest text-cream";
      case "CLOSED":
        return "bg-sage text-cream";
      default:
        return "bg-sage text-cream";
    }
  };

  const getStatutLabel = (statut: string) => {
    switch (statut) {
      case "OPEN":
        return "Ouvert";
      case "FUNDED":
        return "Financé";
      case "CLOSED":
        return "Fermé";
      default:
        return statut;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // if stage.statut === "closed" we will freeze it for investors, only owner and admin can see the details and edit it
  const isFrozen = stage.statut === "CLOSED" && role === "investor";
  const isFunded = stage.statut === "FUNDED";

  return (
    <Card
      className={`bg-cream border-sage/30 hover:shadow-lg transition-all duration-300 overflow-hidden group h-full ${isFrozen ? "opacity-75" : ""}${isFunded ? " border-forest" : ""}`}
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden bg-gradient-to-br from-olive/20 to-sage/20">
        <img
          src={stage.image || "/placeholder-stage.jpg"}
          alt={stage.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge className="bg-forest/90 text-cream">
            Étape {stage.stageOrder}
          </Badge>
          <Badge className={getStatutColor(stage.statut)}>
            {getStatutLabel(stage.statut)}
          </Badge>
        </div>
      </div>

      <CardHeader>
        <CardTitle className="text-forest line-clamp-1 text-lg">
          {stage.title}
        </CardTitle>
        <CardDescription className="text-sage line-clamp-2 text-sm">
          {stage.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Funding Info */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-olive" />
              <span className="text-sm font-semibold text-forest">
                {stage.collectedAmount.toLocaleString("fr-FR")} €
              </span>
            </div>
            <span className="text-sm text-sage">
              / {stage.targetAmount.toLocaleString("fr-FR")} €
            </span>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between items-center">
            <span className="text-xs text-sage">{progress}% atteint</span>
            <div className="flex items-center gap-1 text-xs text-sage">
              <Users className="h-3 w-3" />
              <span>0 investisseurs</span>
            </div>
          </div>
        </div>

        <Separator className="bg-sage/30" />

        {/* Additional Info */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-sage">
            <Target className="h-3 w-3 text-olive" />
            <span>
              Reste:{" "}
              {(stage.targetAmount - stage.collectedAmount).toLocaleString(
                "fr-FR",
              )}{" "}
              €
            </span>
          </div>
          {stage.statut === "OPEN" && (
            <div className="flex items-center gap-2 text-xs text-sage">
              <TrendingUp className="h-3 w-3 text-olive" />
              <span>ROI estimé: +12%</span>
            </div>
          )}
          <div className="flex items-center gap-2 text-xs text-sage">
            <Calendar className="h-3 w-3 text-olive" />
            <span>Créé le {formatDate(stage.createdAt)}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          {stage.statut === "OPEN" ? (
            <Button
              size="sm"
              onClick={() => setIsInvestModalOpen(true)}
              className="flex-1 bg-forest hover:bg-forest/90 text-cream"
            >
              <DollarSign className="h-4 w-4 mr-2" />
              Investir
            </Button>
          ) : (
            <>
              {onViewDetails && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onViewDetails(stage.id)}
                  className="flex-1 border-sage/30 hover:bg-olive/10"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Voir
                </Button>
              )}
              {onEdit && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(stage.id)}
                  className="flex-1 border-sage/30 hover:bg-olive/10"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Modifier
                </Button>
              )}
              {onDelete && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onDelete(stage.id)}
                  className="flex-1 border-destructive/30 text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Supprimer
                </Button>
              )}
            </>
          )}
        </div>
      </CardContent>

      {/* Investment Modal */}
      <InvestmentModal
        isOpen={isInvestModalOpen}
        onClose={() => setIsInvestModalOpen(false)}
        stage={{
          id: stage.id,
          title: stage.title,
          targetAmount: stage.targetAmount,
          collectedAmount: stage.collectedAmount,
        }}
      />
    </Card>
  );
}
