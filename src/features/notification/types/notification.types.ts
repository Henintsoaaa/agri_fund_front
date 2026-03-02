export interface Notification {
  id: string;
  userId: string;
  projectId?: string;
  projectStageId?: string;
  investmentId?: string;
  type: NotificationType;
  content: string;
  status: "UNREAD" | "READ";
  createdAt: string;
  updatedAt: string;
}

export type NotificationType =
  // User events
  | "USER_SIGNUP"
  | "USER_CREATED"
  | "USER_STATUS_CHANGE"
  | "USER_DELETED"
  // Project events
  | "PROJECT_CREATED"
  | "PROJECT_ACTIVATED"
  | "PROJECT_SUSPENDED"
  | "PROJECT_UPDATED"
  | "PROJECT_DELETED"
  // Stage events
  | "STAGE_FUNDED"
  // Investment events
  | "INVESTMENT_CREATED"
  | "INVESTMENT_CONFIRMED"
  | "INVESTMENT_CANCELLED"
  | "INVESTMENT_FAILED"
  // Payment events
  | "PAYMENT_PENDING"
  | "PAYMENT_SUCCESS"
  | "PAYMENT_FAILED"
  | "REFUND_PROCESSED"
  | "DIVIDEND_PAID"
  // General
  | "GENERAL";

export interface UnreadCountResponse {
  count: number;
}
