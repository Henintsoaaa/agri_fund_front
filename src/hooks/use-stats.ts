import { useQuery } from "@tanstack/react-query";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export interface InvestorStats {
  totalInvested: number;
  activeProjects: number;
  totalDividends: number;
  roi: number;
}

export interface AdminStats {
  totalUsers: number;
  activeProjects: number;
  totalVolume: number;
  successRate: number;
  fundedProjects: number;
  userGrowth: {
    month: string;
    newUsers: number;
    totalUsers: number;
  }[];
  investmentVolumeByMonth: {
    month: string;
    amount: number;
  }[];
  projectDistribution: {
    label: string;
    value: number;
  }[];
}

export function useInvestorStats() {
  return useQuery<InvestorStats>({
    queryKey: ["stats", "investor"],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/stats/investor`, {
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to fetch investor stats");
      return response.json();
    },
  });
}

export function useAdminStats() {
  return useQuery<AdminStats>({
    queryKey: ["stats", "admin"],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/stats/admin`, {
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to fetch admin stats");
      return response.json();
    },
  });
}
