import { api } from "@/lib/api/axios";
import type { CreateUserPayload } from "../types/admin.types";
import { ADMIN_ENDPOINTS } from "@/lib/api/endpoints";
import type { AuthResponse } from "../../auth/types/auth.types";

export const createUserApi = (payload: CreateUserPayload) => {
  return api.post<AuthResponse>(ADMIN_ENDPOINTS.CREATE_USER, payload);
};

export const editUserApi = (userId: string, isActive: boolean) => {
  return api.put<AuthResponse>(ADMIN_ENDPOINTS.EDIT_USER(userId), {
    id: userId,
    isActive,
  });
};

export const deleteUserApi = (userId: string) => {
  return api.put<AuthResponse>(ADMIN_ENDPOINTS.DELETE_USER(userId), {
    id: userId,
    isDeleted: true,
    isActive: false,
  });
};

export const getAllUsersApi = () => {
  return api.get<AuthResponse>(ADMIN_ENDPOINTS.GET_ALL_USERS);
};

export const getUserByIdApi = (userId: string) => {
  return api.get<AuthResponse>(ADMIN_ENDPOINTS.GET_USER_BY_ID(userId));
};

export const getActiveUsersApi = () => {
  return api.get<AuthResponse>(ADMIN_ENDPOINTS.GET_ACTIVE_USERS);
};

export const getInactiveUsersApi = () => {
  return api.get<AuthResponse>(ADMIN_ENDPOINTS.GET_INACTIVE_USERS);
};

export const getDeletedUsersApi = () => {
  return api.get<AuthResponse>(ADMIN_ENDPOINTS.GET_USER_DELETED);
};

export const getProjectOwnersApi = () => {
  return api.get<AuthResponse>(ADMIN_ENDPOINTS.GET_PROJECT_OWNERS);
};

export const getActiveProjectOwnersApi = () => {
  return api.get<AuthResponse>(ADMIN_ENDPOINTS.GET_ACTIVE_PROJECT_OWNERS);
};

export const getInactiveProjectOwnersApi = () => {
  return api.get<AuthResponse>(ADMIN_ENDPOINTS.GET_INACTIVE_PROJECT_OWNERS);
};

export const getInvestorsApi = () => {
  return api.get<AuthResponse>(ADMIN_ENDPOINTS.GET_INVESTORS);
};

export const getActiveInvestorsApi = () => {
  return api.get<AuthResponse>(ADMIN_ENDPOINTS.GET_ACTIVE_INVESTORS);
};

export const getInactiveInvestorsApi = () => {
  return api.get<AuthResponse>(ADMIN_ENDPOINTS.GET_INACTIVE_INVESTORS);
};
