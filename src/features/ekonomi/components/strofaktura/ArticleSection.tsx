import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { strofakturaArticles } from "@/features/ekonomi/data";
import { cn } from "@/lib/utils";

interface ArticleSectionProps {
  selectedArticle: string;
  artikelnummer: string;
  avserObjektnummer: string;
  textRows: [string, string, string];
  antal: number | string;
  prisInkMoms: number | string;
  administrativaKostnader: boolean;
  hanteringsavgift: boolean;
  onArticleSelect: (artikelnummer: string) => void;
  onTextRowChange: (index: number, value: string) => void;
  onAntalChange: (antal: number) => void;
  onPrisChange: (pris: number) => void;
  onAdministrativaKostnaderChange: (checked: boolean) => void;
  onHandteringsavgiftChange: (checked: boolean) => void;
  errors?: {
    artikel?: string;
    antal?: string;
    prisInkMoms?: string;
  };
}

export function ArticleSection({
  selectedArticle,
  artikelnummer,
  avserObjektnummer,
  textRows,
  antal,
  prisInkMoms,
  administrativaKostnader,
  hanteringsavgift,
  onArticleSelect,
  onTextRowChange,
  onAntalChange,
  onPrisChange,
  onAdministrativaKostnaderChange,
  onHandteringsavgiftChange,
  errors
}: ArticleSectionProps) {
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
      <div className="rounded-lg border border-border p-4 space-y-4 bg-muted/30">
        <div className="space-y-3">
          <Label>Text</Label>
          <div className="space-y-2">
            <Input
              id="text1"
              value={textRows[0]}
              onChange={(e) => onTextRowChange(0, e.target.value)}
              placeholder="Textrad 1..."
            />
            <Input
              id="text2"
              value={textRows[1]}
              onChange={(e) => onTextRowChange(1, e.target.value)}
              placeholder="Textrad 2 (valfri)..."
            />
            <Input
              id="text3"
              value={textRows[2]}
              onChange={(e) => onTextRowChange(2, e.target.value)}
              placeholder="Textrad 3 (valfri)..."
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="antal">Antal</Label>
            <Input
              id="antal"
              type="number"
              min={1}
              value={antal}
              onChange={(e) => onAntalChange(Number(e.target.value))}
              className={cn(errors?.antal && "border-destructive")}
            />
            {errors?.antal && <p className="text-sm text-destructive">{errors.antal}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="prisInkMoms">Pris (ink. moms)</Label>
            <Input
              id="prisInkMoms"
              type="number"
              min={0}
              step={0.01}
              value={prisInkMoms}
              onChange={(e) => onPrisChange(Number(e.target.value))}
              className={cn(errors?.prisInkMoms && "border-destructive")}
            />
            {errors?.prisInkMoms && <p className="text-sm text-destructive">{errors.prisInkMoms}</p>}
          </div>
        </div>
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
