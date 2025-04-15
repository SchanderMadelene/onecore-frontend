import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ChevronRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AspectRatio } from "@/components/ui/aspect-ratio";

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
          <div className="p-6 border-b bg-secondary">
            <div className="flex items-center gap-2 mb-4">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h2 className="text-lg font-semibold text-muted-foreground">Bilplatser</h2>
            </div>
            <SheetHeader>
              <SheetTitle className="text-2xl tracking-tight">
                {space.address}
              </SheetTitle>
            </SheetHeader>
          </div>
          
          <div className="flex-1 overflow-hidden">
            <ScrollArea className="h-full">
              <div className="p-6 space-y-8">
                <section>
                  <h3 className="text-lg font-semibold mb-4">
                    Intresseanmälningar
                  </h3>
                  <div className="border rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="hover:bg-transparent bg-secondary">
                          <TableHead className="whitespace-nowrap font-semibold">Namn</TableHead>
                          <TableHead className="whitespace-nowrap font-semibold">Kundnummer</TableHead>
                          <TableHead className="whitespace-nowrap font-semibold">Köpoäng</TableHead>
                          <TableHead className="whitespace-nowrap font-semibold">Boendeadress</TableHead>
                          <TableHead className="whitespace-nowrap font-semibold">Status boendekontrakt</TableHead>
                          <TableHead className="whitespace-nowrap font-semibold">Anmälan</TableHead>
                          <TableHead className="whitespace-nowrap font-semibold">Har bilplats</TableHead>
                          <TableHead className="whitespace-nowrap font-semibold">Status sökande</TableHead>
                          <TableHead className="whitespace-nowrap font-semibold">Svar erbjudande</TableHead>
                          <TableHead className="whitespace-nowrap font-semibold">Svara senast</TableHead>
                          <TableHead className="whitespace-nowrap font-semibold">Ärende</TableHead>
                          <TableHead className="whitespace-nowrap font-semibold">Priogrupp</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {demoApplicants.map((applicant, index) => (
                          <TableRow key={index} className="hover:bg-secondary/50">
                            <TableCell className="font-medium">{applicant.name}</TableCell>
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
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <section>
                    <h3 className="text-lg font-semibold mb-4">Objektsinformation</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Bilplats</p>
                        <p className="font-medium">{space.address}</p>
                        <p className="text-sm">{space.id}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Område</p>
                        <p className="font-medium">{space.area}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Bilplatstyp</p>
                        <p className="font-medium">{space.type}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Hyra</p>
                        <p className="font-medium">{space.rent}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Sökande</p>
                        <p className="font-medium">{space.seekers}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Publicerad t.o.m</p>
                        <p className="font-medium">{space.publishedTo}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Ledig från och med</p>
                        <p className="font-medium">{space.publishedFrom}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Önskat avflyttningsdatum</p>
                        <p className="font-medium">{space.publishedFrom}</p>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold mb-4">
                      Översiktskarta
                    </h3>
                    <div className="border rounded-lg overflow-hidden">
                      <AspectRatio ratio={16/9}>
                        <img
                          src="/lovable-uploads/f737d3ef-60f9-4e0f-a979-12d80d6f4efe.png"
                          alt="Översiktskarta för bilplats"
                          className="w-full h-full object-cover"
                        />
                      </AspectRatio>
                    </div>
                  </section>
                </div>
              </div>
            </ScrollArea>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
