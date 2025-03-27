import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CircleAlert, Clock, User, CalendarDays } from "lucide-react";

interface Case {
  id: string;
  title: string;
  reportedDate: string;
  status: "active" | "resolved" | "pending";
  priority: "high" | "medium" | "low";
  description?: string;
  resolvedDate?: string;
  assignedTo?: string;
}

const activeCases: Case[] = [
  {
    id: "C001",
    title: "Vattenläcka i kök",
    reportedDate: "2023-08-15",
    status: "active",
    priority: "high",
    description: "Läckage under diskbänken, vatten samlas på golvet.",
    assignedTo: "Johan Andersson"
  },
  {
    id: "C002",
    title: "Trasigt dörrhandtag",
    reportedDate: "2023-09-02",
    status: "pending",
    priority: "low",
    description: "Badrumsdörrens handtag har lossnat.",
    assignedTo: "Maria Nilsson"
  }
];

const historicalCases: Case[] = [
  {
    id: "C000",
    title: "Stopp i avlopp",
    reportedDate: "2023-05-10",
    status: "resolved",
    priority: "medium",
    description: "Handfatet i badrummet töms långsamt.",
    resolvedDate: "2023-05-12",
    assignedTo: "Erik Svensson"
  },
  {
    id: "C003",
    title: "Byte av kylskåp",
    reportedDate: "2023-04-20",
    status: "resolved",
    priority: "medium",
    description: "Kylskåpet kyler inte tillräckligt.",
    resolvedDate: "2023-04-25",
    assignedTo: "Johan Andersson"
  },
  {
    id: "C004",
    title: "Problem med element",
    reportedDate: "2023-02-05",
    status: "resolved",
    priority: "medium",
    description: "Elementet i vardagsrummet blir inte varmt.",
    resolvedDate: "2023-02-07",
    assignedTo: "Maria Nilsson"
  }
];

const getPriorityBadge = (priority: Case["priority"]) => {
  switch (priority) {
    case "high":
      return <Badge variant="outline">Hög</Badge>;
    case "medium":
      return <Badge variant="outline">Medium</Badge>;
    case "low":
      return <Badge variant="outline">Låg</Badge>;
    default:
      return null;
  }
};

const getStatusBadge = (status: Case["status"]) => {
  switch (status) {
    case "active":
      return <Badge variant="outline">Pågående</Badge>;
    case "pending":
      return <Badge variant="outline">Väntande</Badge>;
    case "resolved":
      return <Badge variant="outline">Åtgärdat</Badge>;
    default:
      return null;
  }
};

export function TenantCases() {
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle>Ärenden</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="active">Aktiva ärenden</TabsTrigger>
            <TabsTrigger value="history">Ärendehistorik</TabsTrigger>
          </TabsList>
          
          <TabsContent value="active">
            {activeCases.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
                {activeCases.map((caseItem) => (
                  <Card 
                    key={caseItem.id}
                    className="overflow-hidden border"
                  >
                    <div className="p-5">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-semibold text-lg">{caseItem.title}</h3>
                        <span className="text-xs bg-slate-100 px-2 py-1 rounded-md">#{caseItem.id}</span>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-4">{caseItem.description}</p>
                      
                      <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-500">
                        <div className="flex items-center gap-1.5">
                          <CalendarDays className="h-4 w-4" />
                          <span>{caseItem.reportedDate}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span>{caseItem.assignedTo}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span>Status: {getStatusBadge(caseItem.status)}</span>
                        </div>
                        <div>
                          <span>Prioritet: {getPriorityBadge(caseItem.priority)}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">Inga aktiva ärenden för denna hyresgäst.</p>
            )}
          </TabsContent>
          
          <TabsContent value="history">
            {historicalCases.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Ärende</TableHead>
                    <TableHead>Rapporterad</TableHead>
                    <TableHead>Åtgärdat</TableHead>
                    <TableHead>Prioritet</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {historicalCases.map((caseItem) => (
                    <TableRow key={caseItem.id}>
                      <TableCell className="font-medium">{caseItem.id}</TableCell>
                      <TableCell>{caseItem.title}</TableCell>
                      <TableCell>{caseItem.reportedDate}</TableCell>
                      <TableCell>{caseItem.resolvedDate}</TableCell>
                      <TableCell>{getPriorityBadge(caseItem.priority)}</TableCell>
                      <TableCell>{getStatusBadge(caseItem.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-muted-foreground">Ingen ärendehistorik för denna hyresgäst.</p>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
