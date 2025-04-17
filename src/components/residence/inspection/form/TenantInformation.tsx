
import { Button } from "@/components/ui/button";
import { Phone, Mail, MessageSquare, User, Calendar, Users } from "lucide-react";
import { Link } from "react-router-dom";

interface TenantInformationProps {
  tenant: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    contractStatus: "permanent" | "terminated";
    moveInDate: string;
    moveOutDate?: string;
    contractNumber: string;
    personalNumber: string;
  };
}

export function TenantInformation({ tenant }: TenantInformationProps) {
  const handleCall = () => {
    window.location.href = `tel:${tenant.phone.replace(/[\s-]/g, '')}`;
  };

  const handleSMS = () => {
    window.location.href = `sms:${tenant.phone.replace(/[\s-]/g, '')}`;
  };

  const handleEmail = () => {
    window.location.href = `mailto:${tenant.email}`;
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-row items-center justify-between space-y-0 flex-wrap gap-4 pb-2">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Users className="h-5 w-5 text-muted-foreground" />
          Hyresgästinformation
        </h3>
        <Button variant="outline" asChild className="shrink-0">
          <Link to={`/tenants/detail/${tenant.personalNumber}`}>
            <User className="h-4 w-4 mr-2" />
            Öppna kundkort
          </Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Namn</p>
            <p className="font-medium">{tenant.firstName} {tenant.lastName}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Kontraktstatus</p>
            <p className="font-medium">
              {tenant.contractStatus === "permanent" ? "Tillsvidare" : "Uppsagt"}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Inflyttningsdatum</p>
            <div className="flex items-center gap-2">
              <p className="font-medium">{new Date(tenant.moveInDate).toLocaleDateString('sv-SE')}</p>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
          {tenant.moveOutDate && (
            <div>
              <p className="text-sm text-muted-foreground">Utflyttningsdatum</p>
              <div className="flex items-center gap-2">
                <p className="font-medium">{new Date(tenant.moveOutDate).toLocaleDateString('sv-SE')}</p>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          )}
        </div>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Telefon</p>
            <div className="flex items-center gap-2">
              <p className="font-medium">{tenant.phone}</p>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" onClick={handleCall} title="Ring">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={handleSMS} title="Skicka SMS">
                  <MessageSquare className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">E-post</p>
            <div className="flex items-center gap-2">
              <p className="font-medium">{tenant.email}</p>
              <Button variant="outline" size="icon" onClick={handleEmail} title="Skicka e-post">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
