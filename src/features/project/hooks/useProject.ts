import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createProjectApi,
  getMyProjectsApi,
  getProjectByIdApi,
  updateProjectApi,
  deleteProjectApi,
} from "../api/project.api";
import type {
  CreateProjectPayload,
  UpdateProjectPayload,
} from "../types/project.types";
import { toast } from "sonner";

export const useProject = () => {
  const queryClient = useQueryClient();

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
    useGetProjectById,
    createProject: createProjectMutation.mutate,
    isCreatingProject: createProjectMutation.isPending,
    updateProject: updateProjectMutation.mutate,
    isUpdatingProject: updateProjectMutation.isPending,
    deleteProject: deleteProjectMutation.mutate,
    isDeletingProject: deleteProjectMutation.isPending,
  };
};
