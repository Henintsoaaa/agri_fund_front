export interface LoginPayload {
  email: string;
  password: string;
}

export const Role = {
  ADMIN: "ADMIN",
  INVESTOR: "INVESTOR",
  PROJECT_OWNER: "PROJECT_OWNER",
} as const;

export type Role = (typeof Role)[keyof typeof Role];

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phoneNumber: string | null;
  country: string | null;
  createdAt: Date;
  updatedAt: Date;
  image: string | null;
  emailVerified: boolean;
  role: Role;
}

export interface AuthResponse {
  user: AuthUser;
}
