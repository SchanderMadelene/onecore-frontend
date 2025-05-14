
import { Users, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { TenantPersonalInfo } from "./TenantPersonalInfo";
import { TenantContactActions } from "./TenantContactActions";
import { toast } from "@/components/ui/use-toast";

interface TenantCardProps {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  moveInDate: string;
  moveOutDate?: string;
  personalNumber: string;
  isSecondaryTenant?: boolean;
  relationshipType?: "sambo" | "primaryTenant" | "secondaryTenant";
  isPrimaryContractHolder?: boolean;
}

export function TenantCard({
  firstName,
  lastName,
  phone,
  email,
  moveInDate,
  moveOutDate,
  personalNumber,
  isSecondaryTenant = false,
  relationshipType,
  isPrimaryContractHolder = false
}: TenantCardProps) {
  const isSecondary = isSecondaryTenant || relationshipType === "secondaryTenant";
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Users className="h-5 w-5 mr-2 text-slate-500" />
          <h4 className="font-medium">
            {isSecondary ? "Andrahandsuthyrning" : isPrimaryContractHolder ? "Kontraktsinnehavare" : "Hyresgäst"}
          </h4>
        </div>
        {!isSecondary && (
          <Button variant="outline" asChild className="shrink-0">
            <Link to={`/tenants/detail/${personalNumber}`}>
              <User className="h-4 w-4 mr-2" />
              Öppna kundkort
            </Link>
          </Button>
        )}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <TenantPersonalInfo
          firstName={firstName}
          lastName={lastName}
          moveInDate={moveInDate}
          moveOutDate={moveOutDate}
          personalNumber={personalNumber}
          isSecondaryTenant={isSecondary}
        />
        <TenantContactActions
          phone={phone}
          email={email}
        />
      </div>
    </div>
  );
}
