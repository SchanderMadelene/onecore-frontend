import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  TurnoverCase, 
  TurnoverStatus, 
  TURNOVER_STEP_LABELS,
  TURNOVER_STATUS_LABELS,
  TURNOVER_ROLE_LABELS 
} from "@/types/turnover";
import { 
  Calendar, 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  AlertCircle,
  CheckCircle,
  Loader,
  Ban
} from "lucide-react";
import { TurnoverStepIndicator } from "./TurnoverStepIndicator";

interface TurnoverCaseDetailDialogProps {
  case_: TurnoverCase | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TurnoverCaseDetailDialog({ case_, open, onOpenChange }: TurnoverCaseDetailDialogProps) {
  if (!case_) return null;

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

  const getStatusIcon = (status: TurnoverStatus) => {
    switch (status) {
      case TurnoverStatus.COMPLETED: return <CheckCircle className="h-4 w-4 text-green-600" />;
      case TurnoverStatus.IN_PROGRESS: return <Loader className="h-4 w-4 text-blue-600" />;
      case TurnoverStatus.BLOCKED: return <Ban className="h-4 w-4 text-red-600" />;
      case TurnoverStatus.PENDING: return <Clock className="h-4 w-4 text-gray-600" />;
      default: return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const isOverdue = case_.estimatedCompletion && 
    new Date(case_.estimatedCompletion) < new Date() && 
    case_.currentStep !== "move_in_completed";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-xl">{case_.address}</DialogTitle>
              <div className="flex items-center gap-2 mt-1 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{case_.residenceCode}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={getPriorityColor(case_.priority)}>
                {case_.priority === "urgent" ? "Brådskande" :
                 case_.priority === "high" ? "Hög" :
                 case_.priority === "normal" ? "Normal" : "Låg"}
              </Badge>
              {isOverdue && (
                <Badge variant="destructive">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  Försenat
                </Badge>
              )}
            </div>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Current Status */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Aktuell status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{TURNOVER_STEP_LABELS[case_.currentStep]}</p>
                  <div className="flex items-center gap-2 mt-1">
                    {getStatusIcon(currentStepData?.status || TurnoverStatus.PENDING)}
                    <span className="text-sm">
                      {TURNOVER_STATUS_LABELS[currentStepData?.status || TurnoverStatus.PENDING]}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Framsteg</span>
                  <span>{completedSteps}/{totalSteps} steg</span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
              </div>

              {currentStepData?.assignedTo && (
                <div>
                  <p className="text-sm text-muted-foreground">Ansvarig</p>
                  <p className="font-medium">{currentStepData.assignedTo}</p>
                </div>
              )}

              {currentStepData?.dueDate && (
                <div>
                  <p className="text-sm text-muted-foreground">Förfallodatum</p>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(currentStepData.dueDate).toLocaleDateString('sv-SE')}</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Tenant Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Hyresgäster</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Outgoing tenant */}
              <div>
                <p className="text-sm text-muted-foreground mb-2">Flyttar ut</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span className="font-medium">{case_.outgoingTenant.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4" />
                    <span>{case_.outgoingTenant.email}</span>
                  </div>
                  {case_.outgoingTenant.phone && (
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4" />
                      <span>{case_.outgoingTenant.phone}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4" />
                    <span>Flyttar ut: {new Date(case_.outgoingTenant.moveOutDate).toLocaleDateString('sv-SE')}</span>
                  </div>
                  {case_.outgoingTenant.terminationReason && (
                    <div>
                      <p className="text-sm text-muted-foreground">Uppsägningsorsak</p>
                      <p className="text-sm">{case_.outgoingTenant.terminationReason}</p>
                    </div>
                  )}
                </div>
              </div>

              <Separator />

              {/* Incoming tenant */}
              {case_.incomingTenant ? (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Flyttar in</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span className="font-medium">{case_.incomingTenant.name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4" />
                      <span>{case_.incomingTenant.email}</span>
                    </div>
                    {case_.incomingTenant.phone && (
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4" />
                        <span>{case_.incomingTenant.phone}</span>
                      </div>
                    )}
                    {case_.incomingTenant.moveInDate && (
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4" />
                        <span>Flyttar in: {new Date(case_.incomingTenant.moveInDate).toLocaleDateString('sv-SE')}</span>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Flyttar in</p>
                  <p className="text-sm">Ingen hyresgäst vald ännu</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Process Steps */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Processöversikt</CardTitle>
          </CardHeader>
          <CardContent>
            <TurnoverStepIndicator 
              steps={case_.steps} 
              currentStep={case_.currentStep}
            />
          </CardContent>
        </Card>

        {/* Participants */}
        {case_.participants.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Deltagare</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {case_.participants.map(participant => (
                  <div key={participant.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{participant.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {TURNOVER_ROLE_LABELS[participant.role]}
                      </p>
                      <div className="flex items-center gap-2 mt-1 text-sm">
                        <Mail className="h-3 w-3" />
                        <span>{participant.email}</span>
                      </div>
                      {participant.phone && (
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-3 w-3" />
                          <span>{participant.phone}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Timestamps */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Tidsstämplar</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Skapat:</span>
              <span>{new Date(case_.createdAt).toLocaleDateString('sv-SE')} {new Date(case_.createdAt).toLocaleTimeString('sv-SE')}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Senast uppdaterat:</span>
              <span>{new Date(case_.updatedAt).toLocaleDateString('sv-SE')} {new Date(case_.updatedAt).toLocaleTimeString('sv-SE')}</span>
            </div>
            {case_.estimatedCompletion && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Planerat klart:</span>
                <span>{new Date(case_.estimatedCompletion).toLocaleDateString('sv-SE')}</span>
              </div>
            )}
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}