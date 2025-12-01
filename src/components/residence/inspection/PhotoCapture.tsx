import { useRef } from "react";
import { Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface PhotoCaptureProps {
  onPhotoCapture: (photoDataUrl: string) => void;
  photoCount: number;
  disabled?: boolean;
}

export function PhotoCapture({ onPhotoCapture, photoCount, disabled }: PhotoCaptureProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        // Compress image to max 800px width
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const maxWidth = 800;
        const scale = Math.min(1, maxWidth / img.width);
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7);
        onPhotoCapture(compressedDataUrl);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);

    // Reset input so same file can be selected again
    if (event.target) event.target.value = '';
  };

  return (
    <div className="relative inline-block">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileChange}
        className="hidden"
        disabled={disabled}
      />
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => fileInputRef.current?.click()}
        disabled={disabled}
        className="relative"
      >
        <Camera className="h-4 w-4 mr-1" />
        {photoCount > 0 && (
          <Badge variant="secondary" className="ml-1 h-5 min-w-5 px-1 text-xs">
            {photoCount}
          </Badge>
        )}
      </Button>
    </div>
  );
}
