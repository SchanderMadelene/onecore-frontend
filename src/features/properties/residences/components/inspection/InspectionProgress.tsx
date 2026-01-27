
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, CheckCircle, Circle } from "lucide-react";

interface InspectionStats {
  total: number;
  completed: number;
  handled: number;
  inProgress: number;
}

interface InspectionProgressProps {
  progress: number;
  stats: InspectionStats;
  inspectorName: string;
}

export const InspectionProgress = ({ progress, stats, inspectorName }: InspectionProgressProps) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle>Pågående besiktning</CardTitle>
          <span className="text-sm text-muted-foreground">
            Besiktningsman: {inspectorName}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <div className="grid gap-1">
              <div className="font-medium">Totalt framsteg</div>
              <div className="text-muted-foreground">
                {stats.completed} av {stats.total} rum klara
              </div>
            </div>
            <div>{Math.round(progress)}%</div>
          </div>
          <Progress value={progress} className="h-2" />
          
          <div className="grid grid-cols-2 gap-4 pt-4">
            <StatisticItem 
              icon={<CheckCircle className="h-4 w-4 text-green-500" />}
              label={`${stats.handled} rum hanterade`}
            />
            <StatisticItem 
              icon={<AlertCircle className="h-4 w-4 text-amber-500" />}
              label={`${stats.completed - stats.handled} rum behöver åtgärd`}
            />
            <StatisticItem 
              icon={<Circle className="h-4 w-4 text-blue-500 fill-current" />}
              label={`${stats.inProgress} rum påbörjade`}
            />
            <StatisticItem 
              icon={<Circle className="h-4 w-4 text-gray-300" />}
              label={`${stats.total - stats.completed - stats.inProgress} rum ej påbörjade`}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface StatisticItemProps {
  icon: React.ReactNode;
  label: string;
}

const StatisticItem = ({ icon, label }: StatisticItemProps) => (
  <div className="flex items-center gap-2">
    {icon}
    <span className="text-sm">{label}</span>
  </div>
);
