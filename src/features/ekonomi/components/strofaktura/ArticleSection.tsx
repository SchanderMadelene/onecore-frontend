import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { strofakturaArticles } from "@/features/ekonomi/data";
import { cn } from "@/lib/utils";
import { InvoiceRow } from "@/features/ekonomi/types/invoice-row";

interface ArticleSectionProps {
  selectedArticle: string;
  artikelnummer: string;
  avserObjektnummer: string;
  invoiceRows: InvoiceRow[];
  administrativaKostnader: boolean;
  hanteringsavgift: boolean;
  onArticleSelect: (artikelnummer: string) => void;
  onInvoiceRowsChange: (rows: InvoiceRow[]) => void;
  onAdministrativaKostnaderChange: (checked: boolean) => void;
  onHandteringsavgiftChange: (checked: boolean) => void;
  errors?: {
    artikel?: string;
  };
}

export function ArticleSection({
  selectedArticle,
  artikelnummer,
  avserObjektnummer,
  invoiceRows,
  administrativaKostnader,
  hanteringsavgift,
  onArticleSelect,
  onInvoiceRowsChange,
  onAdministrativaKostnaderChange,
  onHandteringsavgiftChange,
  errors
}: ArticleSectionProps) {
  const handleRowChange = (index: number, field: keyof InvoiceRow, value: string | number) => {
    const newRows = [...invoiceRows];
    if (field === 'text') {
      newRows[index] = { ...newRows[index], text: value as string };
    } else if (field === 'antal') {
      newRows[index] = { ...newRows[index], antal: Number(value) || 1 };
    } else if (field === 'pris') {
      newRows[index] = { ...newRows[index], pris: Number(value) || 0 };
    }
    onInvoiceRowsChange(newRows);
  };

  const handleAddRow = () => {
    onInvoiceRowsChange([...invoiceRows, { text: "", antal: 1, pris: 0 }]);
  };

  const handleRemoveRow = (index: number) => {
    if (invoiceRows.length > 1) {
      onInvoiceRowsChange(invoiceRows.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="avserObjektnummer">Avser objektsnummer</Label>
        <Input
          id="avserObjektnummer"
          value={avserObjektnummer}
          readOnly
          disabled
          placeholder="Fylls i automatiskt från kontrakt"
          className="bg-muted"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="artikel">Artikel</Label>
          <Select value={selectedArticle} onValueChange={onArticleSelect}>
            <SelectTrigger 
              id="artikel"
              className={cn(errors?.artikel && "border-destructive")}
            >
              <SelectValue placeholder="Välj artikel" />
            </SelectTrigger>
            <SelectContent>
              {strofakturaArticles.map((article) => (
                <SelectItem key={article.artikelnummer} value={article.artikelnummer}>
                  {article.namn}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors?.artikel && <p className="text-sm text-destructive">{errors.artikel}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="artikelnummer">Artikelnummer</Label>
          <Input
            id="artikelnummer"
            value={artikelnummer}
            readOnly
            disabled
            placeholder="Fylls i automatiskt"
            className="bg-muted"
          />
        </div>
      </div>

      {/* Fakturarader - grupperat */}
      <div className="rounded-lg border border-border p-4 space-y-3 bg-muted/30">
        <Label>Fakturarader</Label>
        
        {/* Header row - only visible on larger screens */}
        <div className="hidden sm:grid sm:grid-cols-[1fr_80px_100px_40px] gap-2 text-sm text-muted-foreground">
          <span>Text</span>
          <span>Antal</span>
          <span>Pris (ink. moms)</span>
          <span></span>
        </div>

        {invoiceRows.map((row, index) => (
          <div key={index} className="space-y-2 sm:space-y-0 sm:grid sm:grid-cols-[1fr_80px_100px_40px] gap-2">
            <div className="space-y-1 sm:space-y-0">
              <Label className="sm:hidden text-xs text-muted-foreground">Text</Label>
              <Input
                value={row.text}
                onChange={(e) => handleRowChange(index, 'text', e.target.value)}
                placeholder="Beskrivning..."
              />
            </div>
            <div className="space-y-1 sm:space-y-0">
              <Label className="sm:hidden text-xs text-muted-foreground">Antal</Label>
              <Input
                type="number"
                min={1}
                value={row.antal}
                onChange={(e) => handleRowChange(index, 'antal', e.target.value)}
              />
            </div>
            <div className="space-y-1 sm:space-y-0">
              <Label className="sm:hidden text-xs text-muted-foreground">Pris (ink. moms)</Label>
              <Input
                type="number"
                min={0}
                step={0.01}
                value={row.pris}
                onChange={(e) => handleRowChange(index, 'pris', e.target.value)}
              />
            </div>
            <div className="flex items-end sm:items-center justify-end sm:justify-center">
              {invoiceRows.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveRow(index)}
                  className="shrink-0 h-9 w-9"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleAddRow}
        >
          <Plus className="h-4 w-4 mr-1" />
          Lägg till rad
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 pt-2">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="administrativaKostnader"
            checked={administrativaKostnader}
            onCheckedChange={onAdministrativaKostnaderChange}
            className="rounded-[2px]"
          />
          <Label 
            htmlFor="administrativaKostnader" 
            className="text-sm font-normal cursor-pointer"
          >
            Administrativa kostnader
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="hanteringsavgift"
            checked={hanteringsavgift}
            onCheckedChange={onHandteringsavgiftChange}
            className="rounded-[2px]"
          />
          <Label 
            htmlFor="hanteringsavgift" 
            className="text-sm font-normal cursor-pointer"
          >
            Hanteringsavgift
          </Label>
        </div>
      </div>
    </div>
  );
}
