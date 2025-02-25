
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MessageSquare, User, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

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
  const [issueDescription, setIssueDescription] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleCall = () => {
    window.location.href = `tel:${tenant.phone.replace(/[\s-]/g, '')}`;
  };

  const handleSMS = () => {
    window.location.href = `sms:${tenant.phone.replace(/[\s-]/g, '')}`;
  };

  const handleEmail = () => {
    window.location.href = `mailto:${tenant.email}`;
  };

  const handleCreateIssue = (e: React.FormEvent) => {
    e.preventDefault();
    // Här kan vi senare integrera med ett backend-system
    console.log("Creating issue:", {
      tenant,
      description: issueDescription,
      timestamp: new Date().toISOString(),
    });

    toast({
      title: "Ärende skapat",
      description: "Ärendet har registrerats och kommer att hanteras inom kort.",
    });

    setIssueDescription("");
    setIsDialogOpen(false);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-4">
          <CardTitle>Hyresgästinformation</CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <AlertCircle className="mr-2 h-4 w-4" />
                Skapa ärende
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Skapa nytt ärende</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreateIssue} className="space-y-4">
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="tenant">Hyresgäst</Label>
                    <Input
                      id="tenant"
                      value={`${tenant.firstName} ${tenant.lastName}`}
                      disabled
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Beskrivning av ärendet</Label>
                    <Input
                      id="description"
                      placeholder="Beskriv felet eller ärendet..."
                      value={issueDescription}
                      onChange={(e) => setIssueDescription(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Avbryt
                  </Button>
                  <Button type="submit">Skapa ärende</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        <Button variant="outline" asChild>
          <Link to={`/tenants/${tenant.personalNumber}`}>
            <User className="mr-2" />
            Öppna kundkort
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Namn</p>
              <p className="font-medium">{tenant.firstName} {tenant.lastName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Personnummer</p>
              <p className="font-medium">{tenant.personalNumber}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Kontraktsnummer</p>
              <p className="font-medium">{tenant.contractNumber}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Kontraktsstatus</p>
              <p className="font-medium">
                {tenant.contractStatus === "permanent" ? "Tillsvidare" : "Uppsagt"}
              </p>
            </div>
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
            <div>
              <p className="text-sm text-muted-foreground">Inflyttningsdatum</p>
              <p className="font-medium">{new Date(tenant.moveInDate).toLocaleDateString('sv-SE')}</p>
            </div>
            {tenant.moveOutDate && (
              <div>
                <p className="text-sm text-muted-foreground">Utflyttningsdatum</p>
                <p className="font-medium">{new Date(tenant.moveOutDate).toLocaleDateString('sv-SE')}</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
