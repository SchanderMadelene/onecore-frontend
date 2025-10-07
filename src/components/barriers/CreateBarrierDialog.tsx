import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { FormWrapper } from "@/components/ui/form-wrapper";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { createBarrier, getAvailableHousing } from "@/data/barriers";
import type { AvailableHousing } from "@/data/barriers";

interface CreateBarrierDialogProps {
  onBarrierCreated?: () => void;
}

export const CreateBarrierDialog = ({ onBarrierCreated }: CreateBarrierDialogProps) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedHousing, setSelectedHousing] = useState<AvailableHousing[]>([]);
  
  // Form data
  const [reason, setReason] = useState('');
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { toast } = useToast();

  // Reset form when dialog closes
  useEffect(() => {
    if (!open) {
      // Delay reset to allow dialog animation to complete
      const timer = setTimeout(() => {
        resetForm();
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [open]);

  // Get available objects
  const availableHousing = getAvailableHousing();

  // Filter objects based on search
  const filteredHousing = availableHousing.filter(housing =>
    housing.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    housing.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    housing.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleObjectToggle = (housing: AvailableHousing) => {
    setSelectedHousing(prev => 
      prev.find(h => h.id === housing.id)
        ? prev.filter(h => h.id !== housing.id)
        : [...prev, housing]
    );
  };

  const resetForm = () => {
    setSearchQuery('');
    setSelectedHousing([]);
    setReason('');
    setStartDate(new Date());
    setEndDate(undefined);
    setNotes('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!reason || !startDate) {
      toast({
        title: "Fel",
        description: "Anledning och startdatum måste anges",
        variant: "destructive"
      });
      return;
    }
    
    if (selectedHousing.length === 0) {
      toast({
        title: "Fel",
        description: "Minst en bostad måste väljas",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Create barriers for all selected housing
      selectedHousing.forEach(housing => {
        const objectName = `${housing.address.split(',')[0]}, ${housing.name}`;

        createBarrier({
          type: 'housing',
          object: objectName,
          address: housing.address,
          reason,
          startDate: format(startDate, 'yyyy-MM-dd'),
          endDate: endDate ? format(endDate, 'yyyy-MM-dd') : undefined,
          status: 'active',
          notes: notes || undefined
        });
      });

      toast({
        title: "Spärrar skapade",
        description: `${selectedHousing.length} bostäder har spärrats`
      });

      onBarrierCreated?.();
      setOpen(false);
      resetForm();
    } catch (error) {
      toast({
        title: "Fel",
        description: "Kunde inte skapa spärrar",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Ny spärr
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-4xl max-h-[90vh] p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle>Skapa ny spärr</DialogTitle>
        </DialogHeader>

        <FormWrapper onSubmit={handleSubmit} maxHeight="75vh">
          {/* Search Housing */}
          <div className="space-y-4">
            <Label className="text-base font-medium">Välj bostäder</Label>
            
            <Input
              placeholder="Sök lägenhet, adress eller kod..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            {/* Housing List */}
            <div className="max-h-60 overflow-y-auto space-y-2">
              {filteredHousing.map((housing) => (
                <Card 
                  key={housing.id} 
                  className={cn(
                    "cursor-pointer transition-colors",
                    selectedHousing.find(h => h.id === housing.id) && "border-primary bg-primary/5"
                  )}
                  onClick={() => handleObjectToggle(housing)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={selectedHousing.find(h => h.id === housing.id) !== undefined}
                        onCheckedChange={() => handleObjectToggle(housing)}
                        onClick={(e) => e.stopPropagation()}
                      />
                      <div className="flex-1">
                        <div className="font-medium">{housing.name}</div>
                        <div className="text-sm text-muted-foreground">{housing.address}</div>
                        <div className="text-sm text-muted-foreground">
                          {housing.size && `${housing.size} m² • `}{housing.rent} kr/mån • {housing.code}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {selectedHousing.length > 0 && (
              <div className="text-sm text-muted-foreground">
                {selectedHousing.length} bostäder valda
              </div>
            )}
          </div>

          {/* Barrier Details */}
          <div className="space-y-4">
            <Label className="text-base font-medium">Spärr-detaljer</Label>
            
            <div className="space-y-2">
              <Label>Anledning</Label>
              <Input
                placeholder="Ange anledning för spärren..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Startdatum</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !startDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "yyyy-MM-dd") : "Välj datum"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>Slutdatum (valfritt)</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !endDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "yyyy-MM-dd") : "Välj datum"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      initialFocus
                      className="p-3 pointer-events-auto"
                      disabled={(date) => startDate ? date < startDate : false}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Kommentar (valfritt)</Label>
              <Textarea
                placeholder="Lägg till ytterligare information..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-between gap-4 pt-4 border-t border-border">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setOpen(false)}
              disabled={isSubmitting}
              className="flex-1"
            >
              Avbryt
            </Button>
            <Button 
              type="submit" 
              disabled={selectedHousing.length === 0 || !reason || !startDate || isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? "Skapar..." : `Skapa ${selectedHousing.length > 1 ? `${selectedHousing.length} spärrar` : 'spärr'}`}
            </Button>
          </div>
        </FormWrapper>
      </DialogContent>
    </Dialog>
  );
};