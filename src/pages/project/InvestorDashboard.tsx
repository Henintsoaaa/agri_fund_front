import { useEffect, useState, useMemo } from "react";
import { useProject } from "@/features/project/hooks/useProject";
import { useInvestment } from "@/features/investment/hooks/useInvestment";
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
  const { myInvestments, isLoadingMyInvestments, myTransactionStats } =
    useInvestment();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Projects are automatically fetched by useQuery
  }, []);

  // Calculate real investment statistics
  const stats = useMemo(() => {
    const totalInvested = myTransactionStats?.totalInvested || 0;
    const totalRefunded = myTransactionStats?.totalRefunded || 0;
    const totalDividends = myTransactionStats?.totalDividends || 0;
    const activeInvestments =
      myInvestments?.filter((inv) => inv.status === "CONFIRMED").length || 0;
    const portfolioValue = totalInvested - totalRefunded + totalDividends;
    const gain = portfolioValue - totalInvested;

    return {
      totalInvested,
      activeInvestments,
      avgROI: totalInvested > 0 ? (gain / totalInvested) * 100 : 0,
      portfolioValue,
      gain,
      favoriteProjects: 0, // TODO: implement favorites feature
    };
  }, [myInvestments, myTransactionStats]);

  const gainPercentage =
    stats.gain !== 0
      ? ((stats.gain / stats.totalInvested) * 100).toFixed(1)
      : "0.0";

  // Filter projects based on search
  const filteredProjects = publicProjects?.filter((project) =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Enhanced project data with calculations
  const enhancedProjects = filteredProjects?.map((project) => ({
    ...project,
    totalCollected:
      project.stages?.reduce((acc, stage) => acc + stage.currentAmount, 0) || 0,
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
                  className="pl-10 border-sage/30 bg-cream selection:bg-olive selection:text-cream"
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
            {isLoadingMyInvestments ? (
              <div className="text-center py-8 text-sage">
                Chargement de vos investissements...
              </div>
            ) : myInvestments && myInvestments.length > 0 ? (
              <div className="h-fit">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-4">
                  {myInvestments.map((investment) => {
                    const stage = investment.projectStage;
                    const project = stage?.project;
                    const progress = stage
                      ? (stage.currentAmount / stage.targetAmount) * 100
                      : 0;
                    const roi = 0; // TODO: Calculate actual ROI when dividend data is available

                    return (
                      <InvestmentCard
                        key={investment.id}
                        projectName={project?.title || "Projet"}
                        stage={stage?.stageOrder || 1}
                        amountInvested={investment.amount}
                        roi={roi}
                        progress={progress}
                        status={
                          investment.status === "CONFIRMED"
                            ? "active"
                            : investment.status === "PENDING"
                              ? "pending"
                              : "completed"
                        }
                      />
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-sage text-lg">
                  Vous n'avez pas encore d'investissements
                </p>
                <p className="text-sage text-sm mt-2">
                  Découvrez les projets disponibles ci-dessus pour commencer
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
