import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  UserCheck,
  UserX,
  Trash2,
  Briefcase,
  TrendingUp,
} from "lucide-react";

interface UserStatsProps {
  stats: {
    total: number;
    active: number;
    inactive: number;
    deleted: number;
    projectOwners: number;
    investors: number;
    admins: number;
  };
}

export default function UserStats({ stats }: UserStatsProps) {
  const statCards = [
    {
      title: "Total Utilisateurs",
      value: stats.total,
      icon: Users,
      color: "text-forest",
      bgColor: "bg-olive/10",
    },
    {
      title: "Actifs",
      value: stats.active,
      icon: UserCheck,
      color: "text-green-700",
      bgColor: "bg-green-50",
    },
    {
      title: "Inactifs",
      value: stats.inactive,
      icon: UserX,
      color: "text-sage",
      bgColor: "bg-sage/10",
    },
    {
      title: "Supprimés",
      value: stats.deleted,
      icon: Trash2,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      title: "Porteurs de projet",
      value: stats.projectOwners,
      icon: Briefcase,
      color: "text-olive",
      bgColor: "bg-olive/20",
    },
    {
      title: "Investisseurs",
      value: stats.investors,
      icon: TrendingUp,
      color: "text-forest",
      bgColor: "bg-forest/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4 w-full">
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card
            key={index}
            className="bg-white/80 backdrop-blur border-sage/20 shadow-md hover:shadow-lg transition-shadow  "
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-forest">
                {stat.title}
              </CardTitle>
              <div className={`${stat.bgColor} p-2 rounded-lg`}>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold text-forest">
                {stat.value}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
