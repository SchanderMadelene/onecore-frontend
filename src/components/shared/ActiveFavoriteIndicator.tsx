import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, AlertCircle, X, Save } from "lucide-react";
import { useFavorites } from "@/hooks/useFavorites";
import { UpdateFavoriteDialog } from "./UpdateFavoriteDialog";
import { useLocation } from "react-router-dom";

export function ActiveFavoriteIndicator() {
  const { activeFavorite, getCurrentUrlStatus, clearActiveFavorite } = useFavorites();
  const [urlStatus, setUrlStatus] = useState<"exact_match" | "modified" | "no_match">("no_match");
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (activeFavorite) {
      const status = getCurrentUrlStatus();
      setUrlStatus(status);
    }
  }, [activeFavorite, getCurrentUrlStatus, location]);

  if (!activeFavorite || urlStatus === "no_match") {
    return null;
  }

  const isModified = urlStatus === "modified";

  return (
    <>
      <div className={`mb-4 p-3 rounded-lg border-2 flex items-center justify-between gap-3 ${
        isModified 
          ? 'bg-warning/5 border-warning/30' 
          : 'bg-success/5 border-success/40 shadow-[0_0_12px_rgba(34,197,94,0.15)]'
      }`}>
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <Star className={`h-4 w-4 ${isModified ? 'text-primary fill-primary' : 'text-success fill-success'}`} />
            {isModified && (
              <AlertCircle className="h-4 w-4 text-warning" />
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-medium text-sm">Aktiv favorit:</span>
              <span className="text-sm truncate">{activeFavorite.name}</span>
              {isModified ? (
                <Badge variant="outline" className="bg-warning/15 text-warning border-warning/30 font-medium">
                  Modifierad
                </Badge>
              ) : (
                <Badge variant="outline" className="bg-success/15 text-success border-success/40 font-medium">
                  Aktiv
                </Badge>
              )}
            </div>
            {isModified && (
              <p className="text-xs text-muted-foreground mt-1">
                Du har ändrat filter eller parametrar från den sparade favoriten
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isModified && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowUpdateDialog(true)}
            >
              <Save className="h-3 w-3 mr-1" />
              Uppdatera
            </Button>
          )}
          <Button
            size="sm"
            variant="ghost"
            onClick={clearActiveFavorite}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      </div>

      <UpdateFavoriteDialog
        favorite={activeFavorite}
        isOpen={showUpdateDialog}
        onClose={() => setShowUpdateDialog(false)}
      />
    </>
  );
}
