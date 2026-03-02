import { api } from "@/lib/api/axios";
import {
  INVESTMENT_ENDPOINTS,
  TRANSACTION_ENDPOINTS,
  PAYMENT_ENDPOINTS,
} from "@/lib/api/endpoints";
import type {
  Investment,
  CreateInvestmentPayload,
  InvestmentStats,
  ROIData,
  Transaction,
  PaymentPayload,
  PaymentIntent,
  TransactionStats,
  InvestmentStatus,
} from "../types/investment.types";

// ==================== Investment APIs ====================

export const createInvestmentApi = (payload: CreateInvestmentPayload) => {
  return api.post<Investment>(INVESTMENT_ENDPOINTS.CREATE_INVESTMENT, payload);
};

export const confirmInvestmentApi = (investmentId: string) => {
  return api.patch<Investment>(
    INVESTMENT_ENDPOINTS.CONFIRM_INVESTMENT(investmentId),
  );
};

export const cancelInvestmentApi = (investmentId: string) => {
  return api.patch<Investment>(
    INVESTMENT_ENDPOINTS.CANCEL_INVESTMENT(investmentId),
  );
};

export const getInvestorInvestmentsApi = (investorId: string) => {
  return api.get<Investment[]>(
    INVESTMENT_ENDPOINTS.GET_INVESTOR_INVESTMENTS(investorId),
  );
};

export const getStageInvestmentsApi = (stageId: string) => {
  return api.get<Investment[]>(
    INVESTMENT_ENDPOINTS.GET_STAGE_INVESTMENTS(stageId),
  );
};

export const getROIApi = (investorId: string) => {
  return api.get<ROIData>(INVESTMENT_ENDPOINTS.GET_ROI(investorId));
};

export const getInvestmentStatsApi = (stageId: string) => {
  return api.get<InvestmentStats>(
    INVESTMENT_ENDPOINTS.GET_INVESTMENT_STATS(stageId),
  );
};

export const updateInvestmentStatusApi = (
  investmentId: string,
  status: InvestmentStatus,
) => {
  return api.patch<Investment>(
    INVESTMENT_ENDPOINTS.UPDATE_INVESTMENT_STATUS(investmentId),
    { status },
  );
};

// ==================== Transaction APIs ====================

export const getUserTransactionsApi = (userId: string) => {
  return api.get<Transaction[]>(
    TRANSACTION_ENDPOINTS.GET_USER_TRANSACTIONS(userId),
  );
};

export const getTransactionsByInvestmentApi = (investmentId: string) => {
  return api.get<Transaction[]>(
    TRANSACTION_ENDPOINTS.GET_TRANSACTIONS_BY_INVESTMENT(investmentId),
  );
};

export const getTotalInvestedApi = (userId: string) => {
  return api.get<{ total: number }>(
    TRANSACTION_ENDPOINTS.GET_TOTAL_INVESTED(userId),
  );
};

export const getTotalRefundedApi = (userId: string) => {
  return api.get<{ total: number }>(
    TRANSACTION_ENDPOINTS.GET_TOTAL_REFUNDED(userId),
  );
};

export const getDividendsApi = (userId: string) => {
  return api.get<{ total: number }>(
    TRANSACTION_ENDPOINTS.GET_DIVIDENDS(userId),
  );
};

export const getTransactionStatsApi = async (
  userId: string,
): Promise<TransactionStats> => {
  const [invested, refunded, dividends] = await Promise.all([
    getTotalInvestedApi(userId),
    getTotalRefundedApi(userId),
    getDividendsApi(userId),
  ]);

  return {
    totalInvested: invested.data.total,
    totalRefunded: refunded.data.total,
    totalDividends: dividends.data.total,
  };
};

// ==================== Payment APIs ====================

export const processPaymentApi = (payload: PaymentPayload) => {
  return api.post<PaymentIntent>(PAYMENT_ENDPOINTS.PROCESS_PAYMENT, payload);
};

export const getPaymentStatusApi = (transactionId: string) => {
  return api.get<{ status: string; details: any }>(
    PAYMENT_ENDPOINTS.GET_PAYMENT_STATUS(transactionId),
  );
};
