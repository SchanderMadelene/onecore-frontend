import { SaveAsFavoriteButton, ActiveFavoriteIndicator } from "@/components/common";

export function InspectionsHeader() {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Besiktningar</h1>
          <p className="text-muted-foreground">
            Översikt över alla besiktningar och tilldelningar
          </p>
        </div>
        <SaveAsFavoriteButton
          category="inspections"
          pageTitle="Alla besiktningar"
          defaultName="Min besiktningsvy"
          icon="📋"
        />
      </div>
      <ActiveFavoriteIndicator />
    </>
  );
}
