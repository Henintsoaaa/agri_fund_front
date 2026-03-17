import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle,
  XCircle,
  Loader2,
  FileText,
  Image as ImageIcon,
  Calendar,
  User,
  Folder,
  AlertCircle,
} from "lucide-react";
import { useProofs } from "@/features/proofs/hooks/useProofs";
import { getImageUrl } from "@/lib/utils/image";
import type { Proof } from "@/features/proofs/types/proof.types";

interface ProofApprovalModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  proof: Proof;
}

export default function ProofApprovalModal({
  open,
  onOpenChange,
  proof,
}: ProofApprovalModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const { approveProof, rejectProof } = useProofs();

  const handleApprove = async () => {
    if (!confirm("Êtes-vous sûr de vouloir approuver cette preuve ?")) {
      return;
    }

    setIsProcessing(true);
    try {
      await approveProof(proof.id);
      onOpenChange(false);
    } catch (error) {
      console.error("Error approving proof:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReject = async () => {
    const reason = prompt(
      "Raison du rejet (optionnel, sera envoyée au propriétaire du projet):",
    );
    if (reason === null) {
      // User cancelled
      return;
    }

    setIsProcessing(true);
    try {
      // Note: Backend API should be updated to accept rejection reason
      await rejectProof(proof.id);
      onOpenChange(false);
    } catch (error) {
      console.error("Error rejecting proof:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PENDING":
        return <Badge className="bg-amber-500 text-white">En attente</Badge>;
      case "APPROVED":
        return <Badge className="bg-green-500 text-white">Approuvée</Badge>;
      case "REJECTED":
        return <Badge className="bg-red-500 text-white">Rejetée</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case "image":
        return <ImageIcon className="h-5 w-5 text-olive" />;
      default:
        return <FileText className="h-5 w-5 text-olive" />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl text-forest flex items-center justify-between">
            Validation de preuve
            {getStatusBadge(proof.status)}
          </DialogTitle>
          <DialogDescription className="text-sage">
            Examinez la preuve avant de l'approuver ou de la rejeter
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Preview de la preuve */}
          <div className="w-full rounded-lg overflow-hidden bg-sage/10 flex items-center justify-center">
            {proof.fileType === "image" ? (
              <img
                src={getImageUrl(proof.fileUrl)}
                alt={proof.title}
                className="w-full max-h-96 object-contain"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder-image.png";
                }}
              />
            ) : (
              <div className="py-16 flex flex-col items-center gap-4">
                <FileText className="h-16 w-16 text-sage" />
                <p className="text-sage">Document PDF ou fichier</p>
                <a
                  href={getImageUrl(proof.fileUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-olive hover:underline"
                >
                  Ouvrir le fichier
                </a>
              </div>
            )}
          </div>

          {/* Informations de la preuve */}
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                {getFileIcon(proof.fileType)}
                <h3 className="text-lg font-semibold text-forest">
                  {proof.title}
                </h3>
              </div>
              {proof.description && (
                <p className="text-sage">{proof.description}</p>
              )}
            </div>

            <Separator className="bg-sage/30" />

            {/* Métadonnées */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-sm">
                <User className="h-4 w-4 text-olive" />
                <div>
                  <p className="text-xs text-sage">Uploadé par</p>
                  <p className="text-forest font-medium">
                    Propriétaire du projet
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-olive" />
                <div>
                  <p className="text-xs text-sage">Date d'upload</p>
                  <p className="text-forest font-medium">
                    {new Date(proof.uploadedAt).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>

            <Separator className="bg-sage/30" />

            {/* Informations du projet */}
            {proof.project && (
              <div className="bg-cream/50 p-4 rounded-lg border border-sage/20">
                <div className="flex items-center gap-2 mb-2">
                  <Folder className="h-4 w-4 text-olive" />
                  <p className="text-xs text-sage">Projet associé</p>
                </div>
                <p className="font-semibold text-forest">
                  {proof.project.title}
                </p>
                {proof.projectStage && (
                  <p className="text-sm text-sage mt-1">
                    Étape: {proof.projectStage.title}
                  </p>
                )}
              </div>
            )}

            {/* Avertissement */}
            {proof.status === "PENDING" && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-center gap-2 text-amber-700">
                  <AlertCircle className="h-5 w-5" />
                  <p className="font-semibold">Validation requise</p>
                </div>
                <p className="text-sm text-amber-600 mt-2">
                  Cette preuve est en attente de validation. Vérifiez
                  attentivement son contenu avant de l'approuver.
                </p>
              </div>
            )}

            {proof.status === "REJECTED" && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center gap-2 text-red-700">
                  <XCircle className="h-5 w-5" />
                  <p className="font-semibold">Preuve rejetée</p>
                </div>
                <p className="text-sm text-red-600 mt-2">
                  Cette preuve a été rejetée et n'est pas visible aux
                  investisseurs.
                </p>
              </div>
            )}

            {proof.status === "APPROVED" && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-2 text-green-700">
                  <CheckCircle className="h-5 w-5" />
                  <p className="font-semibold">Preuve approuvée</p>
                </div>
                <p className="text-sm text-green-600 mt-2">
                  Cette preuve a été approuvée et est visible aux investisseurs.
                  {proof.approvedAt && (
                    <span className="block mt-1">
                      Approuvée le{" "}
                      {new Date(proof.approvedAt).toLocaleDateString("fr-FR")}
                    </span>
                  )}
                </p>
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isProcessing}
            className="border-sage/30 hover:bg-sage/10"
          >
            Fermer
          </Button>

          {proof.status === "PENDING" && (
            <>
              <Button
                variant="destructive"
                onClick={handleReject}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <XCircle className="h-4 w-4 mr-2" />
                )}
                Rejeter
              </Button>
              <Button
                onClick={handleApprove}
                disabled={isProcessing}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                {isProcessing ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <CheckCircle className="h-4 w-4 mr-2" />
                )}
                Approuver
              </Button>
            </>
          )}

          {proof.status === "REJECTED" && (
            <Button
              onClick={handleApprove}
              disabled={isProcessing}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              {isProcessing ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <CheckCircle className="h-4 w-4 mr-2" />
              )}
              Approuver finalement
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
