export const AUTH_ENDPOINTS = {
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  LOGOUT: "/auth/logout",
  REQUEST_PASSWORD_RESET: "/auth/request-password-reset",
  RESET_PASSWORD: "/auth/reset-password",
  CHANGE_PASSWORD: "/auth/change-password",
};

export const ADMIN_ENDPOINTS = {
  CREATE_USER: "admin/create-user",
  EDIT_USER: (userId: string) => `admin/edit-user/${userId}`,
  DELETE_USER: (userId: string) => `admin/delete-user/${userId}`,

  GET_ALL_USERS: "admin/users",
  GET_USER_BY_ID: (userId: string) => `admin/users/${userId}`,

  GET_ACTIVE_USERS: "admin/users/active",
  GET_INACTIVE_USERS: "admin/users/inactive",
  GET_USER_DELETED: "admin/users/deleted",

  GET_PROJECT_OWNERS: "admin/project-owners",
  GET_ACTIVE_PROJECT_OWNERS: "admin/project-owners/active",
  GET_INACTIVE_PROJECT_OWNERS: "admin/project-owners/inactive",

  GET_INVESTORS: "admin/investors",
  GET_ACTIVE_INVESTORS: "admin/investors/active",
  GET_INACTIVE_INVESTORS: "admin/investors/inactive",
};
