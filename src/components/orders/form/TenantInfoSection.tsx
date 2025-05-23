
import { TenantInformationCard } from "@/components/tenants/TenantInformationCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

type TenantInfoSectionProps = {
  tenant: any;
};

export function TenantInfoSection({ tenant }: TenantInfoSectionProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Format contract status in Swedish
  const getContractStatus = (status: string) => {
    switch (status) {
      case "permanent": return "Tillsvidare";
      case "temporary": return "Tidsbegränsat";
      case "terminated": return "Uppsagt";
      default: return status;
    }
  };

  // Get status badge variant
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "permanent": 
        return "outline";
      case "temporary": 
        return "outline";
      case "terminated": 
        return "destructive";
      default: 
        return "outline";
    }
  };

  return (
    <Card className="border-slate-200">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <h3 className="font-medium text-lg">Hyresgästinformation</h3>
            <Badge 
              variant={getStatusBadgeVariant(tenant.contractStatus)}
              className={`${
                tenant.contractStatus === "permanent" 
                  ? "bg-green-50 text-green-700 hover:bg-green-50 border-green-200" 
                  : tenant.contractStatus === "temporary"
                  ? "bg-blue-50 text-blue-700 hover:bg-blue-50 border-blue-200"
                  : "bg-red-50 text-red-700 hover:bg-red-50 border-red-200"
              }`}
            >
              {getContractStatus(tenant.contractStatus)}
            </Badge>
          </div>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
              <span className="sr-only">Visa hyresgästinformation</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        
        <CollapsibleContent>
          <CardContent className="p-0">
            <TenantInformationCard tenant={tenant} />
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
