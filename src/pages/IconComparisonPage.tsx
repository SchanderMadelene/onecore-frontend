
import { Home, Layers, ArrowUpFromLine, Columns2, LayoutList, Hash, GitBranch, ArrowUpToLine } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const candidates = [
  { name: "Home", Icon: Home, desc: "Nuvarande — kan förväxlas med lägenhet" },
  { name: "Layers", Icon: Layers, desc: "Lager/nivåer" },
  { name: "ArrowUpFromLine", Icon: ArrowUpFromLine, desc: "Pil uppåt — 'uppgång'" },
  { name: "Columns2", Icon: Columns2, desc: "Vertikala sektioner" },
  { name: "LayoutList", Icon: LayoutList, desc: "Listelement" },
  { name: "Hash", Icon: Hash, desc: "Numrering" },
  { name: "GitBranch", Icon: GitBranch, desc: "Förgreningspunkt" },
  { name: "ArrowUpToLine", Icon: ArrowUpToLine, desc: "Pil uppåt till linje" },
];

const IconComparisonPage = () => (
  <div className="p-6 max-w-3xl mx-auto">
    <h1 className="text-2xl font-bold mb-6">Ikon-alternativ för Uppgång</h1>
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {candidates.map(({ name, Icon, desc }) => (
        <Card key={name} className="text-center">
          <CardContent className="pt-6 flex flex-col items-center gap-2">
            <Icon className="h-8 w-8 text-muted-foreground" />
            <span className="font-medium text-sm">{name}</span>
            <span className="text-xs text-muted-foreground">{desc}</span>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default IconComparisonPage;
