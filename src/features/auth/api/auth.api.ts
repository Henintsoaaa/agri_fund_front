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
