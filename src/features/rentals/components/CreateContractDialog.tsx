import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePicker } from "@/shared/common/date-picker";
import { toast } from "sonner";

interface CreateContractDialogProps {
  applicantName: string;
  applicantCustomerNumber: string;
  housingAddress: string;
  defaultRent?: string;
  trigger?: React.ReactNode;
}

export function CreateContractDialog({
  applicantName,
  applicantCustomerNumber,
  housingAddress,
  defaultRent = "",
  trigger,
}: CreateContractDialogProps) {
  const [open, setOpen] = useState(false);
  const [contractType, setContractType] = useState("tillsvidare");
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [rent, setRent] = useState(defaultRent);
  const [signingMethod, setSigningMethod] = useState("digital");
  const [terms, setTerms] = useState("");

  const handleSubmit = () => {
    if (!startDate) {
      toast.error("Ange kontraktsstart");
      return;
    }
    toast.success(`Kontrakt skapat för ${applicantName}`);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? <Button size="sm">Skapa kontrakt</Button>}
      </DialogTrigger>
      <DialogContent className="max-w-xl flex flex-col max-h-[90vh] p-0 gap-0">
        <DialogHeader className="p-6 pb-4 border-b">
          <DialogTitle>Skapa hyreskontrakt</DialogTitle>
          <p className="text-sm text-muted-foreground mt-1">
            {applicantName} ({applicantCustomerNumber}) → {housingAddress}
          </p>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="space-y-2">
            <Label>Kontraktstyp</Label>
            <Select value={contractType} onValueChange={setContractType}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="tillsvidare">Tillsvidare</SelectItem>
                <SelectItem value="korttid">Korttidskontrakt</SelectItem>
                <SelectItem value="provboende">Provboende</SelectItem>
                <SelectItem value="andrahand">Andrahandskontrakt</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Kontraktsstart</Label>
            <DatePicker date={startDate} onDateChange={setStartDate} placeholder="Välj startdatum" />
          </div>

          <div className="space-y-2">
            <Label>Månadshyra</Label>
            <Input value={rent} onChange={(e) => setRent(e.target.value)} placeholder="t.ex. 8 900 kr" />
          </div>

          <div className="space-y-2">
            <Label>Signeringsmetod</Label>
            <Select value={signingMethod} onValueChange={setSigningMethod}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="digital">Digital signering (BankID)</SelectItem>
                <SelectItem value="papper">Pappersavtal</SelectItem>
                <SelectItem value="kontor">Signering på kontor</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Särskilda villkor (valfritt)</Label>
            <Textarea
              value={terms}
              onChange={(e) => setTerms(e.target.value)}
              placeholder="Eventuella tilläggsvillkor..."
              rows={3}
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 p-6 pt-4 border-t bg-background">
          <Button variant="outline" onClick={() => setOpen(false)}>Avbryt</Button>
          <Button onClick={handleSubmit}>Skapa kontrakt</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
