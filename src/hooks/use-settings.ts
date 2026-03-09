import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export interface PlatformSettings {
  platformName: string;
  platformEmail: string;
  minInvestment: number;
  maxInvestment: number;
  platformFee: number;
  enableEmailNotifications: boolean;
  enablePushNotifications: boolean;
  notifyOnNewProject: boolean;
  notifyOnInvestment: boolean;
  requireTwoFactor: boolean;
  sessionTimeout: number;
  passwordMinLength: number;
  autoBackupEnabled: boolean;
  backupFrequency: string;
}

export function usePlatformSettings() {
  return useQuery<PlatformSettings>({
    queryKey: ["settings", "platform"],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/settings/platform`, {
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to fetch settings");
      return response.json();
    },
  });
}

export function useUpdateSettings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (settings: Partial<PlatformSettings>) => {
      const response = await fetch(`${API_URL}/settings/platform`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(settings),
      });
      if (!response.ok) throw new Error("Failed to update settings");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings", "platform"] });
    },
  });
}

export function useTriggerBackup() {
  return useMutation({
    mutationFn: async () => {
      const response = await fetch(`${API_URL}/settings/platform/backup`, {
        method: "PUT",
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to trigger backup");
      return response.json();
    },
  });
}
