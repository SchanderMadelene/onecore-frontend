import { useCallback, useRef, useState } from "react";
import { Controller, type Control } from "react-hook-form";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, ImagePlus, Star, Trash2, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import type { EditHousingFormData, MediaItem } from "./types";

const MAX_IMAGES = 10;
const MAX_IMAGE_SIZE_MB = 5;
const ACCEPTED_IMAGE = ["image/jpeg", "image/png", "image/webp"];
const ACCEPTED_VIDEO = ["video/mp4", "video/webm", "video/quicktime"];
const MAX_VIDEO_SIZE_MB = 50;

interface MediaTabProps {
  control: Control<EditHousingFormData>;
}

export function MediaTab({ control }: MediaTabProps) {
  return (
    <Controller
      control={control}
      name="media"
      render={({ field }) => (
        <MediaEditor value={field.value ?? []} onChange={field.onChange} />
      )}
    />
  );
}

interface MediaEditorProps {
  value: MediaItem[];
  onChange: (next: MediaItem[]) => void;
}

function MediaEditor({ value, onChange }: MediaEditorProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const images = value.filter((m) => m.type === "image");
  const video = value.find((m) => m.type === "video");

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const handleFiles = useCallback(
    (files: FileList | File[]) => {
      const arr = Array.from(files);
      const newItems: MediaItem[] = [];
      let imageCount = images.length;
      let hasVideo = !!video;

      for (const file of arr) {
        if (ACCEPTED_IMAGE.includes(file.type)) {
          if (imageCount >= MAX_IMAGES) {
            toast.error(`Max ${MAX_IMAGES} bilder tillåtna`);
            continue;
          }
          if (file.size > MAX_IMAGE_SIZE_MB * 1024 * 1024) {
            toast.error(`${file.name} är större än ${MAX_IMAGE_SIZE_MB} MB`);
            continue;
          }
          newItems.push({
            id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
            type: "image",
            url: URL.createObjectURL(file),
            fileName: file.name,
          });
          imageCount++;
        } else if (ACCEPTED_VIDEO.includes(file.type)) {
          if (hasVideo) {
            toast.error("Endast en video tillåten — ersätt befintlig först");
            continue;
          }
          if (file.size > MAX_VIDEO_SIZE_MB * 1024 * 1024) {
            toast.error(`${file.name} är större än ${MAX_VIDEO_SIZE_MB} MB`);
            continue;
          }
          newItems.push({
            id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
            type: "video",
            url: URL.createObjectURL(file),
            fileName: file.name,
          });
          hasVideo = true;
        } else {
          toast.error(`Ej stödd filtyp: ${file.name}`);
        }
      }

      if (newItems.length) onChange([...value, ...newItems]);
    },
    [images.length, video, value, onChange],
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = images.findIndex((i) => i.id === active.id);
    const newIndex = images.findIndex((i) => i.id === over.id);
    if (oldIndex < 0 || newIndex < 0) return;
    const reordered = arrayMove(images, oldIndex, newIndex);
    onChange([...reordered, ...(video ? [video] : [])]);
  };

  const setPrimary = (id: string) => {
    const idx = images.findIndex((i) => i.id === id);
    if (idx <= 0) return;
    const reordered = [images[idx], ...images.filter((_, i) => i !== idx)];
    onChange([...reordered, ...(video ? [video] : [])]);
  };

  const removeItem = (id: string) => {
    onChange(value.filter((m) => m.id !== id));
  };

  const updateCaption = (id: string, caption: string) => {
    onChange(value.map((m) => (m.id === id ? { ...m, caption } : m)));
  };

  return (
    <div className="space-y-6">
      {/* Dropzone */}
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragOver(false);
          if (e.dataTransfer.files) handleFiles(e.dataTransfer.files);
        }}
        className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
          isDragOver ? "border-primary bg-primary/5" : "border-border bg-muted/30 hover:bg-muted/50"
        }`}
      >
        <ImagePlus className="h-8 w-8 text-muted-foreground" />
        <p className="text-sm font-medium">Dra och släpp filer här eller klicka för att välja</p>
        <p className="text-xs text-muted-foreground">
          Bilder: JPG/PNG/WebP, max {MAX_IMAGE_SIZE_MB} MB · upp till {MAX_IMAGES} st · Video: MP4/WebM, max{" "}
          {MAX_VIDEO_SIZE_MB} MB · 1 st
        </p>
        <input
          ref={inputRef}
          type="file"
          accept={[...ACCEPTED_IMAGE, ...ACCEPTED_VIDEO].join(",")}
          multiple
          className="hidden"
          onChange={(e) => {
            if (e.target.files) handleFiles(e.target.files);
            e.target.value = "";
          }}
        />
      </div>

      {/* Images grid */}
      {images.length > 0 && (
        <div>
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-semibold">Bilder ({images.length})</h3>
            <p className="text-xs text-muted-foreground">Dra för att ändra ordning. Första bilden blir huvudbild.</p>
          </div>

          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={images.map((i) => i.id)} strategy={rectSortingStrategy}>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                {images.map((item, index) => (
                  <SortableImageCard
                    key={item.id}
                    item={item}
                    isPrimary={index === 0}
                    onSetPrimary={() => setPrimary(item.id)}
                    onRemove={() => removeItem(item.id)}
                    onCaptionChange={(c) => updateCaption(item.id, c)}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      )}

      {/* Video */}
      {video && (
        <div>
          <h3 className="mb-3 text-sm font-semibold">Video</h3>
          <div className="flex items-start gap-3 rounded-md border bg-card p-3">
            <div className="flex h-20 w-32 flex-shrink-0 items-center justify-center rounded bg-muted">
              <Video className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="flex-1 space-y-2">
              <p className="text-sm font-medium truncate">{video.fileName ?? "Video"}</p>
              <Input
                placeholder="Beskrivning (valfri)"
                value={video.caption ?? ""}
                onChange={(e) => updateCaption(video.id, e.target.value)}
                className="h-8 text-xs"
              />
            </div>
            <Button variant="outline" size="icon" onClick={() => removeItem(video.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {value.length === 0 && (
        <p className="text-center text-sm text-muted-foreground">Inga filer uppladdade ännu.</p>
      )}
    </div>
  );
}

interface SortableImageCardProps {
  item: MediaItem;
  isPrimary: boolean;
  onSetPrimary: () => void;
  onRemove: () => void;
  onCaptionChange: (caption: string) => void;
}

function SortableImageCard({ item, isPrimary, onSetPrimary, onRemove, onCaptionChange }: SortableImageCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="group relative overflow-hidden rounded-md border bg-card">
      <div className="relative aspect-square">
        <img src={item.url} alt={item.caption ?? item.fileName ?? "Bild"} className="h-full w-full object-cover" />

        {/* Drag handle */}
        <button
          type="button"
          {...attributes}
          {...listeners}
          className="absolute left-1 top-1 flex h-7 w-7 cursor-grab items-center justify-center rounded bg-background/80 text-foreground opacity-0 backdrop-blur transition-opacity group-hover:opacity-100 active:cursor-grabbing"
          aria-label="Dra för att ändra ordning"
        >
          <GripVertical className="h-4 w-4" />
        </button>

        {/* Primary badge / set primary */}
        {isPrimary ? (
          <div className="absolute right-1 top-1 flex items-center gap-1 rounded bg-primary px-2 py-1 text-[10px] font-semibold text-primary-foreground">
            <Star className="h-3 w-3 fill-current" />
            Huvudbild
          </div>
        ) : (
          <button
            type="button"
            onClick={onSetPrimary}
            className="absolute right-1 top-1 flex items-center gap-1 rounded bg-background/80 px-2 py-1 text-[10px] font-medium text-foreground opacity-0 backdrop-blur transition-opacity hover:bg-background group-hover:opacity-100"
          >
            <Star className="h-3 w-3" />
            Sätt som huvud
          </button>
        )}

        {/* Delete */}
        <button
          type="button"
          onClick={onRemove}
          className="absolute bottom-1 right-1 flex h-7 w-7 items-center justify-center rounded bg-background/80 text-destructive opacity-0 backdrop-blur transition-opacity hover:bg-background group-hover:opacity-100"
          aria-label="Ta bort"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      <Input
        placeholder="Bildtext (valfri)"
        value={item.caption ?? ""}
        onChange={(e) => onCaptionChange(e.target.value)}
        className="h-8 rounded-none border-0 border-t text-xs focus-visible:ring-0"
      />
    </div>
  );
}
