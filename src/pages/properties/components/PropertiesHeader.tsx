import { SaveAsFavoriteButton } from "@/components/shared/SaveAsFavoriteButton";
import { ActiveFavoriteIndicator } from "@/components/shared/ActiveFavoriteIndicator";

export function PropertiesHeader() {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Fastigheter</h1>
          <p className="text-muted-foreground">
            Översikt över alla fastigheter i systemet
          </p>
        </div>
        <SaveAsFavoriteButton
          category="properties"
          pageTitle="Alla fastigheter"
          defaultName="Min fastighetsvy"
          icon="🏢"
        />
      </div>
      <ActiveFavoriteIndicator />
    </>
  );
}
