import { SaveAsFavoriteButton } from "@/features/shared/components";

export function RentalsHeader() {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-3xl font-bold">Uthyrning</h1>
        <p className="text-muted-foreground mt-1">
          Hantera bostäder, parkeringsplatser och ansökningar
        </p>
      </div>
      <SaveAsFavoriteButton
        category="rentals"
        pageTitle="Uthyrning"
        defaultName="Min uthyrningsvy"
        icon="🔑"
      />
    </div>
  );
}