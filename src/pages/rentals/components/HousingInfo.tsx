import { AspectRatio } from "@/components/ui/aspect-ratio";
import type { HousingListing } from "@/hooks/useHousingListing";

interface HousingInfoProps {
  housing: HousingListing;
  applicantCount: number;
}

export function HousingInfo({ housing, applicantCount }: HousingInfoProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <section>
        <h3 className="text-lg font-semibold mb-4">Objektsinformation</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        <h3 className="text-lg font-semibold mb-4">
          Planritning
        </h3>
        <div className="border rounded-lg overflow-hidden">
          <AspectRatio ratio={4/3}>
            <img
              src="/placeholder.svg"
              alt="Planritning för lägenhet"
              className="w-full h-full object-cover bg-muted"
            />
          </AspectRatio>
        </div>
      </section>
    </div>
  );
}