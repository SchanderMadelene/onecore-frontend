import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Camera, Wrench, MessageSquare } from "lucide-react";
import { PhotoCapture } from "./PhotoCapture";

interface ComponentInspectionCardProps {
  componentKey: string;
  label: string;
  condition: string;
  note: string;
  photoCount: number;
  actions: string[];
  onConditionChange: (value: string) => void;
  onNoteChange: (value: string) => void;
  onPhotoCapture: (photoDataUrl: string) => void;
  onOpenDetail: () => void;
}

const CONDITION_OPTIONS = [
  { 
    value: "God", 
    label: "God",
    icon: "✓",
    className: "bg-green-500 hover:bg-green-600 text-white border-green-600"
  },
  { 
    value: "Acceptabel", 
    label: "Acceptabel",
    icon: "!",
    className: "bg-yellow-500 hover:bg-yellow-600 text-white border-yellow-600"
  },
  { 
    value: "Skadad", 
    label: "Skadad",
    icon: "✗",
    className: "bg-destructive hover:bg-destructive/90 text-destructive-foreground border-destructive"
  }
];

export function ComponentInspectionCard({
  label,
  condition,
  note,
  photoCount,
  actions,
  onConditionChange,
  onNoteChange,
  onPhotoCapture,
  onOpenDetail
}: ComponentInspectionCardProps) {
  const [isNoteFocused, setIsNoteFocused] = useState(false);
  const hasLongNote = note.length > 50;

  return (
    <Card className="p-3 space-y-3">
      {/* Header with indicators */}
      <div className="flex items-center justify-between">
        <h4 className="font-medium">{label}</h4>
        <div className="flex items-center gap-2">
          {photoCount > 0 && (
            <button
              onClick={onOpenDetail}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <Camera className="h-3 w-3" />
              <span>{photoCount}</span>
            </button>
          )}
          {actions.length > 0 && (
            <button
              onClick={onOpenDetail}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Wrench className="h-3 w-3" />
            </button>
          )}
          {hasLongNote && (
            <button
              onClick={onOpenDetail}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <MessageSquare className="h-3 w-3" />
            </button>
          )}
          <button
            onClick={onOpenDetail}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Condition buttons */}
      <div className="grid grid-cols-3 gap-2">
        {CONDITION_OPTIONS.map((option) => (
          <Button
            key={option.value}
            type="button"
            variant={condition === option.value ? "default" : "outline"}
            size="sm"
            className={condition === option.value ? option.className : ""}
            onClick={() => onConditionChange(option.value)}
          >
            <span className="mr-1">{option.icon}</span>
            {option.label}
          </Button>
        ))}
      </div>

      {/* Note field and photo button */}
      <div className="flex gap-2">
        <Textarea
          value={note}
          onChange={(e) => onNoteChange(e.target.value)}
          onFocus={() => setIsNoteFocused(true)}
          onBlur={() => setIsNoteFocused(false)}
          placeholder="Anteckning..."
          className={`flex-1 min-h-[38px] resize-none transition-all ${
            isNoteFocused ? 'h-[76px]' : 'h-[38px]'
          }`}
          rows={isNoteFocused ? 3 : 1}
        />
        <PhotoCapture
          onPhotoCapture={onPhotoCapture}
          photoCount={0}
        />
      </div>
    </Card>
  );
}
