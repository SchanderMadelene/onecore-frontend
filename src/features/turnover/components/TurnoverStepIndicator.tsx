import { TurnoverStep, TurnoverStepData, TurnoverStatus } from "@/types/turnover";
import { CheckCircle, Circle, AlertCircle, XCircle } from "lucide-react";

interface TurnoverStepIndicatorProps {
  steps: TurnoverStepData[];
  currentStep: TurnoverStep;
  compact?: boolean;
}

export function TurnoverStepIndicator({ steps, currentStep, compact = false }: TurnoverStepIndicatorProps) {
  const getStepIcon = (stepData: TurnoverStepData, isCurrent: boolean) => {
    const iconSize = compact ? "h-3 w-3" : "h-4 w-4";
    
    switch (stepData.status) {
      case TurnoverStatus.COMPLETED:
        return <CheckCircle className={`${iconSize} text-green-500`} />;
      case TurnoverStatus.IN_PROGRESS:
        return <AlertCircle className={`${iconSize} text-blue-500`} />;
      case TurnoverStatus.BLOCKED:
        return <XCircle className={`${iconSize} text-red-500`} />;
      default:
        return isCurrent ? 
          <AlertCircle className={`${iconSize} text-blue-500`} /> :
          <Circle className={`${iconSize} text-gray-400`} />;
    }
  };

  const getConnectorColor = (stepData: TurnoverStepData) => {
    switch (stepData.status) {
      case TurnoverStatus.COMPLETED:
        return "bg-green-500";
      case TurnoverStatus.IN_PROGRESS:
        return "bg-blue-500";
      case TurnoverStatus.BLOCKED:
        return "bg-red-500";
      default:
        return "bg-gray-300";
    }
  };

  return (
    <div className="flex items-center space-x-1 overflow-x-auto">
      {steps.map((stepData, index) => {
        const isCurrent = stepData.step === currentStep;
        const isLast = index === steps.length - 1;
        
        return (
          <div key={stepData.step} className="flex items-center">
            <div className={`flex-shrink-0 ${isCurrent ? 'scale-110' : ''} transition-transform`}>
              {getStepIcon(stepData, isCurrent)}
            </div>
            
            {!isLast && (
              <div 
                className={`h-0.5 w-4 mx-1 ${getConnectorColor(stepData)} transition-colors`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}