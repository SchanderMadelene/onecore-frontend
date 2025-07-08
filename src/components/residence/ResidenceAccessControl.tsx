import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TabLayout } from "@/components/ui/tab-layout";
import { LockKeyhole, Key, Users, Clock } from "lucide-react";

export const ResidenceAccessControl = () => {
  return (
    <TabLayout 
      title="Lås och passage" 
      icon={LockKeyhole}
      showCard={false}
    >
      <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LockKeyhole className="h-5 w-5" />
              Låssystem
            </CardTitle>
            <CardDescription>
              Information om låssystem och passagesystem för lägenheten
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Låstyp:</span>
              <Badge variant="secondary">Elektronisk</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Låsgrupp:</span>
              <span className="text-sm text-muted-foreground">A-001</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Programmerbar:</span>
              <Badge variant="outline">Ja</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Senast uppdaterad:</span>
              <span className="text-sm text-muted-foreground">2024-01-15</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              Nyckelhantering
            </CardTitle>
            <CardDescription>
              Aktiva nycklar och behörigheter
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Fysiska nycklar:</span>
              <span className="text-sm text-muted-foreground">2 st</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Elektroniska taggar:</span>
              <span className="text-sm text-muted-foreground">3 st</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Mobilnycklar:</span>
              <span className="text-sm text-muted-foreground">1 st</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Status:</span>
              <Badge variant="default">Aktiv</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Behörigheter
          </CardTitle>
          <CardDescription>
            Personer med tillgång till lägenheten
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Anna Andersson</p>
                <p className="text-sm text-muted-foreground">Huvudhyresgäst</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="default">Fullständig åtkomst</Badge>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Erik Andersson</p>
                <p className="text-sm text-muted-foreground">Sambo</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">Begränsad åtkomst</Badge>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Händelselogg</CardTitle>
          <CardDescription>
            Senaste aktiviteter för lås och passage
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-muted-foreground">2024-01-15 14:23</span>
              <span>Nyckel aktiverad - Anna Andersson</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-muted-foreground">2024-01-14 09:15</span>
              <span>Mobilnyckel skapad - Erik Andersson</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span className="text-muted-foreground">2024-01-12 16:45</span>
              <span>Låsgrupp uppdaterad</span>
            </div>
          </div>
        </CardContent>
        </Card>
      </div>
    </TabLayout>
  );
};