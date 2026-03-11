import { api } from "@/lib/api/axios";
import type { Proof, UploadProofPayload } from "../types/proof.types";

const PROOFS_ENDPOINTS = {
  UPLOAD: "proofs/upload",
  MY_PROOFS: "proofs/my-proofs",
  STAGE_PROOFS: (stageId: string) => `proofs/stage/${stageId}`,
  PROJECT_PROOFS: (projectId: string) => `proofs/project/${projectId}`,
  PENDING_PROOFS: "proofs/pending",
  APPROVE: (id: string) => `proofs/${id}/approve`,
  REJECT: (id: string) => `proofs/${id}/reject`,
  DELETE: (id: string) => `proofs/${id}`,
};

export const uploadProofApi = (payload: UploadProofPayload) => {
  const formData = new FormData();
  formData.append("file", payload.file);
  formData.append("projectId", payload.projectId);
  if (payload.projectStageId) {
    formData.append("projectStageId", payload.projectStageId);
  }
  formData.append("title", payload.title);
  if (payload.description) {
    formData.append("description", payload.description);
  }

  return api.post<Proof>(PROOFS_ENDPOINTS.UPLOAD, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getMyProofsApi = () => {
  return api.get<Proof[]>(PROOFS_ENDPOINTS.MY_PROOFS);
};

export const getStageProofsApi = (stageId: string) => {
  return api.get<Proof[]>(PROOFS_ENDPOINTS.STAGE_PROOFS(stageId));
};

export const getProjectProofsApi = (projectId: string) => {
  return api.get<Proof[]>(PROOFS_ENDPOINTS.PROJECT_PROOFS(projectId));
};

export const getPendingProofsApi = () => {
  return api.get<Proof[]>(PROOFS_ENDPOINTS.PENDING_PROOFS);
};

export const approveProofApi = (id: string) => {
  return api.patch<Proof>(PROOFS_ENDPOINTS.APPROVE(id));
};

export const rejectProofApi = (id: string) => {
  return api.patch<Proof>(PROOFS_ENDPOINTS.REJECT(id));
};

export const deleteProofApi = (id: string) => {
  return api.delete(PROOFS_ENDPOINTS.DELETE(id));
};
