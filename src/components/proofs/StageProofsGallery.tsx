import { useState } from "react";
import { Eye } from "lucide-react";
import ProofCard from "./ProofCard";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Proof } from "@/features/proofs/types/proof.types";

interface StageProofsGalleryProps {
  stageId: string;
  stageTitle: string;
  proofs: Proof[];
  isLoading?: boolean;
}

export default function StageProofsGallery({
  stageTitle,
  proofs,
  isLoading,
}: StageProofsGalleryProps) {
  const [selectedProof, setSelectedProof] = useState<Proof | null>(null);

  if (isLoading) {
    return (
      <div className="p-4 text-center text-sage">Chargement des preuves...</div>
    );
  }

  if (!proofs || proofs.length === 0) {
    return (
      <div className="p-4 text-center text-sage">
        Aucune preuve disponible pour cette étape.
      </div>
    );
  }

  return (
    <>
      <div className="space-y-2">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold text-forest flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Preuves & Documents ({proofs.length})
          </h4>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {proofs.map((proof) => (
            <div
              key={proof.id}
              className="cursor-pointer"
              onClick={() => setSelectedProof(proof)}
            >
              <ProofCard proof={proof} />
            </div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedProof && (
        <Dialog
          open={!!selectedProof}
          onOpenChange={() => setSelectedProof(null)}
        >
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle className="text-forest">
                {selectedProof.title}
              </DialogTitle>
              <DialogDescription className="text-sage">
                {stageTitle}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              {/* Image/Document Preview */}
              <div className="w-full rounded-lg overflow-hidden bg-sage/5">
                {selectedProof.fileType === "image" ? (
                  <img
                    src={`${import.meta.env.VITE_API_URL}${selectedProof.fileUrl}`}
                    alt={selectedProof.title}
                    className="w-full h-auto"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder-image.png";
                    }}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center p-12 text-sage">
                    <p className="text-lg font-medium mb-4">
                      Document: {selectedProof.title}
                    </p>
                    <a
                      href={`${import.meta.env.VITE_API_URL}${selectedProof.fileUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-forest text-white rounded hover:bg-forest/90"
                    >
                      Ouvrir le document
                    </a>
                  </div>
                )}
              </div>

              {/* Description */}
              {selectedProof.description && (
                <div>
                  <h5 className="font-medium text-forest mb-2">Description</h5>
                  <p className="text-sage">{selectedProof.description}</p>
                </div>
              )}

              {/* Metadata */}
              <div className="text-sm text-sage space-y-1">
                <p>
                  <span className="font-medium">Uploadé le:</span>{" "}
                  {new Date(selectedProof.uploadedAt).toLocaleDateString(
                    "fr-FR",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    },
                  )}
                </p>
                {selectedProof.approvedAt && (
                  <p>
                    <span className="font-medium">Approuvé le:</span>{" "}
                    {new Date(selectedProof.approvedAt).toLocaleDateString(
                      "fr-FR",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      },
                    )}
                  </p>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
