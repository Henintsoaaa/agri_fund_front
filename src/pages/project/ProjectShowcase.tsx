import { useEffect, useState } from "react";
import { useProject } from "@/features/project/hooks/useProject";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Filter,
  Heart,
  TrendingUp,
  Users,
  MapPin,
  Eye,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

export default function ProjectShowcase() {
  const {
    allProjects: publicProjects,
    isLoadingAllProjects: isLoadingPublicProjects,
  } = useProject();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    // Projects are automatically fetched by useQuery
  }, []);

  const filteredProjects = publicProjects?.filter((project) => {
    const matchesSearch = project.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-forest">
            Explorer les Projets
          </h1>
          <p className="text-sage text-lg">
            Découvrez des opportunités d'investissement agricole
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="bg-cream/50 border-sage/30 h-full">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-sage" />
                <Input
                  placeholder="Rechercher un projet..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-sage/30 bg-cream"
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full md:w-48 border-sage/30 bg-cream">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filtrer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les projets</SelectItem>
                  <SelectItem value="trending">Tendance</SelectItem>
                  <SelectItem value="new">Nouveaux</SelectItem>
                  <SelectItem value="almost-funded">
                    Presque financés
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Statistics Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-br from-olive/20 to-olive/10 border-olive/30">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-olive/20">
                <TrendingUp className="h-6 w-6 text-olive" />
              </div>
              <div>
                <p className="text-2xl font-bold text-forest">
                  {publicProjects?.length || 0}
                </p>
                <p className="text-sm text-sage">Projets actifs</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-sage/20 to-sage/10 border-sage/30">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-sage/20">
                <Users className="h-6 w-6 text-forest" />
              </div>
              <div>
                <p className="text-2xl font-bold text-forest">342</p>
                <p className="text-sm text-sage">Investisseurs</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-forest/20 to-forest/10 border-forest/30">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-forest/20">
                <TrendingUp className="h-6 w-6 text-forest" />
              </div>
              <div>
                <p className="text-2xl font-bold text-forest">458K MGA</p>
                <p className="text-sm text-sage">Fonds levés</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Separator className="bg-sage/30" />

        {/* Projects Grid */}
        <div>
          {isLoadingPublicProjects ? (
            <div className="text-center py-12 text-sage">
              Chargement des projets...
            </div>
          ) : !filteredProjects || filteredProjects.length === 0 ? (
            <Card className="bg-cream/50 border-sage/30">
              <CardContent className="p-12 text-center">
                <Search className="h-16 w-16 mx-auto text-sage/50 mb-4" />
                <h3 className="text-lg font-semibold text-forest mb-2">
                  Aucun projet trouvé
                </h3>
                <p className="text-sage">
                  Modifiez vos critères de recherche ou revenez plus tard
                </p>
              </CardContent>
            </Card>
          ) : (
            <ScrollArea className="h-200">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pr-4">
                {filteredProjects.map((project) => {
                  const totalTarget =
                    project.stages?.reduce(
                      (acc, stage) => acc + stage.targetAmount,
                      0,
                    ) || 0;
                  const totalCollected =
                    project.stages?.reduce(
                      (acc, stage) => acc + stage.collectedAmount,
                      0,
                    ) || 0;
                  const progress =
                    totalTarget > 0
                      ? Math.round((totalCollected / totalTarget) * 100)
                      : 0;

                  return (
                    <Card
                      key={project.id}
                      className="bg-cream border-sage/30 hover:shadow-xl transition-all duration-300 overflow-hidden group"
                    >
                      {/* Project Image */}
                      <div className="relative h-56 overflow-hidden bg-gradient-to-br from-olive/20 to-sage/20">
                        <img
                          src={project.image || "/placeholder-project.jpg"}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <Button
                          size="icon"
                          variant="ghost"
                          className="absolute top-3 right-3 bg-cream/90 hover:bg-cream text-forest"
                        >
                          <Heart className="h-4 w-4" />
                        </Button>
                        <Badge className="absolute bottom-3 left-3 bg-olive text-cream">
                          {project.stages?.length || 0} étapes
                        </Badge>
                      </div>

                      <CardHeader>
                        <CardTitle className="text-forest line-clamp-1 text-xl">
                          {project.title}
                        </CardTitle>
                        <CardDescription className="text-sage line-clamp-2 text-sm">
                          {project.description}
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        {/* Location (mock) */}
                        <div className="flex items-center gap-2 text-sm text-sage">
                          <MapPin className="h-4 w-4 text-olive" />
                          <span>France</span>
                        </div>

                        <Separator className="bg-sage/30" />

                        {/* Funding Progress */}
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="font-semibold text-forest">
                              {totalCollected.toLocaleString("fr-FR")} MGA
                            </span>
                            <span className="text-sage">
                              / {totalTarget.toLocaleString("fr-FR")} MGA
                            </span>
                          </div>
                          <Progress value={progress} className="h-2" />
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-xs text-sage">
                              {progress}% financé
                            </span>
                            <div className="flex items-center gap-1 text-xs text-sage">
                              <Users className="h-3 w-3" />
                              <span>0 investisseurs</span>
                            </div>
                          </div>
                        </div>

                        {/* ROI Badge (mock) */}
                        <div className="flex gap-2">
                          <Badge
                            variant="outline"
                            className="border-olive/50 text-olive"
                          >
                            <TrendingUp className="h-3 w-3 mr-1" />
                            ROI: +12%
                          </Badge>
                        </div>
                      </CardContent>

                      <CardFooter className="pt-0">
                        <Button className="w-full bg-forest hover:bg-forest/90 text-cream gap-2 group-hover:bg-olive transition-colors">
                          <Eye className="h-4 w-4" />
                          Voir les détails
                        </Button>
                      </CardFooter>
                    </Card>
                  );
                })}
              </div>
            </ScrollArea>
          )}
        </div>
      </div>
    </div>
  );
}
