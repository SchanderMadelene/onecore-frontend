import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ChevronRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ParkingSpaceDetailProps {
  space: {
    id: string;
    address: string;
    area: string;
    type: string;
    queueType: string;
    rent: string;
    seekers: number;
    publishedFrom: string;
    publishedTo: string;
  };
}

const demoApplicants = [
  { name: "Namn 1", customerNumber: "P-123456", points: "400", address: "Högloftsvägen", contractStatus: "Kommande", registrationDate: "2024-01-01", hasParking: "Ja", status: "Intresseanmälan", responseDate: "2024-01-01", response: "Hyra flera", priority: "1" },
  { name: "Namn 2", customerNumber: "P-123456", points: "300", address: "Lilluddsgallen", contractStatus: "Inväntar", registrationDate: "2024-01-01", hasParking: "Nej", status: "Intresseanmälan", responseDate: "2024-01-01", response: "-", priority: "1" },
  { name: "Namn 3", customerNumber: "P-123456", points: "200", address: "Stora gatan 2A", contractStatus: "Status", registrationDate: "2024-01-01", hasParking: "Nej", status: "Intresseanmälan", responseDate: "2024-01-01", response: "Byte", priority: "1" },
  { name: "Namn 4", customerNumber: "P-123456", points: "100", address: "Rönnbergagatan 38", contractStatus: "Status", registrationDate: "2024-01-01", hasParking: "Ja", status: "Intresseanmälan", responseDate: "2024-01-01", response: "-", priority: "1" },
  { name: "Namn 5", customerNumber: "P-123456", points: "10", address: "Rönnbergagatan 38", contractStatus: "Status", registrationDate: "2024-01-01", hasParking: "Ja", status: "Intresseanmälan", responseDate: "2024-01-01", response: "-", priority: "1" },
];

export function ParkingSpaceDetail({ space }: ParkingSpaceDetailProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-[90vw] p-0">
        <div className="flex flex-col h-full">
          <div className="p-6 border-b">
            <div className="flex items-center gap-2 mb-6">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h2 className="text-lg font-semibold">ÖVERSIKT BILPLATSER</h2>
            </div>
            <SheetHeader>
              <SheetTitle>INTRESSEANMÄLNINGAR {space.address}</SheetTitle>
            </SheetHeader>
          </div>
          
          <div className="flex-1 overflow-hidden">
            <ScrollArea className="h-full">
              <div className="p-6">
                <div className="mb-8">
                  <h3 className="text-lg font-bold mb-4">OBJEKTSINFORMATION</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Bilplats</p>
                      <p>{space.address}</p>
                      <p className="text-sm">{space.id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Område</p>
                      <p>{space.area}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Bilplatstyp</p>
                      <p>{space.type}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Hyra</p>
                      <p>{space.rent}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Sökande</p>
                      <p>{space.seekers}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Publicerad t.o.m</p>
                      <p>{space.publishedTo}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Ledig från och med</p>
                      <p>{space.publishedFrom}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Önskat avflyttningsdatum</p>
                      <p>{space.publishedFrom}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-transparent">
                        <TableHead className="whitespace-nowrap">Namn</TableHead>
                        <TableHead className="whitespace-nowrap">Kundnummer</TableHead>
                        <TableHead className="whitespace-nowrap">Köpoäng</TableHead>
                        <TableHead className="whitespace-nowrap">Boendeadress</TableHead>
                        <TableHead className="whitespace-nowrap">Status boendekontrakt</TableHead>
                        <TableHead className="whitespace-nowrap">Anmälan</TableHead>
                        <TableHead className="whitespace-nowrap">Har bilplats</TableHead>
                        <TableHead className="whitespace-nowrap">Status sökande</TableHead>
                        <TableHead className="whitespace-nowrap">Svar erbjudande</TableHead>
                        <TableHead className="whitespace-nowrap">Svara senast</TableHead>
                        <TableHead className="whitespace-nowrap">Ärende</TableHead>
                        <TableHead className="whitespace-nowrap">Priogrupp</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {demoApplicants.map((applicant, index) => (
                        <TableRow key={index}>
                          <TableCell>{applicant.name}</TableCell>
                          <TableCell>{applicant.customerNumber}</TableCell>
                          <TableCell>{applicant.points}</TableCell>
                          <TableCell>{applicant.address}</TableCell>
                          <TableCell>{applicant.contractStatus}</TableCell>
                          <TableCell>{applicant.registrationDate}</TableCell>
                          <TableCell>{applicant.hasParking}</TableCell>
                          <TableCell>{applicant.status}</TableCell>
                          <TableCell>{applicant.response}</TableCell>
                          <TableCell>{applicant.responseDate}</TableCell>
                          <TableCell>-</TableCell>
                          <TableCell>{applicant.priority}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </ScrollArea>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
