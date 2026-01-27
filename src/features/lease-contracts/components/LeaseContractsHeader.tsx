import { SaveAsFavoriteButton } from "@/features/shared/components";

export function LeaseContractsHeader() {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-3xl font-bold">Hyreskontrakt</h1>
        <p className="text-muted-foreground">
          Hantera och sök bland alla hyreskontrakt
        </p>
      </div>
      <SaveAsFavoriteButton
        category="rentals"
        pageTitle="Hyreskontrakt"
        defaultName="Min hyreskontraktsvy"
        icon="📄"
      />
    </div>
  );
}
