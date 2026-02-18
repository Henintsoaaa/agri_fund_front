import { useEffect } from "react";
import { useProject } from "@/features/project/hooks/useProject";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Wallet,
  TrendingUp,
  Target,
  DollarSign,
  Heart,
  Activity,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function InvestorDashboard() {
  const { allProjects: publicProjects } = useProject();

  useEffect(() => {
    // Projects are automatically fetched by useQuery
  }, []);

  // Mock investment statistics (à remplacer par de vraies données)
  const stats = {
    totalInvested: 15000,
    activeInvestments: 8,
    avgROI: 12.5,
    portfolioValue: 16875,
    gain: 1875,
    favoriteProjects: 3,
  };

  const gainPercentage = ((stats.gain / stats.totalInvested) * 100).toFixed(1);

  // Top 3 projets par collecte
  const topProjects = publicProjects
    ?.map((project) => ({
      ...project,
      totalCollected:
        project.stages?.reduce(
          (acc, stage) => acc + stage.collectedAmount,
          0,
        ) || 0,
      totalTarget:
        project.stages?.reduce((acc, stage) => acc + stage.targetAmount, 0) ||
        0,
    }))
    .sort((a, b) => b.totalCollected - a.totalCollected)
    .slice(0, 3);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-forest">
            Tableau de bord Investisseur
          </h1>
          <p className="text-sage text-lg">
            Suivez vos investissements et découvrez de nouvelles opportunités
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-cream/50 border-sage/30 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-forest">
                Total Investi
              </CardTitle>
              <Wallet className="h-5 w-5 text-olive" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-forest">
                {stats.totalInvested.toLocaleString("fr-FR")} €
              </div>
              <p className="text-xs text-sage mt-2">
                {stats.activeInvestments} investissements actifs
              </p>
            </CardContent>
          </Card>

          <Card className="bg-cream/50 border-sage/30 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-forest">
                Valeur du Portfolio
              </CardTitle>
              <TrendingUp className="h-5 w-5 text-olive" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-olive">
                {stats.portfolioValue.toLocaleString("fr-FR")} €
              </div>
              <div className="flex items-center gap-1 mt-2">
                <Badge className="bg-olive/20 text-olive border-olive/30">
                  +{gainPercentage}%
                </Badge>
                <span className="text-xs text-sage">
                  +{stats.gain.toLocaleString("fr-FR")} €
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-cream/50 border-sage/30 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-forest">
                ROI Moyen
              </CardTitle>
              <Target className="h-5 w-5 text-olive" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-olive">
                +{stats.avgROI}%
              </div>
              <p className="text-xs text-sage mt-2">Sur vos investissements</p>
            </CardContent>
          </Card>
        </div>

        <Separator className="bg-sage/30" />

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* My Investments Summary */}
          <Card className="bg-cream/50 border-sage/30 lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-forest flex items-center gap-2">
                <Activity className="h-5 w-5 text-olive" />
                Mes Investissements
              </CardTitle>
              <CardDescription className="text-sage">
                Aperçu de votre portfolio
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <div className="space-y-4 pr-4">
                  {/* Mock investment data */}
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Card
                      key={i}
                      className="bg-cream border-sage/30 hover:border-olive/50 transition-colors"
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-semibold text-forest">
                              Projet Agricole #{i}
                            </h4>
                            <p className="text-xs text-sage">
                              Étape {i} - Investissement actif
                            </p>
                          </div>
                          <Badge className="bg-olive text-cream">Active</Badge>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-sage">Investi:</span>
                          <span className="font-semibold text-forest">
                            2 000 €
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-sm mt-1">
                          <span className="text-sage">ROI:</span>
                          <span className="font-semibold text-olive">
                            +{(10 + i * 2).toFixed(1)}%
                          </span>
                        </div>
                        <Progress value={65 + i * 5} className="h-2 mt-3" />
                        <p className="text-xs text-sage mt-1">
                          {65 + i * 5}% de l'objectif atteint
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Favorites & Top Projects */}
          <div className="space-y-6">
            {/* Favorites */}
            <Card className="bg-cream/50 border-sage/30">
              <CardHeader>
                <CardTitle className="text-forest flex items-center gap-2">
                  <Heart className="h-5 w-5 text-olive" />
                  Favoris
                </CardTitle>
                <CardDescription className="text-sage">
                  Projets suivis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-4">
                  <Heart className="h-12 w-12 mx-auto text-sage/30 mb-2" />
                  <p className="text-sm text-sage">
                    {stats.favoriteProjects} projets en favoris
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Top Projects */}
            <Card className="bg-cream/50 border-sage/30">
              <CardHeader>
                <CardTitle className="text-forest flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-olive" />
                  Top Projets
                </CardTitle>
                <CardDescription className="text-sage">
                  Les plus financés
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topProjects?.map((project, index) => {
                    const progress =
                      project.totalTarget > 0
                        ? Math.round(
                            (project.totalCollected / project.totalTarget) *
                              100,
                          )
                        : 0;
                    return (
                      <div
                        key={project.id}
                        className="flex items-start gap-3 p-2 rounded-lg hover:bg-olive/5 transition-colors"
                      >
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-olive/20 text-forest font-bold text-xs">
                          {index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-forest line-clamp-1">
                            {project.title}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <Progress value={progress} className="h-1 flex-1" />
                            <span className="text-xs text-sage whitespace-nowrap">
                              {progress}%
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <Card className="bg-gradient-to-r from-olive/20 to-sage/20 border-olive/30">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-forest mb-2">
                  Prêt à investir ?
                </h3>
                <p className="text-sage">
                  Découvrez de nouveaux projets agricoles à financer
                </p>
              </div>
              <div className="flex gap-3">
                <a
                  href="/project-show"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-forest text-cream hover:bg-forest/90 h-10 px-6"
                >
                  <DollarSign className="h-4 w-4 mr-2" />
                  Explorer les Projets
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
