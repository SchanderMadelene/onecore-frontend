import { useState, useRef, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Newspaper, ChevronLeft, ChevronRight, X } from "lucide-react";
import { releaseNotes, type ReleaseCategory } from "@/data/releaseNotes";

const categoryConfig: Record<ReleaseCategory, { label: string; variant: "warning" | "muted" | "info" }> = {
  information: { label: "Information", variant: "warning" },
  buggfix: { label: "Buggfix", variant: "muted" },
  "ny-funktion": { label: "Ny funktion", variant: "info" },
};

const ITEMS_PER_PAGE = 3;

const ReleaseNoteItem = ({ note, isFirst = false }: { note: typeof releaseNotes[0]; isFirst?: boolean }) => {
  const config = categoryConfig[note.category];

  return (
    <div className={`py-3.5 ${isFirst ? "" : "border-t border-border"}`}>
      <div className="space-y-1">
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant={config.variant}>{config.label}</Badge>
          <span className="text-xs text-muted-foreground">{note.date}</span>
        </div>
        <p className="text-sm font-semibold text-foreground">{note.title}</p>
        <p className="text-sm text-muted-foreground leading-relaxed">{note.description}</p>
      </div>
    </div>
  );
};

interface ReleaseNotesProps {
  floating?: boolean;
}

export const ReleaseNotes = ({ floating = false }: ReleaseNotesProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);

  const totalPages = Math.ceil(releaseNotes.length / ITEMS_PER_PAGE);
  const paginatedNotes = releaseNotes.slice(
    page * ITEMS_PER_PAGE,
    (page + 1) * ITEMS_PER_PAGE
  );

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setPage(0);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen]);

  if (floating) {
    return (
      <div className="relative z-[80]" ref={panelRef}>
        {/* Trigger – icon button style to match navbar */}
        <button
          onClick={() => { setIsOpen(!isOpen); if (isOpen) setPage(0); }}
          className={`
            inline-flex items-center gap-2 px-4 py-2 rounded-full
            text-xs font-medium transition-all duration-200 ease-out
            touch-manipulation active:scale-[0.97]
            bg-foreground text-background
            hover:shadow-lg hover:shadow-foreground/20 hover:-translate-y-0.5
            ${isOpen ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : ""}
          `}
          style={{ WebkitTapHighlightColor: 'transparent' }}
        >
          Release notes
          <span className="inline-flex items-center justify-center h-5 min-w-[20px] px-1.5 rounded-full text-[11px] font-bold leading-none bg-background/20 text-background">
            {releaseNotes.length}
          </span>
        </button>

        {/* Dropdown panel */}
        {isOpen && (
          <div
            className={`
              absolute top-full right-0 mt-2
              w-[380px] max-w-[calc(100vw-2rem)]
              rounded-xl border bg-card shadow-xl
              animate-fade-in
              overflow-hidden
            `}
          >
            {/* Panel header */}
            <div className="px-4 py-3 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Newspaper className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold text-foreground">Nyheter & uppdateringar</span>
              </div>
              <button
                onClick={() => { setIsOpen(false); setPage(0); }}
                className="h-6 w-6 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Notes list */}
            <div className="px-4 max-h-[60vh] overflow-y-auto">
              {paginatedNotes.map((note, index) => (
                <ReleaseNoteItem key={note.id} note={note} isFirst={index === 0} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-1.5 px-4 py-2.5 border-t border-border">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 min-h-0 min-w-0 rounded-lg"
                  onClick={() => setPage((p) => Math.max(0, p - 1))}
                  disabled={page === 0}
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                </Button>
                <span className="text-xs text-muted-foreground tabular-nums min-w-[3ch] text-center">
                  {page + 1} / {totalPages}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 min-h-0 min-w-0 rounded-lg"
                  onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                  disabled={page === totalPages - 1}
                >
                  <ChevronRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  // Inline fallback (non-floating)
  return null;
};
