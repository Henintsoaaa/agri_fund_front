import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export interface Report {
  id: string;
  name: string;
  type: string;
  period: string;
  generatedAt: string;
  size: string;
}

export interface GenerateReportParams {
  type: string;
  period: string;
}

export function useReports() {
  return useQuery<Report[]>({
    queryKey: ["reports"],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/reports/list`, {
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to fetch reports");
      return response.json();
    },
  });
}

export function useGenerateReport() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: GenerateReportParams) => {
      const response = await fetch(
        `${API_URL}/reports/generate?type=${params.type}&period=${params.period}`,
        {
          credentials: "include",
        },
      );
      if (!response.ok) throw new Error("Failed to generate report");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reports"] });
    },
  });
}
