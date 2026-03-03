import { api } from "@/lib/api/axios";
import type {
  Notification,
  UnreadCountResponse,
} from "../types/notification.types";

const NOTIFICATION_ENDPOINTS = {
  GET_MY_NOTIFICATIONS: "/notification/my-notifications",
  GET_UNREAD_COUNT: "/notification/unread-count",
  MARK_AS_READ: (id: string) => `/notification/${id}/mark-read`,
  MARK_ALL_AS_READ: "/notification/mark-all-read",
};

export const notificationApi = {
  // Get all notifications for the current user
  getMyNotifications: async (): Promise<Notification[]> => {
    const response = await api.get<Notification[]>(
      NOTIFICATION_ENDPOINTS.GET_MY_NOTIFICATIONS,
    );
    return response.data;
  },

  // Get unread notification count
  getUnreadCount: async (): Promise<number> => {
    const response = await api.get<UnreadCountResponse>(
      NOTIFICATION_ENDPOINTS.GET_UNREAD_COUNT,
    );
    return response.data.count;
  },

  // Mark a specific notification as read
  markAsRead: async (id: string): Promise<Notification> => {
    const response = await api.patch<Notification>(
      NOTIFICATION_ENDPOINTS.MARK_AS_READ(id),
    );
    return response.data;
  },

  // Mark all notifications as read
  markAllAsRead: async (): Promise<void> => {
    await api.patch(NOTIFICATION_ENDPOINTS.MARK_ALL_AS_READ);
  },
};
