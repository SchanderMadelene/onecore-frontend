
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { PageLayout } from "@/layouts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DoorOpen, Home, ChevronRight, Building } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { treeData } from "@/widgets/navigation/treeview/treeData";

const EntranceDetailPage = () => {
  const { property, building, id: entrance } = useParams();
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Find property, building, and entrance from tree data
  const propertiesNode = treeData.find(n => n.id === "properties");
  const propertyNode = propertiesNode?.children?.find(p => p.id === property);
  const buildingNode = propertyNode?.children?.find(b => b.id === building);
  const entranceNode = buildingNode?.children?.find(e => e.id === entrance);

  const units = entranceNode?.children ?? [];

  return (
    <PageLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
      <div className={isMobile ? "p-4 space-y-4" : "p-6 space-y-6"}>

        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <DoorOpen className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className={`font-bold ${isMobile ? "text-xl" : "text-2xl"}`}>
              {entranceNode?.label ?? entrance}
            </h1>
            <p className="text-sm text-muted-foreground">
              {buildingNode?.label} · {propertyNode?.label}
            </p>
          </div>
        </div>

        {/* Units list */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Home className="h-4 w-4" />
              Lägenheter ({units.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {units.length > 0 ? (
              <div className="space-y-2">
                {units.map(unit => (
                  <Link
                    key={unit.id}
                    to={unit.path ?? "#"}
                    className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    <Home className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium text-sm">{unit.label}</span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground ml-auto" />
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">
                Inga lägenheter hittades i denna uppgång.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default EntranceDetailPage;
