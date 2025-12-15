import { useState, useRef } from "react";
import { Camera, Upload, Loader2, Sparkles, RotateCcw, Check, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface AIAnalysisResult {
  summary: string;
  fabrikat?: { value: string; confidence: "high" | "medium" | "low" };
  modell?: { value: string; confidence: "high" | "medium" | "low" };
  serienummer?: { value: string; confidence: "high" | "medium" | "low" };
  tillverkningsar?: { value: string; confidence: "high" | "medium" | "low" };
  tekniska_specifikationer?: { value: string; confidence: "high" | "medium" | "low" };
  produkttyp?: { value: string; confidence: "high" | "medium" | "low" };
  skick?: { value: string; confidence: "high" | "medium" | "low" };
  material_eller_farg?: { value: string; confidence: "high" | "medium" | "low" };
}

interface PhotoAnalyzeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  componentName: string;
  onAnalysisComplete: (result: AIAnalysisResult, imageDataUrl: string) => void;
}

// Mock AI analysis function - simulates backend call
const mockAnalyzeImage = async (): Promise<AIAnalysisResult> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 2000));
  
  // Randomly return either typeplate data or general component data
  const hasTypeplate = Math.random() > 0.3;
  
  if (hasTypeplate) {
    return {
      summary: "Typskylt från Electrolux diskmaskin identifierad",
      fabrikat: { value: "Electrolux", confidence: "high" },
      modell: { value: "ESF5555LOX", confidence: "high" },
      serienummer: { value: "91234567890", confidence: "medium" },
      tillverkningsar: { value: "2019", confidence: "high" },
      tekniska_specifikationer: { value: "220V, 2100W, Energiklass A++", confidence: "medium" },
    };
  } else if (Math.random() > 0.5) {
    return {
      summary: "Komponent identifierad utan typskylt",
      produkttyp: { value: "Diskmaskin", confidence: "medium" },
      fabrikat: { value: "Okänt märke", confidence: "low" },
      skick: { value: "Gott skick", confidence: "medium" },
      material_eller_farg: { value: "Rostfritt stål", confidence: "high" },
    };
  } else {
    return {
      summary: "Kunde inte identifiera produktinformation i bilden",
    };
  }
};

const getConfidenceColor = (confidence: "high" | "medium" | "low") => {
  switch (confidence) {
    case "high":
      return "text-green-500";
    case "medium":
      return "text-yellow-500";
    case "low":
      return "text-orange-500";
  }
};

const getConfidenceLabel = (confidence: "high" | "medium" | "low") => {
  switch (confidence) {
    case "high":
      return "";
    case "medium":
      return "(osäkert)";
    case "low":
      return "(mycket osäkert)";
  }
};

export const PhotoAnalyzeModal = ({
  open,
  onOpenChange,
  componentName,
  onAnalysisComplete,
}: PhotoAnalyzeModalProps) => {
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AIAnalysisResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        // Compress image to max 1200px width for AI analysis
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const maxWidth = 1200;
        const scale = Math.min(1, maxWidth / img.width);
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.8);
        setImageDataUrl(compressedDataUrl);
        setAnalysisResult(null);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);

    if (event.target) event.target.value = "";
  };

  const handleAnalyze = async () => {
    if (!imageDataUrl) return;
    
    setIsAnalyzing(true);
    try {
      const result = await mockAnalyzeImage();
      setAnalysisResult(result);
    } catch (error) {
      console.error("Analysis failed:", error);
      setAnalysisResult({
        summary: "Ett fel uppstod vid analys. Försök igen.",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setImageDataUrl(null);
    setAnalysisResult(null);
  };

  const handleContinue = () => {
    if (analysisResult && imageDataUrl) {
      onAnalysisComplete(analysisResult, imageDataUrl);
      handleClose();
    }
  };

  const handleClose = () => {
    setImageDataUrl(null);
    setAnalysisResult(null);
    onOpenChange(false);
  };

  const hasUsefulData = analysisResult && (
    analysisResult.fabrikat ||
    analysisResult.modell ||
    analysisResult.serienummer ||
    analysisResult.tillverkningsar ||
    analysisResult.tekniska_specifikationer ||
    analysisResult.produkttyp ||
    analysisResult.skick ||
    analysisResult.material_eller_farg
  );

  const renderAnalysisField = (
    label: string,
    data?: { value: string; confidence: "high" | "medium" | "low" }
  ) => {
    if (!data) return null;
    return (
      <div className="flex items-center justify-between py-2 border-b border-border last:border-0">
        <span className="text-sm text-muted-foreground">{label}</span>
        <div className="flex items-center gap-2">
          <Sparkles className={`h-3 w-3 ${getConfidenceColor(data.confidence)}`} />
          <span className="text-sm font-medium">
            {data.value}{" "}
            <span className="text-muted-foreground text-xs">
              {getConfidenceLabel(data.confidence)}
            </span>
          </span>
        </div>
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5" />
            Fota & analysera
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            {componentName}
          </p>
        </DialogHeader>

        <div className="space-y-4">
          {/* Image upload area */}
          {!imageDataUrl && (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleFileChange}
                className="hidden"
              />
              <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
              <p className="mt-2 text-sm font-medium">
                Klicka för att ta bild eller välj från galleri
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Fota typskylt, etikett eller hela komponenten
              </p>
            </div>
          )}

          {/* Image preview */}
          {imageDataUrl && !analysisResult && (
            <div className="space-y-4">
              <div className="relative rounded-lg overflow-hidden bg-muted">
                <img
                  src={imageDataUrl}
                  alt="Förhandsvisning"
                  className="w-full h-auto max-h-64 object-contain"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={handleReset}
                  className="flex-1"
                  disabled={isAnalyzing}
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Ta ny bild
                </Button>
                <Button
                  onClick={handleAnalyze}
                  className="flex-1"
                  disabled={isAnalyzing}
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyserar...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Analysera bild
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}

          {/* Analysis results */}
          {analysisResult && (
            <div className="space-y-4">
              {/* Image thumbnail */}
              <div className="relative rounded-lg overflow-hidden bg-muted h-32">
                <img
                  src={imageDataUrl!}
                  alt="Analyserad bild"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Summary */}
              <div className="p-3 bg-muted/50 rounded-lg">
                <div className="flex items-start gap-2">
                  <Sparkles className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <p className="text-sm">{analysisResult.summary}</p>
                </div>
              </div>

              {/* Extracted fields */}
              {hasUsefulData ? (
                <div className="space-y-1">
                  {renderAnalysisField("Fabrikat", analysisResult.fabrikat)}
                  {renderAnalysisField("Modell", analysisResult.modell)}
                  {renderAnalysisField("Serienummer", analysisResult.serienummer)}
                  {renderAnalysisField("Tillverkningsår", analysisResult.tillverkningsar)}
                  {renderAnalysisField("Tekniska spec.", analysisResult.tekniska_specifikationer)}
                  {renderAnalysisField("Produkttyp", analysisResult.produkttyp)}
                  {renderAnalysisField("Skick", analysisResult.skick)}
                  {renderAnalysisField("Material/Färg", analysisResult.material_eller_farg)}
                </div>
              ) : (
                <div className="p-4 border border-border rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">
                    Ingen produktinformation kunde identifieras.
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Du kan ändå behålla bilden och fortsätta manuellt.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          {!analysisResult ? (
            <Button variant="outline" onClick={handleClose} className="w-full sm:w-auto">
              Avbryt
            </Button>
          ) : (
            <>
              <Button
                variant="outline"
                onClick={handleReset}
                className="w-full sm:w-auto"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Ny bild
              </Button>
              <Button
                onClick={handleContinue}
                className="w-full sm:w-auto"
              >
                <Check className="mr-2 h-4 w-4" />
                {hasUsefulData ? "Använd & fortsätt" : "Behåll bild & fortsätt"}
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};