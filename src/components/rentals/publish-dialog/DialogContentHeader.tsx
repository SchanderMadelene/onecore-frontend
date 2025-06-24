
interface DialogContentHeaderProps {
  selectedCount: number;
}

export const DialogContentHeader = ({ selectedCount }: DialogContentHeaderProps) => {
  return (
    <div className="space-y-2">
      <p className="text-sm text-muted-foreground">
        Nedan listas alla bilplatser som behöver ompubliceras från Xpand och som ej är spärrade.
      </p>
      <div className="flex justify-between items-center">
        <p className="text-sm font-medium">
          Välj bilplatser att publicera ({selectedCount} valda)
        </p>
      </div>
    </div>
  );
};
