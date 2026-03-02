import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createInvestmentApi,
  cancelInvestmentApi,
  getInvestorInvestmentsApi,
  getStageInvestmentsApi,
  getROIApi,
  getInvestmentStatsApi,
  getUserTransactionsApi,
  getTransactionsByInvestmentApi,
  getTransactionStatsApi,
  processPaymentApi,
  getPaymentStatusApi,
} from "../api/investment.api";
import type {
  CreateInvestmentPayload,
  PaymentPayload,
} from "../types/investment.types";
import { toast } from "sonner";
import { useAuthContext } from "@/features/auth/context/AuthContext";

export const useInvestment = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthContext();

  // ==================== Investment Queries ====================

  // Get investor's investments
  const useInvestorInvestments = (investorId?: string) => {
    return useQuery({
      queryKey: ["investor-investments", investorId],
      queryFn: async () => {
        if (!investorId) return [];
        const response = await getInvestorInvestmentsApi(investorId);
        return response.data;
      },
      enabled: !!investorId,
      staleTime: 1000 * 60 * 5, // 5 minutes
    });
  };

  // Get current user's investments
  const {
    data: myInvestments,
    isLoading: isLoadingMyInvestments,
    error: myInvestmentsError,
    refetch: refetchMyInvestments,
  } = useQuery({
    queryKey: ["my-investments", user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      const response = await getInvestorInvestmentsApi(user.id);
      return response.data;
    },
    enabled: !!user?.id && user?.role === "INVESTOR",
    staleTime: 1000 * 60 * 5,
  });

  // Get stage investments (for project owners/admins)
  const useStageInvestments = (stageId?: string) => {
    return useQuery({
      queryKey: ["stage-investments", stageId],
      queryFn: async () => {
        if (!stageId) return [];
        const response = await getStageInvestmentsApi(stageId);
        return response.data;
      },
      enabled: !!stageId,
      staleTime: 1000 * 60 * 5,
    });
  };

  // Get ROI
  const useROI = (investorId?: string) => {
    return useQuery({
      queryKey: ["roi", investorId],
      queryFn: async () => {
        if (!investorId) return null;
        const response = await getROIApi(investorId);
        return response.data;
      },
      enabled: !!investorId,
      staleTime: 1000 * 60 * 5,
    });
  };

  // Get investment stats for a stage
  const useInvestmentStats = (stageId?: string) => {
    return useQuery({
      queryKey: ["investment-stats", stageId],
      queryFn: async () => {
        if (!stageId) return null;
        const response = await getInvestmentStatsApi(stageId);
        return response.data;
      },
      enabled: !!stageId,
      staleTime: 1000 * 60 * 5,
    });
  };

  // ==================== Transaction Queries ====================

  // Get user transactions
  const useUserTransactions = (userId?: string) => {
    return useQuery({
      queryKey: ["user-transactions", userId],
      queryFn: async () => {
        if (!userId) return [];
        const response = await getUserTransactionsApi(userId);
        return response.data;
      },
      enabled: !!userId,
      staleTime: 1000 * 60 * 5,
    });
  };

  // Get current user's transactions
  const {
    data: myTransactions,
    isLoading: isLoadingMyTransactions,
    error: myTransactionsError,
    refetch: refetchMyTransactions,
  } = useQuery({
    queryKey: ["my-transactions", user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      const response = await getUserTransactionsApi(user.id);
      return response.data;
    },
    enabled: !!user?.id,
    staleTime: 1000 * 60 * 5,
  });

  // Get transactions by investment
  const useInvestmentTransactions = (investmentId?: string) => {
    return useQuery({
      queryKey: ["investment-transactions", investmentId],
      queryFn: async () => {
        if (!investmentId) return [];
        const response = await getTransactionsByInvestmentApi(investmentId);
        return response.data;
      },
      enabled: !!investmentId,
      staleTime: 1000 * 60 * 5,
    });
  };

  // Get transaction stats
  const useTransactionStats = (userId?: string) => {
    return useQuery({
      queryKey: ["transaction-stats", userId],
      queryFn: async () => {
        if (!userId) return null;
        return await getTransactionStatsApi(userId);
      },
      enabled: !!userId,
      staleTime: 1000 * 60 * 5,
    });
  };

  // Get current user's transaction stats
  const {
    data: myTransactionStats,
    isLoading: isLoadingMyStats,
    error: myStatsError,
    refetch: refetchMyStats,
  } = useQuery({
    queryKey: ["my-transaction-stats", user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      return await getTransactionStatsApi(user.id);
    },
    enabled: !!user?.id && user?.role === "INVESTOR",
    staleTime: 1000 * 60 * 5,
  });

  // ==================== Investment Mutations ====================

  // Create investment
  const createInvestmentMutation = useMutation({
    mutationFn: (payload: CreateInvestmentPayload) =>
      createInvestmentApi(payload),
    onSuccess: (response) => {
      toast.success("Investissement créé avec succès");
      queryClient.invalidateQueries({ queryKey: ["my-investments"] });
      queryClient.invalidateQueries({ queryKey: ["stage-investments"] });
      queryClient.invalidateQueries({ queryKey: ["investment-stats"] });
      return response.data;
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message ||
          "Erreur lors de la création de l'investissement",
      );
    },
  });

  // Cancel investment
  const cancelInvestmentMutation = useMutation({
    mutationFn: (investmentId: string) => cancelInvestmentApi(investmentId),
    onSuccess: () => {
      toast.success("Investissement annulé");
      queryClient.invalidateQueries({ queryKey: ["my-investments"] });
      queryClient.invalidateQueries({ queryKey: ["investor-investments"] });
      queryClient.invalidateQueries({ queryKey: ["stage-investments"] });
      queryClient.invalidateQueries({ queryKey: ["investment-stats"] });
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Erreur lors de l'annulation",
      );
    },
  });

  // ==================== Payment Mutations ====================

  // Process payment
  const processPaymentMutation = useMutation({
    mutationFn: (payload: PaymentPayload) => processPaymentApi(payload),
    onSuccess: (response) => {
      toast.success("Paiement initié");
      return response.data;
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Erreur lors du paiement");
    },
  });

  // Get payment status
  const usePaymentStatus = (transactionId?: string) => {
    return useQuery({
      queryKey: ["payment-status", transactionId],
      queryFn: async () => {
        if (!transactionId) return null;
        const response = await getPaymentStatusApi(transactionId);
        return response.data;
      },
      enabled: !!transactionId,
      refetchInterval: (query) => {
        // Stop polling if payment is completed or failed
        const data = query.state.data;
        if (data?.status === "SUCCESS" || data?.status === "FAILED") {
          return false;
        }
        return 5000; // Poll every 5 seconds
      },
    });
  };

  return {
    // Investment queries
    myInvestments,
    isLoadingMyInvestments,
    myInvestmentsError,
    refetchMyInvestments,
    useInvestorInvestments,
    useStageInvestments,
    useROI,
    useInvestmentStats,

    // Transaction queries
    myTransactions,
    isLoadingMyTransactions,
    myTransactionsError,
    refetchMyTransactions,
    useUserTransactions,
    useInvestmentTransactions,
    myTransactionStats,
    isLoadingMyStats,
    myStatsError,
    refetchMyStats,
    useTransactionStats,

    // Mutations
    createInvestment: createInvestmentMutation.mutateAsync,
    isCreatingInvestment: createInvestmentMutation.isPending,
    cancelInvestment: cancelInvestmentMutation.mutateAsync,
    isCancellingInvestment: cancelInvestmentMutation.isPending,
    processPayment: processPaymentMutation.mutateAsync,
    isProcessingPayment: processPaymentMutation.isPending,
    usePaymentStatus,
  };
};
