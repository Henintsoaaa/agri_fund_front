import { ImagePlus, Upload, Calendar, CheckCircle2, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
// import { Separator } from "@/components/ui/separator";

export default function ProofsPage() {
  const proofs = [
    {
      id: "1",
      projectName: "Culture de Riz Bio",
      stageName: "Phase de plantation",
      uploadDate: "2026-03-05T10:00:00Z",
      imageCount: 5,
      status: "APPROVED",
    },
    {
      id: "2",
      projectName: "Maraîchage Urbain",
      stageName: "Installation des serres",
      uploadDate: "2026-03-03T14:30:00Z",
      imageCount: 8,
      status: "PENDING",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "APPROVED":
        return (
          <Badge className="bg-olive/20 text-olive border-olive/30">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Approuvé
          </Badge>
        );
      case "PENDING":
        return (
          <Badge
            variant="secondary"
            className="bg-sage/20 text-sage border-sage/30"
          >
            <Clock className="h-3 w-3 mr-1" />
            En attente
          </Badge>
        );
      case "REJECTED":
        return <Badge variant="destructive">Rejeté</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-cream via-sage/10 to-olive/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-forest flex items-center gap-3">
            <ImagePlus className="h-8 w-8 text-olive" />
            Preuves de Progression
          </h1>
          <p className="text-sage text-lg">
            Téléchargez et gérez les preuves visuelles de l'avancement de vos
            projets
          </p>
        </div>

        {/* Upload Section */}
        <Card className="border-dashed border-2 border-olive/40 bg-cream/50 hover:border-olive/60 transition-colors">
          <CardContent className="py-8">
            <div className="text-center">
              <Upload className="h-12 w-12 mx-auto text-forest/40 mb-4" />
              <h3 className="text-lg font-semibold text-forest mb-2">
                Télécharger des preuves
              </h3>
              <p className="text-sm text-forest/60 mb-4">
                Ajoutez des photos de l'avancement de vos projets
              </p>
              <Button>
                <Upload className="h-4 w-4 mr-2" />
                Choisir des fichiers
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Proofs List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-forest mb-4">
            Preuves téléchargées
          </h2>

          {proofs.map((proof, index) => (
            <Card key={proof.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">
                      {proof.projectName}
                    </CardTitle>
                    <p className="text-sm text-forest/60 mt-1">
                      {proof.stageName}
                    </p>
                  </div>
                  {getStatusBadge(proof.status)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-6 text-sm text-forest/70">
                  <div className="flex items-center gap-2">
                    <ImagePlus className="h-4 w-4" />
                    {proof.imageCount} images
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {formatDate(proof.uploadDate)}
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button variant="outline" size="sm">
                    Voir les images
                  </Button>
                  <Button variant="outline" size="sm">
                    Ajouter des images
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {proofs.length === 0 && (
          <Card>
            <CardContent className="py-12">
              <div className="text-center">
                <ImagePlus className="h-16 w-16 mx-auto text-forest/20 mb-4" />
                <h3 className="text-xl font-semibold text-forest mb-2">
                  Aucune preuve téléchargée
                </h3>
                <p className="text-forest/60">
                  Commencez par télécharger des preuves de progression
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
