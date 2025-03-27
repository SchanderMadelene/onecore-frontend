
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// Mock data for housing references
const housingReferencesData = {
  currentHousingForm: "Hyresrätt",
  adultsInHousehold: 2,
  childrenInHousehold: 1,
  referenceStatus: "approved", // approved, rejected, contacted, notRequired
  referenceInfo: "Tidigare hyresvärd: AB Stockholmshem",
  lastUpdated: "2023-04-15",
  updatedBy: "Maria Svensson",
  validUntil: "2025-04-15",
  notes: "God betalningsförmåga, inga anmärkningar från tidigare hyresvärd."
};

export function TenantHousingReferences() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Boendereferenser</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-bold text-sm uppercase mb-2">Nuvarande boendeform</h3>
          <Select defaultValue={housingReferencesData.currentHousingForm} disabled>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Välj" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Hyresrätt">Hyresrätt</SelectItem>
              <SelectItem value="Bostadsrätt">Bostadsrätt</SelectItem>
              <SelectItem value="Villa">Villa</SelectItem>
              <SelectItem value="Inneboende">Inneboende</SelectItem>
              <SelectItem value="Annat">Annat</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-bold text-sm uppercase mb-2">Antal vuxna i hushåll</h3>
            <Input type="number" value={housingReferencesData.adultsInHousehold} readOnly />
          </div>
          <div>
            <h3 className="font-bold text-sm uppercase mb-2">Antal barn i hushåll</h3>
            <Input type="number" value={housingReferencesData.childrenInHousehold} readOnly />
          </div>
        </div>

        <Separator className="my-4" />

        <div>
          <h3 className="font-bold text-sm uppercase mb-4">Ange status boendereferens</h3>
          <RadioGroup defaultValue={housingReferencesData.referenceStatus} className="flex flex-wrap gap-x-6 gap-y-3">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="approved" id="approved" />
              <Label htmlFor="approved">Godkänd</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="rejected" id="rejected" />
              <Label htmlFor="rejected">Ej godkänd</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="contacted" id="contacted" />
              <Label htmlFor="contacted">Kontaktad - ej svar</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="notRequired" id="notRequired" />
              <Label htmlFor="notRequired">Referens krävs ej</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-sm mb-1">Referensuppgifter från kund</p>
            <p className="font-medium">{housingReferencesData.referenceInfo}</p>
          </div>
          
          <div>
            <p className="text-sm mb-1">Boendereferens hanterad/uppdaterad</p>
            <p className="font-medium">{new Date(housingReferencesData.lastUpdated).toLocaleDateString('sv-SE')}</p>
          </div>
          
          <div>
            <p className="text-sm mb-1">Senast uppdaterad av</p>
            <p className="font-medium">{housingReferencesData.updatedBy}</p>
          </div>
          
          <div>
            <p className="text-sm mb-1">Boendereferens giltig till</p>
            <p className="font-medium">{new Date(housingReferencesData.validUntil).toLocaleDateString('sv-SE')}</p>
          </div>
        </div>

        <div>
          <h3 className="font-bold text-sm uppercase mb-2">Notering/kommentar</h3>
          <Textarea 
            value={housingReferencesData.notes} 
            readOnly
            className="min-h-[100px] resize-none"
          />
        </div>
      </CardContent>
    </Card>
  );
}
