import {
  BarChart3,
  Users,
  FolderKanban,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminStatsPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-cream via-sage/10 to-olive/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-forest flex items-center gap-3">
            <BarChart3 className="h-8 w-8 text-olive" />
            Statistiques Globales
          </h1>
          <p className="text-sage text-lg">
            Vue d'ensemble des performances de la plateforme
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-cream/50 border-sage/30 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-forest flex items-center gap-2">
                <Users className="h-4 w-4 text-olive" />
                Utilisateurs Totaux
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-forest">1,234</div>
              <p className="text-xs text-olive mt-1 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +12% ce mois
              </p>
            </CardContent>
          </Card>

          <Card className="bg-cream/50 border-sage/30 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-forest flex items-center gap-2">
                <FolderKanban className="h-4 w-4 text-olive" />
                Projets Actifs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-forest">87</div>
              <p className="text-xs text-sage mt-1">42 financés</p>
            </CardContent>
          </Card>

          <Card className="bg-cream/50 border-sage/30 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-forest flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-olive" />
                Volume Total
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-olive">2.5M MGA</div>
              <p className="text-xs text-olive mt-1 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +25% ce mois
              </p>
            </CardContent>
          </Card>

          <Card className="bg-cream/50 border-sage/30 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-forest flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-olive" />
                Taux de Succès
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-olive">94.2%</div>
              <p className="text-xs text-sage mt-1">Projets financés</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Croissance des Utilisateurs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-sage/10 rounded-lg">
                <p className="text-forest/50">Graphique à venir</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Volume d'Investissements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-sage/10 rounded-lg">
                <p className="text-forest/50">Graphique à venir</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Répartition des Projets par Catégorie</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-sage/10 rounded-lg">
              <p className="text-forest/50">Graphique à venir</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
