import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  uploadProofApi,
  getMyProofsApi,
  getStageProofsApi,
  getProjectProofsApi,
  getPendingProofsApi,
  approveProofApi,
  rejectProofApi,
  deleteProofApi,
} from "../api/proof.api";
import type { UploadProofPayload } from "../types/proof.types";

export const useProofs = () => {
  const queryClient = useQueryClient();

  // Get my proofs (project owner)
  const {
    data: myProofs,
    isLoading: isLoadingMyProofs,
    refetch: refetchMyProofs,
  } = useQuery({
    queryKey: ["my-proofs"],
    queryFn: async () => {
      const response = await getMyProofsApi();
      return response.data;
    },
    staleTime: 1000 * 60 * 5,
  });

  // Get stage proofs (all users)
  const useStageProofs = (stageId?: string) => {
    return useQuery({
      queryKey: ["stage-proofs", stageId],
      queryFn: async () => {
        if (!stageId) return [];
        const response = await getStageProofsApi(stageId);
        return response.data;
      },
      enabled: !!stageId,
      staleTime: 1000 * 60 * 5,
    });
  };

  // Get project proofs (all users)
  const useProjectProofs = (projectId?: string) => {
    return useQuery({
      queryKey: ["project-proofs", projectId],
      queryFn: async () => {
        if (!projectId) return [];
        const response = await getProjectProofsApi(projectId);
        return response.data;
      },
      enabled: !!projectId,
      staleTime: 1000 * 60 * 5,
    });
  };

  // Get pending proofs (admin only)
  const {
    data: pendingProofs,
    isLoading: isLoadingPendingProofs,
    refetch: refetchPendingProofs,
  } = useQuery({
    queryKey: ["pending-proofs"],
    queryFn: async () => {
      const response = await getPendingProofsApi();
      return response.data;
    },
    staleTime: 1000 * 60 * 2,
  });

  // Upload proof mutation
  const uploadProofMutation = useMutation({
    mutationFn: (payload: UploadProofPayload) => uploadProofApi(payload),
    onSuccess: () => {
      toast.success("Preuve uploadée avec succès");
      queryClient.invalidateQueries({ queryKey: ["my-proofs"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Erreur lors de l'upload");
    },
  });

  // Approve proof mutation (admin)
  const approveProofMutation = useMutation({
    mutationFn: (id: string) => approveProofApi(id),
    onSuccess: () => {
      toast.success("Preuve approuvée");
      queryClient.invalidateQueries({ queryKey: ["pending-proofs"] });
      queryClient.invalidateQueries({ queryKey: ["stage-proofs"] });
      queryClient.invalidateQueries({ queryKey: ["project-proofs"] });
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Erreur lors de l'approbation",
      );
    },
  });

  // Reject proof mutation (admin)
  const rejectProofMutation = useMutation({
    mutationFn: (id: string) => rejectProofApi(id),
    onSuccess: () => {
      toast.success("Preuve rejetée");
      queryClient.invalidateQueries({ queryKey: ["pending-proofs"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Erreur lors du rejet");
    },
  });

  // Delete proof mutation
  const deleteProofMutation = useMutation({
    mutationFn: (id: string) => deleteProofApi(id),
    onSuccess: () => {
      toast.success("Preuve supprimée");
      queryClient.invalidateQueries({ queryKey: ["my-proofs"] });
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Erreur lors de la suppression",
      );
    },
  });

  return {
    // Queries
    myProofs,
    isLoadingMyProofs,
    refetchMyProofs,
    useStageProofs,
    useProjectProofs,
    pendingProofs,
    isLoadingPendingProofs,
    refetchPendingProofs,

    // Mutations
    uploadProof: uploadProofMutation.mutateAsync,
    isUploadingProof: uploadProofMutation.isPending,
    approveProof: approveProofMutation.mutateAsync,
    isApprovingProof: approveProofMutation.isPending,
    rejectProof: rejectProofMutation.mutateAsync,
    isRejectingProof: rejectProofMutation.isPending,
    deleteProof: deleteProofMutation.mutateAsync,
    isDeletingProof: deleteProofMutation.isPending,
  };
};
