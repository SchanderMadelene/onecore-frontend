import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface AdditionalInfoSectionProps {
  projekt: string;
  objectNumber: string;
  fakturanAvserFritext: string;
  internInfo: string;
  onProjektChange: (value: string) => void;
  onFakturanAvserFritextChange: (value: string) => void;
  onInternInfoChange: (value: string) => void;
}

export function AdditionalInfoSection({
  projekt,
  objectNumber,
  fakturanAvserFritext,
  internInfo,
  onProjektChange,
  onFakturanAvserFritextChange,
  onInternInfoChange
}: AdditionalInfoSectionProps) {
  const combinedLength = objectNumber.length + (fakturanAvserFritext ? 3 + fakturanAvserFritext.length : 0);
  const maxFritextLength = 255 - objectNumber.length - 3; // Account for " - " separator

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="projekt">Projekt</Label>
        <Input
          id="projekt"
          value={projekt}
          onChange={(e) => onProjektChange(e.target.value)}
          placeholder="Projektnummer (valfritt)"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="objectNumber">Avser objektsnummer</Label>
        <Input
          id="objectNumber"
          value={objectNumber}
          readOnly
          disabled
          placeholder="Fylls i automatiskt från valt kontrakt"
          className="bg-muted"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="fakturanAvser">Fakturan avser</Label>
        <div className="space-y-1">
          <div className="flex items-center h-10 w-full rounded-md border border-input bg-background ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
            {objectNumber && (
              <span className="text-sm text-muted-foreground whitespace-nowrap pl-3 pr-1 select-none">
                {objectNumber} -
              </span>
            )}
            <input
              id="fakturanAvser"
              value={fakturanAvserFritext}
              onChange={(e) => onFakturanAvserFritextChange(e.target.value)}
              placeholder="Beskrivning av vad fakturan avser..."
              maxLength={maxFritextLength > 0 ? maxFritextLength : 252}
              className="flex-1 h-full px-3 py-2 text-sm bg-transparent placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <p className="text-xs text-muted-foreground text-right">
            {combinedLength}/255 tecken
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="internInfo">Intern info</Label>
        <Textarea
          id="internInfo"
          value={internInfo}
          onChange={(e) => onInternInfoChange(e.target.value)}
          placeholder="Intern information som inte syns på fakturan..."
          maxLength={255}
          rows={2}
        />
        <p className="text-xs text-muted-foreground text-right">
          {internInfo.length}/255 tecken
        </p>
      </div>
    </div>
  );
}
