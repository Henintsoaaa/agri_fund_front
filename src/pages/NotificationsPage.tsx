import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useNotifications,
  useMarkAsRead,
  useMarkAllAsRead,
} from "@/features/notification/hooks/useNotifications";
import type { Notification } from "@/features/notification/types/notification.types";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { Bell, CheckCheck, Loader2, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

export const NotificationsPage = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const { data: notifications = [], isLoading } = useNotifications();
  const markAsRead = useMarkAsRead();
  const markAllAsRead = useMarkAllAsRead();

  const filteredNotifications =
    filter === "unread"
      ? notifications.filter((n) => n.status === "UNREAD")
      : notifications;

  const unreadCount = notifications.filter((n) => n.status === "UNREAD").length;

  const handleNotificationClick = (notification: Notification) => {
    // Mark as read if unread
    if (notification.status === "UNREAD") {
      markAsRead.mutate(notification.id);
    }

    // Navigate based on notification type
    if (notification.projectId) {
      navigate(`/project/${notification.projectId}`);
    } else if (notification.investmentId) {
      navigate(`/investments`);
    }
  };

  const getNotificationIcon = (type: string) => {
    if (type.includes("SUCCESS") || type.includes("CONFIRMED")) return "✅";
    if (type.includes("FAILED") || type.includes("CANCELLED")) return "❌";
    if (type.includes("FUNDED")) return "🎉";
    if (type.includes("DIVIDEND")) return "💰";
    if (type.includes("PENDING")) return "⏳";
    if (type.includes("USER")) return "👤";
    if (type.includes("PROJECT")) return "📁";
    if (type.includes("INVESTMENT")) return "💼";
    if (type.includes("PAYMENT")) return "💳";
    return "📬";
  };

  const getNotificationColor = (type: string) => {
    if (
      type.includes("SUCCESS") ||
      type.includes("CONFIRMED") ||
      type.includes("FUNDED")
    )
      return "bg-green-500/10 text-green-700 dark:text-green-400";
    if (type.includes("FAILED") || type.includes("CANCELLED"))
      return "bg-red-500/10 text-red-700 dark:text-red-400";
    if (type.includes("PENDING"))
      return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400";
    if (type.includes("DIVIDEND"))
      return "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400";
    return "bg-blue-500/10 text-blue-700 dark:text-blue-400";
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="container max-w-4xl py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground">
            Gérez et consultez toutes vos notifications
          </p>
        </div>
        {unreadCount > 0 && (
          <Button
            variant="outline"
            onClick={() => markAllAsRead.mutate()}
            disabled={markAllAsRead.isPending}
          >
            {markAllAsRead.isPending ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <CheckCheck className="h-4 w-4 mr-2" />
            )}
            Tout marquer comme lu
          </Button>
        )}
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Toutes les notifications
              </CardTitle>
              <CardDescription>
                {unreadCount > 0 ? (
                  <span>
                    Vous avez <strong>{unreadCount}</strong> notification
                    {unreadCount > 1 ? "s" : ""} non lue
                    {unreadCount > 1 ? "s" : ""}
                  </span>
                ) : (
                  "Aucune notification non lue"
                )}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs
            value={filter}
            onValueChange={(v) => setFilter(v as "all" | "unread")}
          >
            <TabsList className="mb-4">
              <TabsTrigger value="all">
                Toutes ({notifications.length})
              </TabsTrigger>
              <TabsTrigger value="unread">Non lues ({unreadCount})</TabsTrigger>
            </TabsList>

            <TabsContent value={filter} className="space-y-2">
              {filteredNotifications.length === 0 ? (
                <div className="py-12 text-center">
                  <Bell className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">
                    {filter === "unread"
                      ? "Aucune notification non lue"
                      : "Aucune notification"}
                  </p>
                </div>
              ) : (
                filteredNotifications.map((notification) => (
                  <Card
                    key={notification.id}
                    className={cn(
                      "cursor-pointer transition-colors hover:bg-muted/50",
                      notification.status === "UNREAD" &&
                        "border-l-4 border-l-blue-500",
                    )}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div
                          className={cn(
                            "text-2xl p-2 rounded-lg flex-shrink-0",
                            getNotificationColor(notification.type),
                          )}
                        >
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-sm leading-relaxed">
                              {notification.content}
                            </p>
                            {notification.status === "UNREAD" && (
                              <Badge
                                variant="default"
                                className="flex-shrink-0"
                              >
                                Nouveau
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>
                              {formatDistanceToNow(
                                new Date(notification.createdAt),
                                {
                                  addSuffix: true,
                                  locale: fr,
                                },
                              )}
                            </span>
                            <Badge variant="outline" className="text-xs">
                              {notification.type.replace(/_/g, " ")}
                            </Badge>
                          </div>
                        </div>
                        {notification.status === "UNREAD" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              markAsRead.mutate(notification.id);
                            }}
                            disabled={markAsRead.isPending}
                          >
                            <CheckCheck className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
