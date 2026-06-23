import { Badge } from "@/components/ui/badge";
import type { PoangfriInterest } from "@/features/rentals/types/poangfri";

type HousingRefStatus = NonNullable<PoangfriInterest["housingReference"]>["status"];
type CreditStatus = NonNullable<PoangfriInterest["creditReport"]>["status"];
type PaymentStatus = NonNullable<PoangfriInterest["paymentHistory"]>["status"];

export function HousingReferenceBadge({ status }: { status: HousingRefStatus }) {
  switch (status) {
    case "Godkänd":
      return <Badge variant="success">Godkänd</Badge>;
    case "Ej godkänd":
      return <Badge variant="destructive">Ej godkänd</Badge>;
    case "Kontaktad - ej svar":
      return <Badge variant="warning">Kontaktad - ej svar</Badge>;
    case "Referens krävs ej":
      return <Badge variant="success">Referens krävs ej</Badge>;
    case "Ej behandlad":
      return <Badge variant="muted">Ej behandlad</Badge>;
  }
}

export function CreditReportBadge({ status }: { status: CreditStatus }) {
  switch (status) {
    case "Godkänd/låg risk":
      return <Badge variant="success">Inga anm.</Badge>;
    case "Förhöjd risk":
      return <Badge variant="warning">Anmärkningar</Badge>;
    case "Hög risk":
      return <Badge variant="destructive">Hög risk</Badge>;
    case "Ingen uppgift tillgänglig":
      return <Badge variant="muted">Ingen uppgift</Badge>;
  }
}

export function PaymentHistoryBadge({ status }: { status: PaymentStatus }) {
  switch (status) {
    case "Inga anmärkningar":
      return <Badge variant="success">Inga anm.</Badge>;
    case "Behöver kontrolleras":
      return <Badge variant="warning">Behöver kontroll</Badge>;
  }
}
