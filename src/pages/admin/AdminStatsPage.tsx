import {
  BarChart3,
  Users,
  FolderKanban,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAdminStats } from "@/hooks/use-stats";

const CHART_COLORS = ["#6B8E23", "#7DA96B", "#A3B18A", "#C7D3A6", "#4F772D"];

function formatMonthLabel(month: string) {
  const [year, monthIndex] = month.split("-");
  const date = new Date(Number(year), Number(monthIndex) - 1, 1);
  return date.toLocaleDateString("fr-FR", { month: "short", year: "2-digit" });
}

export default function AdminStatsPage() {
  const { data: stats, isLoading, isError, refetch } = useAdminStats();

  const totalUsers = stats?.totalUsers ?? 0;
  const activeProjects = stats?.activeProjects ?? 0;
  const totalVolume = stats?.totalVolume ?? 0;
  const successRate = stats?.successRate ?? 0;
  const fundedProjects = stats?.fundedProjects ?? 0;
  const userGrowth = stats?.userGrowth ?? [];
  const investmentVolumeByMonth = stats?.investmentVolumeByMonth ?? [];
  const projectDistribution = stats?.projectDistribution ?? [];

  const chartUserGrowth = userGrowth.map((item) => ({
    ...item,
    monthLabel: formatMonthLabel(item.month),
  }));

  const chartInvestmentVolume = investmentVolumeByMonth.map((item) => ({
    ...item,
    monthLabel: formatMonthLabel(item.month),
  }));

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

        {isError && (
          <Card className="bg-destructive/5 border-destructive/30">
            <CardContent className="pt-6 flex items-center justify-between gap-4">
              <p className="text-sm text-destructive">
                Impossible de charger les statistiques globales.
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-cream/50 border-sage/30 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-forest flex items-center gap-2">
                <Users className="h-4 w-4 text-olive" />
                Utilisateurs Totaux
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-forest">
                {isLoading ? "..." : totalUsers.toLocaleString("fr-FR")}
              </div>
              <p className="text-xs text-olive mt-1 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                Comptes enregistres sur la plateforme
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
              <div className="text-2xl font-bold text-forest">
                {isLoading ? "..." : activeProjects}
              </div>
              <p className="text-xs text-sage mt-1">
                {isLoading ? "..." : `${fundedProjects} finances`}
              </p>
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
              <div className="text-2xl font-bold text-olive">
                {isLoading
                  ? "..."
                  : `${totalVolume.toLocaleString("fr-FR")} MGA`}
              </div>
              <p className="text-xs text-olive mt-1 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                Investissements confirms cumules
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
              <div className="text-2xl font-bold text-olive">
                {isLoading ? "..." : `${successRate.toFixed(1)}%`}
              </div>
              <p className="text-xs text-sage mt-1">Projets financés</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card className="bg-cream/50 border-sage/30">
            <CardHeader>
              <CardTitle>Croissance des Utilisateurs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-sage/10 rounded-lg p-2">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartUserGrowth}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#A3B18A55" />
                    <XAxis
                      dataKey="monthLabel"
                      tick={{ fill: "#2F4F2F", fontSize: 12 }}
                    />
                    <YAxis tick={{ fill: "#2F4F2F", fontSize: 12 }} />
                    <Tooltip
                      formatter={(value, name) => {
                        const numericValue =
                          typeof value === "number"
                            ? value
                            : Number(value ?? 0);

                        return [
                          numericValue.toLocaleString("fr-FR"),
                          name === "totalUsers" ? "Total" : "Nouveaux",
                        ];
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="totalUsers"
                      name="Utilisateurs"
                      stroke="#4F772D"
                      strokeWidth={3}
                      dot={{ r: 4 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="newUsers"
                      name="Nouveaux"
                      stroke="#7DA96B"
                      strokeWidth={2}
                      dot={{ r: 3 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-cream/50 border-sage/30">
            <CardHeader>
              <CardTitle>Volume d'Investissements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-sage/10 rounded-lg p-2">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartInvestmentVolume}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#A3B18A55" />
                    <XAxis
                      dataKey="monthLabel"
                      tick={{ fill: "#2F4F2F", fontSize: 12 }}
                    />
                    <YAxis tick={{ fill: "#2F4F2F", fontSize: 12 }} />
                    <Tooltip
                      formatter={(value) => {
                        const numericValue =
                          typeof value === "number"
                            ? value
                            : Number(value ?? 0);

                        return [
                          `${numericValue.toLocaleString("fr-FR")} MGA`,
                          "Montant",
                        ];
                      }}
                    />
                    <Bar
                      dataKey="amount"
                      fill="#6B8E23"
                      radius={[6, 6, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-cream/50 border-sage/30">
          <CardHeader>
            <CardTitle>Répartition des Projets par Statut</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-sage/10 rounded-lg p-2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={projectDistribution}
                    dataKey="value"
                    nameKey="label"
                    cx="50%"
                    cy="50%"
                    outerRadius={88}
                    label={({ name, percent }) =>
                      `${name} ${((percent ?? 0) * 100).toFixed(0)}%`
                    }
                  >
                    {projectDistribution.map((entry, index) => (
                      <Cell
                        key={`${entry.label}-${index}`}
                        fill={CHART_COLORS[index % CHART_COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => {
                      const numericValue =
                        typeof value === "number" ? value : Number(value ?? 0);

                      return numericValue.toLocaleString("fr-FR");
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
