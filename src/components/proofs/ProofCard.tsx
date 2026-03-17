import { FileText, CheckCircle, XCircle, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Proof } from "@/features/proofs/types/proof.types";

interface ProofCardProps {
  proof: Proof;
  showActions?: boolean;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export default function ProofCard({
  proof,
  showActions,
  onApprove,
  onReject,
  onDelete,
}: ProofCardProps) {
  const statusConfig = {
    PENDING: {
      icon: Clock,
      color: "bg-amber-500",
      label: "En attente",
    },
    APPROVED: {
      icon: CheckCircle,
      color: "bg-green-500",
      label: "Approuvé",
    },
    REJECTED: {
      icon: XCircle,
      color: "bg-red-500",
      label: "Rejeté",
    },
  };

  const StatusIcon = statusConfig[proof.status].icon;

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-4">
        <div className="flex flex-col gap-4">
          {/* File Preview */}
          <div className="w-20 h-20 rounded-lg overflow-hidden bg-sage/10 flex items-center justify-center shrink-0">
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
            {/* Header with title and status */}
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3 className="font-semibold text-forest truncate flex-1">
                {proof.title}
              </h3>
              <Badge
                className={`${statusConfig[proof.status].color} text-white flex items-center gap-1 shrink-0`}
              >
                <StatusIcon className="h-3 w-3" />
                {statusConfig[proof.status].label}
              </Badge>
            </div>

            {/* Description */}
            {proof.description && (
              <p className="text-sm text-sage line-clamp-2 mb-2">
                {proof.description}
              </p>
            )}

            {/* Metadata */}
            <div className="flex flex-col gap-1 text-xs text-sage mt-2">
              {proof.projectStage && (
                <p>
                  Étape {proof.projectStage.stageOrder}:{" "}
                  {proof.projectStage.title}
                </p>
              )}
              <p>
                Uploadé le{" "}
                {new Date(proof.uploadedAt).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
              {proof.approvedAt && proof.status === "APPROVED" && (
                <p className="text-green-600">
                  Approuvé le{" "}
                  {new Date(proof.approvedAt).toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              )}
            </div>

            {/* Actions */}
            {showActions && (
              <div className="flex gap-2 mt-3">
                {proof.status === "PENDING" && onApprove && onReject && (
                  <>
                    <button
                      onClick={() => onApprove(proof.id)}
                      className="px-3 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Approuver
                    </button>
                    <button
                      onClick={() => onReject(proof.id)}
                      className="px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Rejeter
                    </button>
                  </>
                )}
                {proof.status !== "APPROVED" && onDelete && (
                  <button
                    onClick={() => onDelete(proof.id)}
                    className="px-3 py-1 text-xs bg-gray-500 text-white rounded hover:bg-gray-600"
                  >
                    Supprimer
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
