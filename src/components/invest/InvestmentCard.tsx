import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface InvestmentCardProps {
  projectName: string;
  stage: number;
  amountInvested: number;
  roi: number;
  progress: number;
  status?: "active" | "completed" | "pending";
}

export default function InvestmentCard({
  projectName,
  stage,
  amountInvested,
  roi,
  progress,
  status = "active",
}: InvestmentCardProps) {
  const statusLabels = {
    active: "Active",
    completed: "Complété",
    pending: "En attente",
  };

  const statusColors = {
    active: "bg-olive text-cream",
    completed: "bg-forest text-cream",
    pending: "bg-sage/50 text-forest",
  };

  return (
    <Card className="bg-cream border-sage/30 hover:border-olive/50 transition-colors">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h4 className="font-semibold text-forest">{projectName}</h4>
            <p className="text-xs text-sage">
              Étape {stage} - Investissement{" "}
              {statusLabels[status].toLowerCase()}
            </p>
          </div>
          <Badge className={statusColors[status]}>{statusLabels[status]}</Badge>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-sage">Investi:</span>
          <span className="font-semibold text-forest">
            {amountInvested.toLocaleString("fr-FR")} €
          </span>
        </div>
        <div className="flex justify-between items-center text-sm mt-1">
          <span className="text-sage">ROI:</span>
          <span className="font-semibold text-olive">+{roi.toFixed(1)}%</span>
        </div>
        <Progress value={progress} className="h-2 mt-3" />
        <p className="text-xs text-sage mt-1">
          {progress}% de l'objectif atteint
        </p>
      </CardContent>
    </Card>
  );
}
