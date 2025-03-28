
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CreateOrderDialog } from "@/components/orders/CreateOrderDialog";

export function CreateIssue() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle>Ärenden</CardTitle>
        <CreateOrderDialog contextType="residence" />
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Här kan du skapa nya ärenden för lägenheten, till exempel felanmälningar eller andra ärenden som behöver hanteras.
        </p>
      </CardContent>
    </Card>
  );
}
