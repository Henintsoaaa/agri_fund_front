import { api } from "@/lib/api/axios";
import { PROJECT_ENDPOINTS } from "@/lib/api/endpoints";
import type {
  CreateProjectPayload,
  CreateProjectStagePayload,
  UpdateProjectPayload,
  Project,
} from "../types/project.types";

/**
 * Upload a project image and return the path
 */
export const uploadProjectImageApi = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  return api.post<{
    filename: string;
    path: string;
    originalName: string;
    size: number;
  }>(PROJECT_ENDPOINTS.UPLOAD_IMAGE, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const createProjectApi = (projectData: CreateProjectPayload) => {
  return api.post<Project>(PROJECT_ENDPOINTS.CREATE_PROJECT, projectData);
};

export const getMyProjectsApi = () => {
  return api.get<Project[]>(PROJECT_ENDPOINTS.GET_MY_PROJECTS);
};

export const getProjectByIdApi = (projectId: string) => {
  return api.get<Project>(PROJECT_ENDPOINTS.GET_PROJECT_BY_ID(projectId));
};

export const getPublicProjectByIdApi = (projectId: string) => {
  return api.get<Project>(
    PROJECT_ENDPOINTS.GET_PUBLIC_PROJECT_BY_ID(projectId),
  );
};

export const updateProjectApi = (
  projectId: string,
  projectData: UpdateProjectPayload,
) => {
  return api.put<Project>(
    PROJECT_ENDPOINTS.UPDATE_PROJECT(projectId),
    projectData,
  );
};

export const deleteProjectApi = (projectId: string) => {
  return api.put(PROJECT_ENDPOINTS.DELETE_PROJECT(projectId));
};

export const suspendProjectApi = (projectId: string) => {
  return api.put<Project>(PROJECT_ENDPOINTS.SUSPEND_PROJECT(projectId));
};

export const activateProjectApi = (projectId: string) => {
  return api.put<Project>(PROJECT_ENDPOINTS.ACTIVATE_PROJECT(projectId));
};

export const getAllProjectsApi = () => {
  return api.get<Project[]>(PROJECT_ENDPOINTS.GET_ALL_PROJECTS);
};

export const getPublicProjectsApi = () => {
  return api.get<Project[]>(PROJECT_ENDPOINTS.GET_PUBLIC_PROJECTS);
};

export const updateProjectStageApi = (
  projectStageId: string,
  data: {
    title?: string;
    description?: string;
    statut?: "OPEN" | "FUNDED" | "CLOSED";
  },
) => {
  return api.put(PROJECT_ENDPOINTS.UPDATE_PROJECT_STAGE(projectStageId), data);
};

export const createProjectStageApi = (
  projectId: string,
  data: CreateProjectStagePayload,
) => {
  return api.post(PROJECT_ENDPOINTS.CREATE_PROJECT_STAGE(projectId), data);
};

export const deleteProjectStageApi = (projectStageId: string) => {
  return api.put(PROJECT_ENDPOINTS.DELETE_PROJECT_STAGE(projectStageId), {
    isDeleted: true,
  });
};

export const getAllProjectStagesOfProjectApi = (projectId: string) => {
  return api.get(
    PROJECT_ENDPOINTS.GET_ALL_PROJECT_STAGES_OF_PROJECT(projectId),
  );
};

export const countProjectStagesApi = (projectId: string) => {
  return api.get(PROJECT_ENDPOINTS.COUNT_PROJECT_STAGES(projectId));
};

export const getProjectInvestorsApi = (projectId: string) => {
  return api.get(PROJECT_ENDPOINTS.GET_PROJECT_INVESTORS(projectId));
};
