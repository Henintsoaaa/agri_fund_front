import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export interface Proof {
  id: string;
  projectId: string;
  projectName: string;
  title: string;
  description: string;
  imageUrl: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  uploadedAt: string;
}

export function useProofs() {
  return useQuery<Proof[]>({
    queryKey: ["proofs"],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/proofs`, {
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to fetch proofs");
      return response.json();
    },
  });
}

export function useUploadProof() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await fetch(`${API_URL}/proofs/upload`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      if (!response.ok) throw new Error("Failed to upload proof");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["proofs"] });
    },
  });
}
