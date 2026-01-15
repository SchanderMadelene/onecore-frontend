import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface AdditionalInfoSectionProps {
  projekt: string;
  fakturanAvser: string;
  internInfo: string;
  onProjektChange: (value: string) => void;
  onFakturanAvserChange: (value: string) => void;
  onInternInfoChange: (value: string) => void;
}

export function AdditionalInfoSection({
  projekt,
  fakturanAvser,
  internInfo,
  onProjektChange,
  onFakturanAvserChange,
  onInternInfoChange
}: AdditionalInfoSectionProps) {
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
        <Label htmlFor="fakturanAvser">Fakturan avser</Label>
        <Textarea
          id="fakturanAvser"
          value={fakturanAvser}
          onChange={(e) => onFakturanAvserChange(e.target.value)}
          placeholder="Beskrivning av vad fakturan avser..."
          maxLength={255}
          rows={2}
        />
        <p className="text-xs text-muted-foreground text-right">
          {fakturanAvser.length}/255 tecken
        </p>
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
