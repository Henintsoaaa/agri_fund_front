import { useState } from "react";
import { useInvestment } from "@/features/investment/hooks/useInvestment";
import { useAuthContext } from "@/features/auth/context/AuthContext";
import { InvestmentStatsCards } from "@/components/invest/InvestmentStatsCards";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

export default function MyInvestmentsPage() {
  const { user } = useAuthContext();
  const {
    myInvestments,
    isLoadingMyInvestments,
    refetchMyInvestments,
    myTransactions,
    isLoadingMyTransactions,
    refetchMyTransactions,
    myTransactionStats,
    isLoadingMyStats,
    useROI,
  } = useInvestment();

  const { data: roi, isLoading: isLoadingROI } = useROI(user?.id);

  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await Promise.all([refetchMyInvestments(), refetchMyTransactions()]);
    setIsRefreshing(false);
  };

  return (
    <div className="container mx-auto py-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-forest">
            Mes Investissements
          </h1>
          <p className="text-sage mt-1">
            Suivez vos investissements et leur performance
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleRefresh}
          disabled={isRefreshing}
        >
          <RefreshCw
            className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`}
          />
          Actualiser
        </Button>
      </div>

      {/* Stats Cards */}
      <InvestmentStatsCards
        stats={myTransactionStats}
        roi={roi}
        isLoading={isLoadingMyStats || isLoadingROI}
      />

      {/* Investmenets history */}
      <Card className="bg-cream/50 border-sage/30">
        <CardHeader>
          <CardTitle>Historique de mes Investissements</CardTitle>
          <CardDescription>
            Détails de tous vos investissements passés
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoadingMyInvestments ? (
            <p className="text-center text-muted-foreground py-8">
              Chargement...
            </p>
          ) : myInvestments && myInvestments.length > 0 ? (
            <div className="space-y-4">
              {myInvestments.map((investment) => (
                <div
                  key={investment.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div>
                    <p className="font-medium">
                      {investment.projectStage?.project?.title ||
                        "Projet inconnu"}{" "}
                      -{" "}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(investment.createdAt).toLocaleDateString(
                        "fr-FR",
                      )}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">
                      {investment.amount.toLocaleString("fr-FR")} Ar
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {investment.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">
              Vous n'avez pas encore investi dans un projet
            </p>
          )}
        </CardContent>
      </Card>

      {/* Transactions History */}
      <Card className="bg-cream/50 border-sage/30">
        <CardHeader>
          <CardTitle>Historique des Transactions</CardTitle>
          <CardDescription>
            Toutes vos transactions (paiements, remboursements, dividendes)
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoadingMyTransactions ? (
            <p className="text-center text-muted-foreground py-8">
              Chargement...
            </p>
          ) : myTransactions && myTransactions.length > 0 ? (
            <div className="space-y-4">
              {myTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div>
                    <p className="font-medium">{transaction.type}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(
                        transaction.createdAt || transaction.transactionDate,
                      ).toLocaleDateString("fr-FR")}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">
                      {transaction.amount.toLocaleString("fr-FR")} Ar
                    </p>
                    <p
                      className={`text-sm ${
                        transaction.status === "SUCCESS"
                          ? "text-green-600"
                          : transaction.status === "FAILED"
                            ? "text-red-600"
                            : "text-yellow-600"
                      }`}
                    >
                      {transaction.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">
              Aucune transaction pour le moment
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
