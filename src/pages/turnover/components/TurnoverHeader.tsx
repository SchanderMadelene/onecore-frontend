import { SaveAsFavoriteButton } from "@/components/shared/SaveAsFavoriteButton";
import { ActiveFavoriteIndicator } from "@/components/shared/ActiveFavoriteIndicator";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function TurnoverHeader() {
  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">In- och utflytt</h1>
          <p className="text-muted-foreground">
            Översikt och hantering av in- och utflyttärenden
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
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nytt ärende
          </Button>
        </div>
      </div>
      <ActiveFavoriteIndicator />
    </>
  );
}
