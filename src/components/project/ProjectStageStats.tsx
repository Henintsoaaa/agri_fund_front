import { Card, CardContent } from "@/components/ui/card";
import { useProject } from "@/features/project/hooks/useProject";
import { CheckCircle, Circle, Target, TrendingUp } from "lucide-react";

interface ProjectStageStatsProps {
  projectId: string;
}

export default function ProjectStageStats({
  projectId,
}: ProjectStageStatsProps) {
  const { useCountProjectStages } = useProject();
  const { data: stagesCount, isLoading } = useCountProjectStages(projectId);

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-16 bg-gray-200 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!stagesCount) return null;

  const stats = [
    {
      label: "Total des étapes",
      value: stagesCount.total,
      icon: Target,
      color: "bg-forest text-cream",
      bgColor: "bg-forest/10",
    },
    {
      label: "Ouvertes",
      value: stagesCount.open,
      icon: Circle,
      color: "bg-orange-500 text-white",
      bgColor: "bg-orange-50",
    },
    {
      label: "Financées",
      value: stagesCount.funded,
      icon: TrendingUp,
      color: "bg-blue-500 text-white",
      bgColor: "bg-blue-50",
    },
    {
      label: "Terminées",
      value: stagesCount.closed,
      icon: CheckCircle,
      color: "bg-green-500 text-white",
      bgColor: "bg-green-50",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card
          key={index}
          className={`border-2 hover:shadow-lg transition-all duration-200 ${stat.bgColor}`}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-3xl font-bold text-forest">{stat.value}</p>
              <p className="text-sm font-medium text-sage">{stat.label}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
