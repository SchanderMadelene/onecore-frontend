
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlusCircle, Loader2 } from "lucide-react";
import { useParkingSpaceListings, type ParkingSpaceForPublishing } from "@/hooks/useParkingSpaceListings";
import { useToast } from "@/hooks/use-toast";
import { DialogContentHeader } from "./publish-dialog/DialogContentHeader";
import { ParkingSpacesTable } from "./publish-dialog/ParkingSpacesTable";

export const PublishParkingSpacesDialog = () => {
  const [open, setOpen] = useState(false);
  const [parkingSpaces, setParkingSpaces] = useState<ParkingSpaceForPublishing[]>([]);
  const [selectedCount, setSelectedCount] = useState(0);
  const [isPublishing, setIsPublishing] = useState(false);
  
  const { data: spacesData, isLoading } = useParkingSpaceListings('available');
  const { toast } = useToast();

  // Automatisk selektion av alla bilplatser vid öppning (som i legacy-koden)
  useEffect(() => {
    if (spacesData && open) {
      const selectedSpaces = spacesData.map(space => ({ ...space, selected: true }));
      setParkingSpaces(selectedSpaces);
      setSelectedCount(selectedSpaces.length);
    }
  }, [spacesData, open]);

  const handleSelectAll = (checked: boolean) => {
    const updated = parkingSpaces.map(space => ({ ...space, selected: checked }));
    setParkingSpaces(updated);
    setSelectedCount(checked ? updated.length : 0);
  };

  const handleSelectSpace = (index: number, checked: boolean) => {
    const updated = [...parkingSpaces];
    updated[index] = { ...updated[index], selected: checked };
    setParkingSpaces(updated);
    setSelectedCount(updated.filter(space => space.selected).length);
  };

  const handleQueueTypeChange = (index: number, queueType: 'intern' | 'external' | 'poangfri', checked: boolean) => {
    const updated = [...parkingSpaces];
    updated[index] = { 
      ...updated[index], 
      queueTypes: {
        ...updated[index].queueTypes,
        [queueType]: checked
      }
    };
    setParkingSpaces(updated);
  };

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    const selectedSpaces = parkingSpaces.filter(space => space.selected);
    
    setIsPublishing(true);
    try {
      // Simulera API-anrop
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log("Publicerar bilplatser:", selectedSpaces);
      
      toast({
        title: "Bilplatser publicerade",
        description: `${selectedSpaces.length} bilplatser har publicerats framgångsrikt`,
      });
      
      setOpen(false);
    } catch (error) {
      toast({
        title: "Fel",
        description: "Kunde inte publicera bilplatser. Försök igen.",
        variant: "destructive",
      });
    } finally {
      setIsPublishing(false);
    }
  };

  const handleCancel = () => {
    setOpen(false);
    // Reset state när dialogen stängs
    setParkingSpaces([]);
    setSelectedCount(0);
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      setOpen(isOpen);
      if (!isOpen) handleCancel();
    }}>
      <DialogTrigger asChild>
        <Button variant="default" className="flex items-center gap-2">
          <PlusCircle className="h-4 w-4" />
          Publicera bilplatser från Xpand
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Publicera bilplatser från Xpand</DialogTitle>
        </DialogHeader>

        <form onSubmit={handlePublish} className="space-y-6">
          <DialogContentHeader selectedCount={selectedCount} />

          <ParkingSpacesTable 
            parkingSpaces={parkingSpaces}
            selectedCount={selectedCount}
            isLoading={isLoading}
            onSelectAll={handleSelectAll}
            onSelectSpace={handleSelectSpace}
            onQueueTypeChange={handleQueueTypeChange}
          />

          <div className="flex justify-between gap-3 pt-4 border-t">
            <Button 
              type="button"
              variant="outline" 
              onClick={handleCancel}
              disabled={isPublishing}
            >
              Avbryt
            </Button>
            <Button 
              type="submit"
              disabled={selectedCount === 0 || isLoading || isPublishing}
              className="flex items-center gap-2"
            >
              {isPublishing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Publicerar...
                </>
              ) : (
                `Publicera bilplatser (${selectedCount})`
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
