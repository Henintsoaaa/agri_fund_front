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
  Edit,
  Trash2,
  FileText,
  CheckCircle2,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import InvestmentModal from "../invest/InvestmentModal";
import StageProofsGallery from "../proofs/StageProofsGallery";
import { useProofs } from "@/features/proofs/hooks/useProofs";
import CreatProofModal from "./CreatProofModal";
import { getImageUrl } from "@/lib/utils/image";

interface ProjectStageCardProps {
  projectId: string;
  stage: {
    id: string;
    title: string;
    description: string;
    image?: string;
    targetAmount: number;
    currentAmount: number;
    stageOrder: number;
    statut: string;
    createdAt: string;
  };
  role?: "admin" | "owner" | "investor";
  onInvest?: (stageId: string) => void;
  onViewDetails?: (stageId: string) => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function ProjectStageCard({
  projectId,
  stage,
  role = "investor",
  onInvest: _onInvest,
  onEdit,
  onDelete,
}: ProjectStageCardProps) {
  const [isInvestModalOpen, setIsInvestModalOpen] = useState(false);
  const [showProofs, setShowProofs] = useState(false);

  const { useStageProofs, useMyStageProofs, useAdminStageProofs } = useProofs();

  // Select appropriate hook based on role
  const { data: stageProofs, isLoading: isLoadingProofs } =
    role === "owner"
      ? useMyStageProofs(stage.id) // Owner: see all proofs (including pending)
      : role === "admin"
        ? useAdminStageProofs(stage.id) // Admin: see all proofs for moderation
        : useStageProofs(stage.id); // Investor: see only approved proofs

  const progress =
    stage.targetAmount > 0
      ? Math.round((stage.currentAmount / stage.targetAmount) * 100)
      : 0;
  const getStatutColor = (statut: string) => {
    switch (statut) {
      case "OPEN":
        return "bg-olive text-cream";
      case "FUNDED":
        return "bg-forest text-cream";
      case "CLOSED":
        return "bg-gray-400 text-cream";
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
        return "Verrouillé";
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

  // CLOSED stages are locked (waiting for previous stage to be funded)
  const isClosed = stage.statut === "CLOSED";
  const isFunded = stage.statut === "FUNDED";
  const isOpen = stage.statut === "OPEN";

  return (
    <Card
      className={`bg-cream transition-all duration-300 overflow-hidden group h-full ${
        isClosed && role === "investor"
          ? "opacity-60 border-gray-300 cursor-not-allowed"
          : "border-sage/30 hover:shadow-lg"
      }${isFunded ? " border-forest border-2" : ""}${isOpen ? " border-olive" : ""}`}
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden bg-linear-to-br from-olive/20 to-sage/20">
        <img
          src={
            stage.image ? getImageUrl(stage.image) : "/placeholder-stage.jpg"
          }
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
                {stage.currentAmount.toLocaleString("fr-FR")} MGA
              </span>
            </div>
            <span className="text-sm text-sage">
              / {stage.targetAmount.toLocaleString("fr-FR")} MGA
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
              {(stage.targetAmount - stage.currentAmount).toLocaleString(
                "fr-FR",
              )}{" "}
              MGA
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

        {/* Add Proof Button - Owner and Admin */}
        {role === "owner" && (
          <CreatProofModal projectId={projectId} stageId={stage.id} />
        )}

        {/* Proofs Section - Always visible for all roles (investors and admins can track progress) */}
        {stageProofs && stageProofs.length > 0 && (
          <>
            <Separator className="bg-sage/30" />
            <div className="space-y-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowProofs(!showProofs)}
                className="w-full border-sage/30 hover:bg-olive/10"
              >
                <FileText className="h-4 w-4 mr-2" />
                {showProofs ? "Masquer" : "Voir"} les preuves (
                {stageProofs?.length || 0})
              </Button>

              {showProofs && (
                <div className="mt-4">
                  <StageProofsGallery
                    stageId={stage.id}
                    stageTitle={stage.title}
                    proofs={stageProofs || []}
                    isLoading={isLoadingProofs}
                  />
                </div>
              )}
            </div>
          </>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          {role === "investor" ? (
            // Investor view
            stage.statut === "OPEN" ? (
              <Button
                size="sm"
                onClick={() => setIsInvestModalOpen(true)}
                className="flex-1 bg-forest hover:bg-forest/90 text-cream"
              >
                <DollarSign className="h-4 w-4 mr-2" />
                Investir
              </Button>
            ) : stage.statut === "CLOSED" ? (
              <Button
                size="sm"
                disabled
                className="flex-1 bg-gray-300 text-gray-500 cursor-not-allowed"
              >
                Verrouillé
              </Button>
            ) : (
              <Button
                size="sm"
                disabled
                className="flex-1 bg-forest/70 text-cream cursor-not-allowed"
              >
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Financé
              </Button>
            )
          ) : role === "owner" ? (
            // Owner/Admin view
            <>
              {onEdit && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onEdit}
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
                  onClick={onDelete}
                  className="flex-1 border-destructive/30 text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Supprimer
                </Button>
              )}
            </>
          ) : null}
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
          currentAmount: stage.currentAmount,
        }}
      />
    </Card>
  );
}
