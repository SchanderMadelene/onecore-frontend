
interface BasicInformationProps {
  inspectorName: string;
  roomCount: number;
}

export function BasicInformation({ inspectorName, roomCount }: BasicInformationProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <p className="text-sm text-muted-foreground">Besiktningsman</p>
        <p className="font-medium">{inspectorName}</p>
      </div>
      <div>
        <p className="text-sm text-muted-foreground">Datum</p>
        <p className="font-medium">{new Date().toLocaleDateString("sv-SE")}</p>
      </div>
      <div>
        <p className="text-sm text-muted-foreground">Antal rum</p>
        <p className="font-medium">{roomCount}</p>
      </div>
      <div>
        <p className="text-sm text-muted-foreground">Status</p>
        <p className="font-medium">Pågående</p>
      </div>
    </div>
  );
}
