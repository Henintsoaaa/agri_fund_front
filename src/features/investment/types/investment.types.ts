export type InvestmentStatus =
  | "PENDING"
  | "CONFIRMED"
  | "CANCELLED"
  | "REFUNDED";
export type TransactionType = "PAYMENT" | "REFUND" | "DIVIDEND";
export type TransactionStatus = "PENDING" | "SUCCESS" | "FAILED";

export interface Investment {
  id: string;
  userId: string;
  stageId: string;
  amount: number;
  status: InvestmentStatus;
  createdAt: string;
  updatedAt: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
  stage?: {
    id: string;
    title: string;
    projectId: string;
  };
}

export interface Transaction {
  id: string;
  investmentId: string;
  amount: number;
  type: TransactionType;
  status: TransactionStatus;
  provider: string;
  providerTransactionId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateInvestmentPayload {
  userId: string;
  stageId: string;
  amount: number;
}

export interface InvestmentStats {
  totalInvestments: number;
  totalAmount: number;
  confirmedAmount: number;
  pendingAmount: number;
  refundedAmount: number;
}

export interface ROIData {
  totalInvested: number;
  totalDividends: number;
  totalRefunded: number;
  roi: number;
  netGain: number;
}

export interface PaymentPayload {
  investmentId: string;
  amount: number;
  provider?: "STRIPE" | "PAYPAL" | "BANK_TRANSFER";
}

export interface PaymentIntent {
  clientSecret: string;
  transactionId: string;
  amount: number;
  currency: string;
}

export interface TransactionStats {
  totalInvested: number;
  totalRefunded: number;
  totalDividends: number;
}
