import { useState } from "react";
import { useInvestment } from "@/features/investment/hooks/useInvestment";
import { useAuthContext } from "@/features/auth/context/AuthContext";
import { InvestmentList } from "@/components/invest/InvestmentList";
import { InvestmentStatsCards } from "@/components/invest/InvestmentStatsCards";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
    cancelInvestment,
    isCancellingInvestment,
  } = useInvestment();

  const { data: roi, isLoading: isLoadingROI } = useROI(user?.id);

  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await Promise.all([refetchMyInvestments(), refetchMyTransactions()]);
    setIsRefreshing(false);
  };

  const handleCancelInvestment = async (investmentId: string) => {
    try {
      await cancelInvestment(investmentId);
      refetchMyInvestments();
    } catch (error) {
      console.error("Error cancelling investment:", error);
    }
  };

  // Filter investments by status
  const pendingInvestments =
    myInvestments?.filter((inv) => inv.status === "PENDING") || [];
  const confirmedInvestments =
    myInvestments?.filter((inv) => inv.status === "CONFIRMED") || [];
  const cancelledInvestments =
    myInvestments?.filter((inv) => inv.status === "CANCELLED") || [];
  const refundedInvestments =
    myInvestments?.filter((inv) => inv.status === "REFUNDED") || [];

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

      {/* Investments List */}
      <Tabs defaultValue="all" className="w-full ">
        <TabsList className="grid w-full grid-cols-5 bg-cream/50 border-sage/30">
          <TabsTrigger value="all">
            Tous ({myInvestments?.length || 0})
          </TabsTrigger>
          <TabsTrigger value="pending">
            En attente ({pendingInvestments.length})
          </TabsTrigger>
          <TabsTrigger value="confirmed">
            Confirmés ({confirmedInvestments.length})
          </TabsTrigger>
          <TabsTrigger value="cancelled">
            Annulés ({cancelledInvestments.length})
          </TabsTrigger>
          <TabsTrigger value="refunded">
            Remboursés ({refundedInvestments.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <InvestmentList
            investments={myInvestments || []}
            isLoading={isLoadingMyInvestments}
            onCancel={handleCancelInvestment}
            isCancelling={isCancellingInvestment}
          />
        </TabsContent>

        <TabsContent value="pending" className="mt-6">
          <InvestmentList
            investments={pendingInvestments}
            isLoading={isLoadingMyInvestments}
            onCancel={handleCancelInvestment}
            isCancelling={isCancellingInvestment}
          />
        </TabsContent>

        <TabsContent value="confirmed" className="mt-6">
          <InvestmentList
            investments={confirmedInvestments}
            isLoading={isLoadingMyInvestments}
          />
        </TabsContent>

        <TabsContent value="cancelled" className="mt-6">
          <InvestmentList
            investments={cancelledInvestments}
            isLoading={isLoadingMyInvestments}
          />
        </TabsContent>

        <TabsContent value="refunded" className="mt-6">
          <InvestmentList
            investments={refundedInvestments}
            isLoading={isLoadingMyInvestments}
          />
        </TabsContent>
      </Tabs>

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
                      {new Date(transaction.createdAt).toLocaleDateString(
                        "fr-FR",
                      )}
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
