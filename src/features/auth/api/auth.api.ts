import { api } from "@/lib/api/axios";
import { AUTH_ENDPOINTS } from "@/lib/api/endpoints";
import type { AuthResponse, LoginPayload } from "../types/auth.types";

export const loginApi = (payload: LoginPayload) => {
  return api.post<AuthResponse>(AUTH_ENDPOINTS.LOGIN, payload);
};

export const registerApi = (payload: any) => {
  return api.post<AuthResponse>(AUTH_ENDPOINTS.REGISTER, payload);
};

export const logoutApi = () => {
  return api.post(AUTH_ENDPOINTS.LOGOUT);
};

export const requestPasswordResetApi = (email: string, redirectTo: string) => {
  return api.post(AUTH_ENDPOINTS.REQUEST_PASSWORD_RESET, { email, redirectTo });
};

export const resetPasswordApi = (token: string, newPassword: string) => {
  return api.post(`${AUTH_ENDPOINTS.RESET_PASSWORD}/${token}`, { newPassword });
};

export const changePasswordApi = (
  currentPassword: string,
  newPassword: string,
) => {
  return api.post(AUTH_ENDPOINTS.CHANGE_PASSWORD, {
    currentPassword,
    newPassword,
  });
};
