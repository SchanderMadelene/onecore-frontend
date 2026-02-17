
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, AlertCircle, X, Save } from "lucide-react";
import { useFavorites } from "@/features/favorites";
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
      <div className={`mb-4 p-4 rounded-lg border-l-4 bg-card/50 backdrop-blur-sm flex items-center justify-between gap-3 ${
        isModified 
          ? 'border-l-warning bg-warning/5 border border-warning/20' 
          : 'border-l-primary bg-primary/5 border border-primary/20'
      }`}>
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <Star className={`h-5 w-5 ${isModified ? 'text-warning fill-warning' : 'text-primary fill-primary'}`} />
            {isModified && (
              <AlertCircle className="h-4 w-4 text-warning" />
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-sm">Aktiv favorit:</span>
              <span className="text-sm font-medium truncate">{activeFavorite.name}</span>
              {isModified ? (
                <Badge variant="outline" className="bg-warning/10 text-warning border-warning/30">
                  Modifierad
                </Badge>
              ) : (
                <Badge variant="success">
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
