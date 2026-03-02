import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { InvestmentStats } from "@/features/investment/types/investment.types";
import {
  TrendingUp,
  Users,
  DollarSign,
  Clock,
  CheckCircle,
} from "lucide-react";

interface StageInvestmentStatsProps {
  stats?: InvestmentStats | null;
  isLoading?: boolean;
}

export function StageInvestmentStats({
  stats,
  isLoading,
}: StageInvestmentStatsProps) {
  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {[1, 2, 3, 4, 5].map((i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-4 rounded-full" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-24" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
      {/* Total Investments Count */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Investissements</CardTitle>
          <Users className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalInvestments}</div>
          <p className="text-xs text-muted-foreground mt-1">Nombre total</p>
        </CardContent>
      </Card>

      {/* Total Amount */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Montant Total</CardTitle>
          <DollarSign className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {stats.totalAmount.toLocaleString("fr-FR")} Ar
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Tous statuts confondus
          </p>
        </CardContent>
      </Card>

      {/* Confirmed Amount */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Confirmés</CardTitle>
          <CheckCircle className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">
            {stats.confirmedAmount.toLocaleString("fr-FR")} Ar
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Paiements validés
          </p>
        </CardContent>
      </Card>

      {/* Pending Amount */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">En Attente</CardTitle>
          <Clock className="h-4 w-4 text-yellow-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-yellow-600">
            {stats.pendingAmount.toLocaleString("fr-FR")} Ar
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            En cours de traitement
          </p>
        </CardContent>
      </Card>

      {/* Refunded Amount */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Remboursés</CardTitle>
          <TrendingUp className="h-4 w-4 text-red-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">
            {stats.refundedAmount.toLocaleString("fr-FR")} Ar
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Montant remboursé
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
