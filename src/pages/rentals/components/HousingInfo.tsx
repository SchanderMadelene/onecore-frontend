import { AspectRatio } from "@/components/ui/aspect-ratio";
import type { HousingListing } from "@/features/rentals/hooks/useHousingListing";
import type { ReactNode } from "react";
import floorplanExample from "@/assets/floorplan-example.jpg";

interface HousingInfoProps {
  housing: HousingListing;
  applicantCount: number;
  notesSlot?: ReactNode;
}

export function HousingInfo({ housing, applicantCount, notesSlot }: HousingInfoProps) {
  const formatDate = (value?: string) => {
    if (!value) return "-";
    const d = new Date(value);
    return isNaN(d.getTime()) ? "-" : d.toLocaleDateString('sv-SE');
  };
  const slug = housing.address
    .toLowerCase()
    .replace(/[åä]/g, "a")
    .replace(/ö/g, "o")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  const mimerAdUrl = `https://www.mimer.nu/lediga-objekt/${slug}-${housing.id}`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <section>
        <h3 className="text-lg font-semibold mb-4">Objektsinformation</h3>
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
          <div className="space-y-1 sm:col-span-2">
            <p className="text-sm text-muted-foreground">Annons</p>
            <a
              href={mimerAdUrl}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-primary underline underline-offset-4 hover:no-underline"
            >
              Visa annons på Mimer.nu
            </a>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-4">Planritning</h3>
        <div className="border rounded-lg overflow-hidden">
          <AspectRatio ratio={4 / 3}>
            <img
              src={floorplanExample}
              alt="Planritning för lägenhet"
              loading="lazy"
              width={1024}
              height={768}
              className="w-full h-full object-contain bg-muted"
            />
          </AspectRatio>
        </div>
      </section>

      {notesSlot && (
        <section>
          <h3 className="text-lg font-semibold mb-4">Noteringar</h3>
          {notesSlot}
        </section>
      )}
    </div>
  );
}
