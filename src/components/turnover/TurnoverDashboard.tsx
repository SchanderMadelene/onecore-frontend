import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TurnoverCase, TurnoverStatus, TurnoverStep } from "@/types/turnover";
import { AlertCircle, CheckCircle, Clock, XCircle } from "lucide-react";

interface TurnoverDashboardProps {
  cases: TurnoverCase[];
}

export function TurnoverDashboard({ cases }: TurnoverDashboardProps) {
  // Calculate statistics
  const totalCases = cases.length;
  const completedCases = cases.filter(case_ => case_.currentStep === TurnoverStep.MOVE_IN_COMPLETED).length;
  const inProgressCases = cases.filter(case_ => {
    const currentStepData = case_.steps.find(step => step.step === case_.currentStep);
    return currentStepData?.status === TurnoverStatus.IN_PROGRESS;
  }).length;
  const blockedCases = cases.filter(case_ => {
    const currentStepData = case_.steps.find(step => step.step === case_.currentStep);
    return currentStepData?.status === TurnoverStatus.BLOCKED;
  }).length;

  const completionRate = totalCases > 0 ? (completedCases / totalCases) * 100 : 0;

  // Priority breakdown
  const urgentCases = cases.filter(case_ => case_.priority === "urgent").length;
  const highPriorityCases = cases.filter(case_ => case_.priority === "high").length;

  // Recent activity (cases updated in last 7 days)
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const recentActivity = cases.filter(case_ => new Date(case_.updatedAt) > oneWeekAgo);

  return (
    <div className="space-y-6">
      {/* Key metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <div className="flex-1">
                <p className="text-sm font-medium text-muted-foreground">Totalt ärenden</p>
                <p className="text-2xl font-bold">{totalCases}</p>
              </div>
              <Clock className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <div className="flex-1">
                <p className="text-sm font-medium text-muted-foreground">Pågående</p>
                <p className="text-2xl font-bold text-blue-600">{inProgressCases}</p>
              </div>
              <AlertCircle className="h-5 w-5 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <div className="flex-1">
                <p className="text-sm font-medium text-muted-foreground">Klara</p>
                <p className="text-2xl font-bold text-green-600">{completedCases}</p>
              </div>
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <div className="flex-1">
                <p className="text-sm font-medium text-muted-foreground">Blockerade</p>
                <p className="text-2xl font-bold text-red-600">{blockedCases}</p>
              </div>
              <XCircle className="h-5 w-5 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress and priorities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Genomförandegrad</CardTitle>
            <CardDescription>
              Andel ärenden som är fullständigt genomförda
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Klara ärenden</span>
                <span>{Math.round(completionRate)}%</span>
              </div>
              <Progress value={completionRate} className="h-2" />
            </div>
            <div className="text-sm text-muted-foreground">
              {completedCases} av {totalCases} ärenden är klara
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Prioritetsfördelning</CardTitle>
            <CardDescription>
              Ärenden som kräver extra uppmärksamhet
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Brådskande</span>
              <Badge variant="destructive">{urgentCases}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Hög prioritet</span>
              <Badge variant="secondary">{highPriorityCases}</Badge>
            </div>
            <div className="text-sm text-muted-foreground">
              {urgentCases + highPriorityCases} ärenden kräver prioritering
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent activity */}
      <Card>
        <CardHeader>
          <CardTitle>Senaste aktivitet</CardTitle>
          <CardDescription>
            Ärenden som uppdaterats under senaste veckan
          </CardDescription>
        </CardHeader>
        <CardContent>
          {recentActivity.length > 0 ? (
            <div className="space-y-4">
              {recentActivity.slice(0, 5).map(case_ => (
                <div key={case_.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium">{case_.address}</p>
                    <p className="text-sm text-muted-foreground">
                      {case_.outgoingTenant.name} → {case_.incomingTenant?.name || "Ingen ny hyresgäst vald"}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="mb-1">
                      {case_.steps.find(step => step.step === case_.currentStep)?.status === TurnoverStatus.COMPLETED ? "Klar" :
                       case_.steps.find(step => step.step === case_.currentStep)?.status === TurnoverStatus.IN_PROGRESS ? "Pågår" :
                       case_.steps.find(step => step.step === case_.currentStep)?.status === TurnoverStatus.BLOCKED ? "Blockerad" : "Väntar"}
                    </Badge>
                    <p className="text-xs text-muted-foreground">
                      {new Date(case_.updatedAt).toLocaleDateString('sv-SE')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              Ingen aktivitet under senaste veckan
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}