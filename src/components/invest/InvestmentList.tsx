import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { Investment } from "@/features/investment/types/investment.types";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { AlertCircle, CheckCircle2, Clock, XCircle } from "lucide-react";

interface InvestmentListProps {
  investments: Investment[];
  isLoading?: boolean;
  onCancel?: (investmentId: string) => void;
  isCancelling?: boolean;
}

const statusConfig = {
  PENDING: {
    label: "En attente",
    icon: Clock,
    variant: "secondary" as const,
    color: "text-yellow-600",
  },
  CONFIRMED: {
    label: "Confirmé",
    icon: CheckCircle2,
    variant: "default" as const,
    color: "text-green-600",
  },
  CANCELLED: {
    label: "Annulé",
    icon: XCircle,
    variant: "destructive" as const,
    color: "text-red-600",
  },
  REFUNDED: {
    label: "Remboursé",
    icon: AlertCircle,
    variant: "outline" as const,
    color: "text-blue-600",
  },
};

export function InvestmentList({
  investments,
  isLoading,
  onCancel,
  isCancelling,
}: InvestmentListProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-20 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!investments || investments.length === 0) {
    return (
      <Card className="bg-cream/50 border-sage/30">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-lg font-medium text-muted-foreground">
            Aucun investissement pour le moment
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Commencez à investir dans des projets qui vous inspirent
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {investments.map((investment) => {
        const status = statusConfig[investment.status];
        const StatusIcon = status.icon;

        return (
          <Card
            key={investment.id}
            className="hover:shadow-md transition-shadow bg-cream/50 border-sage/30"
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-xl">
                    {investment.stage?.title || "Stage supprimé"}
                  </CardTitle>
                  <CardDescription className="mt-1">
                    Investissement effectué le{" "}
                    {format(
                      new Date(investment.createdAt),
                      "dd MMMM yyyy 'à' HH:mm",
                      {
                        locale: fr,
                      },
                    )}
                  </CardDescription>
                </div>
                <Badge variant={status.variant} className="ml-4">
                  <StatusIcon className={`h-4 w-4 mr-1 ${status.color}`} />
                  {status.label}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold">
                      {investment.amount.toLocaleString("fr-FR")}
                    </span>
                    <span className="text-lg text-muted-foreground">Ar</span>
                  </div>
                  {investment.stage?.projectId && (
                    <p className="text-sm text-muted-foreground">
                      Projet ID: {investment.stage.projectId}
                    </p>
                  )}
                </div>
                <div className="flex gap-2">
                  {investment.status === "PENDING" && onCancel && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onCancel(investment.id)}
                      disabled={isCancelling}
                    >
                      {isCancelling ? "Annulation..." : "Annuler"}
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
