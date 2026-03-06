import {
  Bell,
  CheckCheck,
  CircleCheck,
  DollarSign,
  Hourglass,
  Leaf,
  Loader2,
  PartyPopper,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  useNotifications,
  useUnreadCount,
  useMarkAsRead,
  useMarkAllAsRead,
} from "@/features/notification/hooks/useNotifications";
import type { Notification } from "@/features/notification/types/notification.types";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

export const NotificationDropdown = () => {
  const navigate = useNavigate();
  const { data: notifications, isLoading } = useNotifications();
  const { data: unreadCount = 0 } = useUnreadCount();
  const markAsRead = useMarkAsRead();
  const markAllAsRead = useMarkAllAsRead();

  const recentNotifications = notifications?.slice(0, 5) || [];

  const handleNotificationClick = (notification: Notification) => {
    // Mark as read if unread
    if (notification.status === "UNREAD") {
      markAsRead.mutate(notification.id);
    }

    // Navigate based on notification type
    if (notification.projectId) {
      navigate(`/project-stage/${notification.projectId}`);
    } else if (notification.investmentId) {
      navigate(`/investments`);
    }
  };

  const getNotificationIcon = (type: string) => {
    if (type.includes("SUCCESS") || type.includes("CONFIRMED"))
      return <CircleCheck />;
    if (type.includes("FAILED") || type.includes("CANCELLED")) return <X />;
    if (type.includes("FUNDED")) return <PartyPopper />;
    if (type.includes("DIVIDEND")) return <DollarSign />;
    if (type.includes("PENDING")) return <Hourglass />;
    return <Leaf />;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {unreadCount > 9 ? "9+" : unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 sm:w-96">
        <div className="flex items-center justify-between px-2 py-2">
          <DropdownMenuLabel className="p-0">Notifications</DropdownMenuLabel>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-auto p-1 text-xs"
              onClick={(e) => {
                e.preventDefault();
                markAllAsRead.mutate();
              }}
              disabled={markAllAsRead.isPending}
            >
              {markAllAsRead.isPending ? (
                <Loader2 className="h-3 w-3 mr-1 animate-spin" />
              ) : (
                <CheckCheck className="h-3 w-3 mr-1" />
              )}
              Tout marquer comme lu
            </Button>
          )}
        </div>
        <DropdownMenuSeparator />

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : recentNotifications.length === 0 ? (
          <div className="py-8 text-center text-sm text-muted-foreground">
            Aucune notification
          </div>
        ) : (
          <ScrollArea className="h-100">
            {recentNotifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className={cn(
                  "flex flex-col items-start gap-2 p-3 cursor-pointer",
                  notification.status === "UNREAD" && "bg-muted/50",
                )}
                onClick={() => handleNotificationClick(notification)}
              >
                <div className="flex items-start gap-3 w-full">
                  <div className="text-lg mt-1.5">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm leading-tight">
                      {notification.content}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(notification.createdAt), {
                        addSuffix: true,
                        locale: fr,
                      })}
                    </p>
                  </div>
                  {notification.status === "UNREAD" && (
                    <div className="h-2 w-2 rounded-full bg-blue-500 mt-1" />
                  )}
                </div>
              </DropdownMenuItem>
            ))}
          </ScrollArea>
        )}

        {recentNotifications.length > 0 && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-center justify-center cursor-pointer text-sm font-medium"
              onClick={() => navigate("/notifications")}
            >
              Voir toutes les notifications
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
