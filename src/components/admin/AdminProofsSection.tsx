import { useState } from "react";
import {
  CheckCircle,
  XCircle,
  FileText,
  Image,
  Clock,
  Eye,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useProofs } from "@/features/proofs/hooks/useProofs";
import type { Proof } from "@/features/proofs/types/proof.types";
import ProofApprovalModal from "./ProofApprovalModal";

export default function AdminProofsSection() {
  const { pendingProofs, isLoadingPendingProofs, approveProof, rejectProof } =
    useProofs();
  const [selectedProof, setSelectedProof] = useState<Proof | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleViewProof = (proof: Proof) => {
    setSelectedProof(proof);
    setModalOpen(true);
  };

  const handleApprove = async (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir approuver cette preuve ?")) {
      await approveProof(id);
    }
  };

  const handleReject = async (id: string) => {
    const reason = prompt(
      "Raison du rejet (optionnel, sera envoyée au propriétaire du projet) :",
    );
    if (reason !== null) {
      // Note: reason handling should be added to backend API if needed
      await rejectProof(id);
    }
  };

  if (isLoadingPendingProofs) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-forest flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Preuves en attente de validation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-sage">Chargement...</div>
        </CardContent>
      </Card>
    );
  }

  if (!pendingProofs || pendingProofs.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-forest flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Preuves en attente de validation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-sage">
            Aucune preuve en attente de validation
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-forest flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Preuves en attente de validation ({pendingProofs.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {pendingProofs.map((proof: Proof) => (
            <Card key={proof.id}>
              <CardContent className="p-4">
                <div className="flex gap-4">
                  {/* Preview */}
                  <div className="w-24 h-24 rounded-lg overflow-hidden bg-sage/10 flex items-center justify-center shrink-0">
                    {proof.fileType === "image" ? (
                      <img
                        src={`${import.meta.env.VITE_API_URL}${proof.fileUrl}`}
                        alt={proof.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder-image.png";
                        }}
                      />
                    ) : (
                      <FileText className="h-10 w-10 text-sage" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-forest">
                          {proof.title}
                        </h3>
                        {proof.description && (
                          <p className="text-sm text-sage mt-1">
                            {proof.description}
                          </p>
                        )}
                      </div>
                      <Badge className="bg-amber-500 text-white shrink-0">
                        <Clock className="h-3 w-3 mr-1" />
                        En attente
                      </Badge>
                    </div>

                    {/* Project & Stage Info */}
                    <div className="space-y-1 text-sm text-sage mb-3">
                      {proof.project && (
                        <p>
                          <span className="font-medium">Projet:</span>{" "}
                          {proof.project.title}
                        </p>
                      )}
                      {proof.projectStage && (
                        <p>
                          <span className="font-medium">Étape:</span> Étape{" "}
                          {proof.projectStage.stageOrder}:{" "}
                          {proof.projectStage.title}
                        </p>
                      )}
                      <p>
                        <span className="font-medium">Uploadé le:</span>{" "}
                        {new Date(proof.uploadedAt).toLocaleDateString(
                          "fr-FR",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          },
                        )}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleViewProof(proof)}
                        variant="outline"
                        className="border-olive/30 hover:bg-olive/10"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Voir les détails
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleApprove(proof.id)}
                        className="bg-green-500 hover:bg-green-600"
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Approuver
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleReject(proof.id)}
                        variant="destructive"
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        Rejeter
                      </Button>
                      <a
                        href={`${import.meta.env.VITE_API_URL}${proof.fileUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button size="sm" variant="outline">
                          <Image className="h-4 w-4 mr-1" />
                          Voir le fichier
                        </Button>
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>

      {/* Proof Approval Modal */}
      {selectedProof && (
        <ProofApprovalModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          proof={selectedProof}
        />
      )}
    </Card>
  );
}
