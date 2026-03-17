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
import {
  Bell,
  Briefcase,
  CheckCheck,
  CheckCircle,
  Clock,
  CreditCard,
  DollarSign,
  Folder,
  Loader2,
  Mailbox,
  PartyPopper,
  User,
  X,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "@/features/auth/context/AuthContext";
import ProjectApprovalModal from "@/components/admin/ProjectApprovalModal";
import ProofApprovalModal from "@/components/admin/ProofApprovalModal";
import { useProofs } from "@/features/proofs/hooks/useProofs";

export const NotificationsPage = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const { data: notifications = [], isLoading } = useNotifications();
  const markAsRead = useMarkAsRead();
  const markAllAsRead = useMarkAllAsRead();

  // State for modals
  const [projectApprovalModal, setProjectApprovalModal] = useState<{
    open: boolean;
    projectId: string | null;
  }>({ open: false, projectId: null });

  const [proofApprovalModal, setProofApprovalModal] = useState<{
    open: boolean;
    proofId: string | null;
  }>({ open: false, proofId: null });

  // Get proof details for modal
  const { pendingProofs } = useProofs();
  const selectedProof = pendingProofs?.find(
    (p) => p.id === proofApprovalModal.proofId,
  );

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

    // Admin actions based on notification type
    if (user?.role === "ADMIN") {
      if (notification.type === "PROJECT_CREATED" && notification.projectId) {
        // Open project approval modal
        setProjectApprovalModal({
          open: true,
          projectId: notification.projectId,
        });
        return;
      }

      if (notification.type === "PROOF_CREATED") {
        // Extract proof ID from notification content or use a new notification field
        // For now, navigate to proofs section
        navigate("/admin-dashboard?section=proofs");
        return;
      }
    }

    // Navigate based on notification type
    if (notification.projectId) {
      navigate(`/project/${notification.projectId}`);
    } else if (notification.investmentId) {
      navigate(`/investments`);
    }
  };

  const getNotificationIcon = (type: string) => {
    if (type.includes("SUCCESS") || type.includes("CONFIRMED"))
      return <CheckCircle />;
    if (type.includes("FAILED") || type.includes("CANCELLED")) return <X />;
    if (type.includes("FUNDED")) return <PartyPopper />;
    if (type.includes("DIVIDEND")) return <DollarSign />;
    if (type.includes("PENDING")) return <Clock />;
    if (type.includes("PROOF")) return <FileText />;
    if (type.includes("USER")) return <User />;
    if (type.includes("PROJECT")) return <Folder />;
    if (type.includes("INVESTMENT")) return <Briefcase />;
    if (type.includes("PAYMENT")) return <CreditCard />;
    return <Mailbox />;
  };

  const getNotificationColor = (type: string) => {
    if (
      type.includes("SUCCESS") ||
      type.includes("CONFIRMED") ||
      type.includes("FUNDED")
    )
      return "bg-olive/10 text-olive";
    if (type.includes("FAILED") || type.includes("CANCELLED"))
      return "bg-red-500/10 text-red-700 dark:text-red-400";
    if (type.includes("PENDING")) return "bg-sage/20 text-sage";
    if (type.includes("DIVIDEND")) return "bg-olive/20 text-olive";
    return "bg-forest/10 text-forest";
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-cream via-sage/10 to-olive/10">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-forest flex items-center gap-3">
              <Bell className="h-8 w-8 text-olive" />
              Notifications
            </h1>
            <p className="text-sage">
              Gérez et consultez toutes vos notifications
            </p>
          </div>
          {unreadCount > 0 && (
            <Button
              variant="outline"
              onClick={() => markAllAsRead.mutate()}
              disabled={markAllAsRead.isPending}
              className="border-sage/30 hover:bg-olive/10"
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

        <Card className="bg-cream/50 border-sage/30">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <CardTitle className="flex items-center gap-2 text-forest">
                  {/* <Bell className="h-5 w-5 text-olive" /> */}
                  Toutes les notifications
                </CardTitle>
                <CardDescription className="text-sage">
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
                <TabsTrigger value="unread">
                  Non lues ({unreadCount})
                </TabsTrigger>
              </TabsList>

              <TabsContent value={filter} className="space-y-2">
                {filteredNotifications.length === 0 ? (
                  <div className="py-12 text-center">
                    <Bell className="h-12 w-12 mx-auto text-sage mb-4" />
                    <p className="text-sage">
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
                        "cursor-pointer transition-colors hover:bg-sage/5 bg-cream/30 border-sage/30",
                        notification.status === "UNREAD" &&
                          "border-l-4 border-l-olive",
                      )}
                      onClick={() => handleNotificationClick(notification)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <div
                            className={cn(
                              "text-2xl p-2 rounded-lg shrink-0",
                              getNotificationColor(notification.type),
                            )}
                          >
                            {getNotificationIcon(notification.type)}
                          </div>
                          <div className="flex-1 space-y-2">
                            <div className="flex items-start justify-between gap-2">
                              <p className="text-sm leading-relaxed text-forest">
                                {notification.content}
                              </p>
                              {notification.status === "UNREAD" && (
                                <Badge className="shrink-0 bg-olive/20 text-olive border-olive/30">
                                  Nouveau
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-4 text-xs text-sage">
                              <span>
                                {formatDistanceToNow(
                                  new Date(notification.createdAt),
                                  {
                                    addSuffix: true,
                                    locale: fr,
                                  },
                                )}
                              </span>
                              <Badge
                                variant="outline"
                                className="text-xs border-sage/30"
                              >
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

      {/* Project Approval Modal */}
      {projectApprovalModal.projectId && (
        <ProjectApprovalModal
          open={projectApprovalModal.open}
          onOpenChange={(open) =>
            setProjectApprovalModal({ open, projectId: null })
          }
          projectId={projectApprovalModal.projectId}
        />
      )}

      {/* Proof Approval Modal */}
      {proofApprovalModal.proofId && selectedProof && (
        <ProofApprovalModal
          open={proofApprovalModal.open}
          onOpenChange={(open) =>
            setProofApprovalModal({ open, proofId: null })
          }
          proof={selectedProof}
        />
      )}
    </div>
  );
};
