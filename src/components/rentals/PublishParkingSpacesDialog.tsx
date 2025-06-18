
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { PlusCircle } from "lucide-react";
import { FormWrapper } from "@/components/ui/form-wrapper";

interface ParkingSpaceForPublishing {
  id: string;
  address: string;
  area: string;
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

const demoSpaces: ParkingSpaceForPublishing[] = [
  {
    id: "123-123-123-0201",
    address: "Bellmansgatan 1",
    area: "Centrum",
    type: "Garage m el",
    rentIncl: "540kr/mån (in)",
    rentExcl: "540kr/mån (ex)",
    publications: 1,
    queueTypes: { intern: true, poangfri: false },
    selected: false
  },
  {
    id: "123-123-123-0202",
    address: "Bellmansgatan 2", 
    area: "Gryta",
    type: "Garage m el",
    rentIncl: "540kr/mån (in)",
    rentExcl: "540kr/mån (ex)",
    publications: 1,
    queueTypes: { intern: true, poangfri: false },
    selected: false
  },
  {
    id: "123-123-123-0203",
    address: "Kungsgatan 15",
    area: "Centrum", 
    type: "Carport",
    rentIncl: "540kr/mån (in)",
    rentExcl: "540kr/mån (ex)",
    publications: 1,
    queueTypes: { intern: true, poangfri: false },
    selected: false
  },
  {
    id: "123-123-123-0204",
    address: "Stigbergsgatan 7",
    area: "Stigberget",
    type: "Utomhusplats", 
    rentIncl: "540kr/mån (in)",
    rentExcl: "540kr/mån (ex)",
    publications: 1,
    queueTypes: { intern: false, poangfri: true },
    selected: false
  },
  {
    id: "123-123-123-0205",
    address: "Vasagatan 22",
    area: "Vasastaden",
    type: "Garage m el",
    rentIncl: "540kr/mån (in)",
    rentExcl: "540kr/mån (ex)",
    publications: 1,
    queueTypes: { intern: true, poangfri: false },
    selected: false
  }
];

export const PublishParkingSpacesDialog = () => {
  const [open, setOpen] = useState(false);
  const [parkingSpaces, setParkingSpaces] = useState<ParkingSpaceForPublishing[]>(demoSpaces);
  const [selectedCount, setSelectedCount] = useState(0);

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
    const selectedSpaces = parkingSpaces.filter(space => space.selected);
    console.log("Publicerar bilplatser:", selectedSpaces);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="flex items-center gap-2">
          <PlusCircle className="h-4 w-4" />
          Publicera bilplatser från Xpand
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Publicera bilplatser från Xpand</DialogTitle>
        </DialogHeader>

        <FormWrapper onSubmit={handlePublish}>
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">
                Välj bilplatser att publicera ({selectedCount} valda)
              </p>
            </div>

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

            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button 
                type="button"
                variant="outline" 
                onClick={() => setOpen(false)}
              >
                Avbryt
              </Button>
              <Button 
                type="submit"
                disabled={selectedCount === 0}
              >
                Publicera ({selectedCount})
              </Button>
            </div>
          </div>
        </FormWrapper>
      </DialogContent>
    </Dialog>
  );
};
