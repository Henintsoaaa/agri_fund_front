import { api } from "@/lib/api/axios";
import type { Proof, UploadProofPayload } from "../types/proof.types";

const PROOFS_ENDPOINTS = {
  UPLOAD: "upload/proof",
  CREATE: "proofs/upload",
  MY_PROOFS: "proofs/my-proofs",
  STAGE_PROOFS: (stageId: string) => `proofs/stage/${stageId}`,
  PROJECT_PROOFS: (projectId: string) => `proofs/project/${projectId}`,
  PENDING_PROOFS: "proofs/pending",
  APPROVE: (id: string) => `proofs/${id}/approve`,
  REJECT: (id: string) => `proofs/${id}/reject`,
  DELETE: (id: string) => `proofs/${id}`,
};

/**
 * Step 1: Upload file to get the path
 */
const uploadFileApi = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  return api.post<{
    filename: string;
    path: string;
    originalName: string;
    size: number;
  }>(PROOFS_ENDPOINTS.UPLOAD, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

/**
 * Step 2: Create proof record with file path
 */
const createProofApi = (data: {
  projectId: string;
  projectStageId?: string;
  title: string;
  description?: string;
  fileUrl: string;
  fileType: string;
}) => {
  return api.post<Proof>(PROOFS_ENDPOINTS.CREATE, data);
};

/**
 * Combined: Upload file and create proof record
 */
export const uploadProofApi = async (payload: UploadProofPayload) => {
  // Step 1: Upload the file
  const uploadResponse = await uploadFileApi(payload.file);
  const fileUrl = uploadResponse.data.path;

  // Determine file type
  const fileType = payload.file.type.startsWith("image/")
    ? "image"
    : "document";

  // Step 2: Create proof record
  return createProofApi({
    projectId: payload.projectId,
    projectStageId: payload.projectStageId,
    title: payload.title,
    description: payload.description,
    fileUrl,
    fileType,
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
