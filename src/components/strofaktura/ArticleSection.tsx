import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { strofakturaArticles } from "@/data/strofakturaArticles";
import { cn } from "@/lib/utils";

interface ArticleSectionProps {
  selectedArticle: string;
  artikelnummer: string;
  text: string;
  antal: number | string;
  prisInkMoms: number | string;
  onArticleSelect: (artikelnummer: string) => void;
  onTextChange: (text: string) => void;
  onAntalChange: (antal: number) => void;
  onPrisChange: (pris: number) => void;
  errors?: {
    artikel?: string;
    antal?: string;
    prisInkMoms?: string;
  };
}

export function ArticleSection({
  selectedArticle,
  artikelnummer,
  text,
  antal,
  prisInkMoms,
  onArticleSelect,
  onTextChange,
  onAntalChange,
  onPrisChange,
  errors
}: ArticleSectionProps) {
  return (
    <div className="space-y-4">
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

      <div className="space-y-2">
        <Label htmlFor="text">Text</Label>
        <Input
          id="text"
          value={text}
          onChange={(e) => onTextChange(e.target.value)}
          placeholder="Beskrivning av debiteringen..."
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
  );
}
