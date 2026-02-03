import { useEffect, useState } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import UserStats from "@/components/admin/UserStats";
import UserTable from "@/components/admin/UserTable";
import CreateUserDialog from "@/components/admin/CreateUserDialog";
import { useAdminData } from "@/features/admin/hooks/useAdminData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AdminDashboard() {
  const {
    users,
    loading,
    error,
    fetchUsers,
    createUser,
    editUser,
    deleteUser,
    getStats,
  } = useAdminData();
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    fetchUsers(activeTab);
  }, [activeTab]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const stats = getStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-sage/10 to-olive/10">
      <AdminLayout />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 w-full">
        {/* Header */}
        <div className="flex md:flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-forest">
              Tableau de bord Admin
            </h1>
            <p className="text-sage mt-1 text-sm sm:text-base">
              Gérez les utilisateurs et visualisez les statistiques
            </p>
          </div>
          <div className="flex justify-start sm:justify-end">
            <CreateUserDialog onCreate={createUser} />
          </div>

          {/* Stats */}
          <UserStats stats={stats} />

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg shadow-sm">
              {error}
            </div>
          )}

          {/* Users Table with Tabs */}
          <Card className="bg-white/80 backdrop-blur shadow-xl border-sage/20 w-full p-10">
            <CardHeader>
              <CardTitle className="text-forest text-xl sm:text-2xl">
                Gestion des utilisateurs
              </CardTitle>
              <CardDescription className="text-sage">
                Visualisez et gérez tous les utilisateurs de la plateforme
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={handleTabChange}>
                <div className="overflow-x-auto">
                  <TabsList className="mb-4 bg-sage/10 w-full sm:w-auto flex-wrap sm:flex-nowrap">
                    <TabsTrigger
                      value="all"
                      className="data-[state=active]:bg-olive data-[state=active]:text-cream text-xs sm:text-sm"
                    >
                      Tous
                    </TabsTrigger>
                    <TabsTrigger
                      value="active"
                      className="data-[state=active]:bg-olive data-[state=active]:text-cream text-xs sm:text-sm"
                    >
                      Actifs
                    </TabsTrigger>
                    <TabsTrigger
                      value="inactive"
                      className="data-[state=active]:bg-olive data-[state=active]:text-cream text-xs sm:text-sm"
                    >
                      Inactifs
                    </TabsTrigger>
                    <TabsTrigger
                      value="deleted"
                      className="data-[state=active]:bg-olive data-[state=active]:text-cream text-xs sm:text-sm"
                    >
                      Supprimés
                    </TabsTrigger>
                    <TabsTrigger
                      value="project-owners"
                      className="data-[state=active]:bg-olive data-[state=active]:text-cream text-xs sm:text-sm"
                    >
                      Porteurs
                    </TabsTrigger>
                    <TabsTrigger
                      value="investors"
                      className="data-[state=active]:bg-olive data-[state=active]:text-cream text-xs sm:text-sm"
                    >
                      Investisseurs
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value={activeTab}>
                  <UserTable
                    users={users}
                    onEdit={editUser}
                    onDelete={deleteUser}
                    loading={loading}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
