import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { User } from "../../features/admin/types/admin.types";

interface UserTableProps {
  users: User[];
  onEdit: (userId: string, isActive: boolean) => void;
  onDelete: (userId: string) => void;
  loading: boolean;
}

export default function UserTable({
  users,
  onEdit,
  onDelete,
  loading,
}: UserTableProps) {
  const getRoleBadge = (role: string) => {
    const roleConfig: Record<
      string,
      { variant: "default" | "secondary" | "destructive"; className: string }
    > = {
      ADMIN: { variant: "destructive", className: "bg-red-500 text-white" },
      PROJECT_OWNER: { variant: "default", className: "bg-olive text-cream" },
      INVESTOR: { variant: "secondary", className: "bg-forest text-cream" },
    };
    const config = roleConfig[role] || {
      variant: "default",
      className: "bg-sage text-cream",
    };
    return (
      <Badge variant={config.variant} className={config.className}>
        {role === "PROJECT_OWNER"
          ? "Porteur"
          : role === "INVESTOR"
            ? "Investisseur"
            : "Admin"}
      </Badge>
    );
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return <div className="text-center py-8 text-sage">Chargement...</div>;
  }

  if (users.length === 0) {
    return (
      <div className="text-center py-8 text-sage">Aucun utilisateur trouvé</div>
    );
  }

  return (
    <div className="border border-sage/20 rounded-lg overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-olive/5 hover:bg-olive/10">
            <TableHead className="text-forest font-semibold">Nom</TableHead>
            <TableHead className="text-forest font-semibold hidden md:table-cell">
              Email
            </TableHead>
            <TableHead className="text-forest font-semibold">Rôle</TableHead>
            <TableHead className="text-forest font-semibold">Statut</TableHead>
            <TableHead className="text-forest font-semibold hidden lg:table-cell">
              Créé le
            </TableHead>
            <TableHead className="text-right text-forest font-semibold">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id} className="hover:bg-sage/5">
              <TableCell className="font-medium text-forest">
                {user.name}
              </TableCell>
              <TableCell className="text-sage hidden md:table-cell">
                {user.email}
              </TableCell>
              <TableCell>{getRoleBadge(user.role)}</TableCell>
              <TableCell>
                {user.isDeleted ? (
                  <Badge variant="destructive" className="bg-red-500">
                    Supprimé
                  </Badge>
                ) : user.isActive ? (
                  <Badge className="bg-green-500 text-white">Actif</Badge>
                ) : (
                  <Badge variant="secondary" className="bg-sage/30 text-forest">
                    Inactif
                  </Badge>
                )}
              </TableCell>
              <TableCell className="text-sage hidden lg:table-cell">
                {formatDate(user.createdAt)}
              </TableCell>
              <TableCell className="text-right">
                {user.role === "ADMIN" ? (
                  <span className="text-sage text-xs sm:text-sm italic">
                    Administrateur
                  </span>
                ) : !user.isDeleted ? (
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-2 justify-end">
                    <Button
                      size="sm"
                      variant={user.isActive ? "outline" : "default"}
                      onClick={() => onEdit(user.id, !user.isActive)}
                      className={
                        user.isActive
                          ? "border-sage text-sage hover:bg-sage/10 text-xs w-20"
                          : "bg-olive text-cream hover:bg-olive/90 text-xs w-20"
                      }
                    >
                      {user.isActive ? "Désactiver" : "Activer"}
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => onDelete(user.id)}
                      className="bg-red-500 hover:bg-red-600 text-xs"
                    >
                      Supprimer
                    </Button>
                  </div>
                ) : (
                  <span className="text-sage text-xs sm:text-sm">
                    Supprimé définitivement
                  </span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
