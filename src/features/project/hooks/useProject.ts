import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createProjectApi,
  getMyProjectsApi,
  getProjectByIdApi,
  updateProjectApi,
  deleteProjectApi,
  createProjectStageApi,
  updateProjectStageApi,
  deleteProjectStageApi,
} from "../api/project.api";
import type {
  CreateProjectPayload,
  UpdateProjectPayload,
  CreateProjectStagePayload,
  UpdateProjectStagePayload,
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

  // Stage-related mutations
  const createProjectStageMutation = useMutation({
    mutationFn: ({
      projectId,
      stageData,
    }: {
      projectId: string;
      stageData: CreateProjectStagePayload;
    }) => createProjectStageApi(projectId, stageData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-projects"] });
      queryClient.invalidateQueries({ queryKey: ["project"] });
      toast.success("Étape créée avec succès");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          "Erreur lors de la création de l'étape",
      );
    },
  });

  const updateProjectStageMutation = useMutation({
    mutationFn: ({
      stageId,
      stageData,
    }: {
      stageId: string;
      stageData: UpdateProjectStagePayload;
    }) => updateProjectStageApi(stageId, stageData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-projects"] });
      queryClient.invalidateQueries({ queryKey: ["project"] });
      toast.success("Étape mise à jour avec succès");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          "Erreur lors de la mise à jour de l'étape",
      );
    },
  });

  const deleteProjectStageMutation = useMutation({
    mutationFn: (stageId: string) => deleteProjectStageApi(stageId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-projects"] });
      queryClient.invalidateQueries({ queryKey: ["project"] });
      toast.success("Étape supprimée avec succès");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          "Erreur lors de la suppression de l'étape",
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
    // Stage-related functions
    createProjectStage: createProjectStageMutation.mutate,
    isCreatingProjectStage: createProjectStageMutation.isPending,
    updateProjectStage: updateProjectStageMutation.mutate,
    isUpdatingProjectStage: updateProjectStageMutation.isPending,
    deleteProjectStage: deleteProjectStageMutation.mutate,
    isDeletingProjectStage: deleteProjectStageMutation.isPending,
  };
};
