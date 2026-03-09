import { describe, it, expect, vi, beforeEach } from "vitest";
import { notificationApi } from "./notificationApi";
import { api } from "@/lib/api/axios";

// Mock axios api
vi.mock("@/lib/api/axios", () => ({
  api: {
    get: vi.fn(),
    patch: vi.fn(),
  },
}));

describe("notificationApi", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getMyNotifications", () => {
    it("should fetch all notifications for current user", async () => {
      const mockNotifications = [
        {
          id: "notif-1",
          userId: "user-123",
          type: "INVESTMENT_CREATED",
          content: "Votre investissement a été créé",
          status: "UNREAD",
          projectId: "project-1",
          projectStageId: "stage-1",
          investmentId: "inv-1",
          createdAt: "2026-03-01T10:00:00Z",
          updatedAt: "2026-03-01T10:00:00Z",
        },
        {
          id: "notif-2",
          userId: "user-123",
          type: "PAYMENT_SUCCESS",
          content: "Votre paiement a été validé",
          status: "READ",
          projectId: null,
          projectStageId: null,
          investmentId: "inv-1",
          createdAt: "2026-03-02T10:00:00Z",
          updatedAt: "2026-03-02T10:00:00Z",
        },
      ];

      (api.get as any).mockResolvedValue({ data: mockNotifications });

      const result = await notificationApi.getMyNotifications();

      expect(api.get).toHaveBeenCalledWith("/notification/my-notifications");
      expect(result).toEqual(mockNotifications);
    });

    it("should return empty array when no notifications exist", async () => {
      (api.get as any).mockResolvedValue({ data: [] });

      const result = await notificationApi.getMyNotifications();

      expect(result).toEqual([]);
    });

    it("should throw error when API call fails", async () => {
      const error = new Error("Network error");
      (api.get as any).mockRejectedValue(error);

      await expect(notificationApi.getMyNotifications()).rejects.toThrow(
        "Network error",
      );
    });
  });

  describe("getUnreadCount", () => {
    it("should fetch unread notification count", async () => {
      (api.get as any).mockResolvedValue({ data: { count: 5 } });

      const result = await notificationApi.getUnreadCount();

      expect(api.get).toHaveBeenCalledWith("/notification/unread-count");
      expect(result).toBe(5);
    });

    it("should return 0 when no unread notifications exist", async () => {
      (api.get as any).mockResolvedValue({ data: { count: 0 } });

      const result = await notificationApi.getUnreadCount();

      expect(result).toBe(0);
    });

    it("should throw error when API call fails", async () => {
      const error = new Error("Network error");
      (api.get as any).mockRejectedValue(error);

      await expect(notificationApi.getUnreadCount()).rejects.toThrow(
        "Network error",
      );
    });
  });

  describe("markAsRead", () => {
    it("should mark notification as read", async () => {
      const notificationId = "notif-1";
      const updatedNotification = {
        id: notificationId,
        userId: "user-123",
        type: "INVESTMENT_CREATED",
        content: "Votre investissement a été créé",
        status: "READ",
        projectId: "project-1",
        projectStageId: "stage-1",
        investmentId: "inv-1",
        createdAt: "2026-03-01T10:00:00Z",
        updatedAt: "2026-03-01T10:00:00Z",
      };

      (api.patch as any).mockResolvedValue({ data: updatedNotification });

      const result = await notificationApi.markAsRead(notificationId);

      expect(api.patch).toHaveBeenCalledWith(
        `/notification/${notificationId}/mark-read`,
      );
      expect(result).toEqual(updatedNotification);
      expect(result.status).toBe("READ");
    });

    it("should throw error when notification not found", async () => {
      const error = new Error("Notification not found");
      (api.patch as any).mockRejectedValue(error);

      await expect(notificationApi.markAsRead("invalid-id")).rejects.toThrow(
        "Notification not found",
      );
    });
  });

  describe("markAllAsRead", () => {
    it("should mark all notifications as read", async () => {
      (api.patch as any).mockResolvedValue({ data: { count: 3 } });

      await notificationApi.markAllAsRead();

      expect(api.patch).toHaveBeenCalledWith("/notification/mark-all-read");
    });

    it("should not return anything on success", async () => {
      (api.patch as any).mockResolvedValue({ data: { count: 0 } });

      const result = await notificationApi.markAllAsRead();

      expect(result).toBeUndefined();
    });

    it("should throw error when API call fails", async () => {
      const error = new Error("Network error");
      (api.patch as any).mockRejectedValue(error);

      await expect(notificationApi.markAllAsRead()).rejects.toThrow(
        "Network error",
      );
    });
  });

  describe("API Endpoints", () => {
    it("should use correct endpoint for getMyNotifications", async () => {
      (api.get as any).mockResolvedValue({ data: [] });

      await notificationApi.getMyNotifications();

      expect(api.get).toHaveBeenCalledWith("/notification/my-notifications");
    });

    it("should use correct endpoint for getUnreadCount", async () => {
      (api.get as any).mockResolvedValue({ data: { count: 0 } });

      await notificationApi.getUnreadCount();

      expect(api.get).toHaveBeenCalledWith("/notification/unread-count");
    });

    it("should use correct endpoint for markAsRead", async () => {
      const id = "test-123";
      (api.patch as any).mockResolvedValue({ data: {} });

      await notificationApi.markAsRead(id);

      expect(api.patch).toHaveBeenCalledWith(`/notification/${id}/mark-read`);
    });

    it("should use correct endpoint for markAllAsRead", async () => {
      (api.patch as any).mockResolvedValue({ data: {} });

      await notificationApi.markAllAsRead();

      expect(api.patch).toHaveBeenCalledWith("/notification/mark-all-read");
    });
  });
});
