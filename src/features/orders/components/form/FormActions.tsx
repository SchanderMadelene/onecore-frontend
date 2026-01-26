
import { Button } from "@/components/ui/button";

type FormActionsProps = {
  onCancel: () => void;
};

export function FormActions({ onCancel }: FormActionsProps) {
  return (
    <div className="flex justify-end space-x-2 pt-4 border-t border-border">
      <Button variant="outline" type="button" onClick={onCancel}>
        Avbryt
      </Button>
      <Button type="submit">Skapa ärende</Button>
    </div>
  );
}
