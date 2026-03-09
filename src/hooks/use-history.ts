import { useQuery } from "@tanstack/react-query";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export interface Transaction {
  id: string;
  amount: number;
  type: "PAYMENT" | "DIVIDEND" | "REFUND";
  status: "PENDING" | "SUCCESS" | "FAILED";
  transactionDate: string;
  investment: {
    projectStage: {
      project: {
        name: string;
      };
    };
  };
}

export interface HistorySummary {
  totalInvested: number;
  totalDividends: number;
  transactionCount: number;
}

export function useTransactionHistory() {
  return useQuery<Transaction[]>({
    queryKey: ["history"],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/history`, {
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to fetch history");
      return response.json();
    },
  });
}

export function useHistorySummary() {
  return useQuery<HistorySummary>({
    queryKey: ["history-summary"],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/history/summary`, {
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to fetch summary");
      return response.json();
    },
  });
}
