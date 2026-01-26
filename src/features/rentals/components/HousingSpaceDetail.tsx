
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { ChevronRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import type { HousingSpace } from "./types/housing";

interface HousingSpaceDetailProps {
  space: HousingSpace;
}

const demoApplicants = [
  { name: "Namn 1", customerNumber: "H-123456", points: "800", address: "Storgatan 1", contractStatus: "Kommande", registrationDate: "2024-01-01", hasApartment: "Nej", status: "Intresseanmälan", response: "Vill hyra", responseDate: "2024-01-01", priority: "1" },
  { name: "Namn 2", customerNumber: "H-123457", points: "750", address: "Kungsgatan 5", contractStatus: "Inväntar", registrationDate: "2024-01-01", hasApartment: "Ja", status: "Intresseanmälan", response: "-", priority: "2" },
  { name: "Namn 3", customerNumber: "H-123458", points: "700", address: "Drottninggatan 3", contractStatus: "Status", registrationDate: "2024-01-01", hasApartment: "Nej", status: "Intresseanmälan", response: "Byte", priority: "1" },
];

export function HousingSpaceDetail({ space }: HousingSpaceDetailProps) {
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
              <SheetClose asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </SheetClose>
              <h2 className="text-lg font-semibold text-muted-foreground">Bostäder</h2>
            </div>
            <SheetHeader>
              <SheetTitle className="text-2xl tracking-tight flex items-center gap-2">
                {space.address}
                <Badge variant="outline" className="bg-primary/10 text-primary font-normal">
                  Publicerad
                </Badge>
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
                          <TableHead className="whitespace-nowrap font-semibold">Har bostad</TableHead>
                          <TableHead className="whitespace-nowrap font-semibold">Status sökande</TableHead>
                          <TableHead className="whitespace-nowrap font-semibold">Svar erbjudande</TableHead>
                          <TableHead className="whitespace-nowrap font-semibold">Svara senast</TableHead>
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
                            <TableCell>{applicant.hasApartment}</TableCell>
                            <TableCell>{applicant.status}</TableCell>
                            <TableCell>{applicant.response}</TableCell>
                            <TableCell>{applicant.responseDate}</TableCell>
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
                        <p className="text-sm text-muted-foreground">Bostad</p>
                        <p className="font-medium">{space.address}</p>
                        <p className="text-sm">{space.id}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Område</p>
                        <p className="font-medium">{space.area}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Bostadstyp</p>
                        <p className="font-medium">{space.type}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Storlek</p>
                        <p className="font-medium">{space.size}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Antal rum</p>
                        <p className="font-medium">{space.rooms}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Våning</p>
                        <p className="font-medium">{space.floor}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Hyra</p>
                        <p className="font-medium">{space.rent}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Sökande</p>
                        <p className="font-medium">{space.seekers}</p>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold mb-4">
                      Planritning
                    </h3>
                    <div className="border rounded-lg overflow-hidden">
                      <AspectRatio ratio={16/9}>
                        <img
                          src="/placeholder.svg"
                          alt="Planritning för bostad"
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
