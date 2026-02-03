import { useState, useEffect } from "react";
import {
  getAllUsersApi,
  getActiveUsersApi,
  getInactiveUsersApi,
  getDeletedUsersApi,
  getProjectOwnersApi,
  getActiveProjectOwnersApi,
  getInactiveProjectOwnersApi,
  getInvestorsApi,
  getActiveInvestorsApi,
  getInactiveInvestorsApi,
  createUserApi,
  editUserApi,
  deleteUserApi,
} from "../api/admin.api";
import type { User } from "../types/admin.types";

export const useAdminData = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async (filterType: string = "all") => {
    setLoading(true);
    setError(null);
    try {
      let response;
      switch (filterType) {
        case "all":
          response = await getAllUsersApi();
          break;
        case "active":
          response = await getActiveUsersApi();
          break;
        case "inactive":
          response = await getInactiveUsersApi();
          break;
        case "deleted":
          response = await getDeletedUsersApi();
          break;
        case "project-owners":
          response = await getProjectOwnersApi();
          break;
        case "active-project-owners":
          response = await getActiveProjectOwnersApi();
          break;
        case "inactive-project-owners":
          response = await getInactiveProjectOwnersApi();
          break;
        case "investors":
          response = await getInvestorsApi();
          break;
        case "active-investors":
          response = await getActiveInvestorsApi();
          break;
        case "inactive-investors":
          response = await getInactiveInvestorsApi();
          break;
        default:
          response = await getAllUsersApi();
      }
      setUsers(response.data as unknown as User[]);
    } catch (err) {
      setError("Erreur lors du chargement des utilisateurs");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (name: string, email: string) => {
    setLoading(true);
    setError(null);
    try {
      await createUserApi({ name, email });
      await fetchUsers(); // Recharger la liste
      return true;
    } catch (err) {
      setError("Erreur lors de la création de l'utilisateur");
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const editUser = async (userId: string, isActive: boolean) => {
    setLoading(true);
    setError(null);
    try {
      await editUserApi(userId, isActive);
      await fetchUsers(); // Recharger la liste
      return true;
    } catch (err) {
      setError("Erreur lors de la modification de l'utilisateur");
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (userId: string) => {
    setLoading(true);
    setError(null);
    try {
      await deleteUserApi(userId);
      await fetchUsers(); // Recharger la liste
      return true;
    } catch (err) {
      setError("Erreur lors de la suppression de l'utilisateur");
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const getStats = () => {
    const total = users.length;
    const active = users.filter((u) => u.isActive && !u.isDeleted).length;
    const inactive = users.filter((u) => !u.isActive && !u.isDeleted).length;
    const deleted = users.filter((u) => u.isDeleted).length;
    const projectOwners = users.filter(
      (u) => u.role === "PROJECT_OWNER" && !u.isDeleted,
    ).length;
    const investors = users.filter(
      (u) => u.role === "INVESTOR" && !u.isDeleted,
    ).length;
    const admins = users.filter(
      (u) => u.role === "ADMIN" && !u.isDeleted,
    ).length;

    return {
      total,
      active,
      inactive,
      deleted,
      projectOwners,
      investors,
      admins,
    };
  };

  return {
    users,
    loading,
    error,
    fetchUsers,
    createUser,
    editUser,
    deleteUser,
    getStats,
  };
};
