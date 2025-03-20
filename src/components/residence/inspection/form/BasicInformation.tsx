
interface BasicInformationProps {
  inspectorName: string;
  roomCount: number;
}

export function BasicInformation({ inspectorName, roomCount }: BasicInformationProps) {
  // Format current date with time
  const formatDateWithTime = () => {
    const now = new Date();
    const dateOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return now.toLocaleString('sv-SE', dateOptions);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <p className="text-sm text-muted-foreground">Besiktningsman</p>
        <p className="font-medium">{inspectorName}</p>
      </div>
      <div>
        <p className="text-sm text-muted-foreground">Datum</p>
        <p className="font-medium">{formatDateWithTime()}</p>
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
