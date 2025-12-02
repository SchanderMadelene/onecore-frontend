import { Progress } from "@/components/ui/progress";

interface InspectionProgressIndicatorProps {
  current: number;
  total: number;
  currentRoomName: string;
}

export function InspectionProgressIndicator({ 
  current, 
  total, 
  currentRoomName 
}: InspectionProgressIndicatorProps) {
  const progress = (current / total) * 100;

  return (
    <div className="px-4 pt-6 pb-6 mb-2 space-y-3 border-b">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">{currentRoomName}</span>
        <span className="text-muted-foreground">{current}/{total} rum</span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );
}