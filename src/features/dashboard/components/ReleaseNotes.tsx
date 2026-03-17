import { useState, useRef, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Newspaper, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
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
    <div className={`py-4 ${isFirst ? "" : "border-t border-border"}`}>
      <div className="space-y-1.5">
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant={config.variant}>
            {config.label}
          </Badge>
          <span className="text-xs text-muted-foreground">{note.date}</span>
        </div>
        <p className="text-sm font-semibold text-foreground">{note.title}</p>
        <p className="text-sm text-muted-foreground leading-relaxed">{note.description}</p>
      </div>
    </div>
  );
};

export const ReleaseNotes = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  const latestNote = releaseNotes[0];
  const totalPages = Math.ceil(releaseNotes.length / ITEMS_PER_PAGE);
  const paginatedNotes = releaseNotes.slice(
    page * ITEMS_PER_PAGE,
    (page + 1) * ITEMS_PER_PAGE
  );

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [isOpen, page]);

  const handleToggle = () => {
    setIsOpen((prev) => {
      if (prev) setPage(0);
      return !prev;
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        className={`
          rounded-xl border bg-card shadow-sm
          transition-all duration-300 ease-out
          ${isOpen ? "shadow-md ring-1 ring-primary/5" : "hover:shadow-md"}
        `}
      >
        {/* Header bar – toast-style */}
        <button
          onClick={handleToggle}
          className="w-full text-left px-4 py-3 flex items-center justify-between gap-3 group"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="flex items-center justify-center h-7 w-7 rounded-lg bg-primary/10 shrink-0">
              <Newspaper className="h-3.5 w-3.5 text-primary" />
            </div>
            <span className="text-sm font-medium text-foreground truncate">
              Nyheter & uppdateringar
            </span>
            <Badge variant="secondary" className="text-[10px] px-1.5 py-0 shrink-0 tabular-nums">
              {releaseNotes.length}
            </Badge>
          </div>
          <ChevronDown
            className={`
              h-4 w-4 text-muted-foreground shrink-0 
              transition-transform duration-300 ease-out
              group-hover:text-foreground
              ${isOpen ? "rotate-180" : ""}
            `}
          />
        </button>

        {/* Preview when collapsed */}
        {!isOpen && latestNote && (
          <div className="px-5 pb-4 pt-0">
            <div className="border-t border-border pt-3">
              <ReleaseNoteItem note={latestNote} isFirst />
            </div>
          </div>
        )}

        {/* Expandable content with smooth height animation */}
        <div
          className="overflow-hidden transition-all duration-300 ease-out"
          style={{ maxHeight: isOpen ? `${contentHeight + 32}px` : "0px" }}
        >
          <div ref={contentRef}>
            <div className="px-5 pb-2 pt-0">
              <div className="border-t border-border pt-1">
                {paginatedNotes.map((note, index) => (
                  <ReleaseNoteItem key={note.id} note={note} isFirst={index === 0} />
                ))}
              </div>
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-1.5 px-4 pb-3">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 min-h-0 min-w-0 rounded-lg"
                  onClick={(e) => { e.stopPropagation(); setPage((p) => Math.max(0, p - 1)); }}
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
                  onClick={(e) => { e.stopPropagation(); setPage((p) => Math.min(totalPages - 1, p + 1)); }}
                  disabled={page === totalPages - 1}
                >
                  <ChevronRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
