import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlusCircle, Loader2 } from "lucide-react";
import { useStorageSpaceListings, type StorageSpaceForPublishing } from "../hooks/useStorageSpaceListings";
import { useToast } from "@/hooks/use-toast";

export const PublishStorageSpacesDialog = () => {
  const [open, setOpen] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  const { data: spacesData, isLoading } = useStorageSpaceListings('available');
  const { toast } = useToast();

  const selectedCount = spacesData?.length ?? 0;

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPublishing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Förråd publicerade",
        description: `${selectedCount} förråd har publicerats framgångsrikt`,
      });
      setOpen(false);
    } catch {
      toast({
        title: "Fel",
        description: "Kunde inte publicera förråd. Försök igen.",
        variant: "destructive",
      });
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="flex items-center gap-2">
          <PlusCircle className="h-4 w-4" />
          Publicera förråd från Xpand
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Publicera förråd från Xpand</DialogTitle>
        </DialogHeader>

        <form onSubmit={handlePublish} className="space-y-6">
          <p className="text-sm text-muted-foreground">
            {isLoading
              ? "Laddar tillgängliga förråd..."
              : `${selectedCount} förråd är klara att publiceras.`}
          </p>

          {!isLoading && spacesData && (
            <div className="border rounded-md divide-y">
              {spacesData.map((space: StorageSpaceForPublishing) => (
                <div key={space.id} className="p-4 grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm">
                  <div>
                    <div className="font-medium">{space.address}</div>
                    <div className="text-muted-foreground text-xs">{space.id}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground text-xs">Område</div>
                    <div>{space.area}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground text-xs">Typ / Storlek</div>
                    <div>{space.type} · {space.size}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground text-xs">Hyra</div>
                    <div className="font-medium">{space.rentIncl}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-between gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={isPublishing}>
              Avbryt
            </Button>
            <Button type="submit" disabled={selectedCount === 0 || isLoading || isPublishing} className="flex items-center gap-2">
              {isPublishing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Publicerar...
                </>
              ) : (
                `Publicera förråd (${selectedCount})`
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
