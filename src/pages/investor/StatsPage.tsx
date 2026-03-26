import { BarChart3, TrendingUp, PieChart, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useInvestorStats } from "@/hooks/use-stats";

export default function StatsPage() {
  const { data: stats, isLoading, isError, refetch } = useInvestorStats();

  const totalInvested = stats?.totalInvested ?? 0;
  const totalDividends = stats?.totalDividends ?? 0;
  const roi = stats?.roi ?? 0;
  const activeProjects = stats?.activeProjects ?? 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-forest mb-2 flex items-center gap-3">
          <BarChart3 className="h-8 w-8" />
          Statistiques d'Investissement
        </h1>
        <p className="text-forest/70">
          Analysez vos performances et suivez vos rendements
        </p>
      </div>

      {isError && (
        <Card className="mb-6 bg-destructive/5 border-destructive/30">
          <CardContent className="pt-6 flex items-center justify-between gap-4">
            <p className="text-sm text-destructive">
              Impossible de charger les statistiques pour le moment.
            </p>
            <button
              type="button"
              onClick={() => refetch()}
              className="text-sm font-medium text-destructive underline"
            >
              Reessayer
            </button>
          </CardContent>
        </Card>
      )}

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className=" bg-cream/50 border-sage/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-forest/70 flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Portefeuille Total
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-forest">
              {isLoading
                ? "..."
                : `${totalInvested.toLocaleString("fr-FR")} MGA`}
            </div>
            <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              {isLoading ? "Chargement" : `${roi.toFixed(2)}% depuis le debut`}
            </p>
          </CardContent>
        </Card>

        <Card className=" bg-cream/50 border-sage/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-forest/70 flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              ROI Moyen
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-olive">
              {isLoading ? "..." : `${roi.toFixed(2)}%`}
            </div>
            <p className="text-xs text-forest/60 mt-1">
              Rendement base sur les dividendes
            </p>
          </CardContent>
        </Card>

        <Card className=" bg-cream/50 border-sage/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-forest/70 flex items-center gap-2">
              <PieChart className="h-4 w-4" />
              Projets Actifs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-forest">
              {isLoading ? "..." : activeProjects}
            </div>
            <p className="text-xs text-forest/60 mt-1">
              Nombre de projets avec investissement confirme
            </p>
          </CardContent>
        </Card>

        <Card className=" bg-cream/50 border-sage/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-forest/70 flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Dividendes Totaux
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {isLoading
                ? "..."
                : `${totalDividends.toLocaleString("fr-FR")} MGA`}
            </div>
            <p className="text-xs text-forest/60 mt-1">Depuis le début</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-cream/50 border-sage/30">
          <CardHeader>
            <CardTitle className="text-forest">
              Performance du Portefeuille
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-sage/10 rounded-lg border border-sage/20">
              <p className="text-sage">Graphique à venir</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-cream/50 border-sage/30">
          <CardHeader>
            <CardTitle className="text-forest">
              Répartition par Secteur
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-sage/10 rounded-lg border border-sage/20">
              <p className="text-sage">Graphique à venir</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
