
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreateCaseDialog } from "@/components/cases/CreateCaseDialog";
import { CaseCard } from "@/components/cases/CaseCard";
import { CasesTable } from "@/components/cases/CasesTable";
import { useCasesService } from "@/hooks/useCasesService";
import { useState } from "react";

export function TenantCases() {
  const { activeCases, historicalCases } = useCasesService();
  const [refreshKey, setRefreshKey] = useState(0);

  const handleCaseCreated = () => {
    // Force a re-render to show the new case
    setRefreshKey(prev => prev + 1);
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle>Ärenden</CardTitle>
        <CreateCaseDialog 
          buttonSize="sm" 
          contextType="tenant"
          onCaseCreated={handleCaseCreated}
        />
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="active" className="w-full" key={refreshKey}>
          <TabsList className="mb-4">
            <TabsTrigger value="active">Aktiva ärenden</TabsTrigger>
            <TabsTrigger value="history">Ärendehistorik</TabsTrigger>
          </TabsList>
          
          <TabsContent value="active">
            {activeCases.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
                {activeCases.map((caseItem) => (
                  <CaseCard key={caseItem.id} caseItem={caseItem} />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">Inga aktiva ärenden för denna hyresgäst.</p>
            )}
          </TabsContent>
          
          <TabsContent value="history">
            {historicalCases.length > 0 ? (
              <CasesTable cases={historicalCases} />
            ) : (
              <p className="text-muted-foreground">Ingen ärendehistorik för denna hyresgäst.</p>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
