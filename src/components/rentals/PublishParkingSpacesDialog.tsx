
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { PlusCircle, Loader2 } from "lucide-react";
import { FormWrapper } from "@/components/ui/form-wrapper";
import { useParkingSpaceListings, type ParkingSpaceForPublishing } from "@/hooks/useParkingSpaceListings";
import { useToast } from "@/hooks/use-toast";

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

  const handlePublish = async () => {
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

        <FormWrapper onSubmit={handlePublish}>
          <div className="space-y-6">
            {/* Beskrivande text som i legacy-koden */}
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Nedan listas alla bilplatser som behöver ompubliceras från Xpand och som ej är spärrade.
              </p>
              <div className="flex justify-between items-center">
                <p className="text-sm font-medium">
                  Välj bilplatser att publicera ({selectedCount} valda)
                </p>
              </div>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center p-8">
                <Loader2 className="h-6 w-6 animate-spin mr-2" />
                <span>Hämtar bilplatser...</span>
              </div>
            ) : (
              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <Checkbox 
                          checked={selectedCount === parkingSpaces.length && selectedCount > 0}
                          onCheckedChange={handleSelectAll}
                        />
                      </TableHead>
                      <TableHead>Bilplats</TableHead>
                      <TableHead>Område</TableHead>
                      <TableHead>Distrikt</TableHead>
                      <TableHead>Typ</TableHead>
                      <TableHead>Hyra inkl.</TableHead>
                      <TableHead>Hyra exkl.</TableHead>
                      <TableHead className="text-center">Publiceringar</TableHead>
                      <TableHead>Kötyp</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {parkingSpaces.map((space, index) => (
                      <TableRow key={space.id}>
                        <TableCell>
                          <Checkbox 
                            checked={space.selected}
                            onCheckedChange={(checked) => handleSelectSpace(index, !!checked)}
                          />
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{space.address}</div>
                            <div className="text-sm text-muted-foreground">{space.id}</div>
                          </div>
                        </TableCell>
                        <TableCell>{space.area}</TableCell>
                        <TableCell>{space.district}</TableCell>
                        <TableCell>{space.type}</TableCell>
                        <TableCell>{space.rentIncl}</TableCell>
                        <TableCell>{space.rentExcl}</TableCell>
                        <TableCell className="text-center">{space.publications}</TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-2">
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id={`intern-${index}`}
                                checked={space.queueTypes.intern}
                                onCheckedChange={(checked) => handleQueueTypeChange(index, 'intern', !!checked)}
                              />
                              <label htmlFor={`intern-${index}`} className="text-sm">Intern</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id={`external-${index}`}
                                checked={space.queueTypes.external}
                                onCheckedChange={(checked) => handleQueueTypeChange(index, 'external', !!checked)}
                              />
                              <label htmlFor={`external-${index}`} className="text-sm">Extern</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id={`poangfri-${index}`}
                                checked={space.queueTypes.poangfri}
                                onCheckedChange={(checked) => handleQueueTypeChange(index, 'poangfri', !!checked)}
                              />
                              <label htmlFor={`poangfri-${index}`} className="text-sm">Poängfri</label>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}

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
          </div>
        </FormWrapper>
      </DialogContent>
    </Dialog>
  );
};
