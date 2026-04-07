import { useState } from "react";
import { addDays, format } from "date-fns";
import { sv } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface SendHousingOfferDialogProps {
  selectedCount: number;
  disabled?: boolean;
  onConfirm: (options: {
    responseDeadline: Date;
    viewingHost: "mimer" | "tenant";
    viewingDate: Date | undefined;
    templateId: string | undefined;
  }) => void;
  isPending?: boolean;
}

const emailTemplates = [
  { id: "standard-erbjudande", name: "Standarderbjudande" },
  { id: "erbjudande-med-visning", name: "Erbjudande med visning" },
];

export function SendHousingOfferDialog({
  selectedCount,
  disabled,
  onConfirm,
  isPending,
}: SendHousingOfferDialogProps) {
  const [open, setOpen] = useState(false);
  const [responseDeadline, setResponseDeadline] = useState<Date>(addDays(new Date(), 10));
  const [viewingHost, setViewingHost] = useState<"mimer" | "tenant">("mimer");
  const [viewingDate, setViewingDate] = useState<Date | undefined>();
  const [templateId, setTemplateId] = useState<string | undefined>();

  const handleConfirm = () => {
    onConfirm({ responseDeadline, viewingHost, viewingDate, templateId });
    setOpen(false);
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (nextOpen) {
      setResponseDeadline(addDays(new Date(), 10));
      setViewingHost("mimer");
      setViewingDate(undefined);
      setTemplateId(undefined);
    }
    setOpen(nextOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button disabled={disabled || isPending}>
          {isPending ? "Skickar..." : "Skicka erbjudande"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Skicka erbjudande</DialogTitle>
          <DialogDescription>
            Erbjudandet skickas till {selectedCount} valda sökande.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 py-2">
          {/* Response deadline */}
          <div className="space-y-2">
            <Label>Sista svarsdatum</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !responseDeadline && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {responseDeadline
                    ? format(responseDeadline, "PPP", { locale: sv })
                    : "Välj datum"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={responseDeadline}
                  onSelect={(d) => d && setResponseDeadline(d)}
                  disabled={(date) => date < new Date()}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Viewing host */}
          <div className="space-y-2">
            <Label>Vem håller i visning?</Label>
            <RadioGroup
              value={viewingHost}
              onValueChange={(v) => setViewingHost(v as "mimer" | "tenant")}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="mimer" id="host-mimer" />
                <Label htmlFor="host-mimer" className="font-normal cursor-pointer">
                  Mimer
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="tenant" id="host-tenant" />
                <Label htmlFor="host-tenant" className="font-normal cursor-pointer">
                  Befintlig hyresgäst
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Viewing date */}
          <div className="space-y-2">
            <Label>Datum för visning</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !viewingDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {viewingDate
                    ? format(viewingDate, "PPP", { locale: sv })
                    : "Välj datum för visning"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={viewingDate}
                  onSelect={setViewingDate}
                  disabled={(date) => date < new Date()}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Email template */}
          <div className="space-y-2">
            <Label>Välj mall för utskick</Label>
            <Select value={templateId} onValueChange={setTemplateId}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Välj mall..." />
              </SelectTrigger>
              <SelectContent>
                {emailTemplates.map((t) => (
                  <SelectItem key={t.id} value={t.id}>
                    {t.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Avbryt
          </Button>
          <Button onClick={handleConfirm} disabled={isPending}>
            {isPending ? "Skickar..." : "Skicka"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
