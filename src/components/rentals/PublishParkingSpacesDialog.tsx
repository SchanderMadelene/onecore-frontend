
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { PlusCircle } from "lucide-react";
import { FormWrapper } from "@/components/ui/form-wrapper";

interface ParkingSpaceToPublish {
  id: string;
  address: string;
  area: string;
  district: string;
  type: string;
  rentIncl: string;
  rentExcl: string;
  publications: number;
  queueTypes: {
    intern: boolean;
    poangfri: boolean;
  };
  selected: boolean;
}

const demoData: ParkingSpaceToPublish[] = [
  {
    id: "123-123-123-0201",
    address: "Adress 4",
    area: "Centrum",
    district: "Distrikt",
    type: "Garage m el",
    rentIncl: "540kr/mån (in)",
    rentExcl: "540kr/mån (ex)",
    publications: 1,
    queueTypes: { intern: true, poangfri: false },
    selected: false
  },
  {
    id: "123-123-123-0201",
    address: "Adress 5",
    area: "Oxbacken",
    district: "Distrikt",
    type: "Garage m el",
    rentIncl: "540kr/mån (in)",
    rentExcl: "540kr/mån (ex)",
    publications: 1,
    queueTypes: { intern: true, poangfri: false },
    selected: false
  },
  {
    id: "123-123-123-0201",
    address: "Sjöodjuret 6",
    area: "Öster Mälarstrand",
    district: "Distrikt",
    type: "Garage m el",
    rentIncl: "540kr/mån (in)",
    rentExcl: "540kr/mån (ex)",
    publications: 1,
    queueTypes: { intern: true, poangfri: false },
    selected: false
  },
  {
    id: "123-123-123-0201",
    address: "Adress 7",
    area: "Vallby",
    district: "Distrikt",
    type: "Garage m el",
    rentIncl: "540kr/mån (in)",
    rentExcl: "540kr/mån (ex)",
    publications: 1,
    queueTypes: { intern: false, poangfri: true },
    selected: false
  },
  {
    id: "123-123-123-0201",
    address: "Adress 8",
    area: "Centrum",
    district: "Distrikt",
    type: "Garage m el",
    rentIncl: "540kr/mån (in)",
    rentExcl: "540kr/mån (ex)",
    publications: 1,
    queueTypes: { intern: true, poangfri: false },
    selected: false
  }
];

export function PublishParkingSpacesDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [parkingSpaces, setParkingSpaces] = useState<ParkingSpaceToPublish[]>(demoData);
  const [selectedCount, setSelectedCount] = useState(0);

  const handleSelectAll = (checked: boolean) => {
    const updated = parkingSpaces.map(space => ({ ...space, selected: checked }));
    setParkingSpaces(updated);
    setSelectedCount(checked ? updated.length : 0);
  };

  const handleSelectSpace = (id: string, checked: boolean) => {
    const updated = parkingSpaces.map(space => 
      space.id === id && space.address === parkingSpaces.find(s => s.id === id)?.address
        ? { ...space, selected: checked }
        : space
    );
    setParkingSpaces(updated);
    setSelectedCount(updated.filter(space => space.selected).length);
  };

  const handleQueueTypeChange = (index: number, queueType: 'intern' | 'poangfri', checked: boolean) => {
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

  const handlePublish = () => {
    console.log("Publishing selected parking spaces:", parkingSpaces.filter(space => space.selected));
    setIsOpen(false);
  };

  const allSelected = parkingSpaces.length > 0 && parkingSpaces.every(space => space.selected);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="flex items-center gap-2">
          <PlusCircle className="h-4 w-4" />
          Publicera bilplatser från Xpand
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[95vw] max-h-[95vh] p-0">
        <DialogHeader className="px-6 py-4 border-b">
          <DialogTitle>Publicera bilplatser</DialogTitle>
          <p className="text-sm text-muted-foreground mt-2">
            Nedan listas alla bilplatser som behöver ompubliceras från Xpand och som ej är spärrade.
          </p>
        </DialogHeader>
        
        <FormWrapper maxHeight="70vh">
          <div className="rounded-md border bg-card">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-[50px]">
                    <Checkbox 
                      checked={allSelected}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead className="whitespace-nowrap">Bilplats</TableHead>
                  <TableHead className="whitespace-nowrap">Område</TableHead>
                  <TableHead className="whitespace-nowrap">Distrikt</TableHead>
                  <TableHead className="whitespace-nowrap">Bilplatstyp</TableHead>
                  <TableHead className="whitespace-nowrap">Hyra</TableHead>
                  <TableHead className="whitespace-nowrap">Antal publiceringar intern kö</TableHead>
                  <TableHead className="whitespace-nowrap">Publicera i kötyp</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {parkingSpaces.map((space, index) => (
                  <TableRow key={`${space.id}-${space.address}`}>
                    <TableCell>
                      <Checkbox 
                        checked={space.selected}
                        onCheckedChange={(checked) => handleSelectSpace(space.id, !!checked)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{space.address}</div>
                      <div className="text-sm text-muted-foreground">{space.id}</div>
                    </TableCell>
                    <TableCell>{space.area}</TableCell>
                    <TableCell>{space.district}</TableCell>
                    <TableCell>{space.type}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{space.rentIncl}</div>
                        <div>{space.rentExcl}</div>
                      </div>
                    </TableCell>
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

          <div className="flex justify-between items-center pt-4 border-t border-border">
            <div className="text-sm text-muted-foreground">
              {selectedCount} av {parkingSpaces.length} objekt markerade
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Avbryt
              </Button>
              <Button 
                onClick={handlePublish}
                disabled={selectedCount === 0}
              >
                Publicera bilplatser
              </Button>
            </div>
          </div>
        </FormWrapper>
      </DialogContent>
    </Dialog>
  );
}
