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
        <div className="flex gap-4">
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
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-forest truncate">
                  {proof.title}
                </h3>
                {proof.description && (
                  <p className="text-sm text-sage line-clamp-2 mt-1">
                    {proof.description}
                  </p>
                )}
              </div>
              <Badge
                className={`${statusConfig[proof.status].color} text-white flex items-center gap-1 shrink-0`}
              >
                <StatusIcon className="h-3 w-3" />
                {statusConfig[proof.status].label}
              </Badge>
            </div>

            {proof.projectStage && (
              <p className="text-xs text-sage mb-2">
                Étape {proof.projectStage.stageOrder}:{" "}
                {proof.projectStage.title}
              </p>
            )}

            <p className="text-xs text-sage">
              Uploadé le{" "}
              {new Date(proof.uploadedAt).toLocaleDateString("fr-FR")}
            </p>

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
