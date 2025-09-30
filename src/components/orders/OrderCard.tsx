
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Order } from "@/hooks/useOrdersService";

type OrderCardProps = {
  orderItem: Order;
};

export function OrderCard({ orderItem }: OrderCardProps) {
  const getPriorityVariant = (priority: string): "priority-low" | "priority-medium" | "priority-high" => {
    switch (priority) {
      case "low":
        return "priority-low";
      case "medium":
        return "priority-medium";
      case "high":
        return "priority-high";
      default:
        return "priority-medium";
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <CardTitle className="text-base font-medium">{orderItem.title}</CardTitle>
            <span className="text-sm text-muted-foreground">ID: {orderItem.id}</span>
          </div>
          <Badge variant={getPriorityVariant(orderItem.priority)}>
            {orderItem.priority === "low" ? "Låg" : 
            orderItem.priority === "medium" ? "Medium" : "Hög"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-sm mb-2">{orderItem.description}</div>
        <div className="text-xs text-muted-foreground">
          <div>Rapporterad: {orderItem.reportedDate}</div>
          <div>Tilldelad: {orderItem.assignedTo}</div>
          {orderItem.plannedExecutionDate && (
            <div>Planerat utförande: {orderItem.plannedExecutionDate}</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
