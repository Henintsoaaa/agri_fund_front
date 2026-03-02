import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type {
  TransactionStats,
  ROIData,
} from "@/features/investment/types/investment.types";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  PiggyBank,
  Award,
} from "lucide-react";

interface InvestmentStatsCardsProps {
  stats?: TransactionStats | null;
  roi?: ROIData | null;
  isLoading?: boolean;
}

export function InvestmentStatsCards({
  stats,
  roi,
  isLoading,
}: InvestmentStatsCardsProps) {
  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-4 rounded-full" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-3 w-40 mt-2" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const totalInvested = stats?.totalInvested || 0;
  const totalDividends = stats?.totalDividends || 0;
  const totalRefunded = stats?.totalRefunded || 0;
  const roiPercentage = roi?.roi || 0;
  const netGain = roi?.netGain || 0;

  const activeInvestment = totalInvested - totalRefunded;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* Total Investi */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Investi</CardTitle>
          <DollarSign className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {totalInvested.toLocaleString("fr-FR")} Ar
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Montant total de vos investissements
          </p>
        </CardContent>
      </Card>

      {/* Investissement Actif */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Investissement Actif
          </CardTitle>
          <PiggyBank className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {activeInvestment.toLocaleString("fr-FR")} Ar
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Montant actuellement investi
          </p>
        </CardContent>
      </Card>

      {/* Dividendes */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Dividendes Reçus
          </CardTitle>
          <Award className="h-4 w-4 text-purple-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {totalDividends.toLocaleString("fr-FR")} Ar
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Revenus générés par vos investissements
          </p>
        </CardContent>
      </Card>

      {/* ROI */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">ROI</CardTitle>
          {roiPercentage >= 0 ? (
            <TrendingUp className="h-4 w-4 text-green-600" />
          ) : (
            <TrendingDown className="h-4 w-4 text-red-600" />
          )}
        </CardHeader>
        <CardContent>
          <div
            className={`text-2xl font-bold ${roiPercentage >= 0 ? "text-green-600" : "text-red-600"}`}
          >
            {roiPercentage >= 0 ? "+" : ""}
            {roiPercentage.toFixed(2)}%
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Gain net: {netGain >= 0 ? "+" : ""}
            {netGain.toLocaleString("fr-FR")} Ar
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
