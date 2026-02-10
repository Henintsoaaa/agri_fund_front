import { Card, CardContent } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

interface ProjectStatsCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
}

export default function ProjectStatsCard({
  label,
  value,
  icon: Icon,
  color,
}: ProjectStatsCardProps) {
  return (
    <Card className="border border-sage/10 hover:shadow-xl transition-shadow duration-200">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-sage mb-1">{label}</p>
            <p className="text-2xl font-bold text-forest">{value}</p>
          </div>
          <div className={`${color} p-3 rounded-lg`}>
            <Icon className="h-6 w-6 text-cream" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
