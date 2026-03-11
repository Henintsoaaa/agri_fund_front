export type ProofStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface Proof {
  id: string;
  projectId: string;
  projectStageId?: string;
  title: string;
  description?: string;
  fileUrl: string;
  fileType: string;
  status: ProofStatus;
  uploadedAt: string;
  approvedAt?: string;
  approvedBy?: string;
  project?: {
    id: string;
    title: string;
  };
  projectStage?: {
    id: string;
    title: string;
    stageOrder: number;
    statut?: string;
  };
}

export interface UploadProofPayload {
  file: File;
  projectId: string;
  projectStageId?: string;
  title: string;
  description?: string;
}
