import { useState } from "react";
import { Heart, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function FavoritesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  return (
    <div className="min-h-screen bg-linear-to-br from-cream via-sage/10 to-olive/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-forest flex items-center gap-3">
            <Heart className="h-8 w-8 text-rose-500" />
            Projets Favoris
          </h1>
          <p className="text-sage text-lg">
            Vos projets agricoles préférés en un seul endroit
          </p>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-forest/50" />
            <Input
              placeholder="Rechercher un projet..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-full sm:w-50">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filtrer par statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="ACTIVE">Actifs</SelectItem>
              <SelectItem value="FUNDED">Financés</SelectItem>
              <SelectItem value="COMPLETED">Terminés</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Empty State */}
        <div className="text-center py-16">
          <Heart className="h-16 w-16 mx-auto text-forest/20 mb-4" />
          <h3 className="text-xl font-semibold text-forest mb-2">
            Aucun projet favori
          </h3>
          <p className="text-forest/60 mb-6">
            Ajoutez des projets à vos favoris pour les retrouver facilement
          </p>
          <Button onClick={() => (window.location.href = "/project-show")}>
            Explorer les projets
          </Button>
        </div>
      </div>
    </div>
  );
}
