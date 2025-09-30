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
      <div className={`mb-6 p-4 rounded-lg border-2 flex items-center justify-between gap-4 ${
        isModified 
          ? 'bg-warning/5 border-warning shadow-sm' 
          : 'bg-primary/5 border-primary shadow-sm'
      }`}>
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <Star className={`h-5 w-5 ${isModified ? 'text-warning fill-warning' : 'text-primary fill-primary'}`} />
            {isModified && (
              <AlertCircle className="h-5 w-5 text-warning" />
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="font-semibold">Aktiv favorit:</span>
              <span className="font-medium truncate">{activeFavorite.name}</span>
              {isModified ? (
                <Badge variant="outline" className="bg-warning text-warning-foreground border-warning font-medium">
                  Modifierad
                </Badge>
              ) : (
                <Badge variant="outline" className="bg-primary text-primary-foreground border-primary font-medium">
                  Aktiv
                </Badge>
              )}
            </div>
            {isModified && (
              <p className="text-sm text-muted-foreground mt-1.5">
                Du har ändrat filter eller parametrar från den sparade favoriten
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isModified && (
            <Button
              size="default"
              variant="default"
              onClick={() => setShowUpdateDialog(true)}
              className="font-medium"
            >
              <Save className="h-4 w-4 mr-2" />
              Uppdatera
            </Button>
          )}
          <Button
            size="icon"
            variant="ghost"
            onClick={clearActiveFavorite}
            className="hover:bg-destructive/10"
          >
            <X className="h-4 w-4" />
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
