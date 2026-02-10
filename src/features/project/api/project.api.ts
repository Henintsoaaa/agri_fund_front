import { api } from "@/lib/api/axios";
import { PROJECT_ENDPOINTS } from "@/lib/api/endpoints";
import type {
  CreateProjectPayload,
  UpdateProjectPayload,
  Project,
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
