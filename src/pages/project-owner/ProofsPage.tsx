import { useState } from "react";
import { Upload, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProofCard from "@/components/proofs/ProofCard";
import UploadProofDialog from "@/components/proofs/UploadProofDialog";
import { useProofs } from "@/features/proofs/hooks/useProofs";
import { useProject } from "@/features/project/hooks/useProject";

export default function ProofsPage() {
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const { myProofs, isLoadingMyProofs, deleteProof, uploadProof } = useProofs();
  const { myProjects } = useProject();

  const handleUpload = async (data: {
    file: File;
    projectId: string;
    projectStageId?: string;
    title: string;
    description?: string;
  }) => {
    await uploadProof(data);
  };

  const handleDelete = (id: string) => {
    if (
      confirm(
        "Êtes-vous sûr de vouloir supprimer cette preuve ? Cette action est irréversible.",
      )
    ) {
      deleteProof(id);
    }
  };

  const proofsByStatus = {
    all: myProofs || [],
    pending: myProofs?.filter((p) => p.status === "PENDING") || [],
    approved: myProofs?.filter((p) => p.status === "APPROVED") || [],
    rejected: myProofs?.filter((p) => p.status === "REJECTED") || [],
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-cream via-sage/10 to-olive/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-forest flex items-center gap-3">
              <Upload className="h-8 w-8 text-olive" />
              Preuves de Progression
            </h1>
            <p className="text-sage text-lg mt-1">
              Gérez les preuves visuelles de vos projets
            </p>
          </div>
          <Button
            onClick={() => setUploadDialogOpen(true)}
            className="bg-forest hover:bg-forest/90"
          >
            <Plus className="h-4 w-4 mr-2" />
            Ajouter une preuve
          </Button>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-sage">
                Total
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-forest">
                {proofsByStatus.all.length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-sage">
                En attente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-600">
                {proofsByStatus.pending.length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-sage">
                Approuvées
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {proofsByStatus.approved.length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Proofs List with Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">
              Toutes ({proofsByStatus.all.length})
            </TabsTrigger>
            <TabsTrigger value="pending">
              En attente ({proofsByStatus.pending.length})
            </TabsTrigger>
            <TabsTrigger value="approved">
              Approuvées ({proofsByStatus.approved.length})
            </TabsTrigger>
            <TabsTrigger value="rejected">
              Rejetées ({proofsByStatus.rejected.length})
            </TabsTrigger>
          </TabsList>

          {["all", "pending", "approved", "rejected"].map((tab) => (
            <TabsContent key={tab} value={tab} className="mt-6">
              {isLoadingMyProofs ? (
                <div className="text-center py-8 text-sage">Chargement...</div>
              ) : proofsByStatus[tab as keyof typeof proofsByStatus].length ===
                0 ? (
                <div className="text-center py-8 text-sage">
                  Aucune preuve dans cette catégorie
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {proofsByStatus[tab as keyof typeof proofsByStatus].map(
                    (proof) => (
                      <ProofCard
                        key={proof.id}
                        proof={proof}
                        showActions
                        onDelete={handleDelete}
                      />
                    ),
                  )}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Upload Dialog */}
      <UploadProofDialog
        open={uploadDialogOpen}
        onOpenChange={setUploadDialogOpen}
        onUpload={handleUpload}
        projects={
          myProjects?.map((p) => ({
            id: p.id,
            title: p.title,
            stages: p.stages,
          })) || []
        }
        isUploading={false}
      />
    </div>
  );
}
