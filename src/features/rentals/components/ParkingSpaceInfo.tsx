import { AspectRatio } from "@/components/ui/aspect-ratio";

interface ParkingSpaceInfoProps {
  space: {
    id: string;
    address: string;
    area: string;
    type: string;
    rent: string;
    queueType: string;
    publishedFrom: string;
    publishedTo: string;
  };
  applicantCount: number;
}

export function ParkingSpaceInfo({ space, applicantCount }: ParkingSpaceInfoProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <section>
        <h3 className="text-lg font-semibold mb-4">Objektsinformation</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Bilplats</p>
            <p className="font-medium">{space.address}</p>
            <p className="text-sm">{space.id}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Område</p>
            <p className="font-medium">{space.area}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Bilplatstyp</p>
            <p className="font-medium">{space.type}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Hyra</p>
            <p className="font-medium">{space.rent}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Sökande</p>
            <p className="font-medium">{applicantCount}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Publicerad t.o.m</p>
            <p className="font-medium">{space.publishedTo}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Ledig från och med</p>
            <p className="font-medium">{space.publishedFrom}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Kötyp</p>
            <p className="font-medium">{space.queueType}</p>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-4">
          Översiktskarta
        </h3>
        <div className="border rounded-lg overflow-hidden">
          <AspectRatio ratio={16/9}>
            <img
              src="/lovable-uploads/f737d3ef-60f9-4e0f-a979-12d80d6f4efe.png"
              alt="Översiktskarta för bilplats"
              className="w-full h-full object-cover"
            />
          </AspectRatio>
        </div>
      </section>
    </div>
  );
}