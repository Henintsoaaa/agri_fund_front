import { useEffect, useState } from "react";
import { useProject } from "@/features/project/hooks/useProject";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Wallet, TrendingUp, Target, Activity, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import ProjectCard from "@/components/project/ProjectCard";
import InvestmentCard from "@/components/invest/InvestmentCard";

export default function InvestorDashboard() {
  const { allProjects: publicProjects } = useProject();
  const [searchQuery, setSearchQuery] = useState("");

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

  // Filter projects based on search
  const filteredProjects = publicProjects?.filter((project) =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Enhanced project data with calculations
  const enhancedProjects = filteredProjects?.map((project) => ({
    ...project,
    totalCollected:
      project.stages?.reduce((acc, stage) => acc + stage.collectedAmount, 0) ||
      0,
    totalTarget:
      project.stages?.reduce((acc, stage) => acc + stage.targetAmount, 0) || 0,
  }));

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-forest">
            Projets Disponibles
          </h1>
          <p className="text-sage text-lg">
            Découvrez des opportunités d'investissement agricole
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
                {stats.totalInvested.toLocaleString("fr-FR")} MGA
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
                {stats.portfolioValue.toLocaleString("fr-FR")} MGA
              </div>
              <div className="flex items-center gap-1 mt-2">
                <Badge className="bg-olive/20 text-olive border-olive/30">
                  +{gainPercentage}%
                </Badge>
                <span className="text-xs text-sage">
                  +{stats.gain.toLocaleString("fr-FR")} MGA
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

        {/* Search and All Available Projects */}
        <div className="space-y-6">
          {/* Search Bar */}
          <Card className="bg-cream/50 border-sage/30">
            <CardContent className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-sage" />
                <Input
                  placeholder="Rechercher un projet..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-sage/30 bg-cream"
                />
              </div>
            </CardContent>
          </Card>

          {/* All Available Projects */}
          <Card className="bg-cream/50 border-sage/30">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-forest text-2xl">
                    Tous les Projets Disponibles
                  </CardTitle>
                  <CardDescription className="text-sage mt-1">
                    {filteredProjects?.length || 0} projet(s) disponible(s) pour
                    investissement
                  </CardDescription>
                </div>
                <Badge className="bg-olive text-cream">
                  {filteredProjects?.length || 0}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-fit">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pr-4">
                  {enhancedProjects?.map((project) => {
                    return (
                      <ProjectCard
                        key={project.id}
                        project={{
                          ...project,
                          image: project.image || "",
                        }}
                        role="investor"
                      />
                    );
                  })}
                  {(!filteredProjects || filteredProjects.length === 0) && (
                    <div className="col-span-full text-center py-12">
                      <p className="text-sage text-lg">
                        Aucun projet disponible pour le moment
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Separator className="bg-sage/30" />

        {/* My Investments Section - Collapsed view */}
        <Card className="bg-cream/50 border-sage/30">
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
            <div className="h-fit">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-4">
                {/* Mock investment data */}
                {[1, 2, 3, 4].map((i) => (
                  <InvestmentCard
                    key={i}
                    projectName={`Projet Agricole #${i}`}
                    stage={i}
                    amountInvested={2000}
                    roi={10 + i * 2}
                    progress={65 + i * 5}
                    status="active"
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
