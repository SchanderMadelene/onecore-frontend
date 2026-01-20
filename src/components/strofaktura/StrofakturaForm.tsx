import { useState } from "react";
import { format } from "date-fns";
import { sv } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { CustomerSearchSection } from "./CustomerSearchSection";
import { LeaseContractSection } from "./LeaseContractSection";
import { ArticleSection } from "./ArticleSection";
import { AdditionalInfoSection } from "./AdditionalInfoSection";
import { CustomerSearchResult, CustomerLeaseContract } from "@/types/strofaktura";
import { getArticleByNumber } from "@/data/strofakturaArticles";

const strofakturaSchema = z.object({
  datum: z.date(),
  kundnummer: z.string().min(1, "Kundnummer krävs"),
  kundnamn: z.string(),
  hyreskontrakt: z.string().min(1, "Välj hyreskontrakt"),
  kst: z.string(),
  fastighet: z.string(),
  artikel: z.string().min(1, "Välj artikel"),
  artikelnummer: z.string(),
  text: z.string().optional(),
  antal: z.number().min(1, "Ange antal (minst 1)"),
  prisInkMoms: z.number().min(0, "Ange ett giltigt pris"),
  projekt: z.string().optional(),
  fakturanAvser: z.string().max(255).optional(),
  internInfo: z.string().max(255).optional(),
});

type StrofakturaFormData = z.infer<typeof strofakturaSchema>;

interface FormErrors {
  kundnummer?: string;
  hyreskontrakt?: string;
  artikel?: string;
  antal?: string;
  prisInkMoms?: string;
}

export function StrofakturaForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  // Mock current user - in real app this would come from auth context
  const currentUser = "Anna Andersson";

  // Form state
  const [datum, setDatum] = useState<Date>(new Date());
  const [kundnummer, setKundnummer] = useState("");
  const [kundnamn, setKundnamn] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerSearchResult | null>(null);
  const [leaseContracts, setLeaseContracts] = useState<CustomerLeaseContract[]>([]);
  const [hyreskontrakt, setHyreskontrakt] = useState("");
  const [kst, setKst] = useState("");
  const [fastighet, setFastighet] = useState("");
  const [artikel, setArtikel] = useState("");
  const [artikelnummer, setArtikelnummer] = useState("");
  const [text, setText] = useState("");
  const [antal, setAntal] = useState<number | string>(1);
  const [prisInkMoms, setPrisInkMoms] = useState<number | string>(0);
  const [projekt, setProjekt] = useState("");
  const [fakturanAvser, setFakturanAvser] = useState("");
  const [internInfo, setInternInfo] = useState("");

  const handleCustomerSelect = (customer: CustomerSearchResult | null) => {
    setSelectedCustomer(customer);
    if (customer) {
      setKundnummer(customer.customerNumber);
      setKundnamn(customer.fullName);
      setLeaseContracts(customer.leaseContracts);
      // Reset lease-related fields
      setHyreskontrakt("");
      setKst("");
      setFastighet("");
    } else {
      setKundnummer("");
      setKundnamn("");
      setLeaseContracts([]);
      setHyreskontrakt("");
      setKst("");
      setFastighet("");
    }
    setErrors(prev => ({ ...prev, kundnummer: undefined }));
  };

  const handleLeaseSelect = (leaseId: string) => {
    setHyreskontrakt(leaseId);
    const selectedLease = leaseContracts.find(l => l.leaseId === leaseId);
    if (selectedLease) {
      setKst(selectedLease.district);
      setFastighet(selectedLease.propertyName);
    }
    setErrors(prev => ({ ...prev, hyreskontrakt: undefined }));
  };

  const handleArticleSelect = (artikelnr: string) => {
    setArtikel(artikelnr);
    setArtikelnummer(artikelnr);
    const articleData = getArticleByNumber(artikelnr);
    if (articleData && articleData.standardPris > 0) {
      setPrisInkMoms(articleData.standardPris);
    }
    setErrors(prev => ({ ...prev, artikel: undefined }));
  };

  const validateForm = (): boolean => {
    const formData = {
      datum,
      kundnummer,
      kundnamn,
      hyreskontrakt,
      kst,
      fastighet,
      artikel,
      artikelnummer,
      text,
      antal: Number(antal),
      prisInkMoms: Number(prisInkMoms),
      projekt,
      fakturanAvser,
      internInfo,
    };

    const result = strofakturaSchema.safeParse(formData);
    
    if (!result.success) {
      const newErrors: FormErrors = {};
      result.error.errors.forEach(err => {
        const field = err.path[0] as keyof FormErrors;
        if (field in newErrors || ['kundnummer', 'hyreskontrakt', 'artikel', 'antal', 'prisInkMoms'].includes(field as string)) {
          newErrors[field] = err.message;
        }
      });
      setErrors(newErrors);
      return false;
    }

    setErrors({});
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Valideringsfel",
        description: "Kontrollera de markerade fälten och försök igen.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulera API-anrop
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast({
        title: "Underlag sparat",
        description: `Ströfaktura-underlag för ${kundnamn} har skapats.`,
      });

      // Reset form
      handleReset();
    } catch (error) {
      toast({
        title: "Fel",
        description: "Kunde inte spara underlaget. Försök igen.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setDatum(new Date());
    setKundnummer("");
    setKundnamn("");
    setSelectedCustomer(null);
    setLeaseContracts([]);
    setHyreskontrakt("");
    setKst("");
    setFastighet("");
    setArtikel("");
    setArtikelnummer("");
    setText("");
    setAntal(1);
    setPrisInkMoms(0);
    setProjekt("");
    setFakturanAvser("");
    setInternInfo("");
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Nytt ströfaktura-underlag</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Datum och Referens */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-3">
              <Label>Datum</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !datum && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {datum ? format(datum, "PPP", { locale: sv }) : <span>Välj datum</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={datum}
                    onSelect={(date) => date && setDatum(date)}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-3">
              <Label>Referens</Label>
              <Input
                value={currentUser}
                readOnly
                disabled
                className="bg-muted"
              />
            </div>
          </div>

          <Separator />

          {/* Kundsektion */}
          <div className="space-y-4">
            <h3 className="font-medium">Kundinformation</h3>
            <CustomerSearchSection
              value={kundnummer}
              customerName={kundnamn}
              onCustomerSelect={handleCustomerSelect}
              error={errors.kundnummer}
            />
          </div>

          <Separator />

          {/* Kontraktsektion */}
          <div className="space-y-4">
            <h3 className="font-medium">Kontraktsinformation</h3>
            <LeaseContractSection
              leaseContracts={leaseContracts}
              selectedLease={hyreskontrakt}
              kst={kst}
              fastighet={fastighet}
              onLeaseSelect={handleLeaseSelect}
              error={errors.hyreskontrakt}
              disabled={!selectedCustomer}
            />
          </div>

          <Separator />

          {/* Artikelsektion */}
          <div className="space-y-4">
            <h3 className="font-medium">Artikelinformation</h3>
            <ArticleSection
              selectedArticle={artikel}
              artikelnummer={artikelnummer}
              text={text}
              antal={antal}
              prisInkMoms={prisInkMoms}
              onArticleSelect={handleArticleSelect}
              onTextChange={setText}
              onAntalChange={setAntal}
              onPrisChange={setPrisInkMoms}
              errors={{
                artikel: errors.artikel,
                antal: errors.antal,
                prisInkMoms: errors.prisInkMoms,
              }}
            />
          </div>

          <Separator />

          {/* Övrig information */}
          <div className="space-y-4">
            <h3 className="font-medium">Övrig information</h3>
            <AdditionalInfoSection
              projekt={projekt}
              fakturanAvser={fakturanAvser}
              internInfo={internInfo}
              onProjektChange={setProjekt}
              onFakturanAvserChange={setFakturanAvser}
              onInternInfoChange={setInternInfo}
            />
          </div>

          <Separator />

          {/* Knappar */}
          <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-end">
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleReset}
              disabled={isSubmitting}
            >
              Rensa
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Sparar..." : "Spara underlag"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
