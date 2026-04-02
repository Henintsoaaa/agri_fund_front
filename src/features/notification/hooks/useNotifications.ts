import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { notificationApi } from "../api/notificationApi";
import { toast } from "sonner";

export const NOTIFICATION_KEYS = {
  all: ["notifications"] as const,
  list: () => [...NOTIFICATION_KEYS.all, "list"] as const,
  unreadCount: () => [...NOTIFICATION_KEYS.all, "unread-count"] as const,
};

export const useNotifications = () => {
  return useQuery({
    queryKey: NOTIFICATION_KEYS.list(),
    queryFn: notificationApi.getMyNotifications,
    refetchInterval: 30000, // Refetch every 30 seconds
  });
};

export const useUnreadCount = () => {
  return useQuery({
    queryKey: NOTIFICATION_KEYS.unreadCount(),
    queryFn: notificationApi.getUnreadCount,
    refetchInterval: 15000, // Refetch every 15 seconds
  });
};

export const useMarkAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: notificationApi.markAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: NOTIFICATION_KEYS.list() });
      queryClient.invalidateQueries({
        queryKey: NOTIFICATION_KEYS.unreadCount(),
      });
    },
    onError: (error: any) => {
      toast.error("Erreur lors de la mise à jour de la notification");
      console.error("Mark as read error:", error);
    },
  });
};

export const useMarkAllAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (_options?: { silent?: boolean }) => {
      await notificationApi.markAllAsRead();
      return _options;
    },
    onSuccess: (options) => {
      queryClient.invalidateQueries({ queryKey: NOTIFICATION_KEYS.list() });
      queryClient.invalidateQueries({
        queryKey: NOTIFICATION_KEYS.unreadCount(),
      });
      if (!options?.silent) {
        toast.success("Toutes les notifications ont été marquées comme lues");
      }
    },
    onError: (error: any) => {
      toast.error("Erreur lors de la mise à jour des notifications");
      console.error("Mark all as read error:", error);
    },
  });
};
