export interface CreateUserPayload {
  name: string;
  email: string;
}

export interface EditUserPayload {
  id: string;
  isActive: boolean;
}

export interface DeleteUserPayload {
  id: string;
  isDeleted: boolean;
  isActive: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  isActive: boolean;
  isDeleted: boolean;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UsersResponse {
  users: User[];
}
