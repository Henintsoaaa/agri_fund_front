import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Users,
  DollarSign,
  TrendingUp,
  Calendar,
  Mail,
  Phone,
  Loader2,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useProject } from "@/features/project/hooks/useProject";

interface ProjectInvestorsDialogProps {
  project: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ProjectInvestorsDialog({
  project,
  open,
  onOpenChange,
}: ProjectInvestorsDialogProps) {
  const { useGetProjectInvestors } = useProject();
  const { data: investorsData, isLoading } = useGetProjectInvestors(project.id);

  const investors = investorsData?.investors || [];
  const totalInvested = investorsData?.totalInvested || 0;
  const totalInvestors = investorsData?.totalInvestors || 0;
  const averageInvestment =
    totalInvestors > 0 ? totalInvested / totalInvestors : 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-forest">
            Investisseurs du projet
          </DialogTitle>
          <DialogDescription className="text-sage">
            {project.title}
          </DialogDescription>
        </DialogHeader>

        {/* Statistiques générales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <Card className="bg-gradient-to-br from-olive/10 to-sage/10">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-sage">Total Investisseurs</p>
                  <p className="text-2xl font-bold text-forest">
                    {totalInvestors}
                  </p>
                </div>
                <Users className="h-8 w-8 text-olive" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-olive/10 to-sage/10">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-sage">Total Investi</p>
                  <p className="text-2xl font-bold text-forest">
                    €{totalInvested.toLocaleString()}
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-olive" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-olive/10 to-sage/10">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-sage">Investissement Moyen</p>
                  <p className="text-2xl font-bold text-forest">
                    €{averageInvestment.toLocaleString()}
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-olive" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Liste des investisseurs */}
        <ScrollArea className="h-[400px] pr-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-olive" />
            </div>
          ) : (
            <div className="space-y-4">
              {investors.length > 0 ? (
                investors.map((investor: any) => (
                  <Card
                    key={investor.id}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardContent className="pt-6">
                      <div className="flex flex-col space-y-3">
                        {/* Nom et montant */}
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-lg text-forest">
                              {investor.name}
                            </h3>
                            <p className="text-sm text-sage mt-1">
                              {investor.investments.length} investissement
                              {investor.investments.length > 1 ? "s" : ""}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-olive">
                              €{investor.totalInvested.toLocaleString()}
                            </p>
                          </div>
                        </div>

                        {/* Informations de contact */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-sage">
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4" />
                            <span>{investor.email}</span>
                          </div>
                          {investor.phone && (
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4" />
                              <span>{investor.phone}</span>
                            </div>
                          )}
                        </div>

                        {/* Détails des investissements */}
                        <div className="space-y-2 mt-2">
                          {investor.investments.map((investment: any) => (
                            <div
                              key={investment.id}
                              className="flex items-center justify-between p-2 bg-sage/5 rounded"
                            >
                              <div className="flex items-center gap-2 text-sm">
                                <Badge variant="secondary" className="text-xs">
                                  {investment.stage}
                                </Badge>
                                <span className="text-sage flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  {new Date(
                                    investment.investmentDate,
                                  ).toLocaleDateString("fr-FR")}
                                </span>
                              </div>
                              <span className="font-medium text-forest">
                                €{investment.amount.toLocaleString()}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-12 text-sage">
                  <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Aucun investisseur pour ce projet</p>
                </div>
              )}
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
