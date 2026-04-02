import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import type { ProjectStage } from "@/features/project/types/project.types";
import { useState } from "react";
import InvestmentModal from "./InvestmentModal";
import { Target, TrendingUp } from "lucide-react";

interface ProjectStageInvestmentCardProps {
  stage: ProjectStage;
  onInvestmentSuccess?: () => void;
}

const statusConfig = {
  OPEN: {
    label: "Ouvert",
    variant: "default" as const,
    color: "bg-green-500",
  },
  FUNDED: {
    label: "Financé",
    variant: "secondary" as const,
    color: "bg-blue-500",
  },
  CLOSED: {
    label: "Fermé",
    variant: "destructive" as const,
    color: "bg-red-500",
  },
};

export function ProjectStageInvestmentCard({
  stage,
  onInvestmentSuccess,
}: ProjectStageInvestmentCardProps) {
  const [isInvestmentModalOpen, setIsInvestmentModalOpen] = useState(false);

  const currentAmount = stage.currentAmount || 0;
  const progress =
    stage.targetAmount > 0
      ? Math.round((currentAmount / stage.targetAmount) * 100)
      : 0;
  const remainingAmount = stage.targetAmount - currentAmount;
  const status = statusConfig[stage.statut];

  const handleInvestClick = () => {
    if (stage.statut === "OPEN") {
      setIsInvestmentModalOpen(true);
    }
  };

  const handleInvestmentSuccess = () => {
    setIsInvestmentModalOpen(false);
    onInvestmentSuccess?.();
  };

  return (
    <>
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <CardTitle className="text-xl">{stage.title}</CardTitle>
                <Badge variant={status.variant}>
                  <div
                    className={`w-2 h-2 rounded-full ${status.color} mr-1`}
                  />
                  {status.label}
                </Badge>
              </div>
              <CardDescription>{stage.description}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Progression</span>
              <span className="font-bold">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{currentAmount.toLocaleString("fr-FR")} Ar collectés</span>
              <span>
                {stage.targetAmount.toLocaleString("fr-FR")} Ar objectif
              </span>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-blue-600" />
              <div className="text-sm">
                <p className="text-muted-foreground">Objectif</p>
                <p className="font-semibold">
                  {stage.targetAmount.toLocaleString("fr-FR")} Ar
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <div className="text-sm">
                <p className="text-muted-foreground">Restant</p>
                <p className="font-semibold">
                  {remainingAmount.toLocaleString("fr-FR")} Ar
                </p>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <Button
            className="w-full"
            onClick={handleInvestClick}
            disabled={stage.statut !== "OPEN"}
          >
            {stage.statut === "OPEN"
              ? "Investir dans ce stage"
              : stage.statut === "FUNDED"
                ? "Stage financé"
                : "Stage fermé"}
          </Button>
        </CardContent>
      </Card>

      {/* Investment Modal */}
      <InvestmentModal
        isOpen={isInvestmentModalOpen}
        onClose={() => setIsInvestmentModalOpen(false)}
        stage={{
          id: stage.id,
          title: stage.title,
          targetAmount: stage.targetAmount,
          currentAmount: currentAmount,
        }}
        onSuccess={handleInvestmentSuccess}
      />
    </>
  );
}
