import { BarChart3, TrendingUp, PieChart, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function StatsPage() {
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
            <div className="text-2xl font-bold text-forest">15 000 MGA</div>
            <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +12.5% depuis le début
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
            <div className="text-2xl font-bold text-olive">12.5%</div>
            <p className="text-xs text-forest/60 mt-1">Sur 8 investissements</p>
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
            <div className="text-2xl font-bold text-forest">5</div>
            <p className="text-xs text-forest/60 mt-1">
              3 financés, 2 en cours
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
            <div className="text-2xl font-bold text-green-600">1 875 MGA</div>
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
