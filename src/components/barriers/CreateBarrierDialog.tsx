import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { FormWrapper } from "@/components/ui/form-wrapper";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { createBarrier, getAvailableHousing, getAvailableParkingSpaces, getAvailableStorage, getAvailableCommercial } from "@/data/barriers";
import type { AvailableHousing, AvailableParkingSpace, AvailableStorage, AvailableCommercial } from "@/data/barriers";

interface CreateBarrierDialogProps {
  onBarrierCreated?: () => void;
}

export const CreateBarrierDialog = ({ onBarrierCreated }: CreateBarrierDialogProps) => {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<'single' | 'bulk'>('single');
  const [type, setType] = useState<'housing' | 'parking' | 'storage' | 'commercial'>('housing');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Selected objects
  const [selectedHousing, setSelectedHousing] = useState<AvailableHousing[]>([]);
  const [selectedParkingSpaces, setSelectedParkingSpaces] = useState<AvailableParkingSpace[]>([]);
  const [selectedStorage, setSelectedStorage] = useState<AvailableStorage[]>([]);
  const [selectedCommercial, setSelectedCommercial] = useState<AvailableCommercial[]>([]);
  
  // Form data
  const [reason, setReason] = useState('');
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { toast } = useToast();

  // Get available objects
  const availableHousing = getAvailableHousing();
  const availableParkingSpaces = getAvailableParkingSpaces();
  const availableStorage = getAvailableStorage();
  const availableCommercial = getAvailableCommercial();

  // Filter objects based on search
  const filteredHousing = availableHousing.filter(housing =>
    housing.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    housing.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    housing.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredParkingSpaces = availableParkingSpaces.filter(parking =>
    parking.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    parking.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    parking.area.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredStorage = availableStorage.filter(storage =>
    storage.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    storage.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    storage.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCommercial = availableCommercial.filter(commercial =>
    commercial.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    commercial.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    commercial.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const commonReasons = {
    housing: [
      'Vattenskada - renovering pågår',
      'Brandskada',
      'Asbetsanering',
      'Fuktsanering',
      'Renovering',
      'Teknisk undersökning',
      'Övrigt'
    ],
    parking: [
      'Markarbeten - schakt för fiber',
      'Asfaltskador',
      'Takläckage - reparation',
      'Elkabel - underhåll',
      'Ventilation - service',
      'Snöröjning',
      'Övrigt'
    ],
    storage: [
      'Fuktskada - sanering',
      'Dörr behöver bytas',
      'Lås behöver bytas',
      'Elinstallation',
      'Renovering',
      'Sanering',
      'Övrigt'
    ],
    commercial: [
      'Ombyggnad - nya hyresgästen',
      'Ventilationsarbeten',
      'Brandskyddskontroll',
      'Renovering',
      'Elinstallation',
      'VVS-arbeten',
      'Övrigt'
    ]
  };

  const handleObjectToggle = (object: AvailableHousing | AvailableParkingSpace | AvailableStorage | AvailableCommercial) => {
    if (type === 'housing') {
      const housing = object as AvailableHousing;
      setSelectedHousing(prev => 
        prev.find(h => h.id === housing.id)
          ? prev.filter(h => h.id !== housing.id)
          : [...prev, housing]
      );
    } else if (type === 'parking') {
      const parking = object as AvailableParkingSpace;
      setSelectedParkingSpaces(prev =>
        prev.find(p => p.id === parking.id)
          ? prev.filter(p => p.id !== parking.id)
          : [...prev, parking]
      );
    } else if (type === 'storage') {
      const storage = object as AvailableStorage;
      setSelectedStorage(prev =>
        prev.find(s => s.id === storage.id)
          ? prev.filter(s => s.id !== storage.id)
          : [...prev, storage]
      );
    } else {
      const commercial = object as AvailableCommercial;
      setSelectedCommercial(prev =>
        prev.find(c => c.id === commercial.id)
          ? prev.filter(c => c.id !== commercial.id)
          : [...prev, commercial]
      );
    }
  };

  const handleSelectAll = () => {
    if (type === 'housing') {
      setSelectedHousing(selectedHousing.length === filteredHousing.length ? [] : filteredHousing);
    } else if (type === 'parking') {
      setSelectedParkingSpaces(selectedParkingSpaces.length === filteredParkingSpaces.length ? [] : filteredParkingSpaces);
    } else if (type === 'storage') {
      setSelectedStorage(selectedStorage.length === filteredStorage.length ? [] : filteredStorage);
    } else {
      setSelectedCommercial(selectedCommercial.length === filteredCommercial.length ? [] : filteredCommercial);
    }
  };

  const getSelectedCount = () => {
    if (type === 'housing') return selectedHousing.length;
    if (type === 'parking') return selectedParkingSpaces.length;
    if (type === 'storage') return selectedStorage.length;
    return selectedCommercial.length;
  };

  const resetForm = () => {
    setMode('single');
    setType('housing');
    setSearchQuery('');
    setSelectedHousing([]);
    setSelectedParkingSpaces([]);
    setSelectedStorage([]);
    setSelectedCommercial([]);
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

    let selectedObjects: any[];
    if (type === 'housing') selectedObjects = selectedHousing;
    else if (type === 'parking') selectedObjects = selectedParkingSpaces;
    else if (type === 'storage') selectedObjects = selectedStorage;
    else selectedObjects = selectedCommercial;
    
    if (selectedObjects.length === 0) {
      toast({
        title: "Fel",
        description: "Minst ett objekt måste väljas",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Create barriers for all selected objects
      selectedObjects.forEach(obj => {
        const objectName = type === 'housing' 
          ? `${obj.address.split(',')[0]}, ${obj.name}`
          : obj.name;

        createBarrier({
          type,
          object: objectName,
          address: obj.address,
          reason,
          startDate: format(startDate, 'yyyy-MM-dd'),
          endDate: endDate ? format(endDate, 'yyyy-MM-dd') : undefined,
          status: 'active',
          notes: notes || undefined
        });
      });

      const typeLabel = type === 'housing' ? 'bostäder' : 
                        type === 'parking' ? 'bilplatser' :
                        type === 'storage' ? 'förråd' : 'lokaler';

      toast({
        title: "Spärrar skapade",
        description: `${selectedObjects.length} ${typeLabel} har spärrats`
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
    <Dialog open={open} onOpenChange={(isOpen) => {
      setOpen(isOpen);
      if (!isOpen) resetForm();
    }}>
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
          {/* Mode Selection */}
          <div className="space-y-4">
            <Label className="text-base font-medium">Typ av spärr</Label>
            <Tabs value={mode} onValueChange={(value) => setMode(value as 'single' | 'bulk')}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="single">Enkel spärr</TabsTrigger>
                <TabsTrigger value="bulk">Flera spärrar</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Object Type Selection */}
          <div className="space-y-2">
            <Label>Objekttyp</Label>
            <Select value={type} onValueChange={(value: 'housing' | 'parking' | 'storage' | 'commercial') => {
              setType(value);
              setSelectedHousing([]);
              setSelectedParkingSpaces([]);
              setSelectedStorage([]);
              setSelectedCommercial([]);
            }}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="housing">Bostäder</SelectItem>
                <SelectItem value="parking">Bilplatser</SelectItem>
                <SelectItem value="storage">Förråd</SelectItem>
                <SelectItem value="commercial">Lokaler</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Search Objects */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label className="text-base font-medium">
                Sök {type === 'housing' ? 'bostäder' : type === 'parking' ? 'bilplatser' : type === 'storage' ? 'förråd' : 'lokaler'}
              </Label>
              {mode === 'bulk' && (
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  onClick={handleSelectAll}
                >
                  {getSelectedCount() > 0 ? 'Avmarkera alla' : 'Markera alla'}
                </Button>
              )}
            </div>
            
            <Input
              placeholder={`Sök ${
                type === 'housing' ? 'lägenhet, adress eller kod' : 
                type === 'parking' ? 'bilplats, adress eller område' :
                type === 'storage' ? 'förråd, adress eller plats' :
                'lokal, adress eller typ'
              }...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            {/* Object List */}
            <div className="max-h-60 overflow-y-auto space-y-2">
              {type === 'housing' ? (
                filteredHousing.map((housing) => (
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
                          onChange={() => {}}
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
                ))
              ) : type === 'parking' ? (
                filteredParkingSpaces.map((parking) => (
                  <Card 
                    key={parking.id}
                    className={cn(
                      "cursor-pointer transition-colors",
                      selectedParkingSpaces.find(p => p.id === parking.id) && "border-primary bg-primary/5"
                    )}
                    onClick={() => handleObjectToggle(parking)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          checked={selectedParkingSpaces.find(p => p.id === parking.id) !== undefined}
                          onChange={() => {}}
                        />
                        <div className="flex-1">
                          <div className="font-medium">{parking.name}</div>
                          <div className="text-sm text-muted-foreground">{parking.address}</div>
                          <div className="text-sm text-muted-foreground">
                            {parking.area} • {parking.type} • {parking.rent} kr/mån
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : type === 'storage' ? (
                filteredStorage.map((storage) => (
                  <Card 
                    key={storage.id}
                    className={cn(
                      "cursor-pointer transition-colors",
                      selectedStorage.find(s => s.id === storage.id) && "border-primary bg-primary/5"
                    )}
                    onClick={() => handleObjectToggle(storage)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          checked={selectedStorage.find(s => s.id === storage.id) !== undefined}
                          onChange={() => {}}
                        />
                        <div className="flex-1">
                          <div className="font-medium">{storage.name}</div>
                          <div className="text-sm text-muted-foreground">{storage.address}</div>
                          <div className="text-sm text-muted-foreground">
                            {storage.size} m² • {storage.location} • {storage.rent} kr/mån
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                filteredCommercial.map((commercial) => (
                  <Card 
                    key={commercial.id}
                    className={cn(
                      "cursor-pointer transition-colors",
                      selectedCommercial.find(c => c.id === commercial.id) && "border-primary bg-primary/5"
                    )}
                    onClick={() => handleObjectToggle(commercial)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          checked={selectedCommercial.find(c => c.id === commercial.id) !== undefined}
                          onChange={() => {}}
                        />
                        <div className="flex-1">
                          <div className="font-medium">{commercial.name}</div>
                          <div className="text-sm text-muted-foreground">{commercial.address}</div>
                          <div className="text-sm text-muted-foreground">
                            {commercial.size} m² • {commercial.type} • {commercial.rent} kr/mån
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>

            {getSelectedCount() > 0 && (
              <div className="text-sm text-muted-foreground">
                {getSelectedCount()} {
                  type === 'housing' ? 'bostäder' : 
                  type === 'parking' ? 'bilplatser' :
                  type === 'storage' ? 'förråd' : 'lokaler'
                } valda
              </div>
            )}
          </div>

          {/* Barrier Details */}
          <div className="space-y-4">
            <Label className="text-base font-medium">Spärr-detaljer</Label>
            
            <div className="space-y-2">
              <Label>Anledning</Label>
              <Select value={reason} onValueChange={setReason}>
                <SelectTrigger>
                  <SelectValue placeholder="Välj anledning" />
                </SelectTrigger>
                <SelectContent>
                  {commonReasons[type].map((reasonOption) => (
                    <SelectItem key={reasonOption} value={reasonOption}>
                      {reasonOption}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
              disabled={getSelectedCount() === 0 || !reason || !startDate || isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? "Skapar..." : `Skapa ${getSelectedCount() > 1 ? `${getSelectedCount()} spärrar` : 'spärr'}`}
            </Button>
          </div>
        </FormWrapper>
      </DialogContent>
    </Dialog>
  );
};