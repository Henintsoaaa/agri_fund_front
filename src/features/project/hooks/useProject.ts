import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createProjectApi,
  getMyProjectsApi,
  getProjectByIdApi,
  updateProjectApi,
  deleteProjectApi,
  getAllProjectsApi,
  getPublicProjectsApi,
} from "../api/project.api";
import type {
  CreateProjectPayload,
  UpdateProjectPayload,
} from "../types/project.types";
import { toast } from "sonner";
import { useAuthContext } from "@/features/auth/context/AuthContext";

export const useProject = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthContext();

  // Get my projects
  const {
    data: myProjects,
    isLoading: isLoadingMyProjects,
    error: myProjectsError,
    refetch: refetchMyProjects,
  } = useQuery({
    queryKey: ["my-projects"],
    queryFn: async () => {
      const response = await getMyProjectsApi();
      return response.data;
    },
  });

  // Get all projects (with stages) - different endpoints based on role
  const {
    data: allProjects,
    isLoading: isLoadingAllProjects,
    error: allProjectsError,
    refetch: refetchAllProjects,
  } = useQuery({
    queryKey: ["all-projects", user?.role],
    queryFn: async () => {
      if (user?.role === "ADMIN") {
        const response = await getAllProjectsApi();
        return response.data;
      } else {
        // For investors and project owners, use public projects
        const response = await getPublicProjectsApi();
        return response.data;
      }
    },
    enabled: !!user, // Only run when user is available
  });

  // Get project by ID
  const useGetProjectById = (projectId: string) => {
    return useQuery({
      queryKey: ["project", projectId],
      queryFn: async () => {
        const response = await getProjectByIdApi(projectId);
        return response.data;
      },
      enabled: !!projectId,
    });
  };

  // Create project
  const createProjectMutation = useMutation({
    mutationFn: (data: CreateProjectPayload) => createProjectApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-projects"] });
      toast.success("Projet créé avec succès");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          "Erreur lors de la création du projet",
      );
    },
  });

  // Update project
  const updateProjectMutation = useMutation({
    mutationFn: ({
      projectId,
      data,
    }: {
      projectId: string;
      data: UpdateProjectPayload;
    }) => updateProjectApi(projectId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-projects"] });
      queryClient.invalidateQueries({ queryKey: ["project"] });
      toast.success("Projet mis à jour avec succès");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          "Erreur lors de la mise à jour du projet",
      );
    },
  });

  // Delete project
  const deleteProjectMutation = useMutation({
    mutationFn: (projectId: string) => deleteProjectApi(projectId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-projects"] });
      toast.success("Projet supprimé avec succès");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          "Erreur lors de la suppression du projet",
      );
    },
  });

  return {
    myProjects,
    isLoadingMyProjects,
    myProjectsError,
    refetchMyProjects,
    allProjects,
    isLoadingAllProjects,
    allProjectsError,
    refetchAllProjects,
    useGetProjectById,
    createProject: createProjectMutation.mutate,
    isCreatingProject: createProjectMutation.isPending,
    updateProject: updateProjectMutation.mutate,
    isUpdatingProject: updateProjectMutation.isPending,
    deleteProject: deleteProjectMutation.mutate,
    isDeletingProject: deleteProjectMutation.isPending,
  };
};
