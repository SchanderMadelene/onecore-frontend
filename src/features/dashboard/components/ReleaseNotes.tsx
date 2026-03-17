import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Newspaper, ChevronDown, ChevronLeft, ChevronRight, AlertTriangle, Settings2, Sparkles } from "lucide-react";
import { releaseNotes, type ReleaseCategory } from "@/data/releaseNotes";

const categoryConfig: Record<ReleaseCategory, { label: string; variant: "warning" | "muted" | "info"; icon: typeof AlertTriangle }> = {
  information: { label: "Information", variant: "warning", icon: AlertTriangle },
  buggfix: { label: "Buggfix", variant: "muted", icon: Wrench },
  "ny-funktion": { label: "Ny funktion", variant: "info", icon: Sparkles },
};

const ITEMS_PER_PAGE = 3;

const ReleaseNoteItem = ({ note }: { note: typeof releaseNotes[0] }) => {
  const config = categoryConfig[note.category];
  const Icon = config.icon;

  return (
    <div className="flex gap-3 py-3 first:pt-0 last:pb-0">
      <div className="mt-0.5 shrink-0">
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-medium">{note.title}</span>
          <Badge variant={config.variant} className="text-[10px] px-1.5 py-0">
            {config.label}
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground">{note.description}</p>
        <p className="text-[10px] text-muted-foreground/60">{note.date}</p>
      </div>
    </div>
  );
};

export const ReleaseNotes = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(0);

  const latestNote = releaseNotes[0];
  const totalPages = Math.ceil(releaseNotes.length / ITEMS_PER_PAGE);
  const paginatedNotes = releaseNotes.slice(
    page * ITEMS_PER_PAGE,
    (page + 1) * ITEMS_PER_PAGE
  );

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div className="rounded-lg border bg-card shadow-sm">
          <CollapsibleTrigger className="w-full text-left">
            <div className="px-4 py-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 min-w-0">
                <Newspaper className="h-4 w-4 text-primary shrink-0" />
                <span className="text-sm font-medium truncate">Nyheter & uppdateringar</span>
                <Badge variant="secondary" className="text-[10px] px-1.5 py-0 shrink-0">
                  {releaseNotes.length}
                </Badge>
              </div>
              <ChevronDown
                className={`h-4 w-4 text-muted-foreground shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
              />
            </div>
            {!isOpen && latestNote && (
              <div className="px-4 pb-3 border-t pt-3 mx-4 -mt-0.5">
                <ReleaseNoteItem note={latestNote} />
              </div>
            )}
          </CollapsibleTrigger>

          <CollapsibleContent>
            <div className="border-t mx-4" />
            <div className="px-4 py-3 divide-y divide-border">
              {paginatedNotes.map((note) => (
                <ReleaseNoteItem key={note.id} note={note} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 px-4 pb-3">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 min-h-0 min-w-0"
                  onClick={(e) => { e.stopPropagation(); setPage((p) => Math.max(0, p - 1)); }}
                  disabled={page === 0}
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                </Button>
                <span className="text-xs text-muted-foreground">
                  {page + 1} / {totalPages}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 min-h-0 min-w-0"
                  onClick={(e) => { e.stopPropagation(); setPage((p) => Math.min(totalPages - 1, p + 1)); }}
                  disabled={page === totalPages - 1}
                >
                  <ChevronRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            )}
          </CollapsibleContent>
        </div>
      </Collapsible>
    </div>
  );
};
