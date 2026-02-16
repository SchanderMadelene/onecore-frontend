import { SaveAsFavoriteButton, ActiveFavoriteIndicator } from "@/components/common";

export function TurnoverHeader() {
  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">In- och utflytt</h1>
          <p className="text-muted-foreground">
            Operativ checklista för in- och utflyttningar
          </p>
        </div>
        <div className="flex gap-2">
          <SaveAsFavoriteButton
            category="turnover"
            pageTitle="In- och utflytt"
            defaultName="Min in-/utflyttsvy"
            icon="🔄"
            variant="outline"
          />
        </div>
      </div>
      <ActiveFavoriteIndicator />
    </>
  );
}
