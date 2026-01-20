import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Paperclip, X, FileText } from "lucide-react";
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
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const combinedLength = objectNumber.length + (fakturanAvserFritext ? 3 + fakturanAvserFritext.length : 0);
  const maxFritextLength = 255 - objectNumber.length - 3;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setAttachedFiles((prev) => [...prev, ...newFiles]);
    }
    e.target.value = "";
  };

  const removeFile = (index: number) => {
    setAttachedFiles((prev) => prev.filter((_, i) => i !== index));
  };

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

      <div className="space-y-2">
        <Label>Bifogade filer</Label>
        <div className="space-y-2">
          {attachedFiles.length > 0 && (
            <ul className="space-y-1">
              {attachedFiles.map((file, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between gap-2 rounded-md border border-input bg-muted/50 px-3 py-2 text-sm"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <FileText className="h-4 w-4 shrink-0 text-muted-foreground" />
                    <span className="truncate">{file.name}</span>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 shrink-0"
                    onClick={() => removeFile(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </li>
              ))}
            </ul>
          )}
          <div>
            <input
              type="file"
              id="file-upload"
              className="sr-only"
              onChange={handleFileChange}
              multiple
            />
            <label htmlFor="file-upload">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="cursor-pointer"
                asChild
              >
                <span>
                  <Paperclip className="h-4 w-4 mr-2" />
                  Bifoga fil
                </span>
              </Button>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
