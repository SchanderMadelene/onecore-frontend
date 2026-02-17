import { SaveAsFavoriteButton, ActiveFavoriteIndicator } from "@/components/common";
import { FavoriteParameters } from "@/features/favorites/types/favorite";

interface TurnoverHeaderProps {
  getActiveFilters?: () => FavoriteParameters;
}

export function TurnoverHeader({ getActiveFilters }: TurnoverHeaderProps) {
  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Ut- & inflytt</h1>
          <p className="text-muted-foreground">
            Operativ checklista för ut- och inflyttningar
          </p>
        </div>
        <div className="flex gap-2">
          <SaveAsFavoriteButton
            category="turnover"
            pageTitle="Ut- & inflytt"
            defaultName="Min ut-/inflyttsvy"
            icon="🔄"
            variant="outline"
            getActiveFilters={getActiveFilters}
          />
        </div>
      </div>
      <ActiveFavoriteIndicator />
    </>
  );
}
