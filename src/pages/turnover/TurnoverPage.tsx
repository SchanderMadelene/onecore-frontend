import { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TurnoverDashboard } from "@/components/turnover/TurnoverDashboard";
import { TurnoverKanban } from "@/components/turnover/TurnoverKanban";
import { TurnoverList } from "@/components/turnover/TurnoverList";
import { useTurnoverCases } from "@/hooks/useTurnoverCases";
import { Search, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { TurnoverHeader } from "./components/TurnoverHeader";

export default function TurnoverPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { cases, loading } = useTurnoverCases();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const isMobile = useIsMobile();

  const hasActiveFilters = searchTerm !== "" || filterStatus !== "all" || filterPriority !== "all";

  const clearFilters = () => {
    setSearchTerm("");
    setFilterStatus("all");
    setFilterPriority("all");
  };

  const filteredCases = cases.filter(case_ => {
    const matchesSearch = case_.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         case_.outgoingTenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         case_.residenceCode.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === "all" || 
                         case_.steps.find(step => step.step === case_.currentStep)?.status === filterStatus;
    
    const matchesPriority = filterPriority === "all" || case_.priority === filterPriority;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  if (loading) {
    return (
      <PageLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
        <div className="flex items-center justify-center h-64">
          <div className="text-muted-foreground">Laddar in- och utflyttärenden...</div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
      <div className="space-y-6">
        <TurnoverHeader />

        <Card>
          <CardContent className="pt-6 space-y-4">
            {/* Sökfält - full bredd */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Sök på adress, hyresgäst eller lägenhetsnummer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filter - egen rad */}
            <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alla status</SelectItem>
                  <SelectItem value="pending">Väntar</SelectItem>
                  <SelectItem value="in_progress">Pågår</SelectItem>
                  <SelectItem value="completed">Klar</SelectItem>
                  <SelectItem value="blocked">Blockerad</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterPriority} onValueChange={setFilterPriority}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Prioritet" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alla prioriteter</SelectItem>
                  <SelectItem value="low">Låg</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="high">Hög</SelectItem>
                  <SelectItem value="urgent">Brådskande</SelectItem>
                </SelectContent>
              </Select>

              {hasActiveFilters && (
                <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-1">
                  <X className="h-4 w-4" />
                  Rensa filter
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Main content */}
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">Översikt</TabsTrigger>
            <TabsTrigger value="kanban">Kanban</TabsTrigger>
            <TabsTrigger value="list">Lista</TabsTrigger>
            <TabsTrigger value="timeline">Tidslinje</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <TurnoverDashboard cases={filteredCases} />
          </TabsContent>

          <TabsContent value="kanban" className="space-y-6">
            <TurnoverKanban cases={filteredCases} />
          </TabsContent>

          <TabsContent value="list" className="space-y-6">
            <TurnoverList cases={filteredCases} />
          </TabsContent>

          <TabsContent value="timeline" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Tidslinje</CardTitle>
                <CardDescription>
                  Tidslinje-vy kommer snart
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  Tidslinje-funktionalitet under utveckling
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
}