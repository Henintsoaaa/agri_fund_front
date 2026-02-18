import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createProjectApi,
  getMyProjectsApi,
  getProjectByIdApi,
  updateProjectApi,
  deleteProjectApi,
  getAllProjectsApi,
  getPublicProjectsApi,
  updateProjectStageApi,
  deleteProjectStageApi,
  getAllProjectStagesOfProjectApi,
  countProjectStagesApi,
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
  console.log("USER:", user);

  // Get my projects
  const {
    data: myProjects,
    isLoading: isLoadingMyProjects,
    error: myProjectsError,
    refetch: refetchMyProjects,
  } = useQuery({
    queryKey: ["my-projects"],
    queryFn: async () => {
      if (user?.role === "PROJECT_OWNER") {
        const response = await getMyProjectsApi();
        return response.data;
      }
      return [];
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
      console.log("useProject queryFn - user role:", user?.role);
      if (user?.role === "ADMIN") {
        const response = await getAllProjectsApi();
        console.log("Admin projects:", response.data);
        return response.data;
      } else if (user?.role === "INVESTOR") {
        // For investors, use public projects
        const response = await getPublicProjectsApi();
        console.log("Public projects for investor:", response.data);
        return response.data;
      } else if (user?.role === "PROJECT_OWNER") {
        const response = await getMyProjectsApi();
        return response.data;
      }
      // Return empty array if no role matches
      console.log("No role match, returning empty array");
      return [];
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

  // Update project stage
  const updateProjectStage = useMutation({
    mutationFn: ({
      projectStageId,
      data,
    }: {
      projectStageId: string;
      data: any;
    }) => updateProjectStageApi(projectStageId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-projects"] });
      queryClient.invalidateQueries({ queryKey: ["project"] });
      toast.success("Étape du projet mise à jour avec succès");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          "Erreur lors de la mise à jour de l'étape du projet",
      );
    },
  });

  // Delete project stage
  const deleteProjectStageMutation = useMutation({
    mutationFn: ({ projectStageId }: { projectStageId: string }) =>
      deleteProjectStageApi(projectStageId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-projects"] });
      queryClient.invalidateQueries({ queryKey: ["project"] });
      queryClient.invalidateQueries({ queryKey: ["project-stages"] });
      queryClient.invalidateQueries({ queryKey: ["project-stages-count"] });
      toast.success(
        "Étape supprimée avec succès. L'étape suivante a été mise à jour automatiquement.",
      );
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          "Erreur lors de la suppression de l'étape du projet",
      );
    },
  });

  // Get all project stages of a project
  const getAllProjectStagesOfProject = (projectId: string) => {
    return useQuery({
      queryKey: ["project-stages", projectId],
      queryFn: async () => {
        const response = await getAllProjectStagesOfProjectApi(projectId);
        return response.data;
      },
      enabled: !!projectId,
    });
  };

  // Count
  const useCountProjectStages = (projectId: string) => {
    return useQuery({
      queryKey: ["project-stages-count", projectId],
      queryFn: async () => {
        const response = await countProjectStagesApi(projectId);
        return response.data;
      },
      enabled: !!projectId,
    });
  };

  // Get all project of all project owner for investor

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
    updateProjectStage: updateProjectStage.mutate,
    isUpdatingProjectStage: updateProjectStage.isPending,
    deleteProjectStage: deleteProjectStageMutation.mutate,
    isDeletingProjectStage: deleteProjectStageMutation.isPending,
    getAllProjectStagesOfProject,
    useCountProjectStages,
  };
};
