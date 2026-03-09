import { History, Calendar, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function HistoryPage() {
  const historyItems = [
    {
      id: "1",
      type: "INVESTMENT",
      title: "Investissement dans Culture de Riz Bio",
      amount: 5000,
      date: "2026-03-05T10:30:00Z",
      status: "CONFIRMED",
    },
    {
      id: "2",
      type: "DIVIDEND",
      title: "Dividende reçu - Maraîchage Urbain",
      amount: 250,
      date: "2026-03-01T14:15:00Z",
      status: "SUCCESS",
    },
    {
      id: "3",
      type: "INVESTMENT",
      title: "Investissement dans Apiculture Durable",
      amount: 3000,
      date: "2026-02-28T09:45:00Z",
      status: "CONFIRMED",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "CONFIRMED":
      case "SUCCESS":
        return (
          <Badge className="bg-olive/20 text-olive border-olive/30">
            Confirmé
          </Badge>
        );
      case "PENDING":
        return (
          <Badge
            variant="secondary"
            className="bg-sage/20 text-sage border-sage/30"
          >
            En attente
          </Badge>
        );
      case "FAILED":
        return <Badge variant="destructive">Échoué</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-cream via-sage/10 to-olive/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-forest flex items-center gap-3">
            <History className="h-8 w-8 text-olive" />
            Historique des Transactions
          </h1>
          <p className="text-sage text-lg">
            Consultez l'historique complet de vos transactions
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-cream/50 border-sage/30 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-forest">
                Total Investi
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-forest">15 000 MGA</div>
              <p className="text-xs text-sage mt-1 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +2 500 MGA ce mois
              </p>
            </CardContent>
          </Card>

          <Card className="bg-cream/50 border-sage/30 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-forest">
                Dividendes Reçus
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-olive">1 250 MGA</div>
              <p className="text-xs text-sage mt-1 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +250 MGA ce mois
              </p>
            </CardContent>
          </Card>

          <Card className="bg-cream/50 border-sage/30 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-forest">
                Nombre de Transactions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-forest">12</div>
              <p className="text-xs text-sage mt-1">3 ce mois-ci</p>
            </CardContent>
          </Card>
        </div>

        {/* Transaction History */}
        <Card className="bg-cream/50 border-sage/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-forest">
              <Calendar className="h-5 w-5 text-olive" />
              Transactions Récentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {historyItems.map((item, index) => (
                <div key={item.id}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-forest">
                          {item.title}
                        </h4>
                        {getStatusBadge(item.status)}
                      </div>
                      <p className="text-sm text-forest/60 flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(item.date)}
                      </p>
                    </div>
                    <div className="text-right">
                      <div
                        className={`text-lg font-bold ${
                          item.type === "DIVIDEND"
                            ? "text-green-600"
                            : "text-forest"
                        }`}
                      >
                        {item.type === "DIVIDEND" ? "+" : "-"}
                        {item.amount.toLocaleString()} MGA
                      </div>
                      <p className="text-xs text-forest/60">
                        {item.type === "DIVIDEND"
                          ? "Dividende"
                          : "Investissement"}
                      </p>
                    </div>
                  </div>
                  {index < historyItems.length - 1 && (
                    <Separator className="mt-4" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
