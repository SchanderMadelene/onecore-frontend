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
    <div className="border-b border-border last:border-0 py-2.5">
      {/* Header with indicators */}
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm font-medium">{label}</h4>
        <div className="flex items-center gap-1">
          {photoCount > 0 && (
            <button
              onClick={onOpenDetail}
              className="flex items-center gap-0.5 text-xs text-muted-foreground hover:text-foreground transition-colors px-1.5 py-0.5 rounded"
            >
              <Camera className="h-3 w-3" />
              <span>{photoCount}</span>
            </button>
          )}
          {actions.length > 0 && (
            <button
              onClick={onOpenDetail}
              className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded"
            >
              <Wrench className="h-3 w-3" />
            </button>
          )}
          {hasLongNote && (
            <button
              onClick={onOpenDetail}
              className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded"
            >
              <MessageSquare className="h-3 w-3" />
            </button>
          )}
          <button
            onClick={onOpenDetail}
            className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded"
          >
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Condition buttons */}
      <div className="grid grid-cols-3 gap-1.5 mb-2">
        {CONDITION_OPTIONS.map((option) => (
          <Button
            key={option.value}
            type="button"
            variant={condition === option.value ? "default" : "outline"}
            size="sm"
            className={`h-7 text-xs px-2 ${condition === option.value ? option.className : ""}`}
            onClick={() => onConditionChange(option.value)}
          >
            <span className="text-sm">{option.icon}</span>
            <span className="ml-1.5">{option.label}</span>
          </Button>
        ))}
      </div>

      {/* Note field and photo button */}
      <div className="flex gap-1.5 items-start">
        <Textarea
          value={note}
          onChange={(e) => onNoteChange(e.target.value)}
          onFocus={() => setIsNoteFocused(true)}
          onBlur={() => setIsNoteFocused(false)}
          placeholder="Anteckning..."
          className={`flex-1 text-sm resize-none transition-all py-1.5 ${
            isNoteFocused ? 'min-h-[60px]' : 'min-h-[32px] h-[32px]'
          }`}
        />
        <PhotoCapture
          onPhotoCapture={onPhotoCapture}
          photoCount={0}
        />
      </div>
    </div>
  );
}
