import { useState } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { PreviewHousingAdDialog } from "@/features/rentals/components/PreviewHousingAdDialog";
import type { UnpublishedHousingSpace } from "@/features/rentals/components/types/unpublished-housing";
import type { HousingListing } from "@/features/rentals/hooks/useHousingListing";
import type { ReactNode } from "react";

interface HousingInfoProps {
  housing: HousingListing;
  applicantCount: number;
  notesSlot?: ReactNode;
}

export function HousingInfo({ housing, applicantCount, notesSlot }: HousingInfoProps) {
  const [previewOpen, setPreviewOpen] = useState(false);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <section>
        <div className="flex items-center justify-between mb-4 gap-2">
          <h3 className="text-lg font-semibold">Objektsinformation</h3>
          <Button variant="outline" size="sm" onClick={() => setPreviewOpen(true)}>
            Förhandsgranska annons
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Lägenhet</p>
            <p className="font-medium">{housing.address}</p>
            <p className="text-sm">{housing.id}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Område</p>
            <p className="font-medium">{housing.area}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Lägenhetstyp</p>
            <p className="font-medium">{housing.type}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Antal rum</p>
            <p className="font-medium">{housing.rooms}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Storlek</p>
            <p className="font-medium">{housing.size}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Våning</p>
            <p className="font-medium">{housing.floor}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Hyra</p>
            <p className="font-medium">{housing.rent}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Sökande</p>
            <p className="font-medium">{applicantCount}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Publicerad t.o.m</p>
            <p className="font-medium">{new Date(housing.publishedTo).toLocaleDateString('sv-SE')}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Ledig från och med</p>
            <p className="font-medium">{new Date(housing.availableFrom).toLocaleDateString('sv-SE')}</p>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-4">Planritning</h3>
        <div className="border rounded-lg overflow-hidden">
          <AspectRatio ratio={4 / 3}>
            <img
              src="/placeholder.svg"
              alt="Planritning för lägenhet"
              className="w-full h-full object-cover bg-muted"
            />
          </AspectRatio>
        </div>
      </section>

      {notesSlot && <section>{notesSlot}</section>}
    </div>
  );
}
