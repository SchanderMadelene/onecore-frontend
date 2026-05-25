import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export const CHECKLIST_ITEMS = [
  { key: "groundFaultBreaker", label: "Jordfelsbrytare" },
  { key: "smokeDetector", label: "Brandvarnare" },
  { key: "electricalSchema", label: "Elschema" },
  { key: "electricalSystem", label: "Elsystem (Ockulär)" },
] as const;

export type ChecklistKey = typeof CHECKLIST_ITEMS[number]["key"];

interface InspectionChecklistStepProps {
  isFurnished: boolean;
  setIsFurnished: (v: boolean) => void;
  tenantPresent?: boolean | null;
  setTenantPresent?: (v: boolean) => void;
  checklist: Record<string, boolean>;
  setChecklistItem: (key: string, value: boolean) => void;
  idSuffix?: string;
}

export function InspectionChecklistStep({
  isFurnished,
  setIsFurnished,
  checklist,
  setChecklistItem,
  idSuffix = "",
}: InspectionChecklistStepProps) {
  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-4">
          <p className="text-sm font-medium mb-2">Är bostaden möblerad vid besiktningstillfället?</p>
          <RadioGroup
            value={isFurnished ? "yes" : "no"}
            onValueChange={(v) => setIsFurnished(v === "yes")}
            className="flex gap-4"
          >
            <div className="flex items-center gap-2">
              <RadioGroupItem value="no" id={`furnished-no-${idSuffix}`} />
              <Label htmlFor={`furnished-no-${idSuffix}`} className="text-sm">Nej</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="yes" id={`furnished-yes-${idSuffix}`} />
              <Label htmlFor={`furnished-yes-${idSuffix}`} className="text-sm">Ja</Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 space-y-3">
          <p className="text-sm font-medium">Har du kontrollerat?</p>
          <div className="space-y-3">
            {CHECKLIST_ITEMS.map(item => {
              const id = `check-${item.key}-${idSuffix}`;
              return (
                <div key={item.key} className="flex items-center gap-3">
                  <Checkbox
                    id={id}
                    checked={!!checklist[item.key]}
                    onCheckedChange={(v) => setChecklistItem(item.key, v === true)}
                  />
                  <Label htmlFor={id} className="text-sm font-normal cursor-pointer">
                    {item.label}
                  </Label>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
