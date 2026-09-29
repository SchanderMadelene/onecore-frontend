import { CollapsibleInfoCard } from "@/shared/ui/collapsible-info-card";
import type { HousingListing } from "@/features/rentals/hooks/useHousingListing";

interface HousingViewingInfoProps {
  viewing: NonNullable<HousingListing["viewing"]>;
}

const formatDate = (iso: string) => {
  const d = new Date(iso);
  const date = d.toLocaleDateString("sv-SE", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
  const time = d.toLocaleTimeString("sv-SE", { hour: "2-digit", minute: "2-digit" });
  return `${date.charAt(0).toUpperCase()}${date.slice(1)} kl. ${time}`;
};

const HOST_TYPE_LABELS: Record<HousingListing["viewing"] extends { hostType: infer T } ? T : never, string> = {
  tenant: "Hyresgäst",
  mimer: "Mimer",
};

export function HousingViewingInfo({ viewing }: HousingViewingInfoProps) {
  const hostLabel = HOST_TYPE_LABELS[viewing.hostType];
  return (
    <CollapsibleInfoCard
      title="Visning"
      collapsibleOnDesktop
      previewContent={
        <p className="text-sm text-muted-foreground">
          {formatDate(viewing.scheduledAt)} · {hostLabel}
        </p>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Datum och tid</p>
          <p className="font-medium">{formatDate(viewing.scheduledAt)}</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Plats</p>
          <p className="font-medium">{viewing.location}</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Visas av</p>
          <p className="font-medium">{hostLabel}</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Kontaktuppgifter</p>
          <p className="font-medium">{viewing.phone}</p>
          <p className="text-sm">{viewing.email}</p>
        </div>
      </div>
    </CollapsibleInfoCard>
  );
}
