export const AUTH_ENDPOINTS = {
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  LOGOUT: "/auth/logout",
  REQUEST_PASSWORD_RESET: "/auth/request-password-reset",
  RESET_PASSWORD: "/auth/reset-password",
  CHANGE_PASSWORD: "/auth/change-password",
};

export const ADMIN_USER_ENDPOINTS = {
  CREATE_USER: "user/create-user",
  EDIT_USER: (userId: string) => `user/edit-user/${userId}`,
  DELETE_USER: (userId: string) => `user/delete-user/${userId}`,

  GET_ALL_USERS: "user/users",
  GET_USER_BY_ID: (userId: string) => `user/users/${userId}`,

  GET_ACTIVE_USERS: "user/users/active",
  GET_INACTIVE_USERS: "user/users/inactive",
  GET_USER_DELETED: "user/users/deleted",

  GET_PROJECT_OWNERS: "user/project-owners",
  GET_ACTIVE_PROJECT_OWNERS: "user/project-owners/active",
  GET_INACTIVE_PROJECT_OWNERS: "user/project-owners/inactive",

  GET_INVESTORS: "user/investors",
  GET_ACTIVE_INVESTORS: "user/investors/active",
  GET_INACTIVE_INVESTORS: "user/investors/inactive",
};

export const PROJECT_ENDPOINTS = {
  CREATE_PROJECT: "project/create",
  GET_MY_PROJECTS: "project/my-projects",
  GET_PROJECT_BY_ID: (projectId: string) => `project/${projectId}`,
  UPDATE_PROJECT: (projectId: string) => `project/update/${projectId}`,
  DELETE_PROJECT: (projectId: string) => `project/delete/${projectId}`,
  SUSPEND_PROJECT: (projectId: string) => `project/suspend/${projectId}`,
  ACTIVATE_PROJECT: (projectId: string) => `project/activate/${projectId}`,
  GET_ALL_PROJECTS: "project",
  GET_PUBLIC_PROJECTS: "project/public",
};
