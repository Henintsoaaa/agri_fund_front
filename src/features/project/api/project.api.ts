import { api } from "@/lib/api/axios";
import { PROJECT_ENDPOINTS } from "@/lib/api/endpoints";
import type {
  CreateProjectPayload,
  UpdateProjectPayload,
  Project,
  CreateProjectStagePayload,
  UpdateProjectStagePayload,
} from "../types/project.types";

export const createProjectApi = (projectData: CreateProjectPayload) => {
  return api.post<Project>(PROJECT_ENDPOINTS.CREATE_PROJECT, projectData);
};

export const getMyProjectsApi = () => {
  return api.get<Project[]>(PROJECT_ENDPOINTS.GET_MY_PROJECTS);
};

export const getProjectByIdApi = (projectId: string) => {
  return api.get<Project>(PROJECT_ENDPOINTS.GET_PROJECT_BY_ID(projectId));
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

// Stage-related API functions
export const createProjectStageApi = (
  projectId: string,
  stageData: CreateProjectStagePayload,
) => {
  return api.post(PROJECT_ENDPOINTS.CREATE_PROJECT_STAGE(projectId), stageData);
};

export const getProjectStageByIdApi = (stageId: string) => {
  return api.get(PROJECT_ENDPOINTS.GET_PROJECT_STAGE_BY_ID(stageId));
};

export const updateProjectStageApi = (
  stageId: string,
  stageData: UpdateProjectStagePayload,
) => {
  return api.put(PROJECT_ENDPOINTS.UPDATE_PROJECT_STAGE(stageId), stageData);
};

export const deleteProjectStageApi = (stageId: string) => {
  return api.delete(PROJECT_ENDPOINTS.DELETE_PROJECT_STAGE(stageId));
};
