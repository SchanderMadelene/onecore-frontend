
import { Button } from "@/components/ui/button";
import { CreateOrderDialog } from "@/components/orders/CreateOrderDialog";
import { ClipboardList } from "lucide-react";

export function CreateIssue() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <ClipboardList className="h-5 w-5 text-muted-foreground" />
          Ärenden
        </h3>
        <CreateOrderDialog contextType="residence" />
      </div>
      <p className="text-sm text-muted-foreground">
        Här kan du skapa nya ärenden för lägenheten, till exempel felanmälningar eller andra ärenden som behöver hanteras.
      </p>
    </div>
  );
}
