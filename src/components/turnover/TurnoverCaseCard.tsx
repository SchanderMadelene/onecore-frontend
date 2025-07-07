import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  TurnoverCase, 
  TurnoverStep, 
  TurnoverStatus, 
  TURNOVER_STEP_LABELS,
  TURNOVER_STATUS_LABELS 
} from "@/types/turnover";
import { Calendar, User, MapPin, ArrowRight, AlertCircle } from "lucide-react";
import { TurnoverStepIndicator } from "./TurnoverStepIndicator";

interface TurnoverCaseCardProps {
  case_: TurnoverCase;
  compact?: boolean;
}

export function TurnoverCaseCard({ case_, compact = false }: TurnoverCaseCardProps) {
  const currentStepData = case_.steps.find(step => step.step === case_.currentStep);
  const completedSteps = case_.steps.filter(step => step.status === TurnoverStatus.COMPLETED).length;
  const totalSteps = case_.steps.length;
  const progressPercentage = (completedSteps / totalSteps) * 100;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent": return "destructive";
      case "high": return "secondary";
      case "normal": return "outline";
      case "low": return "outline";
      default: return "outline";
    }
  };

  const getStatusColor = (status: TurnoverStatus) => {
    switch (status) {
      case TurnoverStatus.COMPLETED: return "text-green-600";
      case TurnoverStatus.IN_PROGRESS: return "text-blue-600";
      case TurnoverStatus.BLOCKED: return "text-red-600";
      case TurnoverStatus.PENDING: return "text-gray-600";
      default: return "text-gray-600";
    }
  };

  const isOverdue = case_.estimatedCompletion && 
    new Date(case_.estimatedCompletion) < new Date() && 
    case_.currentStep !== TurnoverStep.MOVE_IN_COMPLETED;

  return (
    <Card className={`transition-all hover:shadow-md ${compact ? 'text-sm' : ''}`}>
      <CardHeader className={compact ? 'pb-2' : 'pb-3'}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className={`font-semibold ${compact ? 'text-sm' : 'text-base'}`}>
                {case_.address}
              </h3>
              {isOverdue && (
                <AlertCircle className="h-4 w-4 text-red-500" />
              )}
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-3 w-3" />
              <span className="text-xs">{case_.residenceCode}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant={getPriorityColor(case_.priority)} className="text-xs">
              {case_.priority === "urgent" ? "Brådskande" :
               case_.priority === "high" ? "Hög" :
               case_.priority === "normal" ? "Normal" : "Låg"}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Current step status */}
        <div className="flex items-center justify-between">
          <div>
            <p className={`font-medium ${compact ? 'text-xs' : 'text-sm'}`}>
              {TURNOVER_STEP_LABELS[case_.currentStep]}
            </p>
            <p className={`${getStatusColor(currentStepData?.status || TurnoverStatus.PENDING)} ${compact ? 'text-xs' : 'text-sm'}`}>
              {TURNOVER_STATUS_LABELS[currentStepData?.status || TurnoverStatus.PENDING]}
            </p>
          </div>
          {!compact && (
            <Button variant="outline" size="sm">
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Progress */}
        {!compact && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Framsteg</span>
              <span>{completedSteps}/{totalSteps} steg</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        )}

        {/* Step indicator */}
        {!compact && (
          <TurnoverStepIndicator 
            steps={case_.steps} 
            currentStep={case_.currentStep}
            compact 
          />
        )}

        {/* Tenant information */}
        <div className={`grid ${compact ? 'grid-cols-1 gap-1' : 'grid-cols-2 gap-4'}`}>
          <div>
            <div className="flex items-center gap-1 mb-1">
              <User className="h-3 w-3 text-muted-foreground" />
              <span className={`text-muted-foreground ${compact ? 'text-xs' : 'text-sm'}`}>
                Flyttar ut
              </span>
            </div>
            <p className={`font-medium ${compact ? 'text-xs' : 'text-sm'}`}>
              {case_.outgoingTenant.name}
            </p>
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3 text-muted-foreground" />
              <span className={`text-muted-foreground ${compact ? 'text-xs' : 'text-sm'}`}>
                {new Date(case_.outgoingTenant.moveOutDate).toLocaleDateString('sv-SE')}
              </span>
            </div>
          </div>

          {!compact && case_.incomingTenant && (
            <div>
              <div className="flex items-center gap-1 mb-1">
                <User className="h-3 w-3 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Flyttar in</span>
              </div>
              <p className="font-medium text-sm">{case_.incomingTenant.name}</p>
              {case_.incomingTenant.moveInDate && (
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {new Date(case_.incomingTenant.moveInDate).toLocaleDateString('sv-SE')}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Due date warning */}
        {!compact && isOverdue && (
          <div className="flex items-center gap-2 p-2 bg-red-50 rounded-md">
            <AlertCircle className="h-4 w-4 text-red-500" />
            <span className="text-sm text-red-700">
              Försenat - planerat klart {new Date(case_.estimatedCompletion!).toLocaleDateString('sv-SE')}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}