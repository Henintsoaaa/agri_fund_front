export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  email: string;
  role: "ADMIN" | "INVESTITOR" | "PROJECT_OWNER";
}

export interface AuthResponse {
  user: AuthUser;
}
