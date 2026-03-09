import { FileText, Download, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AdminReportsPage() {
  const reports = [
    {
      id: "1",
      name: "Rapport Mensuel - Février 2026",
      type: "monthly",
      date: "2026-03-01",
      size: "2.4 MB",
    },
    {
      id: "2",
      name: "Rapport des Transactions - Q1 2026",
      type: "financial",
      date: "2026-02-28",
      size: "1.8 MB",
    },
    {
      id: "3",
      name: "Analyse des Utilisateurs - Février",
      type: "users",
      date: "2026-02-25",
      size: "1.2 MB",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-cream via-sage/10 to-olive/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-forest flex items-center gap-3">
            <FileText className="h-8 w-8 text-olive" />
            Rapports et Analyses
          </h1>
          <p className="text-sage text-lg">
            Générez et téléchargez des rapports détaillés
          </p>
        </div>

        {/* Generate New Report */}
        <Card className="bg-cream/50 border-sage/30">
          <CardHeader>
            <CardTitle className="text-forest">
              Générer un nouveau rapport
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <Select>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Type de rapport" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Rapport Mensuel</SelectItem>
                  <SelectItem value="financial">Rapport Financier</SelectItem>
                  <SelectItem value="users">Analyse Utilisateurs</SelectItem>
                  <SelectItem value="projects">Analyse Projets</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Période" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="current">Mois en cours</SelectItem>
                  <SelectItem value="last">Mois dernier</SelectItem>
                  <SelectItem value="quarter">Trimestre en cours</SelectItem>
                  <SelectItem value="year">Année en cours</SelectItem>
                </SelectContent>
              </Select>

              <Button>
                <FileText className="h-4 w-4 mr-2" />
                Générer
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Reports List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-forest mb-4">
            Rapports disponibles
          </h2>

          {reports.map((report) => (
            <Card key={report.id}>
              <CardContent className="py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <FileText className="h-10 w-10 text-forest/40" />
                    <div>
                      <h3 className="font-semibold text-forest">
                        {report.name}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-forest/60 mt-1">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(report.date).toLocaleDateString("fr-FR")}
                        </span>
                        <span>{report.size}</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Télécharger
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
