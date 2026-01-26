import { SaveAsFavoriteButton } from "@/components/shared/SaveAsFavoriteButton";
import { ActiveFavoriteIndicator } from "@/components/shared/ActiveFavoriteIndicator";
import { CreateBarrierDialog } from "./CreateBarrierDialog";

interface BarriersHeaderProps {
  onBarrierCreated: () => void;
}

export function BarriersHeader({ onBarrierCreated }: BarriersHeaderProps) {
  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Spärrar</h1>
          <p className="text-muted-foreground">
            Hantera spärrar för bostäder och bilplatser i systemet
          </p>
        </div>
        <div className="flex gap-2">
          <SaveAsFavoriteButton
            category="barriers"
            pageTitle="Spärrar"
            defaultName="Min spärrvy"
            icon="🚫"
            variant="outline"
          />
          <CreateBarrierDialog onBarrierCreated={onBarrierCreated} />
        </div>
      </div>
      <ActiveFavoriteIndicator />
    </>
  );
}
